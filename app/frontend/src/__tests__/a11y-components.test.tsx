// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { SkipLink } from '../a11y/components/SkipLink';
import { VisuallyHidden } from '../a11y/components/VisuallyHidden';

// Helper to run axe accessibility checks
async function checkA11y(container: HTMLElement) {
    const results = await axe.run(container);
    return results;
}

describe('SkipLink', () => {
    it('renders with default text', () => {
        render(<SkipLink />);
        
        const link = screen.getByRole('link', { name: /skip to main content/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '#main');
    });

    it('renders with custom href and children', () => {
        render(<SkipLink href="#content">Skip to content</SkipLink>);
        
        const link = screen.getByRole('link', { name: /skip to content/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '#content');
    });

    it('is accessible', async () => {
        const { container } = render(<SkipLink />);
        const results = await checkA11y(container);
        
        // Filter for critical violations
        const criticalViolations = results.violations.filter(
            v => v.impact === 'critical' || v.impact === 'serious'
        );
        
        expect(criticalViolations).toHaveLength(0);
    });
});

describe('VisuallyHidden', () => {
    it('renders children', () => {
        render(<VisuallyHidden>Hidden text</VisuallyHidden>);
        
        expect(screen.getByText('Hidden text')).toBeInTheDocument();
    });

    it('uses span by default', () => {
        render(<VisuallyHidden>Test</VisuallyHidden>);
        
        const element = screen.getByText('Test');
        expect(element.tagName).toBe('SPAN');
    });

    it('can use different element type', () => {
        render(<VisuallyHidden as="div">Test</VisuallyHidden>);
        
        const element = screen.getByText('Test');
        expect(element.tagName).toBe('DIV');
    });

    it('applies visually hidden styles', () => {
        render(<VisuallyHidden>Hidden</VisuallyHidden>);
        
        const element = screen.getByText('Hidden');
        // The class should be applied
        expect(element.className).toContain('visuallyHidden');
    });
});
