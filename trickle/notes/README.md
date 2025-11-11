# Alex Neural — Creative Developer Portfolio

Personal freelancer portfolio combining cinematic storytelling with brutalist minimalism. Showcasing unique development approach and availability for projects.

## Design Philosophy

**Cinematic Approach (Direction 2):**
- Full-screen hero with dramatic imagery
- Video-style presentations
- Smooth, story-driven flow
- Emotional impact through scale

**Brutalist Minimalism (Direction 5):**
- Giant typography (4-18rem)
- Black & white foundation
- Red accent color (#ff0000)
- Sharp geometric layouts
- No unnecessary decoration

## Design System

### Colors
- **Pure Black**: #000000 (main background)
- **Off-White**: #fafafa (text)
- **Accent Red**: #ff0000 (highlights only)

### Typography
- **Primary**: Space Grotesk (300-700)
- **Mono**: IBM Plex Mono (code/details)
- **Scale**: Massive headlines (clamp 4-18rem)
- **Letter spacing**: -0.04em (ultra-tight)

### Key Features
- **Custom Cursor**: 20px circle with mix-blend-mode
- **Hover Effects**: Scale transforms, red reveals
- **Video Overlay**: Gradient darkening
- **Section Dividers**: 1px opacity lines

## Structure

### Sections
1. **VideoHero**: Full-screen with giant text
2. **ManifestoSection**: Personal approach and philosophy
3. **WorkGrid**: Timeline-based project showcase (2025/2024)
4. **BeforeAfterSection**: Interactive before/after transformations
5. **ContactSection**: Multiple contact options (Email, Telegram, WhatsApp, Calendar)

### Components
- `Cursor`: Custom cursor with hover states
- `Navigation`: Minimal fixed header
- All sections: Self-contained React components

## Technical Stack
- React 18
- TailwindCSS
- Lucide Icons
- No frameworks, pure components
- Static JSON files for data storage

## Data Management
All data is stored in static JSON files in the `data/` folder:
- `data/projects.js` - Portfolio projects
- `data/gallery.js` - Gallery images
- `data/transformations.js` - Before/after transformations
- `data/magnify-cards.js` - Magnifying glass cards
- `data/blog.js` - AI prompts blog posts

To update content, edit these files directly.

## Created
November 9, 2025

## Last Updated
November 11, 2025 - Removed Trickle Database dependency, converted to static JSON files for GitHub deployment
