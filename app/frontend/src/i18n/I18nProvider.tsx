// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { I18n } from "./i18n";
import type { Locale, Catalog } from "./types";

// Import locale catalogs
import en from "./locales/en";
import es from "./locales/es";

interface I18nContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, vars?: Record<string, unknown>) => string;
    formatNumber: (n: number, opts?: Intl.NumberFormatOptions) => string;
    formatDate: (d: Date | number, opts?: Intl.DateTimeFormatOptions) => string;
    formatTime: (d: Date | number, opts?: Intl.DateTimeFormatOptions) => string;
    supportedLocales: Locale[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "info-assistant-locale";
const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES: Locale[] = ["en", "es"];

// Catalog registry
const CATALOGS: Record<Locale, Catalog> = {
    en,
    es
};

interface I18nProviderProps {
    children: React.ReactNode;
    defaultLocale?: Locale;
}

/**
 * I18n Provider component - wraps the app and provides translation context.
 * Based on eva-i18n patterns.
 */
export function I18nProvider({ 
    children, 
    defaultLocale = DEFAULT_LOCALE 
}: I18nProviderProps) {
    // Initialize locale from localStorage or default
    const [locale, setLocaleState] = useState<Locale>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED_LOCALES.includes(stored)) {
                return stored;
            }
            // Try to detect browser locale
            const browserLang = navigator.language?.split("-")[0];
            if (browserLang && SUPPORTED_LOCALES.includes(browserLang)) {
                return browserLang;
            }
        }
        return defaultLocale;
    });

    // Create I18n instance
    const i18n = useMemo(() => {
        const instance = new I18n({
            defaultLocale: DEFAULT_LOCALE,
            supportedLocales: SUPPORTED_LOCALES
        });
        // Add all catalogs
        for (const [loc, catalog] of Object.entries(CATALOGS)) {
            instance.addCatalog(loc, catalog);
        }
        instance.setLocale(locale);
        return instance;
    }, [locale]);

    // Set locale and persist
    const setLocale = useCallback((newLocale: Locale) => {
        if (SUPPORTED_LOCALES.includes(newLocale)) {
            setLocaleState(newLocale);
            localStorage.setItem(STORAGE_KEY, newLocale);
            // Update document lang attribute
            document.documentElement.lang = newLocale;
        }
    }, []);

    // Update document lang on mount and locale change
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const contextValue = useMemo<I18nContextValue>(() => ({
        locale,
        setLocale,
        t: (key, vars) => i18n.t(key, vars),
        formatNumber: (n, opts) => i18n.formatNumber(n, opts),
        formatDate: (d, opts) => i18n.formatDate(d, opts),
        formatTime: (d, opts) => i18n.formatTime(d, opts),
        supportedLocales: SUPPORTED_LOCALES
    }), [locale, setLocale, i18n]);

    return (
        <I18nContext.Provider value={contextValue}>
            {children}
        </I18nContext.Provider>
    );
}

/**
 * Hook to access i18n context.
 */
export function useI18n(): I18nContextValue {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error("useI18n must be used within an I18nProvider");
    }
    return context;
}
