# SLD Design System
## Standard Land Development — Brand & UI Guidelines

---

## 1. Brand Philosophy

### Vision
Position SLD as a **premium yet accessible** home builder. The design language balances **luxury aesthetics** with **warmth and approachability** — aspirational but not intimidating.

### Design Pillars
1. **Cinematic** — Full-bleed imagery, video backgrounds, dramatic lighting
2. **Editorial** — Magazine-quality typography, generous whitespace
3. **Refined** — Subtle animations, muted color palette, sharp details
4. **Trustworthy** — Clear hierarchy, professional credibility signals

---

## 2. Color System

### Primary Palette

```css
:root {
  /* Brand Colors */
  --sld-gold: #F59E0B;           /* Primary accent - CTAs, highlights */
  --sld-gold-light: #FCD34D;     /* Gradients, hover states */
  --sld-gold-muted: #D97706;     /* Darker gold for depth */
  
  /* Neutral Scale - Slate */
  --sld-slate-950: #020617;      /* Primary dark background */
  --sld-slate-900: #0F172A;      /* Secondary background */
  --sld-slate-800: #1E293B;      /* Cards, elevated surfaces */
  --sld-slate-700: #334155;      /* Borders, dividers */
  --sld-slate-600: #475569;      /* Muted text */
  --sld-slate-500: #64748B;      /* Secondary text */
  --sld-slate-400: #94A3B8;      /* Placeholder text */
  --sld-slate-300: #CBD5E1;      /* Light borders */
  --sld-slate-200: #E2E8F0;      /* Light backgrounds */
  --sld-slate-100: #F1F5F9;      /* Lightest background */
  --sld-slate-50: #F8FAFC;       /* Near white */
  
  /* Semantic Colors */
  --sld-success: #10B981;        /* Emerald - trust indicators */
  --sld-info: #3B82F6;           /* Blue - links, info */
  --sld-warning: #F59E0B;        /* Amber - alerts */
  --sld-error: #EF4444;          /* Red - errors */
  
  /* Overlay & Glass */
  --sld-overlay-dark: rgba(2, 6, 23, 0.8);
  --sld-overlay-light: rgba(255, 255, 255, 0.05);
  --sld-glass: rgba(255, 255, 255, 0.08);
  --sld-glass-border: rgba(255, 255, 255, 0.1);
}
```

### Gradient Tokens

```css
:root {
  /* Text Gradients */
  --gradient-gold: linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #f59e0b 100%);
  
  /* Background Gradients */
  --gradient-hero-overlay: linear-gradient(to bottom, 
    rgba(2,6,23,0.6) 0%, 
    transparent 40%, 
    rgba(2,6,23,0.95) 100%
  );
  
  --gradient-vignette: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(2,6,23,0.4) 50%,
    rgba(2,6,23,0.8) 100%
  );
  
  /* Card Gradients */
  --gradient-glass-card: linear-gradient(
    135deg,
    rgba(255,255,255,0.1) 0%,
    rgba(255,255,255,0.05) 100%
  );
  
  --gradient-gold-card: linear-gradient(
    135deg,
    rgba(245,158,11,0.2) 0%,
    rgba(245,158,11,0.1) 100%
  );
}
```

---

## 3. Typography

### Font Stack

```css
:root {
  /* Display/Headlines - Elegant Serif */
  --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
  
  /* Body/UI - Clean Sans */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Accent/Labels - Wide Tracking */
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
}
```

### Type Scale

| Name | Size | Weight | Line Height | Letter Spacing | Use Case |
|------|------|--------|-------------|----------------|----------|
| `display-xl` | clamp(3rem, 10vw, 7rem) | 300 | 0.95 | -0.02em | Hero headlines |
| `display-lg` | clamp(2.5rem, 6vw, 4.5rem) | 300 | 1.0 | -0.01em | Section headlines |
| `display-md` | clamp(2rem, 4vw, 3rem) | 400 | 1.1 | 0 | Sub-headlines |
| `heading-lg` | 1.875rem (30px) | 500 | 1.2 | 0 | Card titles |
| `heading-md` | 1.5rem (24px) | 500 | 1.3 | 0 | Subsection titles |
| `heading-sm` | 1.25rem (20px) | 600 | 1.4 | 0 | Small headings |
| `body-lg` | 1.25rem (20px) | 400 | 1.7 | 0 | Lead paragraphs |
| `body-md` | 1rem (16px) | 400 | 1.6 | 0 | Body text |
| `body-sm` | 0.875rem (14px) | 400 | 1.5 | 0 | Secondary text |
| `caption` | 0.75rem (12px) | 500 | 1.4 | 0.05em | Captions, labels |
| `overline` | 0.6875rem (11px) | 500 | 1.2 | 0.25em | Overlines, tags |

### Typography Rules

1. **Headlines**: Always use serif font (`--font-serif`)
2. **Body text**: Use sans-serif (`--font-sans`)
3. **Labels/Tags**: Uppercase with wide letter-spacing
4. **Maximum line width**: 65-75 characters for readability
5. **Contrast**: Minimum 4.5:1 for body text, 3:1 for large text

