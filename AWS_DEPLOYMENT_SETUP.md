# AWS Deployment Setup Guide - Step by Step

This guide will walk you through deploying Turtle World to AWS S3 and CloudFront. Follow these steps in order.

---

## ⚠️ Pre-Deployment Checklist

Before you begin, ensure:

- ✅ **Project builds successfully** (`npm run build` works)
- ✅ **AWS Account** - You have an AWS account
- ✅ **AWS CLI installed** - Download from https://aws.amazon.com/cli/
- ✅ **AWS CLI configured** - Run `aws configure` with your credentials

---

## Step 1: Fix Vite Configuration (REQUIRED)

**Issue Found:** The `vite.config.js` currently has `base: './'` which uses relative paths. For AWS S3 hosting with React Router, we need absolute paths.

**Action Required:** Update `vite.config.js`:

```javascript
// Change base from './' to '/' (or remove it - '/' is the default)
base: '/'  // Use absolute paths for S3/CloudFront
```

**Why:** React Router needs absolute paths (`/habitat`, `/diet`) not relative paths (`./habitat`, `./diet`) for proper routing on S3/CloudFront.

---

## Step 2: Verify Build Works

Test the build locally:

```powershell
npm run build
```

Verify that:
- Build completes without errors
- `dist/` folder is created
- `dist/index.html` exists
- No console errors in the build output

---

## Step 3: Install and Configure AWS CLI

### 3.1 Install AWS CLI

If not already installed:
- Download: https://aws.amazon.com/cli/
- Install and verify: `aws --version`

### 3.2 Configure AWS Credentials

```powershell
aws configure
```

You'll need:
- **AWS Access Key ID** - From your AWS account
- **AWS Secret Access Key** - From your AWS account
- **Default region** - e.g., `us-east-1`
- **Default output format** - `json`

**Note:** If you don't have AWS credentials:
1. Log into AWS Console
2. Go to IAM → Users → Your User → Security Credentials
3. Create Access Key
4. Save the Access Key ID and Secret Access Key securely

---

## Step 4: Create S3 Bucket

### 4.1 Choose a Bucket Name

**Important:** Bucket names must be:
- Globally unique across all AWS accounts
- 3-63 characters
- Lowercase letters, numbers, hyphens only
- Example: `turtle-world-2024` or `my-turtle-site`

### 4.2 Create the Bucket

```powershell
# Replace YOUR-BUCKET-NAME with your chosen name
aws s3 mb s3://YOUR-BUCKET-NAME --region us-east-1
```

**Note:** If you get a "bucket already exists" error, choose a different name.

### 4.3 Enable Static Website Hosting

**Critical for React Router:** You must configure S3 to handle SPA routing by setting the error document to `index.html`.

```powershell
# Enable static website hosting with error document set to index.html
aws s3 website s3://YOUR-BUCKET-NAME `
    --index-document index.html `
    --error-document index.html
```

**Why error-document = index.html?** React Router uses client-side routing. When users visit `/habitat` directly, S3 would normally return 404. Setting error-document to `index.html` ensures React Router can handle the route.

### 4.4 Create Bucket Policy (Make Files Public)

Create a file `s3-bucket-policy.json` in your project root:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

**Important:** Replace `YOUR-BUCKET-NAME` with your actual bucket name.

Apply the policy:

```powershell
aws s3api put-bucket-policy `
    --bucket YOUR-BUCKET-NAME `
    --policy file://s3-bucket-policy.json
```

### 4.5 Block Public Access Settings

AWS buckets have "Block Public Access" enabled by default. You need to allow public access for static website hosting:

1. Go to AWS Console → S3 → Your Bucket
2. Click **Permissions** tab
3. Click **Edit** under "Block public access"
4. **Uncheck all 4 boxes** (for public website hosting)
5. Save and confirm

**Note:** This is safe for a static website with no sensitive data.

---

## Step 5: Configure Deployment Script

### 5.1 Edit Deployment Script (Windows)

Open `aws-deploy.ps1` and update these values at the top:

