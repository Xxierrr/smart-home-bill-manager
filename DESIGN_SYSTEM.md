# Design System & UI Guidelines

## Color Palette

### Primary Colors
```css
--primary-blue: #2563EB;      /* Buttons, links, active states */
--primary-blue-light: #3B82F6;
--primary-blue-dark: #1E40AF;

--secondary-green: #10B981;   /* Success, savings, positive metrics */
--secondary-green-light: #34D399;
--secondary-green-dark: #059669;
```

### Base & Neutral Colors
```css
--white: #FFFFFF;
--background-light: #F3F4F6;  /* Card backgrounds */
--text-dark: #1F2937;          /* Headings */
--text-secondary: #6B7280;     /* Body text */
--border-gray: #E5E7EB;
```

### Semantic Colors
```css
--success: #10B981;            /* Green */
--warning: #F59E0B;            /* Amber */
--error: #EF4444;              /* Red */
--info: #2563EB;               /* Blue */
```

## Typography

### Font Family
- Primary: Inter, system-ui, sans-serif
- Monospace: 'Fira Code', monospace (for numbers)

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Spacing System
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
```

## Border Radius
```css
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;
```

## Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

## Component Styles

### Buttons
```css
/* Primary Button */
background: #2563EB;
color: white;
padding: 0.75rem 1.5rem;
border-radius: 0.5rem;
font-weight: 600;
transition: all 0.2s;

/* Success Button */
background: #10B981;
color: white;

/* Secondary Button */
background: white;
color: #2563EB;
border: 1px solid #E5E7EB;
```

### Cards
```css
background: white;
border-radius: 0.75rem;
padding: 1.5rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
border: 1px solid #F3F4F6;
```

### Input Fields
```css
border: 1px solid #E5E7EB;
border-radius: 0.5rem;
padding: 0.75rem 1rem;
font-size: 1rem;
transition: border-color 0.2s;

/* Focus State */
border-color: #2563EB;
outline: 2px solid rgba(37, 99, 235, 0.1);
```

## Layout Guidelines

### Sidebar
- Width: 256px (desktop)
- Background: White
- Border-right: 1px solid #E5E7EB
- Active item: Blue background (#EFF6FF) with blue text

### Main Content
- Max-width: 1400px
- Padding: 2rem
- Background: #F3F4F6

### Grid System
- Dashboard: 3-column grid (desktop), 1-column (mobile)
- Gap: 1.5rem

## Accessibility
- Minimum contrast ratio: 4.5:1 for text
- Focus indicators on all interactive elements
- ARIA labels for icons and actions
- Keyboard navigation support
