# Our Process Component

This component adds a premium "Our Process" section with an animated SVG timeline and glassmorphism cards. It is designed to be fully responsive and integrates seamlessly into the `advankita` luxury law firm website.

## Features

- **Luxury Aesthetic**: Dark navy background with gold accents and soft drop shadows.
- **Glassmorphism**: The process cards utilize `backdrop-filter` for a blurred glass effect.
- **Responsive SVG Timeline**:
  - **Desktop**: A custom SVG path weaves through the alternating cards. The path draws itself dynamically on scroll based on viewport intersection.
  - **Mobile/Tablet**: The timeline stacks vertically into a straight line for optimal viewing on smaller screens.
- **Scroll Animations**: No external libraries (like GSAP or ScrollMagic) are used. The scroll tracking and animation triggers are written entirely in Vanilla JavaScript (`script.js`).
- **Micro-interactions**: 
  - Hovering over cards slightly lifts and rotates them.
  - Active nodes pulse with a gold glow.
  - The "Get A Free Quote" button has a sleek hover transition.

## File Structure

The component spans three primary files:

1. `index.html`: Contains the structural HTML markup (`<section id="process">`).
2. `style.css`: Contains all styling, responsive media queries, and CSS transitions. Look for the `/* Our Process Section */` block.
3. `script.js`: Contains the Vanilla JS logic to dynamically draw the SVG path and handle scroll-linked animations.

## Customization

- **Colors**: The gold accent color relies on `var(--gold)` (or `#C7A25A`). The dark background is `#101722`.
- **Steps**: To add or remove steps, simply add/remove `.process-card` elements in `index.html`. For desktop alignment, alternate adding the `alt-position` class to every even card.
- **Timeline Path**: The SVG path is generated dynamically in `script.js`. If you want a different curve shape, modify the `pathData` bezier coordinates (`C x1 y1, x2 y2, x y`) inside `script.js`.
