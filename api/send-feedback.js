// Vercel Serverless Function to send feedback emails
// This endpoint will be available at: /api/send-feedback

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX || '3') // Max requests per window
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '3600') // Time window in seconds (1 hour default)

// Simple in-memory rate limit store (for basic protection)
// Note: This resets on serverless function cold starts
// For production, use Upstash Redis (see setup instructions)
const rateLimitStore = new Map()

// Get client IP address from request
function getClientIP(req) {
  // Try various headers that Vercel/proxies might use
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.headers['cf-connecting-ip'] ||
    req.connection?.remoteAddress ||
    'unknown'
  )
}

// Check rate limit
function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = RATE_LIMIT_WINDOW * 1000
  
  // Clean up old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (now - value.firstRequest > windowMs) {
      rateLimitStore.delete(key)
    }
  }

  const key = `rate_limit:${ip}`
  const record = rateLimitStore.get(key)

  if (!record) {
    // First request from this IP
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    })
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }

  // Check if within time window
  if (now - record.firstRequest < windowMs) {
    // Still within window
    if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
      const resetTime = new Date(record.firstRequest + windowMs)
      const secondsUntilReset = Math.ceil((record.firstRequest + windowMs - now) / 1000)
      return { 
        allowed: false, 
        remaining: 0,
        resetTime: resetTime,
        secondsUntilReset: secondsUntilReset
      }
    }
    // Increment count
    record.count++
    record.lastRequest = now
    return { 
      allowed: true, 
      remaining: RATE_LIMIT_MAX_REQUESTS - record.count 
    }
  } else {
    // Window expired, reset
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    })
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Rate limiting check
    const clientIP = getClientIP(req)
    const rateLimit = checkRateLimit(clientIP)
    
    if (!rateLimit.allowed) {
      const minutesUntilReset = Math.ceil(rateLimit.secondsUntilReset / 60)
      return res.status(429).json({ 
        error: `Too many requests. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? 's' : ''}.`,
        retryAfter: rateLimit.secondsUntilReset
      })
    }

    const { name, email, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Additional validation: message length
    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message is too long. Maximum 5000 characters.' })
    }

    // Additional validation: name length
    if (name.length > 100) {
      return res.status(400).json({ error: 'Name is too long. Maximum 100 characters.' })
    }

    // Get the recipient email from environment variable
    // You'll set this in Vercel dashboard: Settings → Environment Variables
    const recipientEmail = process.env.FEEDBACK_EMAIL || process.env.EMAIL_RECIPIENT

    if (!recipientEmail) {
      console.error('FEEDBACK_EMAIL environment variable not set')
      return res.status(500).json({ error: 'Email configuration error' })
    }

    // Get Resend API key from environment variable
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable not set')
      return res.status(500).json({ error: 'Email service configuration error' })
    }

    // Get the from email address (use domain from env var or default)
    const emailDomain = process.env.EMAIL_FROM_DOMAIN || 'onboarding.resend.dev'
    const fromEmail = `Turtle World <noreply@${emailDomain}>`

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        subject: `New Feedback from ${name} - Turtle World`,
        html: `
          <h2>New Feedback Submission</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 0.9em;">Sent from Turtle World contact form</p>
        `,
        text: `
New Feedback Submission

From: ${name}
Email: ${email}

Message:
${message}

---
Sent from Turtle World contact form
        `
      })
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Resend API error:', errorData)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    const emailData = await emailResponse.json()

    return res.status(200).json({ 
      success: true, 
      message: 'Feedback sent successfully',
      id: emailData.id,
      rateLimitRemaining: rateLimit.remaining
    })

  } catch (error) {
    console.error('Error sending feedback:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
