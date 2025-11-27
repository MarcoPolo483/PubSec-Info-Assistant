// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nProvider, useI18n } from '../i18n';

// Test component that uses the i18n hook
function TestComponent() {
    const { t, locale, setLocale, supportedLocales } = useI18n();
    return (
        <div>
            <span data-testid="locale">{locale}</span>
            <span data-testid="app-title">{t('common.appTitle')}</span>
            <span data-testid="nav-chat">{t('nav.chat')}</span>
            <button onClick={() => setLocale('es')} data-testid="switch-es">
                Switch to Spanish
            </button>
            <button onClick={() => setLocale('en')} data-testid="switch-en">
                Switch to English
            </button>
            <span data-testid="supported">{supportedLocales.join(',')}</span>
        </div>
    );
}

describe('I18nProvider', () => {
    it('provides default English locale', () => {
        render(
            <I18nProvider>
                <TestComponent />
            </I18nProvider>
        );

        expect(screen.getByTestId('locale')).toHaveTextContent('en');
        expect(screen.getByTestId('app-title')).toHaveTextContent('Information Assistant');
        expect(screen.getByTestId('nav-chat')).toHaveTextContent('Chat');
    });

    it('provides list of supported locales', () => {
        render(
            <I18nProvider>
                <TestComponent />
            </I18nProvider>
        );

        expect(screen.getByTestId('supported')).toHaveTextContent('en,es');
    });

    it('allows switching to Spanish locale', () => {
        render(
            <I18nProvider>
                <TestComponent />
            </I18nProvider>
        );

        // Click switch to Spanish
        fireEvent.click(screen.getByTestId('switch-es'));

        expect(screen.getByTestId('locale')).toHaveTextContent('es');
        expect(screen.getByTestId('app-title')).toHaveTextContent('Asistente de Información');
        expect(screen.getByTestId('nav-chat')).toHaveTextContent('Chat');
    });

    it('switches back to English from Spanish', () => {
        render(
            <I18nProvider>
                <TestComponent />
            </I18nProvider>
        );

        // Switch to Spanish first
        fireEvent.click(screen.getByTestId('switch-es'));
        expect(screen.getByTestId('locale')).toHaveTextContent('es');

        // Switch back to English
        fireEvent.click(screen.getByTestId('switch-en'));
        expect(screen.getByTestId('locale')).toHaveTextContent('en');
        expect(screen.getByTestId('app-title')).toHaveTextContent('Information Assistant');
    });
});

describe('useI18n hook', () => {
    it('throws error when used outside provider', () => {
        const consoleError = console.error;
        console.error = vi.fn();

        expect(() => {
            render(<TestComponent />);
        }).toThrow('useI18n must be used within an I18nProvider');

        console.error = consoleError;
    });
});
