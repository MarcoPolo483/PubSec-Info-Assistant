// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Imperative announcement helper. Creates a transient live region and announces text.
 * Based on eva-i11y announce utility.
 */
export function announce(text: string, politeness: "polite" | "assertive" = "polite") {
    const el = document.createElement("div");
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
    el.setAttribute("aria-live", politeness);
    el.setAttribute("aria-atomic", "true");
    document.body.appendChild(el);
    el.textContent = "";
    setTimeout(() => {
        el.textContent = text;
        setTimeout(() => el.remove(), 2000);
    }, 10);
}
