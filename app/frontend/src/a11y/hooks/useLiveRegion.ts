// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useRef, useCallback } from "react";

type Politeness = "polite" | "assertive";

/**
 * Creates a live region and returns an announce function.
 * Based on eva-i11y useLiveRegion hook.
 */
export function useLiveRegion(politeness: Politeness = "polite") {
    const nodeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = document.createElement("div");
        el.setAttribute("aria-live", politeness);
        el.setAttribute("aria-atomic", "true");
        // Screen-reader only styles
        el.style.cssText = `
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
        `;
        document.body.appendChild(el);
        nodeRef.current = el;
        return () => {
            el.remove();
            nodeRef.current = null;
        };
    }, [politeness]);

    const announce = useCallback((message: string) => {
        const el = nodeRef.current;
        if (!el) return;
        el.textContent = ""; // flush to ensure change is detected
        // tiny delay to ensure assistive tech announces repeated same text
        setTimeout(() => {
            if (nodeRef.current) nodeRef.current.textContent = message;
        }, 10);
    }, []);

    return { announce };
}
