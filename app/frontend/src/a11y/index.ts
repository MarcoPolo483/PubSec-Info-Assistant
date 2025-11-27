// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Accessibility (a11y) utilities based on eva-i11y patterns.
 * Provides accessible components, hooks, and utilities for WCAG compliance.
 */

export { SkipLink } from "./components/SkipLink";
export { VisuallyHidden } from "./components/VisuallyHidden";
export { useFocusVisible } from "./hooks/useFocusVisible";
export { useFocusTrap } from "./hooks/useFocusTrap";
export { useLiveRegion } from "./hooks/useLiveRegion";
export { announce } from "./utils/announce";
export { labelledBy, describedBy, controls } from "./utils/aria";
