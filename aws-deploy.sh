#!/bin/bash

# AWS Deployment Script for Turtle World
# This script builds the project and deploys it to AWS S3 + CloudFront

set -e  # Exit on error

# Configuration - Update these values
BUCKET_NAME="your-turtle-world-bucket"
CLOUDFRONT_DISTRIBUTION_ID="your-cloudfront-distribution-id"
AWS_REGION="us-east-1"
PROFILE="default"  # Change to your AWS profile if needed

echo "🐢 Starting Turtle World deployment to AWS..."

# Build the project
echo "📦 Building project..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Sync files to S3
echo "📤 Uploading files to S3 bucket: $BUCKET_NAME"
aws s3 sync dist/ s3://$BUCKET_NAME/ \
    --region $AWS_REGION \
    --profile $PROFILE \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "index.html" \
    --exclude "*.html"

# Upload HTML files with different cache control
echo "📄 Uploading HTML files..."
aws s3 sync dist/ s3://$BUCKET_NAME/ \
    --region $AWS_REGION \
    --profile $PROFILE \
    --delete \
    --cache-control "public, max-age=0, must-revalidate" \
    --include "*.html"

# Invalidate CloudFront cache
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ] && [ "$CLOUDFRONT_DISTRIBUTION_ID" != "your-cloudfront-distribution-id" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
        --paths "/*" \
        --region $AWS_REGION \
        --profile $PROFILE
    echo "✅ CloudFront cache invalidation initiated"
fi

echo "🎉 Deployment completed successfully!"
echo "🌐 Your site should be available at: https://$BUCKET_NAME"