```powershell
$BUCKET_NAME = "your-actual-bucket-name"  # ← Change this
$CLOUDFRONT_DISTRIBUTION_ID = "your-cloudfront-distribution-id"  # ← Leave as-is for now (optional)
$AWS_REGION = "us-east-1"  # ← Match your bucket region
$PROFILE = "default"  # ← Usually "default", change if you use multiple AWS profiles
```

**Important:** 
- Replace `your-actual-bucket-name` with your actual S3 bucket name
- Leave CloudFront ID as-is if you're not using CloudFront yet

---

## Step 6: Test Deployment (S3 Only)

### 6.1 Build the Project

```powershell
npm run build
```

### 6.2 Deploy to S3

```powershell
.\aws-deploy.ps1
```

Or manually:

```powershell
# Upload all files
aws s3 sync dist/ s3://YOUR-BUCKET-NAME/ --delete

# Or upload HTML with correct cache headers
aws s3 sync dist/ s3://YOUR-BUCKET-NAME/ --delete --cache-control "public, max-age=0, must-revalidate" --include "*.html"
aws s3 sync dist/ s3://YOUR-BUCKET-NAME/ --delete --cache-control "public, max-age=31536000, immutable" --exclude "*.html"
```

### 6.3 Test Your Site

Your site will be available at:
```
http://YOUR-BUCKET-NAME.s3-website-us-east-1.amazonaws.com
```

**Test:**
- Home page loads
- Navigation works
- Routes like `/habitat`, `/diet` work (React Router)
- All pages are accessible

---

## Step 7: Set Up CloudFront (Recommended)

CloudFront provides:
- HTTPS (SSL certificate)
- Faster global delivery (CDN)
- Custom domain support
- Better performance

### 7.1 Create CloudFront Distribution

1. Go to AWS Console → CloudFront
2. Click **Create Distribution**
3. Configure:

   **Origin Settings:**
   - **Origin Domain**: Select your S3 bucket (e.g., `YOUR-BUCKET-NAME.s3.amazonaws.com`)
   - **Origin Path**: Leave empty
   - **Name**: Auto-filled
   - **Origin Access**: Select "Legacy access identities" or "S3 bucket access" depending on your setup

   **Default Cache Behavior:**
   - **Viewer Protocol Policy**: **Redirect HTTP to HTTPS** (important!)
   - **Allowed HTTP Methods**: **GET, HEAD, OPTIONS**
   - **Cache Policy**: **CachingOptimized** (or create custom)
   - **Origin Request Policy**: **None** (or CORS-S3Origin if needed)

   **Distribution Settings:**
   - **Default Root Object**: `index.html`
   - **Price Class**: Choose based on your needs (All Edge Locations recommended)
   - **WAF**: Optional

4. **Important - Custom Error Responses:**
   
   You MUST add custom error responses for React Router to work:
   
   - Click **Error Pages** tab (after creating, or during creation)
   - Click **Create Custom Error Response**
   
   **Add TWO error responses:**
   
   **Error 1:**
   - HTTP Error Code: `403: Forbidden`
   - Response Page Path: `/index.html`
   - HTTP Response Code: `200: OK`
   
   **Error 2:**
   - HTTP Error Code: `404: Not Found`
   - Response Page Path: `/index.html`
   - HTTP Response Code: `200: OK`
   
   **Why?** When users visit `/habitat` directly, CloudFront/S3 returns 403/404. These custom error responses redirect to `index.html`, allowing React Router to handle the route.

5. Click **Create Distribution**

### 7.2 Wait for Distribution

CloudFront distributions take 5-15 minutes to deploy. Wait until status is **Deployed**.

### 7.3 Get Distribution ID

1. Find your distribution in the list
2. Copy the **Distribution ID** (looks like: `E1234567890ABC`)

### 7.4 Update Deployment Script

Update `aws-deploy.ps1`:

```powershell
$CLOUDFRONT_DISTRIBUTION_ID = "E1234567890ABC"  # ← Your actual Distribution ID
```

### 7.5 Access Your Site

Your site will be available at:
```
https://Y1234567890ABC.cloudfront.net
```

