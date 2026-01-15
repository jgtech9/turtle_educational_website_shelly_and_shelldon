# GitHub Deployment Guide - Deploy to AWS via GitHub Actions

This guide explains how to deploy Turtle World to AWS automatically using GitHub Actions. Once set up, every push to your main branch will automatically deploy your site to AWS.

---

## Overview

**GitHub Actions** will:
1. Build your project on GitHub's servers
2. Deploy to AWS S3 automatically
3. Invalidate CloudFront cache (if configured)
4. Run on every push to main/master branch

**Benefits:**
- ✅ Automatic deployment on code changes
- ✅ No need to build/deploy manually
- ✅ Deployment history in GitHub
- ✅ Can deploy from any computer
- ✅ Free for public repositories

---

## Prerequisites

1. **GitHub Account** - Create one at https://github.com
2. **Git Repository** - Your code pushed to GitHub
3. **AWS Account** - Already set up (see AWS_DEPLOYMENT_SETUP.md)
4. **AWS Credentials** - Access Key ID and Secret Access Key
5. **S3 Bucket** - Already created and configured (see AWS_DEPLOYMENT_SETUP.md)

---

## Step 1: Prepare Your Repository

### 1.1 Check .gitignore

Make sure your `.gitignore` file excludes build artifacts:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build output
dist/
dist-ssr/

# Environment variables
.env
.env.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# AWS (if you have local configs)
.aws/
```

**Note:** Your current `.gitignore` only has `package.json` - you should update it to include the above.

### 1.2 Initialize Git Repository (if not already done)

```powershell
git init
git add .
git commit -m "Initial commit"
```

### 1.3 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (public or private)
3. **Do NOT** initialize with README, .gitignore, or license (you already have these)
4. Copy the repository URL

### 1.4 Push to GitHub

```powershell
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main  # or 'master' if you prefer
git push -u origin main
```

---

## Step 2: Set Up AWS S3 Bucket

Follow **AWS_DEPLOYMENT_SETUP.md** to:
1. Create S3 bucket
2. Enable static website hosting
3. Configure bucket policy
4. (Optional) Set up CloudFront

**Important:** Complete the AWS setup BEFORE configuring GitHub Actions.

---

## Step 3: Get AWS Credentials

### 3.1 Create IAM User for GitHub Actions

**Best Practice:** Create a dedicated IAM user for GitHub Actions (not your personal AWS account).

1. Go to AWS Console → IAM → Users
2. Click **Add Users**
3. Username: `github-actions-turtle-world` (or similar)
4. Access type: **Programmatic access**
5. Click **Next**

### 3.2 Attach Policies

Attach these policies:
- `AmazonS3FullAccess` (or create custom policy for your specific bucket)
- `CloudFrontFullAccess` (if using CloudFront)

**Or create a custom policy** (more secure):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

6. Click **Next: Review** → **Create user**
7. **Save the Access Key ID and Secret Access Key** - You won't see the secret again!

---

## Step 4: Configure GitHub Secrets

### 4.1 Go to Repository Settings

1. Open your GitHub repository
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**

### 4.2 Add Required Secrets

Add these secrets one by one:

**1. AWS_ACCESS_KEY_ID**
- Name: `AWS_ACCESS_KEY_ID`
- Value: Your AWS Access Key ID (from Step 3)

**2. AWS_SECRET_ACCESS_KEY**
- Name: `AWS_SECRET_ACCESS_KEY`
- Value: Your AWS Secret Access Key (from Step 3)

**3. S3_BUCKET_NAME**
- Name: `S3_BUCKET_NAME`
- Value: Your S3 bucket name (e.g., `turtle-world-2024`)

**4. AWS_REGION** (Optional, defaults to us-east-1)
- Name: `AWS_REGION`
- Value: Your AWS region (e.g., `us-east-1`)

**5. CLOUDFRONT_DISTRIBUTION_ID** (Optional, only if using CloudFront)
- Name: `CLOUDFRONT_DISTRIBUTION_ID`
- Value: Your CloudFront Distribution ID (e.g., `E1234567890ABC`)

**Important:** 
- Keep these secrets secure - never commit them to code
- They are encrypted by GitHub
- Only GitHub Actions can access them

---

## Step 5: GitHub Actions Workflow

The workflow file is already created at `.github/workflows/deploy-aws.yml`

**It's ready to use!** The workflow will:
- Trigger on pushes to `main` or `master` branch
- Build the project
- Deploy to S3
- Invalidate CloudFront (if configured)

### 5.1 Verify Workflow File

The workflow file should be at: `.github/workflows/deploy-aws.yml`

If it doesn't exist, it will be created when you push to GitHub.

### 5.2 Commit and Push

```powershell
git add .github/workflows/deploy-aws.yml
git commit -m "Add GitHub Actions deployment workflow"
git push
```

---

## Step 6: Test Deployment

### 6.1 Trigger Deployment

Make a small change and push:

```powershell
# Make a small change (e.g., update README)
git add .
git commit -m "Test deployment"
git push
```

### 6.2 Check GitHub Actions

1. Go to your GitHub repository
2. Click **Actions** tab (top menu)
3. You should see "Deploy to AWS" workflow running
4. Click on it to see progress
5. Green checkmark = Success! ✅

### 6.3 Verify Deployment

Visit your site:
- S3 URL: `http://YOUR-BUCKET-NAME.s3-website-us-east-1.amazonaws.com`
- CloudFront URL: `https://YOUR-DIST-ID.cloudfront.net`

