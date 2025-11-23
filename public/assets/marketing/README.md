# Marketing Assets

This folder contains marketing and social media assets for Errloom.

## Required Assets

Replace these placeholder references with your actual assets after deployment:

### 1. Screenshots
- **screenshot-hero.png** (1920x1080 or similar)
  - Hero section showing the landing page
  - Use after deploying to capture the live site

- **screenshot-scenario.png** (1920x1080 or similar)
  - Scenario player in action
  - Show code editor, logs, and interactive tasks

### 2. Demo Animation
- **demo.gif** (Max 10MB, 800x600 recommended)
  - 15-30 second screen recording
  - Show: Landing → Select scenario → Complete a task → Success
  - Tools: LICEcap, ScreenToGif, or Giphy Capture

### 3. Social Media
- **og-image.png** (1200x630 pixels - REQUIRED for social sharing)
  - OpenGraph image for Twitter/LinkedIn/Facebook
  - Should include: Logo, tagline, key features
  - Tools: Canva, Figma, or https://www.opengraph.xyz/

### 4. Favicons
- **favicon.ico** (32x32 or 64x64)
  - Browser tab icon
  - Use your logo/flame icon

- **apple-touch-icon.png** (180x180)
  - iOS home screen icon

## Quick Tips

### Creating Screenshots
```bash
# After deploying to errloom.dev:
1. Open https://errloom.dev in browser
2. Use full-screen mode (F11)
3. Take screenshot (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)
4. Save as screenshot-hero.png
5. Repeat for scenario player page
```

### Creating Demo GIF
```bash
# Recommended tools:
- Mac: Giphy Capture, LICEcap
- Windows: ScreenToGif
- Online: Loom (record + export as GIF)

# Keep it short and focused:
1. Show landing page (2 sec)
2. Click "Start Beginner" (1 sec)
3. Select a scenario (1 sec)
4. Show scenario interface (3 sec)
5. Complete one task (5 sec)
6. Show success message (2 sec)
Total: ~15 seconds
```

### Creating OG Image
```bash
# Use Canva (free):
1. Go to canva.com
2. Create "Social Media" → "Facebook Post" (1200x630)
3. Add:
   - Background: Dark gradient (similar to site)
   - Logo/Icon: Flame 🔥
   - Title: "Errloom - Debug Production Outages"
   - Subtitle: "15+ Interactive Scenarios | Real Incidents | Free"
   - Screenshot snippet (optional)
4. Download as PNG
```

## After Adding Assets

1. Commit the assets:
```bash
git add public/assets/marketing/
git commit -m "Add marketing assets (screenshots, OG image, favicon)"
git push
```

2. Test social sharing:
   - Twitter: https://cards-dev.twitter.com/validator
   - Facebook: https://developers.facebook.com/tools/debug/
   - LinkedIn: https://www.linkedin.com/post-inspector/

## File Sizes

Keep assets optimized:
- Screenshots: < 500KB (use TinyPNG.com)
- GIF: < 5MB (optimize with ezgif.com)
- OG Image: < 300KB
- Favicon: < 100KB
