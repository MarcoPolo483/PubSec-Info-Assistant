# UI Architecture

This document describes the frontend UI architecture of the Information Assistant application.

## Overview

The frontend is a React/Vite application located in `app/frontend/`. It uses TypeScript and CSS modules for styling.

## Directory Structure

```
app/frontend/
├── src/
│   ├── a11y/                    # Accessibility utilities (eva-i11y based)
│   │   ├── components/          # Accessible components (SkipLink, VisuallyHidden)
│   │   ├── hooks/               # Accessibility hooks (useFocusTrap, useFocusVisible, useLiveRegion)
│   │   └── utils/               # Utility functions (announce, aria helpers)
│   ├── api/                     # API client code
│   ├── assets/                  # Static assets (images, SVGs)
│   ├── components/              # Reusable UI components
│   │   ├── AnalysisPanel/       # Analysis and citation panel
│   │   ├── Answer/              # Chat answer display
│   │   ├── ClearChatButton/     # Clear chat button
│   │   ├── Example/             # Example questions
│   │   ├── InfoButton/          # Info button
│   │   ├── LocaleSwitcher/      # Language switcher dropdown
│   │   ├── QuestionInput/       # Chat input area
│   │   ├── SettingsButton/      # Settings button
│   │   └── ...                  # Other components
│   ├── i18n/                    # Internationalization (eva-i18n based)
│   │   ├── locales/             # Translation files (en.ts, es.ts)
│   │   ├── I18nProvider.tsx     # React context provider
│   │   ├── i18n.ts              # Core translation class
│   │   └── types.ts             # TypeScript types
│   └── pages/                   # Page components
│       ├── chat/                # Main chat page
│       ├── content/             # Content management page
│       ├── layout/              # App layout (header, nav, footer)
│       ├── tda/                 # Tabular Data Assistant page
│       └── tutor/               # Math tutor page
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite build configuration
```

## Main Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Chat` | Main chat interface for Q&A with documents |
| `/content` | `Content` | Content/document management |
| `/tutor` | `Tutor` | Math Assistant (preview feature) |
| `/tda` | `Tda` | Tabular Data Assistant (preview feature) |

## Layout Components

### Layout (`src/pages/layout/Layout.tsx`)

The main layout wrapper that provides:
- **Header** with logo, title, and navigation
- **Navigation** with links to all pages
- **Locale Switcher** for changing languages
- **Main content** area via `<Outlet />`
- **Footer** with warning banner

### Semantic Landmarks

The layout uses proper semantic HTML landmarks for accessibility:
- `<header role="banner">` - Application header
- `<nav aria-label="...">` - Main navigation
- `<main id="main" role="main">` - Main content area
- `<footer role="contentinfo">` - Application footer

## Key Interaction Points

### Chat Interface (`src/pages/chat/Chat.tsx`)

The main chat page includes:
- **Chat mode selector** - Switch between Work Only, Work + Web, and Ungrounded modes
- **Question input** - Text area with send button
- **Chat messages** - User questions and AI responses
- **Settings panel** - Configuration options (Fluent UI Panel)
- **Info panel** - Information about the assistant
- **Analysis panel** - Citation and thought process display

### Components

| Component | Purpose |
|-----------|---------|
| `QuestionInput` | Chat input with send button |
| `Answer` | AI response with citations |
| `ClearChatButton` | Clear chat history |
| `SettingsButton` | Open settings panel |
| `InfoButton` | Open info panel |
| `LocaleSwitcher` | Change application language |
| `SkipLink` | Skip to main content (accessibility) |

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Fluent UI** - Microsoft design system components
- **React Router** - Client-side routing
- **CSS Modules** - Scoped component styles

## Accessibility Features

The UI includes accessibility features based on eva-i11y patterns:
- Skip link for keyboard navigation
- Semantic HTML landmarks
- ARIA labels on interactive elements
- Focus management for dialogs
- Keyboard navigation support
- Screen reader announcements

See [Accessibility and Internationalization Guide](./accessibility-i18n.md) for details.

## Internationalization

The UI supports multiple languages via eva-i18n patterns:
- Translation context provider
- Translation hooks (`useI18n`)
- Locale files in `src/i18n/locales/`
- Locale switcher in header

See [Accessibility and Internationalization Guide](./accessibility-i18n.md) for details.