---

## How It Works

### Automatic Deployment

Every time you:
- Push to `main` or `master` branch
- The workflow automatically:
  1. Checks out your code
  2. Installs dependencies
  3. Builds the project
  4. Deploys to S3
  5. Invalidates CloudFront cache

### Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab
2. Click **Deploy to AWS** workflow
3. Click **Run workflow** button
4. Select branch and click **Run workflow**

---

## Troubleshooting

### Workflow Fails

**Check the workflow logs:**
1. Go to **Actions** tab
2. Click on failed workflow run
3. Expand failed step to see error messages

**Common Issues:**

**"Access Denied"**
- Check AWS credentials are correct in GitHub Secrets
- Verify IAM user has S3 permissions
- Check bucket policy allows access

**"Bucket does not exist"**
- Verify S3_BUCKET_NAME secret is correct
- Check bucket name matches exactly

**"Build fails"**
- Check build works locally: `npm run build`
- Verify all dependencies are in package.json
- Check Node.js version (should be 18+)

**"CloudFront invalidation fails"**
- Verify CLOUDFRONT_DISTRIBUTION_ID is correct
- Check IAM user has CloudFront permissions
- Or remove CloudFront secret if not using CloudFront

### Deployment Succeeds but Site Doesn't Update

- CloudFront cache may take a few minutes to clear
- Clear browser cache
- Check S3 bucket directly to verify files uploaded

---

## Security Best Practices

1. **Use IAM User** - Don't use your personal AWS account credentials
2. **Minimal Permissions** - Give IAM user only necessary permissions
3. **Rotate Keys** - Periodically rotate AWS access keys
4. **Secrets Management** - Never commit secrets to code
5. **Private Repos** - Consider private repository for production code

---

## Branch Strategy

### Recommended Setup

- **main/master** - Production (auto-deploys to production)
- **develop** - Development branch (optional)
- **feature branches** - For new features (don't deploy)

To deploy only from main:
- The workflow is already configured for `main` and `master` branches
- Feature branches won't trigger deployment

---

## Environment-Specific Deployment

### Multiple Environments

You can create separate workflows or use different secrets:

**Production:**
- Secrets: `S3_BUCKET_NAME` = `turtle-world-prod`
- Secrets: `CLOUDFRONT_DISTRIBUTION_ID` = `prod-dist-id`

**Staging:**
- Create new workflow: `.github/workflows/deploy-staging.yml`
- Different secrets: `S3_BUCKET_NAME_STAGING`, etc.
- Deploy from `develop` branch

---

## Cost Considerations

**GitHub Actions:**
- **Public repositories:** Free (unlimited minutes)
- **Private repositories:** 2,000 minutes/month free, then $0.008/minute

**AWS:**
- Same costs as manual deployment
- See AWS_DEPLOYMENT_SETUP.md for AWS cost details

---

## Advantages of GitHub Deployment

✅ **Automatic** - Deploy on every push
✅ **Version Control** - Deploy specific commits
✅ **Rollback** - Easy to revert to previous version
✅ **Collaboration** - Multiple developers can deploy
✅ **History** - Deployment history in GitHub
✅ **No Local Setup** - Deploy from anywhere
✅ **Free** - For public repositories

---

## Quick Reference

**Setup:**
1. Push code to GitHub
2. Add AWS secrets to GitHub repository
3. Push triggers automatic deployment

**Deploy:**
```powershell
git add .
git commit -m "Update content"
git push  # Automatically deploys!
```

**Check Status:**
- GitHub → Actions tab → View workflow runs

**Update Secrets:**
- GitHub → Settings → Secrets and variables → Actions

---

## Next Steps

1. ✅ Set up GitHub repository
2. ✅ Configure GitHub Secrets
3. ✅ Push code and test deployment
4. ✅ Verify site is live
5. ✅ Make changes and watch auto-deploy!

---

## Need Help?

- GitHub Actions Docs: https://docs.github.com/en/actions
- AWS Documentation: https://docs.aws.amazon.com/
- Workflow file: `.github/workflows/deploy-aws.yml`
- See also: `AWS_DEPLOYMENT_SETUP.md` for AWS setup details
