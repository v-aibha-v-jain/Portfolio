---
name: Warm Architectural Minimalist
colors:
  surface: '#fef9f0'
  surface-dim: '#ded9d1'
  surface-bright: '#fef9f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3ea'
  surface-container: '#f2ede4'
  surface-container-high: '#ece8df'
  surface-container-highest: '#e7e2d9'
  on-surface: '#1d1c16'
  on-surface-variant: '#494740'
  inverse-surface: '#32302a'
  inverse-on-surface: '#f5f0e7'
  outline: '#7a776f'
  outline-variant: '#cbc6bd'
  surface-tint: '#605e5b'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b19'
  on-primary-container: '#868380'
  inverse-primary: '#cac6c2'
  secondary: '#655d51'
  on-secondary: '#ffffff'
  secondary-container: '#e9dece'
  on-secondary-container: '#696255'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e1b16'
  on-tertiary-container: '#89837b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6e2de'
  primary-fixed-dim: '#cac6c2'
  on-primary-fixed: '#1c1b19'
  on-primary-fixed-variant: '#484644'
  secondary-fixed: '#ece1d1'
  secondary-fixed-dim: '#d0c5b5'
  on-secondary-fixed: '#201b11'
  on-secondary-fixed-variant: '#4d463a'
  tertiary-fixed: '#e9e1d8'
  tertiary-fixed-dim: '#cdc5bd'
  on-tertiary-fixed: '#1e1b16'
  on-tertiary-fixed-variant: '#4a4640'
  background: '#fef9f0'
  on-background: '#1d1c16'
  surface-variant: '#e7e2d9'
typography:
  headline-display:
    fontFamily: Space Grotesk
    fontSize: 4.5rem
    fontWeight: '600'
    lineHeight: '1.05'
    letterSpacing: -0.04em
  headline-display-mobile:
    fontFamily: Space Grotesk
    fontSize: 2.75rem
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 2.5rem
    fontWeight: '500'
    lineHeight: '1.15'
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: '1.25'
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.65'
    letterSpacing: '0'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.14em
  label-nav:
    fontFamily: Space Grotesk
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-tablet: 2.5rem
  margin-desktop: 4.5rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3.5rem
  space-2xl: 6rem
---

## Brand & Style
The design system embodies warm minimalism, architectural restraint, and intentional typography. Designed for creative technologists, architects, designers, and engineers, it eschews loud micro-interactions and synthetic gradients in favor of tactile calm, generous negative space, and disciplined structure. 

The aesthetic is inspired by physical art catalogs, Japanese warm neutrals, and Swiss editorial compositions. The emotional tone is contemplative, confident, grounded, and timeless. It presents work with absolute clarity, treating the screen as a gallery wall of warm linen and stone.

## Colors
The color palette draws directly from tactile paper stocks, sand, limestone, and cast bronze.

- **Background Canvas (`#f2ede4`):** The primary atmosphere—a light, warm alabaster linen shade that reduces eye strain compared to harsh optical white.
- **Surface Elevation (`#eae3d8`):** Subtle shift used for framing media, visual placeholders, and inset cards.
- **Primary Ink (`#1c1b19`):** Deep charcoal ink delivering crisp typographic legibility without optical black harshness.
- **Muted Neutral / Tertiary (`#6b665f`):** Weathered stone tone used for secondary text, metadata, captions, and micro-labels.
- **Subtle Outline (`#ded7cc`):** Whispering borders that partition space without visual heaviness.
- **Accent Muted Taupe (`#b8ae9f`):** Warm clay neutral reserved for interactive states, progress bars, and graphic accents.

## Typography
Typographic rhythm sets the intellectual baseline of the interface. 

- **Space Grotesk** commands headlines and navigation items. Tight negative letter-spacing on display scales gives character titles a sharp, mechanical precision, while uppercase micro-labels utilize wide letter-spacing (`0.14em`) for architectural framing.
- **Plus Jakarta Sans** grounds the narrative body copy. Its gentle geometry and open apertures offer sustained readability while preserving a quiet, contemporary demeanor.
- Scale shifts cleanly between desktop viewports and compact phone viewports, preventing text wrapping anomalies while preserving the monumental feel of the primary intro locks.