(Replace `Y1234567890ABC` with your Distribution Domain Name)

---

## Step 8: Configure Custom Domain (Optional)

If you have a domain name:

1. In CloudFront distribution settings
2. Add your domain to **Alternate Domain Names (CNAMEs)**
3. Request SSL certificate in AWS Certificate Manager
4. Update your DNS records to point to CloudFront

**Note:** This is optional and more advanced. You can use the CloudFront URL for now.

---

## Common Issues and Solutions

### Issue: Routes like `/habitat` return 404

**Solution:** Ensure:
- S3 error document is set to `index.html`
- CloudFront custom error responses are configured (403 → 200 with `/index.html`, 404 → 200 with `/index.html`)
- `vite.config.js` has `base: '/'` (not `base: './'`)

### Issue: "Access Denied" when accessing bucket

**Solution:**
- Check bucket policy is applied correctly
- Verify "Block Public Access" is disabled
- Ensure bucket policy allows `s3:GetObject` for `Principal: "*"`

### Issue: Files not updating after deployment

**Solution:**
- If using CloudFront, wait for cache invalidation or manually invalidate:
  ```powershell
  aws cloudfront create-invalidation --distribution-id YOUR-DIST-ID --paths "/*"
  ```
- Clear your browser cache

### Issue: Build fails

**Solution:**
- Run `npm install` to ensure dependencies are installed
- Check Node.js version (should be v16+)
- Review build errors in console

### Issue: AWS CLI "Access Denied"

**Solution:**
- Verify AWS credentials are correct: `aws sts get-caller-identity`
- Ensure IAM user has S3 and CloudFront permissions
- Check if using correct AWS profile: `aws configure list`

---

## Deployment Workflow (After Initial Setup)

Once everything is configured, deploying updates is simple:

```powershell
# Just run the deployment script
.\aws-deploy.ps1
```

The script will:
1. Build the project
2. Upload files to S3
3. Invalidate CloudFront cache (if configured)
4. Report success

---

## Costs

**S3:**
- Storage: ~$0.023/GB/month
- Requests: ~$0.005 per 1,000 GET requests
- Data Transfer: First 100 GB/month free, then ~$0.09/GB

**CloudFront:**
- Data Transfer: ~$0.085/GB (first 10 TB)
- Requests: ~$0.0075 per 10,000 HTTPS requests

**Estimated Monthly Cost:** $1-10 USD for low-to-medium traffic

---

## Security Notes

1. **Bucket Policy** - Only allows public read access, which is appropriate for a static website
2. **HTTPS** - Use CloudFront for HTTPS (free SSL certificate)
3. **No Sensitive Data** - Static site has no backend, so no database credentials or API keys in the build
4. **Amazon Ads** - When you add Amazon ads, the credentials go in the component code (client-side), which is standard for affiliate ads

---

## Next Steps After Deployment

1. ✅ Test all pages work
2. ✅ Test React Router navigation
3. ✅ Verify images load correctly
4. ✅ Check mobile responsiveness
5. ✅ Monitor AWS costs
6. ✅ Set up AWS billing alerts (recommended)

---

## Quick Reference

**Build and deploy:**
```powershell
npm run build
.\aws-deploy.ps1
```

**Manual S3 upload:**
```powershell
aws s3 sync dist/ s3://YOUR-BUCKET-NAME/ --delete
```

**Invalidate CloudFront:**
```powershell
aws cloudfront create-invalidation --distribution-id YOUR-DIST-ID --paths "/*"
```

**Check deployment:**
- S3 URL: `http://YOUR-BUCKET-NAME.s3-website-us-east-1.amazonaws.com`
- CloudFront URL: `https://YOUR-DIST-ID.cloudfront.net`

---

## Need Help?

- AWS S3 Documentation: https://docs.aws.amazon.com/s3/
- CloudFront Documentation: https://docs.aws.amazon.com/cloudfront/
- React Router Deployment: https://reactrouter.com/en/main/start/overview#deployment
- AWS Support: https://aws.amazon.com/support/

---

*Last Updated: Based on current project configuration*
