# Wedding Website Development Guide

## Project Overview
This is a wedding invitation website for Keerthana & Sahil's wedding on February 8, 2026, in Kolar. The website is built as a single-page application with a mobile-first responsive design that displays as a centered 430px-wide layout on desktop.

## Project Structure

### HTML
- `index.html` - Main wedding invitation page with all sections
  - Includes critical CSS inlined for performance
  - Uses semantic HTML5 structure
  - Implements proper meta tags and accessibility features

### CSS Architecture
- `css/reset.css` - CSS reset for consistent styling across browsers
- `css/variables.css` - CSS custom properties (colors, spacing, fonts, animations)
- `css/layout.css` - Layout systems and section spacing
- `css/components.css` - Component-specific styles (hero, accordion, forms, etc.)
- `css/animations.css` - Animation definitions and keyframes
- `css/responsive.css` - Mobile-first responsive design with breakpoints

### JavaScript Modules
- `js/utils.js` - Performance utilities (debounce, throttle, viewport detection)
- `js/animations.js` - Scroll-triggered animations using Intersection Observer
- `js/navigation.js` - Navigation functionality (currently unused - no nav in design)
- `js/main.js` - Main application entry point and accordion functionality

### Assets Structure
- `assets/images/` - All website images
  - `hero-image.jpeg` - Main hero section background
  - `event-image.jpeg` - Event timeline section background  
  - `org-image.jpeg` - Organizational aspects section background
  - `decorative-line.webp` - Decorative divider element
  - `dress-code-*.jpg` - Dress code example photos (referenced but not implemented)
- `assets/audio/` - Audio files
  - `home-page-audio.mp3` - Background music for the website

### Development Dependencies
- `package.json` - Contains Jest testing framework setup
- `node_modules/` - Development dependencies (Jest, JSDOM)

## Key Features & Sections

### 1. Hero Section
- Fixed height section (758px) with background image and rounded corners (25px)
- Multi-layer gradient overlay for text readability
- Wedding date (February 8) and location (Kolar) metadata
- Couple names in Beau Rivage cursive font
- Invitation message with responsive typography
- Critical CSS inlined for fast loading
- **Background audio player** with toggle control button
  - Automatically plays `home-page-audio.mp3` on first user interaction
  - Audio control button in top-right corner for play/pause
  - Respects browser autoplay policies
  - Pauses when tab is hidden, resumes when visible

### 2. Services Section  
- Welcome message to friends and family
- Invitation text explaining the wedding celebration
- Simple text-based section with centered content

### 3. Event Timeline
- Three separate timeline tables for different dates (Feb 6, 7, 8)
- Each table shows events with times:
  - Feb 6: Haldi (12:00 PM), Sangeet (06:00 PM)
  - Feb 7: Varapooje (10:00 AM), Reception (06:30 PM)  
  - Feb 8: Muhurtham (10:30 AM)
- Styled with beige background and bordered date headers
- Responsive table layout

### 4. Event Image Section
- 758px height matching hero section
- Same gradient overlay effect as hero
- Visual break between content sections
- Rounded corners for consistency

### 5. Dress Code Section
- Interactive accordion with 3 sections: Haldi, Sangeet, Muhurtham
- Each accordion contains:
  - Color palette swatches for theme colors
  - Polaroid-style photo placeholders (images referenced but not implemented)
  - Dress code guidelines and Pinterest links
- Smooth expand/collapse animations
- Only one section open at a time
- Keyboard accessible (Enter/Space keys)

### 6. Location Section
- Embedded Google Maps iframe
- Sri Nandhini Palace location in Kolar
- Interactive map with directions capability
- Responsive iframe sizing

### 7. Organizational Aspects
- Large image (758px height) with overlay
- "We are looking forward to your presence" message
- Matches visual style of hero and event image sections

### 8. Footer
- Simple footer with "May the force be with us" message
- Dark background for visual closure

## Design System

### Typography Hierarchy
- **Beau Rivage** - Cursive font for couple names and decorative headings
- **Rufina** - Serif font for body text, section titles, and event details  
- **Tangerine** - Cursive font for hero metadata (date/location labels)
- **Playfair Display** - Additional serif font loaded but not actively used

### Color Palette
**Wedding Theme Colors:**
- Beige: `#F5E6D3` - Used in Muhurtham dress code palette
- Light Grey: `#E8E8E8` - Used in Muhurtham dress code palette  
- Champagne: `#D4C4B0` - Used in Muhurtham dress code palette
- Grey: `#6B6B6B` - Used in Muhurtham dress code palette
- Black: `#2C2C2C` - Used in Muhurtham dress code palette and text

**Haldi Theme Colors:**
- Light Yellow: `#FFF59D`
- Medium Yellow: `#FFEE58` 
- Bright Yellow: `#FFD600`
- Golden Yellow: `#FDD835`

**Additional Colors:**
- Text Primary: `#1a1a1a`, `#2c2c2c`, `#4a4a4a`
- Text Secondary: `#6a6a6a`
- Background: White with light grey outer background (`#f5f5f5`)
- Timeline tables: `#f6f3ee` (beige background)

### Layout System
- **Container Width**: 430px maximum on desktop, full width on mobile
- **Centered Layout**: All content centered with box shadow on desktop
- **Section Heights**: 758px for major image sections (hero, event image, org image)
- **Border Radius**: 25px for image sections, various smaller radii for components

### Spacing Scale
Uses CSS custom properties for consistent spacing:
- `--spacing-xs` through `--spacing-5xl`
- Responsive spacing using `clamp()` functions
- Consistent padding and margins throughout

### Visual Effects
- **Gradient Overlays**: Multi-stop gradients on image sections for text readability
- **Box Shadows**: Subtle shadows on desktop layout and components
- **Border Radius**: Consistent rounded corners throughout
- **Hover Effects**: Transform and shadow changes on interactive elements

