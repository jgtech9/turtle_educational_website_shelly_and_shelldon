# Multi-Branch Deployment Guide - Your Branch Setup

This guide is customized for your repository with branches: **master** (default), **development**, and **staging**.

---

## Your Branch Configuration

### Branch → Environment Mapping

- **`master`** → Production Environment (default branch)
- **`development`** → Development Environment
- **`staging`** → Staging Environment

---

## Setup Options

### Option 1: All Branches Deploy to Same Production (Simplest)

**Best for:** All branches deploy to the same production site.

**GitHub Secrets Required:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME` - Your production S3 bucket
- `AWS_REGION` (optional, defaults to us-east-1)
- `CLOUDFRONT_DISTRIBUTION_ID` (optional, if using CloudFront)

**How It Works:**
- Push to `master` → Deploys to production
- Push to `development` → Deploys to production (uses same bucket)
- Push to `staging` → Deploys to production (uses same bucket)

---

### Option 2: Multi-Environment Setup (Recommended)

**Best for:** Separate environments for testing and production.

**GitHub Secrets Required:**

**Required for all:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (optional)

**Production (master branch):**
- `S3_BUCKET_NAME` or `S3_BUCKET_NAME_PROD` - Production bucket
- `CLOUDFRONT_DISTRIBUTION_ID` or `CLOUDFRONT_DISTRIBUTION_ID_PROD` (optional)

**Staging (staging branch):**
- `S3_BUCKET_NAME_STAGING` - Staging bucket
- `CLOUDFRONT_DISTRIBUTION_ID_STAGING` (optional)

**Development (development branch):**
- `S3_BUCKET_NAME_DEV` - Development bucket (or uses production if not set)
- `CLOUDFRONT_DISTRIBUTION_ID_DEV` (optional)

**How It Works:**
- Push to `master` → Deploys to production
- Push to `staging` → Deploys to staging (separate bucket)
- Push to `development` → Deploys to development (separate bucket, or production if not configured)

---

## Recommended Setup

Based on your branch names, here's the recommended configuration:

### Branch Purpose

- **`master`** - Production branch (your live website)
- **`staging`** - Staging environment (test changes before production)
- **`development`** - Development environment (active development/testing)

### Recommended Configuration: Multi-Environment

This gives you three separate environments for maximum flexibility:

**Production (master):**
- Live website
- Only deploy stable, tested code
- Uses: `S3_BUCKET_NAME` or `S3_BUCKET_NAME_PROD`

**Staging (staging):**
- Pre-production testing
- Test changes before going live
- Uses: `S3_BUCKET_NAME_STAGING`

**Development (development):**
- Active development
- Test new features
- Uses: `S3_BUCKET_NAME_DEV` (or production if not configured)

**GitHub Secrets:**
```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
S3_BUCKET_NAME (production - for master)
S3_BUCKET_NAME_STAGING (staging - for staging branch)
S3_BUCKET_NAME_DEV (development - for development branch, optional)
CLOUDFRONT_DISTRIBUTION_ID (production - optional)
CLOUDFRONT_DISTRIBUTION_ID_STAGING (staging - optional)
CLOUDFRONT_DISTRIBUTION_ID_DEV (development - optional)
AWS_REGION (optional)
```

---

## Step-by-Step Setup

### Step 1: Set Up AWS Resources

#### For Production (master branch):

1. Create S3 bucket (e.g., `turtle-world-prod`)
2. Configure static website hosting
3. Set up bucket policy
4. (Optional) Create CloudFront distribution

#### For Staging (staging branch):

1. Create S3 bucket (e.g., `turtle-world-staging`)
2. Configure static website hosting
3. Set up bucket policy
4. (Optional) Create CloudFront distribution

#### For Development (development branch):

1. Create S3 bucket (e.g., `turtle-world-dev`) - Optional
   - Or skip and development will use production bucket
2. Configure static website hosting
3. Set up bucket policy
4. (Optional) Create CloudFront distribution

See `AWS_DEPLOYMENT_SETUP.md` for detailed instructions.

### Step 2: Configure GitHub Secrets

Go to: GitHub → Your Repository → Settings → Secrets and variables → Actions

#### For Option 1 (Single Environment):

Add these secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME` (your production bucket)
- `AWS_REGION` (optional)
- `CLOUDFRONT_DISTRIBUTION_ID` (optional)

