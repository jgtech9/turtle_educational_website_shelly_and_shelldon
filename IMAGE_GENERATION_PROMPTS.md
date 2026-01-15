# Quick Reference: Image Generation Prompts

Quick reference list of all image prompts organized by file location. Use this when generating images with AI image generators.

---

## Quick Reference by File

### `src/App.jsx` (Header)
**1. Header Icon** (Line ~162)
```
Friendly, colorful cartoon turtle icon, circular shape, 50x50 pixels minimum (create at higher resolution), bright green shell with brown patterns, cute smiling face, simple and clean design suitable for a website logo/icon, educational website style, child-friendly
```
**Size:** 200x200px (scaled down to 50x50)

---

### `src/pages/Home.jsx`
**2. Hero Image** (SUGGESTED - Add after heading)
```
Vibrant, educational illustration showing diverse turtle species in their natural habitats: sea turtle swimming in ocean, freshwater turtle in a pond, land tortoise on grassland. Colorful, child-friendly art style, bright and engaging, 1200x600 pixels, horizontal composition, educational poster style
```

---

### `src/pages/Habitat.jsx`
**3. Main Habitat Image** (ADD - Line ~15, after heading)
```
Three-part educational illustration showing turtle habitats: (left) sea turtle in warm ocean waters with coral reef, (center) freshwater turtle in clear pond with lily pads, (right) desert tortoise on sandy terrain with cacti. Bright colors, educational diagram style, 600x400 pixels
```

---

### `src/pages/Diet.jsx`
**4. Diet Image** (Line ~28)
```
Educational illustration showing different turtle diets: turtle eating leafy greens (herbivore), turtle eating small fish (carnivore), turtle eating mixed plants and insects (omnivore). Colorful, clear labels or visual distinction between diet types, 600x400 pixels, bright and engaging
```

---

### `src/pages/Reproduction.jsx`
**5. Reproduction Image** (Line ~28)
```
Gentle, educational illustration of a sea turtle laying eggs on a sandy beach at night, with turtle tracks visible, showing eggs in nest. Soft moonlit colors, educational and respectful of nature, child-appropriate, 600x400 pixels, horizontal composition
```

---

### `src/pages/Predators.jsx`
**6. Predators Image** (Line ~28)
```
Educational, age-appropriate illustration showing turtle in natural ecosystem with potential predators (birds, fish) at a distance, emphasizing ecosystem balance rather than graphic content. Natural, educational style, showing that turtles are part of food web, 600x400 pixels, soft colors
```

---

### `src/pages/Lifespan.jsx`
**7. Lifespan Image** (Line ~28)
```
Illustration showing turtle at different life stages: baby turtle (small), juvenile (medium), adult (large), with visual timeline showing growth. Could show same species at different ages, warm colors, educational infographic style, 600x400 pixels
```

---

### `src/pages/Protections.jsx`
**8. Protections Image** (Line ~28)
```
Positive, hopeful illustration showing turtles in protected marine sanctuary or nature reserve, with conservation symbols (ranger station, protected area signs, healthy habitat), bright and optimistic colors, showing successful conservation, 600x400 pixels
```

---

### `src/pages/Behavior.jsx`
**9. Behavior Image** (Line ~15)
```
Dynamic illustration showing turtle behaviors: sea turtle swimming in migration pattern, turtle basking on log in sun, turtle hibernating in burrow. Could be split-panel or sequential illustration, showing different behaviors, educational style, 600x400 pixels
```

---

### `src/pages/Anatomy.jsx`
**10. Anatomy Image** (Line ~15)
```
Educational diagram of turtle anatomy, labeled or stylized showing: shell (carapace and plastron), head with beak, legs adapted for swimming/walking, internal structure visible or implied. Scientific but child-friendly, bright colors, clear labels, 600x400 pixels
```

---

### `src/pages/Species.jsx`
**11. Species Image** (Line ~15)
```
Educational poster-style illustration showing diverse turtle species side-by-side: green sea turtle (large, smooth shell), red-eared slider (freshwater, distinctive red markings), Galapagos tortoise (massive, domed shell), box turtle (land, colorful patterns). Size comparison visible, colorful, educational, 600x400 pixels
```

