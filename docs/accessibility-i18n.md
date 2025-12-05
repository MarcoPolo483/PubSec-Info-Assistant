# Accessibility and Internationalization Guide

This guide explains how accessibility (a11y) and internationalization (i18n) are implemented in the Information Assistant UI, based on the eva-i11y and eva-i18n library patterns.

## Accessibility (a11y)

### Overview

The accessibility implementation follows WCAG 2.1 guidelines and uses patterns from the eva-i11y library. Key features include:

- Semantic HTML landmarks
- Skip link for keyboard navigation  
- ARIA labels and roles
- Focus management
- Screen reader support

### Directory Structure

```
src/a11y/
├── index.ts              # Main exports
├── components/
│   ├── SkipLink.tsx      # Skip to main content link
│   └── VisuallyHidden.tsx # Screen reader only content
├── hooks/
│   ├── useFocusVisible.ts # Keyboard focus detection
│   ├── useFocusTrap.ts    # Focus trap for dialogs
│   └── useLiveRegion.ts   # Announcements for screen readers
└── utils/
    ├── announce.ts        # Imperative announcements
    └── aria.ts            # ARIA attribute helpers
```

### Using Accessibility Components

#### SkipLink

The `SkipLink` component provides a way for keyboard users to skip navigation and jump directly to main content:

```tsx
import { SkipLink } from "../a11y";

// In your App component
<SkipLink href="#main">Skip to main content</SkipLink>
```

#### VisuallyHidden

Use `VisuallyHidden` to provide content only for screen readers:

```tsx
import { VisuallyHidden } from "../a11y";

<button>
  <Icon />
  <VisuallyHidden>Close dialog</VisuallyHidden>
</button>
```

### Using Accessibility Hooks

#### useFocusVisible

Detects keyboard navigation for focus styling:

```tsx
import { useFocusVisible } from "../a11y";

function App() {
  useFocusVisible(); // Sets data-focus-visible attribute on html element
  return <div>...</div>;
}
```

#### useFocusTrap

Traps focus within a container (useful for dialogs):

```tsx
import { useFocusTrap } from "../a11y";

function Dialog({ isOpen }) {
  const trapRef = useFocusTrap(isOpen);
  return <div ref={trapRef}>...</div>;
}
```

#### useLiveRegion

Creates a live region for screen reader announcements:

```tsx
import { useLiveRegion } from "../a11y";

function Component() {
  const { announce } = useLiveRegion();
  
  const handleAction = () => {
    announce("Action completed successfully");
  };
}
```

### Accessibility Guidelines

1. **Use semantic HTML**: Prefer `<button>` over `<div onClick>`, `<nav>` over `<div>`, etc.

2. **Add ARIA labels**: Use `aria-label` for icons-only buttons:
   ```tsx
   <button aria-label="Close dialog">
     <CloseIcon aria-hidden="true" />
   </button>
   ```

3. **Hide decorative elements**: Use `aria-hidden="true"` for decorative icons:
   ```tsx
   <Icon aria-hidden="true" />
   ```

4. **Focus management**: Ensure dialogs trap focus and return focus when closed.

5. **Color contrast**: Ensure text has sufficient contrast ratio (4.5:1 for normal text).

---

## Internationalization (i18n)

### Overview

The internationalization implementation follows patterns from the eva-i18n library. It provides:

- Translation context and hooks
- Locale switching
- Number/date/time formatting
- Locale persistence

### Directory Structure

```
src/i18n/
├── index.ts           # Main exports
├── types.ts           # TypeScript types
├── i18n.ts            # Core I18n class
├── I18nProvider.tsx   # React context provider
└── locales/
    ├── en.ts          # English translations
    └── es.ts          # Spanish translations
```

### Setting Up i18n

The `I18nProvider` is already set up in `index.tsx`:

```tsx
import { I18nProvider } from "./i18n";

export default function App() {
  return (
    <I18nProvider>
      {/* App content */}
    </I18nProvider>
  );
}
```

### Using Translations

#### useI18n Hook

Use the `useI18n` hook to access translations in components:

```tsx
import { useI18n } from "../i18n";

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      <h1>{t("common.appTitle")}</h1>
      <button onClick={() => setLocale("es")}>
        {t("locale.switchLanguage")}
      </button>
    </div>
  );
}
```

#### Available Functions

The `useI18n` hook returns:

| Function | Description |
|----------|-------------|
| `t(key, vars?)` | Translate a key with optional variables |
| `locale` | Current locale string |
| `setLocale(locale)` | Change the current locale |
| `supportedLocales` | Array of supported locale codes |
| `formatNumber(n, opts?)` | Format a number for the current locale |
| `formatDate(d, opts?)` | Format a date for the current locale |
| `formatTime(d, opts?)` | Format a time for the current locale |

#### Variable Interpolation

Use `{variableName}` in translations for dynamic content:

```ts
// In locale file
{
  greeting: "Hello, {name}!"
}

// In component
t("greeting", { name: "User" }) // "Hello, User!"
```

### Adding New Translations

#### Step 1: Add Keys to Locale Files

Add the new key to all locale files in `src/i18n/locales/`:

```ts
// en.ts
const en: Catalog = {
  myFeature: {
    title: "My Feature",
    description: "This is a new feature"
  }
};

// es.ts
const es: Catalog = {
  myFeature: {
    title: "Mi Característica",
    description: "Esta es una nueva característica"
  }
};
```

#### Step 2: Use in Component

```tsx
const { t } = useI18n();
return <h1>{t("myFeature.title")}</h1>;
```

### Adding a New Locale

#### Step 1: Create Locale File

Create a new file in `src/i18n/locales/` (e.g., `fr.ts`):

```ts
import type { Catalog } from "../types";

const fr: Catalog = {
  common: {
    appTitle: "Assistant d'Information",
    // ... all other keys
  }
};

export default fr;
```

#### Step 2: Register the Locale

Update `src/i18n/I18nProvider.tsx`:

```ts
import fr from "./locales/fr";

const SUPPORTED_LOCALES: Locale[] = ["en", "es", "fr"];

const CATALOGS: Record<Locale, Catalog> = {
  en,
  es,
  fr
};
```

#### Step 3: Add Label for Locale Switcher

Update the `LOCALE_LABELS` in `LocaleSwitcher.tsx`:

```ts
const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français"
};
```

### Translation Key Naming Convention

Use a hierarchical dot notation:

```
page.section.element
```

Examples:
- `common.loading` - Common loading text
- `chat.clearChat` - Chat page clear button
- `nav.manageContent` - Navigation menu item
- `chat.settings.title` - Chat settings panel title

### Best Practices

1. **Group keys logically**: Group by page or feature.

2. **Use descriptive keys**: `chat.errorMessage` not `msg1`.

3. **Keep translations consistent**: Same structure in all locale files.

4. **Test all locales**: Switch locales to verify translations render correctly.

5. **Handle missing translations**: The system returns the key if translation is missing.

---

## Locale Persistence

The selected locale is stored in `localStorage` under the key `info-assistant-locale`. When the app loads, it checks:

1. Stored preference in localStorage
2. Browser language preference
3. Falls back to English

---

## Further Reading

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Fluent UI Accessibility](https://developer.microsoft.com/en-us/fluentui#/controls/web)