## Technical Implementation

### Accordion Functionality
**JavaScript Implementation** (`js/main.js`):
- Click to expand/collapse accordion sections
- Only one section open at a time (exclusive behavior)
- Keyboard accessible (Enter/Space keys)
- Smooth CSS transitions with max-height animation
- ARIA attributes for screen reader support

**CSS Classes:**
- `.accordion` - Container wrapper
- `.accordion-item` - Individual accordion item
- `.accordion-header` - Clickable header button
- `.accordion-content` - Collapsible content area
- `.active` - Applied to open items
- `.accordion-icon` - Chevron icon that rotates

### Performance Optimizations
**Critical CSS**: Above-the-fold styles inlined in HTML head
**Font Loading**: Google Fonts with preconnect and display=swap
**Image Optimization**: 
- Preload hero image with fetchpriority="high"
- Lazy loading for below-the-fold images
- WebP format for decorative elements

**JavaScript Utilities** (`js/utils.js`):
- Debounce and throttle functions for performance
- Viewport detection utilities
- Smooth scroll polyfill for older browsers
- Intersection Observer for scroll animations

### Animation System
**Scroll Animations** (`js/animations.js`):
- Uses Intersection Observer API for performance
- Respects `prefers-reduced-motion` user preference
- Fade-in-up animations for content sections
- Staggered delays for grouped elements

### Responsive Design Strategy
**Mobile-First Approach**:
- Base styles target mobile (320px+)
- Progressive enhancement for larger screens
- Fixed 430px width on desktop with centered layout
- Consistent visual hierarchy across all screen sizes

**Breakpoints**:
- Mobile: 320px - 479px
- Mobile Large: 480px - 639px  
- Tablet: 640px - 959px
- Desktop: 960px+
- All sizes show same 430px centered layout on desktop

## Development Guidelines

### Code Organization
**CSS Architecture**:
- Modular CSS files with clear separation of concerns
- CSS custom properties for maintainable theming
- Mobile-first responsive design patterns
- Component-based styling approach

**JavaScript Modules**:
- ES6+ syntax with proper module organization
- Performance-focused utilities (debounce, throttle)
- Accessibility-first interactive components
- Progressive enhancement principles

### Adding New Sections
1. Follow the existing section structure with semantic HTML5
2. Use CSS custom properties for consistent spacing and colors
3. Implement responsive design with mobile-first approach
4. Add appropriate ARIA labels and keyboard navigation
5. Consider scroll animations for new content sections

### Image Guidelines
- **Formats**: JPEG for photos, WebP for graphics/decorative elements
- **Optimization**: Compress images for web delivery
- **Accessibility**: Include descriptive alt text for all images
- **Performance**: Use lazy loading for below-the-fold images
- **Consistency**: Maintain 758px height for major image sections

### Accessibility Standards
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Support**: Labels, roles, and expanded states for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility for all interactive components
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Readers**: Descriptive alt text and ARIA labels
- **Motion Preferences**: Respect `prefers-reduced-motion` setting

### Performance Best Practices
- **Critical CSS**: Inline above-the-fold styles
- **Font Loading**: Optimize Google Fonts loading with preconnect
- **Image Optimization**: Use appropriate formats and lazy loading
- **JavaScript**: Defer non-critical scripts and use efficient event handling
- **Animations**: Use CSS transforms and opacity for smooth animations

## Browser Support & Deployment

### Browser Compatibility
- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Features**: CSS Grid, Flexbox, Custom Properties, CSS Transforms
- **JavaScript**: ES6+ features, Intersection Observer API
- **Fallbacks**: Smooth scroll polyfill for older browsers

### Testing Framework
- **Jest**: Unit testing framework configured in package.json
- **JSDOM**: DOM testing environment for JavaScript components
- **Test Scripts**: `npm test` command available

### Deployment Options
The website is a static site that can be deployed to:
- **GitHub Pages**: Direct deployment from repository
- **Netlify**: Automatic deployments with form handling
- **Vercel**: Fast static site hosting with CDN
- **Traditional Hosting**: Any static file hosting service

### Build Process
- No build process required - pure HTML/CSS/JS
- All dependencies loaded via CDN (Google Fonts)
- Ready for immediate deployment

## Current Implementation Status

### Completed Features
✅ Hero section with responsive design and gradient overlays  
✅ **Background audio player with user controls**  
✅ Services section with welcome message  
✅ Event timeline with three date tables  
✅ Event image section with matching visual style  
✅ Interactive accordion for dress code section  
✅ Location section with embedded Google Maps  
✅ Organizational aspects with image overlay  
✅ Footer section  
✅ Mobile-first responsive design  
✅ Accessibility features and keyboard navigation  
✅ Performance optimizations (critical CSS, lazy loading)  
✅ Scroll animations with reduced motion support  

### Missing/Incomplete Features
❌ Dress code photos (referenced but not implemented)  
❌ Navigation component (JavaScript exists but not used in design)  
❌ RSVP form functionality  
❌ Photo gallery section  
❌ Countdown timer to wedding date  

### Future Enhancement Opportunities
- Add RSVP form with backend integration
- Implement photo gallery section
- Add countdown timer to wedding date
- Create guest message board functionality
- Add multi-language support (English/Hindi)
- Implement service worker for offline functionality
- Add social media sharing capabilities

## Technical Notes
- All major image sections use consistent 758px height for visual harmony
- Accordion functionality requires JavaScript to be enabled
- Google Maps requires internet connection for full functionality
- Fonts loaded from Google Fonts CDN - requires internet connection
- Website uses modern CSS features - may need polyfills for older browsers
- Color scheme forced to light mode to prevent dark mode issues
