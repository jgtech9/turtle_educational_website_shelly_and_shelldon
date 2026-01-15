// Alternative implementation using Upstash Redis for persistent rate limiting
// This provides better rate limiting that persists across serverless function invocations
// 
// To use this instead of the basic version:
// 1. Sign up for Upstash Redis (free tier): https://upstash.com/
// 2. Create a Redis database
// 3. Get your REST API URL and token
// 4. Set environment variables in Vercel:
//    - UPSTASH_REDIS_REST_URL
//    - UPSTASH_REDIS_REST_TOKEN
// 5. Rename this file to send-feedback.js (backup the old one first)

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX || '3') // Max requests per window
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '3600') // Time window in seconds (1 hour default)

// Get client IP address from request
function getClientIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.headers['cf-connecting-ip'] ||
    req.connection?.remoteAddress ||
    'unknown'
  )
}

// Check rate limit using Upstash Redis
async function checkRateLimitRedis(ip) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!redisUrl || !redisToken) {
    // Fallback to basic rate limiting if Redis not configured
    console.warn('Upstash Redis not configured, rate limiting may be less effective')
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }

  const key = `rate_limit:${ip}`
  const now = Math.floor(Date.now() / 1000)

  try {
    // Get current count
    const getResponse = await fetch(`${redisUrl}/get/${encodeURIComponent(key)}`, {
      headers: {
        'Authorization': `Bearer ${redisToken}`
      }
    })

    const getData = await getResponse.json()
    const count = getData.result ? parseInt(getData.result) : 0

    if (count >= RATE_LIMIT_MAX_REQUESTS) {
      // Check TTL to see when it resets
      const ttlResponse = await fetch(`${redisUrl}/ttl/${encodeURIComponent(key)}`, {
        headers: {
          'Authorization': `Bearer ${redisToken}`
        }
      })
      const ttlData = await ttlResponse.json()
      const secondsUntilReset = ttlData.result > 0 ? ttlData.result : RATE_LIMIT_WINDOW

      return {
        allowed: false,
        remaining: 0,
        secondsUntilReset: secondsUntilReset
      }
    }

    // Increment counter
    if (count === 0) {
      // First request - set with expiration
      await fetch(`${redisUrl}/setex/${encodeURIComponent(key)}/${RATE_LIMIT_WINDOW}/1`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${redisToken}`
        }
      })
    } else {
      // Increment existing counter (TTL is preserved)
      await fetch(`${redisUrl}/incr/${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${redisToken}`
        }
      })
    }

    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - count - 1
    }
  } catch (error) {
    console.error('Redis rate limit check error:', error)
    // On error, allow the request (fail open)
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Rate limiting check with Redis
    const clientIP = getClientIP(req)
    const rateLimit = await checkRateLimitRedis(clientIP)
    
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
