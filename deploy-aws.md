# AWS Deployment Guide for Turtle World

This guide walks you through deploying the Turtle World website to AWS using S3 and CloudFront.

## Prerequisites

1. **AWS Account** - You need an AWS account with appropriate permissions
2. **AWS CLI** - Install and configure the AWS CLI
   - Download from: https://aws.amazon.com/cli/
   - Configure with: `aws configure`
3. **Node.js and npm** - Already installed for development
4. **AWS Permissions** - You need permissions for:
   - S3 (Create bucket, upload files, set permissions)
   - CloudFront (Create distribution, create invalidations)
   - IAM (Optional: Create service role if needed)

## Deployment Architecture

```
Internet
   ↓
CloudFront Distribution (CDN)
   ↓
S3 Bucket (Static Hosting)
   ↓
Turtle World Website (Built React App)
```

## Step-by-Step Deployment

### 1. Prepare AWS Resources

#### Create S3 Bucket

```bash
# Create bucket (replace YOUR-BUCKET-NAME with your desired name)
aws s3 mb s3://YOUR-BUCKET-NAME --region us-east-1

# Enable static website hosting
aws s3 website s3://YOUR-BUCKET-NAME \
    --index-document index.html \
    --error-document index.html
```

**Important**: The error document should also be `index.html` for React Router to work properly (SPA routing).

#### Configure S3 Bucket Policy

Create a bucket policy file `s3-bucket-policy.json`:

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

Apply the policy:

```bash
aws s3api put-bucket-policy \
    --bucket YOUR-BUCKET-NAME \
    --policy file://s3-bucket-policy.json
```

#### Create CloudFront Distribution (Optional but Recommended)

1. Go to AWS Console → CloudFront
2. Click "Create Distribution"
3. Configure:
   - **Origin Domain**: Select your S3 bucket
   - **Origin Path**: Leave empty
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP Methods**: GET, HEAD, OPTIONS
   - **Default Root Object**: index.html
   - **Custom Error Response**:
     - HTTP Error Code: 403
     - Response Page Path: /index.html
     - HTTP Response Code: 200
     - HTTP Error Code: 404
     - Response Page Path: /index.html
     - HTTP Response Code: 200
4. Create the distribution and note the Distribution ID

### 2. Configure Deployment Scripts

Update the deployment scripts with your AWS details:

**For Linux/Mac (`aws-deploy.sh`)**:
```bash
BUCKET_NAME="your-actual-bucket-name"
CLOUDFRONT_DISTRIBUTION_ID="your-cloudfront-distribution-id"
AWS_REGION="us-east-1"
PROFILE="default"
```

**For Windows (`aws-deploy.ps1`)**:
```powershell
$BUCKET_NAME = "your-actual-bucket-name"
$CLOUDFRONT_DISTRIBUTION_ID = "your-cloudfront-distribution-id"
$AWS_REGION = "us-east-1"
$PROFILE = "default"
```

### 3. Build and Deploy

#### Using the Script (Recommended)

**Linux/Mac**:
```bash
chmod +x aws-deploy.sh
./aws-deploy.sh
```

**Windows (PowerShell)**:
```powershell
.\aws-deploy.ps1
```

#### Manual Deployment

```bash
# 1. Build the project
npm run build

# 2. Upload to S3
aws s3 sync dist/ s3://YOUR-BUCKET-NAME/ \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html"

# Upload HTML files with no cache
aws s3 sync dist/ s3://YOUR-BUCKET-NAME/ \
    --delete \
    --cache-control "public, max-age=0, must-revalidate" \
    --include "*.html"

# 3. Invalidate CloudFront cache (if using CloudFront)
aws cloudfront create-invalidation \
    --distribution-id YOUR-DISTRIBUTION-ID \
    --paths "/*"
```

### 4. Access Your Website

- **S3 Website Endpoint**: `http://YOUR-BUCKET-NAME.s3-website-REGION.amazonaws.com`
- **CloudFront URL**: `https://YOUR-DISTRIBUTION-ID.cloudfront.net`
- **Custom Domain**: If configured, your custom domain URL

## S3 Bucket Configuration for SPA

Since this is a Single Page Application (SPA) using React Router, you need to configure S3 to redirect all 404 errors to `index.html`:

### Using S3 Static Website Hosting

The S3 static website hosting already handles this, but for CloudFront, you need to configure custom error responses (as mentioned above).

## Environment-Specific Deployment

### Production

Use a production bucket and distribution:
```bash
BUCKET_NAME="turtle-world-prod"
CLOUDFRONT_DISTRIBUTION_ID="prod-distribution-id"
```

### Staging

Use a staging bucket:
```bash
BUCKET_NAME="turtle-world-staging"
CLOUDFRONT_DISTRIBUTION_ID="staging-distribution-id"
```

## Automated Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
          
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET_NAME }}/ --delete
          
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

Add secrets in GitHub repository settings:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`

## Cost Estimation

### S3 Costs
- Storage: ~$0.023 per GB/month
- Requests: ~$0.005 per 1,000 GET requests
- Data Transfer: First 100 GB/month free, then ~$0.09/GB

### CloudFront Costs
- Data Transfer: ~$0.085 per GB (first 10 TB)
- Requests: ~$0.0075 per 10,000 HTTPS requests

**Estimated monthly cost for low-to-medium traffic**: $1-10 USD

## Security Best Practices

1. **Enable HTTPS**: Use CloudFront for HTTPS (free SSL certificate)
2. **Bucket Policy**: Restrict public access to only necessary files
3. **IAM Roles**: Use IAM roles instead of access keys when possible
4. **Versioning**: Enable S3 versioning for rollback capability
5. **CloudFront Security Headers**: Add security headers in CloudFront

## Troubleshooting

### 404 Errors on Direct Routes

If you're getting 404 errors when accessing routes directly (e.g., `/habitat`), ensure:
- S3 error document is set to `index.html`
- CloudFront custom error responses are configured (403 → 200 with /index.html, 404 → 200 with /index.html)

### CORS Issues

If you have API calls, you may need to configure CORS:
```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": [],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

### Cache Issues

Clear CloudFront cache after deployment:
```bash
aws cloudfront create-invalidation --distribution-id YOUR-ID --paths "/*"
```

## Monitoring

### CloudWatch

Monitor:
- S3 bucket metrics
- CloudFront distribution metrics
- Error rates
- Request counts

### Alerts

Set up CloudWatch alarms for:
- High error rates
- High request costs
- Storage usage

## Additional Resources

- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront with S3](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
- [React Router Deployment](https://reactrouter.com/en/main/start/overview#deployment)

## Support

For issues or questions:
1. Check AWS CloudWatch logs
2. Review S3 access logs
3. Check CloudFront distribution logs
4. Verify IAM permissions
