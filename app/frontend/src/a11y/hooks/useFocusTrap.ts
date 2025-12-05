// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useRef } from "react";

/**
 * Focus trap: when active, cycling Tab stays within the container.
 * Usage: const trapRef = useFocusTrap(isOpen); <div ref={trapRef}>...</div>
 * Based on eva-i11y useFocusTrap hook.
 */
export function useFocusTrap(active: boolean) {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!active) return;
        const root = ref.current;
        if (!root) return;

        const focusable = () => {
            const nodes = root.querySelectorAll<HTMLElement>(
                [
                    "a[href]",
                    "area[href]",
                    "button:not([disabled])",
                    "input:not([disabled])",
                    "select:not([disabled])",
                    "textarea:not([disabled])",
                    "[tabindex]:not([tabindex='-1'])"
                ].join(",")
            );
            return Array.from(nodes).filter((n) => n.offsetParent !== null || n === document.activeElement);
        };

        const onKeydown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;
            const nodes = focusable();
            if (nodes.length === 0) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            const current = document.activeElement as HTMLElement | null;
            if (e.shiftKey) {
                if (current === first || !root.contains(current)) {
                    last.focus();
                    e.preventDefault();
                }
            } else {
                if (current === last || !root.contains(current)) {
                    first.focus();
                    e.preventDefault();
                }
            }
        };

        root.addEventListener("keydown", onKeydown);
        return () => root.removeEventListener("keydown", onKeydown);
    }, [active]);

    return ref;
}
