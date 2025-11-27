// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect } from "react";

/**
 * Adds a data-focus-visible attribute on documentElement when keyboard modality is detected.
 * Works with :focus-visible capable browsers but also improves consistency for styling.
 * Based on eva-i11y useFocusVisible hook.
 */
export function useFocusVisible() {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            // Ignore modifier keys only
            if (e.metaKey || e.altKey || e.ctrlKey) return;
            document.documentElement.setAttribute("data-focus-visible", "true");
        };

        const onPointerDown = () => {
            document.documentElement.removeAttribute("data-focus-visible");
        };

        document.addEventListener("keydown", onKeyDown, true);
        document.addEventListener("mousedown", onPointerDown, true);
        document.addEventListener("pointerdown", onPointerDown, true);
        document.addEventListener("touchstart", onPointerDown, true);

        return () => {
            document.removeEventListener("keydown", onKeyDown, true);
            document.removeEventListener("mousedown", onPointerDown, true);
            document.removeEventListener("pointerdown", onPointerDown, true);
            document.removeEventListener("touchstart", onPointerDown, true);
        };
    }, []);
}