## Layout & Spacing
The layout system is founded on a fixed 12-column editorial grid on desktop and laptop devices, a 6-column grid on tablet, and a 4-column structure on mobile devices.

- **Canvas Frame:** Layouts utilize an intentional outer border margin framing the entire viewport, mirroring high-end publication borders.
- **Dual-Pane Balance:** The main hero dynamically divides screen weight: an expansive editorial text column on the left balanced against a structured monolithic portrait/media block on the right.
- **Reflow Architecture:**
  - *Desktop (1440px+):* Wide two-column split, persistent bottom dock navigation fixed symmetrically across viewport gutters.
  - *Tablet (768px – 1024px):* Media container shifts to top or stacked ratio; navigation scales horizontally with reduced outer padding.
  - *Mobile (<768px):* Monolithic full-width stacking. Media aspect ratios condense vertically; bottom navigation docks securely within safe-area boundaries.

## Elevation & Depth
Elevation is achieved exclusively through **tonal hierarchy and hairline rules** rather than drop shadows:

- **Zero Drop Shadows:** Shadows are intentionally omitted across all standard components, modals, and cards to maintain an authentic physical paper aesthetic.
- **Tonal Stepping:** Surfaces layer naturally:
  - Base level: `#f2ede4`
  - Recessed/Media containers: `#eae3d8`
  - Subtle interactive hovers: `#e4ded3`
- **Hairline Partitioning:** Structure is declared using crisp `1px` solid borders (`#ded7cc`). Cards, docked tab bars, and separators use low-opacity dividers that blend gently into the neutral background.
- **Selection & Overlays:** In cases requiring transient layers (e.g., lightbox previews), depth is achieved via an 85% opacity tinted wash in the background neutral with soft backdrop blur.

## Shapes
Geometry is strictly angular, architectural, and razor-sharp (`roundedness: 0`). 

All buttons, media cards, navigation tabs, dialogs, and thumbnail frames maintain absolute 0px corner radii. The sharpness underscores discipline, precision, and structural integrity. Avatars or silhouette placeholders may render internal circular graphics, but their outer bounding viewports and interactive triggers remain crisp right angles.

## Components

### Persistent Navigation Tabs (About, Work, Others, Contact)
- **Positioning:** Fixed either at the true viewport bottom (anchored with an architectural hairline line or floating minimal bar) or top header.
- **Structure:** Equal-width cells or grouped minimal text tabs separated by generous horizontal gaps (`space-lg`).
- **Typography:** `label-nav` (Space Grotesk, uppercase, tracked `0.1em`).
- **States:** Inactive tabs display in `#6b665f`; active tab switches to `#1c1b19` with a persistent 1.5px baseline accent indicator. Hover shifts text color instantly with no morphing transitions.

### Media & Hero Placeholder
- **Aspect Ratio & Frame:** Rigid aspect ratio containers (`4:5` portrait or `16:10` landscape) set in `#eae3d8` with a subtle `1px solid #ded7cc` boundary.
- **Graphic Motif:** Minimalist monochromatic silhouettes or project stills rendered in flat muted taupe (`#b8ae9f`) against the surface tone.

### Buttons & Hyperlinks
- **Primary Button:** `#1c1b19` fill, `#f2ede4` text, 0px border radius, uppercase `label-nav` typography, padded with `0.875rem 1.75rem`.
- **Secondary / Ghost Button:** Transparent background, `1px solid #1c1b19` border, `#1c1b19` text. Hover fills background with `#1c1b19` and flips text to `#f2ede4`.
- **Editorial Text Links:** Underlined with a `1px` solid line shifted 4px below text baseline. Hover transitions the line to primary charcoal.

### Project & Case Study Cards
- **Structure:** Borderless by default, relying on vertical stacking: top media block, followed by `space-sm` gap, project year/tag in `label-caps`, project title in `headline-sm`, and excerpt in `body-sm`.
- **Hover State:** Media image slightly warms or reveals an inner inset border.

### Input Fields & Contact Elements
- **Input Architecture:** Minimalist underline or boxed inputs with `1px solid #ded7cc` borders, transparent fill, Space Grotesk text, and no rounded edges.
- **Focus State:** Border sharpens to `#1c1b19` with no glow or halo.
- **Checkboxes & Radios:** Sharp square boxes (`16px x 16px`) with 0px radius, inner solid charcoal square check indicator.