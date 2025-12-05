// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Types for the i18n system, based on eva-i18n type definitions.
 */

export type Locale = string;

// Use interface for recursive types to avoid circular reference error
export interface Catalog {
    [key: string]: string | Catalog;
}

export type Variables = Record<string, unknown>;

export interface I18nOptions {
    defaultLocale: Locale;
    supportedLocales?: Locale[];
}
