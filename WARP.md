# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 15 admin panel application for a delivery/transport management system. The application uses the App Router architecture with React 19, Tailwind CSS, and Turbopack for fast development builds.

## Development Commands

### Essential Commands
- **Start development server**: `npm run dev` (uses Turbopack for fast builds)
- **Build production**: `npm run build`
- **Start production**: `npm start`
- **Lint code**: `npm run lint`

### Single Development Tasks
- **Run linting on specific files**: `npx eslint app/page.js components/ui/DataTable.jsx`
- **Build and analyze bundle**: `npm run build` (Next.js provides built-in bundle analysis)

## Architecture Overview

### File Structure
```
admin-panel/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Route groups for features
│   │   ├── analytics/     # Analytics dashboard
│   │   ├── customers/     # Customer management
│   │   ├── drivers/       # Driver management
│   │   ├── orders/        # Order management
│   │   ├── partners/      # Partner management
│   │   ├── payments/      # Payment management
│   │   ├── reports/       # Report generation
│   │   ├── reviews/       # Review management
│   │   ├── settings/      # Application settings
│   │   └── tracking/      # Real-time tracking
│   ├── layout.js          # Root layout with Shell wrapper
│   ├── page.js           # Dashboard home page
│   └── globals.css       # Global styles and Tailwind
├── components/            # Reusable React components
│   ├── header/           # Top navigation components
│   ├── layout/           # Layout wrapper components
│   ├── sidebar/          # Side navigation components
│   └── ui/              # Reusable UI components
└── public/              # Static assets
```

### Component Architecture

**Layout System**:
- `Shell.jsx`: Main layout wrapper with responsive sidebar and mobile navigation
- `Sidebar.jsx`: Left navigation using `navConfig.js` for menu items
- `Topbar.jsx`: Top header with mobile menu toggle

**UI Components**:
- `StatsCard.jsx`: Reusable metric display cards with trend indicators
- `DataTable.jsx`: Feature-rich data table with search, filter, and pagination
- `KebabMenu.jsx`: Dropdown action menus for table rows

### Key Design Patterns

1. **App Router Structure**: Each feature has its own route directory with nested `[id]` routes for detail views
2. **Component Composition**: UI components accept render props for custom content (e.g., DataTable columns)
3. **Responsive Design**: Mobile-first approach with responsive breakpoints using Tailwind
4. **Path Aliases**: Uses `@/` alias (configured in jsconfig.json) for clean imports
5. **Icon System**: Lucide React icons for consistent iconography
6. **Color System**: Custom brand colors defined in `tailwind.config.js` and CSS variables

### State Management
- Uses React's built-in useState for local component state
- No global state management library (consider adding if complexity grows)

### Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Brand Colors**: Defined in `tailwind.config.js` under `brand` namespace
- **Component-Scoped Styles**: Additional custom styles in `globals.css`

## Configuration Files

- **jsconfig.json**: Path mapping for `@/` alias
- **next.config.mjs**: Next.js configuration (currently minimal)
- **tailwind.config.js**: Custom color palette and content paths
- **eslint.config.mjs**: ESLint with Next.js core web vitals

## Development Notes

### Adding New Features
1. Create route directory in `app/` with `page.js`
2. Add navigation item to `components/sidebar/navConfig.js`
3. Use existing UI components (`DataTable`, `StatsCard`) for consistency
4. Follow established patterns for status indicators and action menus

### Component Development
- All components are client-side ("use client") when needed
- Use Lucide React for icons to maintain consistency
- Follow the established color system in Tailwind config
- Implement responsive design with mobile-first approach

### Data Flow
- Currently uses mock data arrays in page components
- API integration points are ready (replace mock data with fetch calls)
- DataTable component expects array of objects with consistent column structure

### Performance Considerations
- Turbopack enabled for faster development builds
- Next.js 15 optimizations for improved performance
- Image optimization available via Next.js Image component (not currently used)
