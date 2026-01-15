# Rate Limiting Setup Guide

The feedback form now includes rate limiting to prevent abuse. By default, it limits users to **3 submissions per hour per IP address**.

## How It Works

The rate limiting system:
- Tracks submissions by IP address
- Limits to 3 submissions per hour (configurable)
- Returns a 429 error with a clear message when limit is exceeded
- Automatically resets after the time window expires

## Current Implementation

The basic implementation uses an in-memory store that:
- ✅ Works immediately (no setup required)
- ✅ Provides basic protection against abuse
- ⚠️ Resets on serverless function cold starts (less persistent)

## Configuration

You can customize the rate limits by adding environment variables in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables

2. Add these optional variables:

   **RATE_LIMIT_MAX** (default: 3)
   - Maximum number of submissions allowed per time window
   - Example: `5` for 5 submissions per window

   **RATE_LIMIT_WINDOW** (default: 3600)
   - Time window in seconds
   - Default: 3600 (1 hour)
   - Examples:
     - `1800` = 30 minutes
     - `3600` = 1 hour
     - `86400` = 24 hours

## Example Configurations

### Stricter Limits (2 per hour)
```
RATE_LIMIT_MAX=2
RATE_LIMIT_WINDOW=3600
```

### More Lenient (5 per day)
```
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW=86400
```

### Very Strict (1 per hour)
```
RATE_LIMIT_MAX=1
RATE_LIMIT_WINDOW=3600
```

## Upgrading to Persistent Rate Limiting (Recommended for Production)

For better rate limiting that persists across serverless function restarts, you can use **Upstash Redis** (free tier available).

### Step 1: Sign Up for Upstash Redis

1. Go to https://upstash.com/
2. Sign up for a free account
3. Create a new Redis database
4. Choose a region close to your Vercel deployment
5. Copy your **REST API URL** and **REST API Token**

### Step 2: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

- **UPSTASH_REDIS_REST_URL** - Your Redis REST API URL
- **UPSTASH_REDIS_REST_TOKEN** - Your Redis REST API Token

### Step 3: Switch to Redis Implementation

1. Backup your current `api/send-feedback.js`:
   ```bash
   cp api/send-feedback.js api/send-feedback-basic.js
   ```

2. Replace it with the Redis version:
   ```bash
   cp api/send-feedback-redis.js api/send-feedback.js
   ```

3. Deploy to Vercel

### Benefits of Redis Rate Limiting

- ✅ Persistent across function restarts
- ✅ More accurate rate limiting
- ✅ Better for high-traffic sites
- ✅ Free tier: 10,000 commands/day

## How Rate Limit Errors Are Handled

When a user exceeds the rate limit:

1. They receive a **429 Too Many Requests** response
2. The error message shows: "Too many requests. Please try again in X minutes."
3. The form displays this error message to the user
4. The user must wait until the time window expires

## Testing Rate Limits

To test the rate limiting:

1. Submit the feedback form 3 times quickly
2. On the 4th submission, you should see the rate limit error
3. Wait 1 hour (or your configured window) and try again

## Monitoring

### Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Functions** tab
3. Click on `/api/send-feedback`
4. View logs to see rate limit hits

### Check Upstash Redis (if using)

1. Go to Upstash Dashboard
2. View your Redis database
3. See rate limit keys: `rate_limit:IP_ADDRESS`

## Security Notes

- Rate limiting is based on IP address
- Users behind the same NAT/proxy share the same IP (may affect legitimate users)
- For stricter control, consider adding email-based rate limiting
- The current implementation is sufficient for most use cases

## Troubleshooting

### Rate Limits Not Working

1. **Check environment variables** are set correctly in Vercel
2. **Check function logs** for errors
3. **Verify IP detection** - check if `x-forwarded-for` header is being read correctly

### Too Many False Positives

- Increase `RATE_LIMIT_MAX` (e.g., to 5 or 10)
- Increase `RATE_LIMIT_WINDOW` (e.g., to 7200 for 2 hours)

### Need Stricter Limits

- Decrease `RATE_LIMIT_MAX` (e.g., to 1 or 2)
- Decrease `RATE_LIMIT_WINDOW` (e.g., to 1800 for 30 minutes)

## Additional Protection

The form also includes:
- ✅ Input length validation (name: 100 chars, message: 5000 chars)
- ✅ Email format validation
- ✅ Required field validation
- ✅ Server-side validation (can't be bypassed)

---

**Current Default Settings:**
- Max submissions: **3 per hour**
- Time window: **3600 seconds (1 hour)**
- Implementation: **In-memory (basic)**

For production sites with higher traffic, consider upgrading to the Redis implementation.
