# Luke Wolsko Portfolio Website

A noir-themed filmmaker portfolio website built with React + Vite.

## Overview

An immersive cinematic portfolio featuring:
- **Main Theater** - Landing page with vintage theater aesthetic and navigation hotspots
- **Biography** - Art deco office with clickable desk revealing bio/resume modal
- **Posters** - Multi-page gallery showcasing poster designs (3 pages)
- **Contact** - Night cityscape with animated city lights and social link signs

## Tech Stack

- React 18
- Vite
- Framer Motion (animations)
- React Router (navigation)
- Tailwind CSS

## Project Structure

```
src/
├── components/
│   ├── CinemaEnvironment.jsx   # Main theater wrapper with nav hotspots
│   ├── BiographyPage.jsx       # Art deco office with bio/resume modal
│   ├── PostersPage.jsx         # Multi-page poster gallery
│   ├── ContactSocials.jsx      # Night city with social links
│   ├── CommercialPage.jsx      # (Hidden for now)
│   └── VideoPlayer.jsx         # YouTube/video embed component
├── App.jsx
└── main.jsx

public/assets/
├── theatermainbackground.jpg   # Main theater background
├── biographybackground.jpg     # Art deco office
├── contactpagebackground.jpg   # Night cityscape
├── postersbackground.jpg       # Poster gallery page 1
├── postersbackground2.jpg      # Poster gallery page 2
├── postersbackground3.jpg      # Poster gallery page 3
├── headshot.jpg                # Bio headshot
├── poster-*.jpg                # Individual poster images for previews
└── resume.pdf                  # (To be added)
```

## Key Features

### Navigation Hotspots
Each page uses percentage-based positioning for clickable hotspots that overlay the background images. Hover effects use blur/brightness filters with screen blend mode.

### Responsive Scaling
Pages use `minWidth`/`minHeight` with aspect ratio to fill viewport while maintaining proportions. Overflow is scrollable.

### Poster Gallery
- 3 pages of posters with left/right arrow navigation
- Left arrow: goes to theater on page 1, previous page on pages 2+
- Right arrow: goes to next page (hidden on last page)
- Click poster for high-res preview modal

**Page 1:** Fish Delivery #95, Frog and Toad Theme, Nocaretown, The Jealous Boyfriend
**Page 2:** Batch-9e, Peach Fuzz (blue), 9/11 Stop Motion, Peach Fuzz (alt)
**Page 3:** Peach Fuzz (knives), Jealous Boyfriend (alt)

### Biography Page
- Clickable desk area opens modal with Bio/Resume tabs
- Resume includes: Experience, Selected Films, Education, Skills, GPA
- IMDB and LinkedIn links in resume tab
- "Click Desk to View" and "Back to Theater" gold text labels

### Contact Page
- Animated twinkling city lights (multiple regions)
- Animated airplanes crossing sky
- Social link hotspots with hover glow effect

## Hidden/Disabled Features

### Commercial Tab
The Commercial navigation is hidden but preserved in code. To re-enable:
1. Open `CinemaEnvironment.jsx`
2. Remove `hidden: true` from the COMMERCIAL nav item
3. Add the text back to the theater background image

## Resume Data

Current resume content in BiographyPage.jsx:
- **Experience**: Cygnet Gin (Creative Producer - Current), Metalwork Pictures (Development Executive - Current), JV8 Casting, Factory 25, Caveh Zahedi
- **Films**: Listen, Nocaretown, The Jealous Boyfriend, Fish Delivery #95
- **Education**: NYU Film & Television, Minor in Business of Entertainment, GPA: 3.95
- **Skills**: Editing/Post (Premiere Pro, DaVinci Resolve, After Effects, Adobe Suite), AI/Generative Tools (Runway, Kling, Stable Diffusion, Midjourney, Elevenlabs, Veo3), Creative/Production (Storyboarding, Post supervision, Branded content editing, Directing, Animation, Script breakdown, Casting workflows), Coding (CSS, HTML, JavaScript, Python), Other (Google Suite, Photoshop, Canva, Backstage, Breakdown Express, Web & Deck Design)

## Social Links

Configured in ContactSocials.jsx:
- Email: wolskoluke@gmail.com
- Instagram: @lukewolsko
- LinkedIn: luke-wolsko
- X/Twitter: @basilisk256
- YouTube: @lukewolsko
- IMDB: nm15865993
- Letterboxd: lukewolsko

## Development

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## Image Optimization Notes

Background images were optimized from original sizes:
- Theater background: ~2.8MB (was 21MB)
- Contact background: ~2.4MB
- Keep future backgrounds under 3MB for performance

## Future Considerations

- Add Commercial/Experiments section when ready
- Add resume.pdf to assets
- Consider adding film clips/reels
- AI experiments could go in a future "Lab" section

---

## Development Session Notes (Jan 2026)

### What was built:
1. Main theater landing page with nav hotspots (Biography, Posters, Contact)
2. Biography page with art deco office, clickable desk, bio/resume modal
3. Poster gallery with 3 pages and arrow navigation
4. Contact page with animated city lights and social links
5. All pages use responsive scaling with aspect ratio containers

### Design decisions:
- Navigation labels baked into background images for seamless look
- Hover effects use white glow with screen blend mode
- Gold (#c4a882) used for text elements to match noir aesthetic
- Commercial tab hidden until content is ready
- Posters section showcases poster design work, not film roles

### Files to keep backed up:
- All background images in public/assets/
- Poster preview images (poster-*.jpg)
- headshot.jpg
- Component files with positioning data (hotspot percentages)