#### For Option 2 (Multi-Environment):

Add these secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (optional)
- `S3_BUCKET_NAME` (production - for master)
- `S3_BUCKET_NAME_STAGING` (staging - for staging branch)
- `S3_BUCKET_NAME_DEV` (development - for development branch, optional)
- `CLOUDFRONT_DISTRIBUTION_ID` (production - optional)
- `CLOUDFRONT_DISTRIBUTION_ID_STAGING` (staging - optional)
- `CLOUDFRONT_DISTRIBUTION_ID_DEV` (development - optional)

### Step 3: Push Code to GitHub

```powershell
git add .
git commit -m "Add GitHub Actions deployment"
git push origin master
```

The workflow will automatically trigger!

---

## How It Works

### Automatic Deployment

When you push to:
- **`master`** → Automatically deploys to production
- **`staging`** → Automatically deploys to staging
- **`development`** → Automatically deploys to development (or production if `S3_BUCKET_NAME_DEV` not set)

### Manual Deployment

You can also trigger deployment manually:
1. Go to GitHub → Actions tab
2. Click "Deploy to AWS" workflow
3. Click "Run workflow"
4. Select branch: `master`, `development`, or `staging`
5. Click "Run workflow"

---

## Testing Your Setup

### Test Production Deployment:
```powershell
git checkout master
# Make a small change
git add .
git commit -m "Test production deployment"
git push origin master
# Check GitHub Actions tab - should deploy automatically to production
```

### Test Staging Deployment:
```powershell
git checkout staging
# Make a small change
git add .
git commit -m "Test staging deployment"
git push origin staging
# Check GitHub Actions tab - should deploy automatically to staging
```

### Test Development Deployment:
```powershell
git checkout development
# Make a small change
git add .
git commit -m "Test development deployment"
git push origin development
# Check GitHub Actions tab - should deploy automatically to development
```

---

## Workflow Behavior Summary

| Branch | Environment | S3 Bucket Secret | CloudFront Secret |
|--------|-------------|------------------|-------------------|
| `master` | Production | `S3_BUCKET_NAME_PROD` or `S3_BUCKET_NAME` | `CLOUDFRONT_DISTRIBUTION_ID_PROD` or `CLOUDFRONT_DISTRIBUTION_ID` |
| `staging` | Staging | `S3_BUCKET_NAME_STAGING` | `CLOUDFRONT_DISTRIBUTION_ID_STAGING` |
| `development` | Development | `S3_BUCKET_NAME_DEV` or `S3_BUCKET_NAME` | `CLOUDFRONT_DISTRIBUTION_ID_DEV` |

---

## Quick Start Checklist

- [ ] Create AWS S3 bucket(s) - see `AWS_DEPLOYMENT_SETUP.md`
  - [ ] Production bucket (for master)
  - [ ] Staging bucket (for staging)
  - [ ] Development bucket (optional, for development)
- [ ] Configure S3 static website hosting for each bucket
- [ ] Set up bucket policies
- [ ] (Optional) Create CloudFront distribution(s)
- [ ] Get AWS credentials (Access Key ID & Secret)
- [ ] Add GitHub Secrets (see Step 2 above)
- [ ] Push code to GitHub
- [ ] Check GitHub Actions tab for deployment status
- [ ] Verify site is live

---

## Typical Workflow

1. **Develop** on `development` branch → Deploys to development environment
2. **Test** on `staging` branch → Deploys to staging environment
3. **Release** on `master` branch → Deploys to production environment

This gives you a complete CI/CD pipeline!

---

## Troubleshooting

### Workflow Not Triggering

- Check that you pushed to `master`, `development`, or `staging` branch
- Verify workflow file exists at `.github/workflows/deploy-aws.yml`
- Check GitHub Actions tab for any errors

### Wrong Environment Deployed

- Verify GitHub Secrets are set correctly
- Check branch name matches exactly (`master`, `development`, or `staging`)
- Review workflow logs in GitHub Actions

### Development Branch Deploys to Production

- This is expected if `S3_BUCKET_NAME_DEV` secret is not set
- Development will fall back to production bucket
- To use separate development environment, set `S3_BUCKET_NAME_DEV` secret

---

*Workflow configured for: master → production, development → development, staging → staging*
