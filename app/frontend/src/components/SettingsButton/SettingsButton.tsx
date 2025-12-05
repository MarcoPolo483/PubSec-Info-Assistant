// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Text } from "@fluentui/react";
import { Options24Filled } from "@fluentui/react-icons";

import styles from "./SettingsButton.module.css";
import { useI18n } from "../../i18n";

interface Props {
    className?: string;
    onClick: () => void;
}

export const SettingsButton = ({ className, onClick }: Props) => {
    const { t } = useI18n();
    
    return (
        <button
            type="button"
            className={`${styles.container} ${className ?? ""}`}
            onClick={onClick}
            aria-label={t("chat.adjust")}
        >
            <Options24Filled aria-hidden="true" />
            <Text>{t("chat.adjust")}</Text>
        </button>
    );
};
