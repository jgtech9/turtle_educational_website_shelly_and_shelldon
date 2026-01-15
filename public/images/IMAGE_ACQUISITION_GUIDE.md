# Image Acquisition Guide

This guide helps you obtain all required images for the Turtle World website.

## Quick Start

All images should be placed in the `public/images/` directory structure. The code is already configured to use these paths and will automatically fall back to placeholder SVGs if images are missing.

## Required Images Checklist

### ✅ Header
- [ ] `header/turtle-icon.svg` - **COMPLETE** (SVG placeholder created, can be replaced with PNG/JPG)

### ⚠️ Page Images (13 required)
- [ ] `pages/habitat-main.jpg` - Turtle habitats illustration
- [ ] `pages/diet-main.jpg` - Turtle diets illustration
- [ ] `pages/reproduction-main.jpg` - Turtle nesting illustration
- [ ] `pages/predators-main.jpg` - Ecosystem balance illustration
- [ ] `pages/lifespan-main.jpg` - Turtle life stages
- [ ] `pages/protections-main.jpg` - Conservation illustration
- [ ] `pages/behavior-main.jpg` - Turtle behaviors
- [ ] `pages/anatomy-main.jpg` - Turtle anatomy diagram
- [ ] `pages/species-main.jpg` - Diverse turtle species
- [ ] `pages/physical-differences-main.jpg` - Size/shape comparison
- [ ] `pages/ecosystem-importance-main.jpg` - Ecosystem illustration
- [ ] `pages/shelley-shelldon-main.jpg` - Pink-bellied side-neck turtles (use real photos if available!)

### ⚠️ Media Gallery (3 required)
- [ ] `media/sea-turtle-1.jpg` - Underwater sea turtle
- [ ] `media/painted-turtle-1.jpg` - Colorful painted turtle
- [ ] `media/nesting-beach-1.jpg` - Turtle nesting beach

### ⚠️ Craft Images (3 required)
- [ ] `crafts/paper-plate-turtle.jpg` - Finished paper plate craft
- [ ] `crafts/handprint-turtle.jpg` - Finished handprint art
- [ ] `crafts/origami-turtle.jpg` - Finished origami turtle

## Image Sources

### Option 1: AI Image Generation (Recommended for Illustrations)

Use AI image generators with the prompts from `IMAGE_GENERATION_PROMPTS.md`:

**Services:**
- DALL-E 3 (OpenAI) - Best for educational illustrations
- Midjourney - Excellent artistic quality
- Stable Diffusion - Free/open source option
- Adobe Firefly - Good for commercial use

**Tips:**
- Generate at 1200x800px for main images (will be displayed at 600x400px)
- Generate at 600x400px for gallery images (will be displayed at 300x200px)
- Use consistent style across related images
- Save as JPG for photos, PNG for illustrations with transparency

### Option 2: Stock Photo Sites (Free)

**Unsplash** (unsplash.com)
- Search: "sea turtle", "tortoise", "turtle habitat"
- All photos are free, high quality
- Attribution required

**Pexels** (pexels.com)
- Search: "turtle", "sea turtle", "reptile"
- Free, high quality
- No attribution required

**Pixabay** (pixabay.com)
- Large collection of turtle photos
- Free, no attribution required
- Includes illustrations and vectors

### Option 3: Stock Photo Sites (Paid)

**Shutterstock** (shutterstock.com)
- Professional quality
- Requires subscription
- Best for commercial projects

**Adobe Stock** (stock.adobe.com)
- High quality, curated
- Requires subscription
- Integrates with Creative Cloud

### Option 4: Your Own Photos

If you have photos of:
- Shelly and Shelldon → Use for `pages/shelley-shelldon-main.jpg`
- Craft projects → Use for craft images
- Turtles in nature → Use for media gallery

## Video References

### Media Page Videos

**Current videos (already updated):**
- Sea Turtle Life Cycle: YouTube ID `9Rq-h8s1yR0`
- Turtle Habitats: YouTube ID `oqRioplPx_g`

**To find better videos:**
1. Search YouTube for "turtle educational video for kids"
2. Look for channels like:
   - National Geographic Kids
   - BBC Earth Kids
   - SeaWorld Educational Videos
   - SciShow Kids
3. Copy the video ID from the URL
4. Update in `src/pages/Media.jsx`

### Shelley & Shelldon Page

Search YouTube for "pink-bellied side-neck turtle" or "Emydura subglobosa" and update the link in `src/pages/ShelleyShelldon.jsx`.

## File Naming

All files should use:
- Lowercase letters
- Hyphens for spaces (kebab-case)
- Descriptive names
- Proper extensions (.jpg, .png, .svg)

Examples:
- ✅ `habitat-main.jpg`
- ✅ `sea-turtle-1.jpg`
- ✅ `paper-plate-turtle.jpg`
- ❌ `Habitat Main.JPG`
- ❌ `sea_turtle_1.jpg`

## Image Specifications

### Main Page Images
- **Generate at:** 1200x800px (for quality)
- **Display at:** 600x400px
- **Format:** JPG (photos) or PNG (illustrations)
- **File size:** Aim for < 200KB per image

### Gallery Images (Media/Crafts)
- **Generate at:** 600x400px
- **Display at:** 300x200px
- **Format:** JPG
- **File size:** Aim for < 100KB per image

### Icons
- **Generate at:** 200x200px (or higher)
- **Display at:** 50x50px
- **Format:** SVG (preferred) or PNG with transparency
- **File size:** SVG should be < 10KB

## Workflow

1. **Generate/Download Images**
   - Use prompts from `IMAGE_GENERATION_PROMPTS.md`
   - Or download from stock photo sites
   - Follow naming conventions

2. **Optimize Images**
   - Resize to specifications above
   - Compress for web (use TinyPNG, ImageOptim, or similar)
   - Ensure file sizes are reasonable

3. **Place in Correct Directory**
   - Main images → `public/images/pages/`
   - Gallery images → `public/images/media/` or `public/images/crafts/`
   - Icons → `public/images/header/`

4. **Test Locally**
   - Run `npm run dev`
   - Check all pages load images correctly
   - Verify placeholder fallbacks work

5. **Commit and Push**
   - Images are now ready for deployment

## Priority Order

### High Priority (Launch Blockers)
1. Header icon (already has SVG placeholder)
2. All 12 main page images
3. Shelley & Shelldon photo (if available)
4. Media gallery images (3)

### Medium Priority (Enhance UX)
5. Craft images (3)
6. Better video references

### Low Priority (Nice to Have)
7. Additional species gallery images
8. Habitat section-specific images

## Troubleshooting

**Images not showing?**
- Check file path matches exactly (case-sensitive)
- Verify file is in `public/images/` directory
- Check browser console for 404 errors
- Ensure file extension matches (`.jpg` vs `.jpeg`)

**Placeholder showing instead?**
- This means the image file is missing
- Add the image to the correct directory
- Clear browser cache and reload

**Images too large/slow loading?**
- Optimize images using TinyPNG or similar
- Consider using WebP format for better compression
- Ensure images are properly sized before upload

## Resources

- **Prompts:** See `IMAGE_GENERATION_PROMPTS.md`
- **Requirements:** See `IMAGE_AND_CONTENT_REQUIREMENTS.md`
- **Specifications:** See directory structure in `public/images/README.md`

---

*Last updated: After setting up image structure and placeholders*
