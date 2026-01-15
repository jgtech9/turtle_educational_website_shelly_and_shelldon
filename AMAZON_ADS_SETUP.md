# Amazon Native Shopping Ads Setup Guide

The ad spaces in the sidebar are now prepared for Amazon Native Shopping Ads. The existing styling is preserved and will work seamlessly with Amazon ads.

## Current Setup

- Two ad spaces in the sidebar (using `AmazonAd` component)
- Existing `ad-space` CSS class styling preserved
- Ready for Amazon Native Shopping Ads integration

## How Amazon Native Shopping Ads Work

Amazon Native Shopping Ads use **both manual specification and automatic content matching**:

1. **You Can Specify Keywords/Categories** - Set default search phrases and product categories
2. **Amazon Also Analyzes Your Content** - Amazon's algorithm automatically reads your page content and tries to match relevant products
3. **Best Approach** - Use general keywords (like "turtle", "pet supplies") and let Amazon's algorithm refine based on your actual page content

### How Content Matching Works

- Amazon reads the text on your page to understand the topic
- It matches products relevant to your content automatically
- You can guide it with keywords, but it will still analyze the page
- The algorithm improves over time based on user interactions

## How to Add Amazon Ads

### Step 1: Sign Up for Amazon Associates

1. Visit: https://affiliate-program.amazon.com/
2. Sign up for an Amazon Associates account
3. Get approved (may take a few days)
4. Once approved, note your **Associate Tag** (e.g., `yoursite-20`)

### Step 2: Generate Ad Code

1. Log into Amazon Associates Central
2. Go to **Tools** → **Native Shopping Ads**
3. Create a new ad unit:
   - Choose ad size (recommended: 300x250 or 160x600 for sidebar)
   - Set default search phrase: **"turtle"** or **"pet turtle supplies"**
   - Set category: **"Pet Supplies"** or **"All"** (Amazon will refine based on content)
   - Copy the generated ad code

### Step 3: Update the Component

Edit `src/components/AmazonAd.jsx` and replace the placeholder content with your Amazon ad code.

**Example Integration:**

```jsx
export default function AmazonAd({ adSlotId = 1 }) {
  return (
    <div className="ad-space">
      {/* Your Amazon Native Shopping Ad code goes here */}
      <div id={`amzn-assoc-ad-${adSlotId}`}></div>
      <script type="text/javascript">
        amzn_assoc_placement = "YOUR-PLACEMENT-ID";
        amzn_assoc_tracking_id = "YOUR-ASSOCIATE-TAG";
        amzn_assoc_ad_mode = "search";
        amzn_assoc_ad_type = "smart";  // "smart" enables automatic content matching
        amzn_assoc_marketplace = "amazon";
        amzn_assoc_region = "US";
        amzn_assoc_default_search_phrase = "turtle";  // Guide keyword (Amazon also reads page content)
        amzn_assoc_default_category = "All";  // Or "Pet Supplies" - Amazon refines based on content
        amzn_assoc_linkid = "YOUR-LINK-ID";
        amzn_assoc_rows = "1";
      </script>
      <script src="https://z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>
    </div>
  )
}
```

### Recommended Settings for Turtle World

Since your site is about turtles, here are recommended settings:

- **Default Search Phrase**: `"turtle"`, `"pet turtle"`, or `"turtle supplies"`
- **Category**: `"All"` or `"Pet Supplies"` (Amazon will automatically refine based on your content)
- **Ad Type**: `"smart"` (enables automatic content matching)

Amazon will analyze your page content and show relevant products like:
- Turtle food and supplies
- Aquarium/tank accessories
- Turtle habitat products
- Books about turtles
- Educational materials

### Step 4: Add Script to HTML (If Needed)

If Amazon requires the script in the `<head>` tag, add it to `index.html`:

```html
<script src="https://z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>
```

## Ad Size Recommendations

For the sidebar (200px width):
- **160x600** - Wide skyscraper (fits perfectly)
- **300x250** - Medium rectangle (will scale down)
- **120x240** - Smaller vertical ad

## Styling Notes

- The existing `ad-space` class styling is preserved
- Amazon ads will inherit the container styling
- The sidebar maintains its current appearance
- No CSS changes needed - Amazon ads will work with existing styles

## Testing

1. Build the project: `npm run build`
2. Preview: `npm run preview`
3. Verify ads display correctly
4. Test on different screen sizes

## Important Notes

- **Compliance**: Make sure to comply with Amazon Associates Operating Agreement
- **Disclosure**: Consider adding an affiliate disclosure (required by Amazon)
- **Privacy**: Amazon ads may use cookies - ensure your privacy policy is updated
- **Terms**: Review Amazon's terms for ad placement requirements

## Specifying Ad Content

### Option 1: Let Amazon Learn (Recommended)
- Set `amzn_assoc_ad_type = "smart"`
- Use general keywords like `"turtle"` or `"pet turtle"`
- Set category to `"All"`
- Amazon will analyze your page content and show relevant products automatically

### Option 2: Specify Keywords/Categories
- Set `amzn_assoc_default_search_phrase = "turtle food"` for more specific products
- Set `amzn_assoc_default_category = "Pet Supplies"` to narrow the category
- Amazon will still use content matching, but start with your specified terms

### Option 3: Use Different Keywords Per Page
- You could customize keywords based on page content (habitat page → "turtle habitat", diet page → "turtle food")
- This requires dynamic ad configuration (more complex)

**For Turtle World**: We recommend Option 1 - use `"turtle"` as the default search phrase and let Amazon's smart matching analyze your content to show the most relevant products.

## Troubleshooting

- **Ads not showing**: Check browser console for errors
- **Script not loading**: Verify script URL is correct
- **Wrong products**: 
  - Adjust `amzn_assoc_default_search_phrase` in ad code
  - Remember: Amazon analyzes page content, so products should generally be relevant
  - Give it time - the algorithm improves with usage
- **Styling issues**: Amazon ads should work with existing CSS, but you may need minor adjustments

## Resources

- [Amazon Associates Central](https://affiliate-program.amazon.com/)
- [Native Shopping Ads Help](https://affiliate-program.amazon.com/help/node/topic/GP38Y5BZLSPY7V5J)
- [Operating Agreement](https://affiliate-program.amazon.com/help/operating/agreement)
