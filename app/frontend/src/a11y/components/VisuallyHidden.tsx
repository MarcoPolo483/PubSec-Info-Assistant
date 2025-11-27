// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from "react";
import styles from "./VisuallyHidden.module.css";

interface VisuallyHiddenProps {
    children: React.ReactNode;
    as?: keyof JSX.IntrinsicElements;
}

/**
 * VisuallyHidden component hides content visually but keeps it accessible
 * to screen readers. Based on eva-i11y sr-only pattern.
 */
export function VisuallyHidden({ 
    children, 
    as: Component = "span" 
}: VisuallyHiddenProps) {
    return (
        <Component className={styles.visuallyHidden}>
            {children}
        </Component>
    );
}
