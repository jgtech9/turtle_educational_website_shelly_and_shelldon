# Feedback Form Setup Guide

The feedback form is now configured to send emails to your Gmail account using Resend (a reliable email service that works great with Vercel).

## Step 1: Sign Up for Resend (Free)

1. Go to https://resend.com/
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

## Step 2: Get Your API Key

1. Once logged into Resend, go to **API Keys** in the dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "Turtle World Feedback")
4. Copy the API key (starts with `re_...`) - you'll need this in Step 4

## Step 3: Verify Your Domain (Recommended)

To send emails from your domain (e.g., `noreply@yourdomain.com`):

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend provides to your domain's DNS settings
   - If your domain is through Vercel, you can add these in Vercel's DNS settings
5. Wait for verification (usually a few minutes)

**Note:** If you don't verify a domain, you can still send emails, but you'll need to use Resend's test domain initially.

## Step 4: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these three variables:

   **Variable 1:**
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (from Step 2)
   - **Environment:** Production, Preview, Development (check all)

   **Variable 2:**
   - **Name:** `FEEDBACK_EMAIL`
   - **Value:** Your Gmail address (e.g., `yourname@gmail.com`)
   - **Environment:** Production, Preview, Development (check all)

   **Variable 3 (Optional - for custom domain):**
   - **Name:** `EMAIL_FROM_DOMAIN`
   - **Value:** Your domain (e.g., `yourdomain.com`)
   - **Environment:** Production, Preview, Development (check all)

## Step 5: Update the API File (If Using Custom Domain)

If you verified your domain in Step 3, update `api/send-feedback.js`:

Find this line (around line 45):
```javascript
from: 'Turtle World <noreply@yourdomain.com>', // Update with your domain
```

Replace `yourdomain.com` with your actual domain:
```javascript
from: 'Turtle World <noreply@yourdomain.com>',
```

Or use an environment variable:
```javascript
from: `Turtle World <noreply@${process.env.EMAIL_FROM_DOMAIN || 'yourdomain.com'}>`,
```

## Step 6: Deploy to Vercel

1. Push your changes to GitHub (if using Git)
2. Vercel will automatically deploy
3. Or manually deploy: `vercel --prod`

## Step 7: Test the Form

1. Visit your site's contact page
2. Fill out the feedback form
3. Submit it
4. Check your Gmail inbox for the feedback email

## Troubleshooting

### Emails Not Sending

1. **Check Vercel Logs:**
   - Go to Vercel dashboard → Your project → **Functions** tab
   - Click on `/api/send-feedback` to see logs
   - Look for any error messages

2. **Verify Environment Variables:**
   - Make sure `RESEND_API_KEY` and `FEEDBACK_EMAIL` are set
   - Make sure they're enabled for the correct environment (Production/Preview/Development)

3. **Check Resend Dashboard:**
   - Go to Resend dashboard → **Logs**
   - See if emails are being sent and any error messages

### Domain Not Verified

If you haven't verified your domain yet:
- You can use Resend's test domain temporarily
- Update the `from` field in `api/send-feedback.js` to use a test email
- Or verify your domain following Step 3

### Rate Limits

Resend free tier: 100 emails/day
- If you exceed this, you'll need to upgrade or wait until the next day
- Check your usage in Resend dashboard

## Alternative: Using Gmail SMTP Directly

If you prefer to use Gmail SMTP directly (without Resend), you would need to:
1. Enable "Less secure app access" or use OAuth2 (more complex)
2. Update the API function to use Nodemailer with Gmail SMTP
3. This is more complex and less recommended for serverless functions

**Recommendation:** Stick with Resend - it's easier, more reliable, and works perfectly with Vercel serverless functions.

## Cost

- **Resend Free Tier:** 100 emails/day, 3,000 emails/month
- **Vercel:** Free tier includes serverless functions
- **Total Cost:** $0 for low-to-medium traffic

If you need more emails, Resend pricing starts at $20/month for 50,000 emails.

---

**Need Help?**
- Resend Docs: https://resend.com/docs
- Vercel Serverless Functions: https://vercel.com/docs/functions
- Check Vercel function logs for debugging