---

### `src/pages/PhysicalDifferences.jsx`
**12. Physical Differences Image** (Line ~15)
```
Comparison illustration showing turtles with different physical features: size variation (tiny box turtle vs large sea turtle), shell shapes (flat vs domed), color patterns (camouflage variations). Side-by-side comparison style, educational diagram, colorful, 600x400 pixels
```

---

### `src/pages/EcosystemImportance.jsx`
**13. Ecosystem Importance Image** (Line ~15)
```
Educational ecosystem illustration showing turtle in balanced aquatic environment: turtle swimming among healthy coral/vegetation, fish around it, clear water, emphasizing turtles' role in maintaining ecosystem health. Bright, healthy ecosystem colors, educational, 600x400 pixels
```

---

### `src/pages/ShelleyShelldon.jsx`
**14. Shelley & Shelldon Image** (Line ~16)
```
Two pink-bellied side-neck turtles (Emydura subglobosa) in their aquarium habitat, showing their distinctive pink plastrons (underside of shells), friendly appearance, in clear water with basking area visible. Could be photograph or realistic illustration, warm and inviting, 600x400 pixels
```

---

### `src/pages/Media.jsx`
**15. Media Image 1** (Line ~11)
```
Stunning underwater photograph or illustration of sea turtle swimming gracefully in clear blue ocean, sunlight filtering through water, peaceful and majestic, 300x200 pixels
```

**16. Media Image 2** (Line ~15)
```
Close-up of colorful painted turtle or red-eared slider on a log in pond, showing detailed shell patterns and markings, vibrant colors, natural setting, 300x200 pixels
```

**17. Media Image 3** (Line ~19)
```
Aerial or landscape view showing sea turtle nesting beach with turtle tracks in sand, conservation area, beautiful natural setting, educational, 300x200 pixels
```

---

### `src/pages/Crafts.jsx`
**18. Craft 1 - Paper Plate Turtle** (Line ~11)
```
Finished craft project: colorful paper plate turtle made by child, decorated with paint and construction paper, cute and creative, craft project example, bright colors, cheerful, 300x200 pixels
```

**19. Craft 2 - Handprint Turtle** (Line ~17)
```
Finished craft project: handprint turtle artwork made with painted handprint on paper, creative and fun, showing the craft result, child-friendly art, 300x200 pixels
```

**20. Craft 3 - Origami Turtle** (Line ~23)
```
Finished origami turtle made from colorful folded paper, multiple angles or close-up showing folds, neat and creative, Japanese origami style, 300x200 pixels
```

---

## Image Specifications Quick Reference

### Standard Main Images
- **Generate at:** 1200x800 pixels (or higher for quality)
- **Use at:** 600x400 pixels
- **Format:** JPG (photos) or PNG (illustrations with transparency)
- **Style:** Educational, colorful, child-friendly

### Gallery Images (Media/Crafts)
- **Generate at:** 600x400 pixels
- **Use at:** 300x200 pixels
- **Format:** JPG
- **Style:** Match content theme

### Icons/Logos
- **Generate at:** 200x200 pixels (or higher)
- **Use at:** 50x50 pixels
- **Format:** PNG (with transparency)
- **Style:** Simple, recognizable

---

## Batch Generation Tips

1. **Group by style:** Generate all illustrations together, all photos together
2. **Consistent color palette:** Use similar colors across related pages
3. **Maintain aspect ratios:** All main images use 3:2 ratio
4. **Test sizes:** Generate at higher resolution, scale down for web

---

## File Naming Suggestions

Use descriptive, consistent naming:
- `header-turtle-icon.png`
- `habitat-main-illustration.jpg`
- `diet-turtle-eating.jpg`
- `reproduction-nesting.jpg`
- `species-comparison.jpg`
- `shelley-shelldon-pink-belly.jpg`
- `media-sea-turtle-1.jpg`
- `craft-paper-plate-turtle.jpg`

---

*See IMAGE_AND_CONTENT_REQUIREMENTS.md for detailed descriptions and educational suggestions.*
