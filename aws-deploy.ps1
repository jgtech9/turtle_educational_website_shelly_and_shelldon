# AWS Deployment Script for Turtle World (PowerShell)
# This script builds the project and deploys it to AWS S3 + CloudFront

$ErrorActionPreference = "Stop"

# Configuration - Update these values
$BUCKET_NAME = "your-turtle-world-bucket"
$CLOUDFRONT_DISTRIBUTION_ID = "your-cloudfront-distribution-id"
$AWS_REGION = "us-east-1"
$PROFILE = "default"  # Change to your AWS profile if needed

Write-Host "🐢 Starting Turtle World deployment to AWS..." -ForegroundColor Cyan

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if (-not (Test-Path "dist")) {
    Write-Host "❌ Build failed - dist directory not found" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully" -ForegroundColor Green

# Sync files to S3 (static assets with long cache)
Write-Host "📤 Uploading static assets to S3 bucket: $BUCKET_NAME" -ForegroundColor Yellow
aws s3 sync dist/ s3://$BUCKET_NAME/ `
    --region $AWS_REGION `
    --profile $PROFILE `
    --delete `
    --cache-control "public, max-age=31536000, immutable" `
    --exclude "*.html"

# Upload HTML files with no cache
Write-Host "📄 Uploading HTML files..." -ForegroundColor Yellow
Get-ChildItem -Path dist -Filter "*.html" -Recurse | ForEach-Object {
    aws s3 cp $_.FullName s3://$BUCKET_NAME/$($_.Name) `
        --region $AWS_REGION `
        --profile $PROFILE `
        --cache-control "public, max-age=0, must-revalidate" `
        --content-type "text/html"
}

# Invalidate CloudFront cache
if ($CLOUDFRONT_DISTRIBUTION_ID -and $CLOUDFRONT_DISTRIBUTION_ID -ne "your-cloudfront-distribution-id") {
    Write-Host "🔄 Invalidating CloudFront cache..." -ForegroundColor Yellow
    aws cloudfront create-invalidation `
        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID `
        --paths "/*" `
        --region $AWS_REGION `
        --profile $PROFILE
    Write-Host "✅ CloudFront cache invalidation initiated" -ForegroundColor Green
}

Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host "🌐 Your site should be available shortly via CloudFront or at: https://$BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com" -ForegroundColor Cyan
