// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { Catalog, Locale, Variables, I18nOptions } from "./types";

/**
 * Simple message lookup - supports nested keys with dot notation.
 */
function getMessage(catalog: Catalog | undefined, key: string): string | undefined {
    if (!catalog) return undefined;
    const parts = key.split(".");
    let cur: string | Catalog | undefined = catalog;
    for (const p of parts) {
        if (cur == null || typeof cur === "string") return undefined;
        cur = cur[p];
    }
    return typeof cur === "string" ? cur : undefined;
}

/**
 * Merge catalogs (shallow merge for nested structures).
 */
function mergeCatalogs(base: Catalog, extra: Catalog): Catalog {
    const out: Catalog = { ...base };
    for (const [k, v] of Object.entries(extra)) {
        if (typeof v === "string") {
            out[k] = v;
        } else {
            out[k] = mergeCatalogs((out[k] as Catalog) || {}, v);
        }
    }
    return out;
}

/**
 * Simple variable interpolation for messages.
 * Supports {variableName} syntax.
 */
function interpolate(message: string, vars: Variables): string {
    return message.replace(/\{(\w+)\}/g, (_, key) => {
        const val = vars[key];
        return val !== undefined ? String(val) : `{${key}}`;
    });
}

/**
 * I18n class - manages translations and locale.
 * Based on eva-i18n I18n class.
 */
export class I18n {
    private current: Locale;
    private defaultLocale: Locale;
    private supported: Locale[];
    private catalogs = new Map<Locale, Catalog>();

    constructor(opts: I18nOptions) {
        this.defaultLocale = opts.defaultLocale;
        this.current = opts.defaultLocale;
        this.supported = opts.supportedLocales ?? [opts.defaultLocale];
    }

    getLocale(): Locale {
        return this.current;
    }

    getDefaultLocale(): Locale {
        return this.defaultLocale;
    }

    getSupportedLocales(): Locale[] {
        return [...this.supported];
    }

    setLocale(locale: Locale): void {
        if (this.supported.includes(locale)) {
            this.current = locale;
        }
    }

    addCatalog(locale: Locale, catalog: Catalog): void {
        const existing = this.catalogs.get(locale);
        this.catalogs.set(locale, existing ? mergeCatalogs(existing, catalog) : catalog);
    }

    /**
     * Translate a key with optional variable interpolation.
     */
    t(key: string, vars: Variables = {}): string {
        const pattern = this.resolveMessage(key, this.current);
        if (pattern == null) {
            return key; // Return key as fallback
        }
        return interpolate(pattern, vars);
    }

    private resolveMessage(key: string, locale: Locale): string | undefined {
        // Try exact locale, then language base, then default
        const langs = [locale, locale.split("-")[0], this.defaultLocale];
        for (const lang of langs) {
            const cat = this.catalogs.get(lang);
            const msg = getMessage(cat, key);
            if (msg != null) return msg;
        }
        return undefined;
    }

    formatNumber(n: number, opts?: Intl.NumberFormatOptions): string {
        return new Intl.NumberFormat(this.current, opts).format(n);
    }

    formatDate(d: Date | number, opts?: Intl.DateTimeFormatOptions): string {
        const date = typeof d === "number" ? new Date(d) : d;
        return new Intl.DateTimeFormat(this.current, opts).format(date);
    }

    formatTime(d: Date | number, opts?: Intl.DateTimeFormatOptions): string {
        const date = typeof d === "number" ? new Date(d) : d;
        return new Intl.DateTimeFormat(this.current, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            ...opts
        }).format(date);
    }
}
