// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from "react";
import styles from "./SkipLink.module.css";

interface SkipLinkProps {
    href?: string;
    children?: React.ReactNode;
}

/**
 * Skip link component for keyboard users to bypass navigation.
 * Based on eva-i11y SkipLink pattern.
 */
export function SkipLink({ 
    href = "#main", 
    children = "Skip to main content" 
}: SkipLinkProps) {
    return (
        <a href={href} className={styles.skipLink}>
            {children}
        </a>
    );
}
