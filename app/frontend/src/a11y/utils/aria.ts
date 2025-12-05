// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Helpers to compose common aria attributes safely.
 * Based on eva-i11y aria utilities.
 */
export function labelledBy(id: string | undefined) {
    return id ? { "aria-labelledby": id } : {};
}

export function describedBy(id: string | undefined) {
    return id ? { "aria-describedby": id } : {};
}

export function controls(id: string | undefined) {
    return id ? { "aria-controls": id } : {};
}