---

## 4. Spacing System

### Base Unit: 4px

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

### Section Spacing

- **Hero → First Section**: `--space-24` to `--space-32`
- **Between Sections**: `--space-20` to `--space-24`
- **Section Padding (mobile)**: `--space-16` vertical
- **Section Padding (desktop)**: `--space-24` vertical

---

## 5. Animation & Motion

### Easing Functions

```css
:root {
  /* Smooth, elegant exits */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Balanced movement */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  
  /* Subtle bounce */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Standard ease */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Duration Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `--duration-fast` | 150ms | Micro-interactions, hovers |
| `--duration-normal` | 300ms | Button clicks, toggles |
| `--duration-slow` | 500ms | Page transitions, reveals |
| `--duration-slower` | 800ms | Complex animations |
| `--duration-slowest` | 1200ms | Hero animations, dramatic reveals |

### Animation Patterns

1. **Fade Up**: Elements enter from below with blur
   ```css
   transform: translateY(40px);
   opacity: 0;
   filter: blur(10px);
   ```

2. **Scale In**: Cards/modals appear with subtle scale
   ```css
   transform: scale(0.95);
   opacity: 0;
   ```

3. **Stagger Children**: Parent controls timing
   ```js
   staggerChildren: 0.1,
   delayChildren: 0.3
   ```

4. **Parallax**: Subtle depth on scroll
   - Background moves 20% slower than foreground
   - Scale increases slightly as user scrolls

---

## 6. Component Patterns

### Buttons

#### Primary (Gold)
```css
.btn-primary {
  background: var(--sld-gold);
  color: var(--sld-slate-950);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 1rem 2.5rem;
  border-radius: 0; /* Sharp corners for luxury feel */
  transition: all 0.5s var(--ease-out-expo);
}

.btn-primary:hover {
  background: var(--sld-gold-light);
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -15px rgba(245, 158, 11, 0.3);
}
```

#### Secondary (Ghost)
```css
.btn-secondary {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
}
```

### Cards

#### Glass Card (Dark Theme)
```css
.card-glass {
  background: var(--gradient-glass-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--sld-glass-border);
  border-radius: 1.5rem;
}
```

#### Elevated Card (Light Theme)
```css
.card-elevated {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 16px 32px rgba(0, 0, 0, 0.04);
}
```

---

## 7. Layout Patterns

### Split Content (Text + Image)
- 50/50 split on desktop, stack on mobile
- Image should have subtle parallax or reveal animation
- Text side has generous padding (--space-16 to --space-24)
- Alternate sides for visual rhythm

### Image Comparison (Diagonal Split)
- Two images with 12-15° angled divider
- Text overlay centered or positioned at thirds
- Hover reveals subtle shift in divider position

### Stats Bar
- Full-width with dividers
- Minimal padding, maximum impact
- Numbers use light weight, labels use tracking

---

## 8. Imagery Guidelines

### Photography Style
- **Lighting**: Golden hour, warm tones
- **Composition**: Rule of thirds, leading lines
- **Subjects**: Homes in context, lifestyle shots, family moments
- **Post-processing**: Slightly desaturated, lifted blacks, warm color grade

### Video Requirements
- **Format**: MP4 (H.264), WebM fallback
- **Resolution**: 1920x1080 minimum, 4K preferred
- **Compression**: Target 2-4MB for hero videos
- **Duration**: 10-30 seconds, seamless loop
- **Audio**: Always muted by default

---

## 9. Accessibility Standards

### Color Contrast
- Body text on dark: minimum 4.5:1
- Large text (24px+): minimum 3:1
- Interactive elements: clearly distinguishable

### Motion
- Respect `prefers-reduced-motion`
- Provide static alternatives for all animations
- No flashing content (>3 flashes/second)

### Focus States
- Visible focus rings on all interactive elements
- Focus ring: 2px solid with offset
- Never remove outline without replacement

---

## 10. Responsive Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Container Max Widths
- Content: 1280px
- Wide content: 1440px
- Full bleed: 100%

---

## 11. File Naming Conventions

### Components
```
components/
├── ui/                    # Primitives (Button, Input, Card)
├── sections/              # Page sections (Hero, About, Contact)
├── layout/                # Layout components (Header, Footer)
└── features/              # Feature-specific (PropertyCard, Stats)
```

### Naming
- Components: PascalCase (`Hero.tsx`, `SplitContent.tsx`)
- Utilities: camelCase (`formatCurrency.ts`)
- Styles: kebab-case (`hero-section.css`)
- Images: kebab-case (`hero-background.jpg`)

---

## Quick Reference

### Do's ✓
- Use generous whitespace
- Prefer serif for headlines
- Animate with purpose
- Maintain visual hierarchy
- Use high-quality imagery

### Don'ts ✗
- Overcrowd layouts
- Mix too many fonts
- Animate everything
- Use pure black (#000)
- Compress images excessively

---

*Last updated: February 2025*
*Version: 1.0*
