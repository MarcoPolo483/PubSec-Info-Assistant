// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Text } from "@fluentui/react";
import { Broom24Regular } from "@fluentui/react-icons";

import styles from "./ClearChatButton.module.css";
import { useI18n } from "../../i18n";

interface Props {
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

export const ClearChatButton = ({ className, disabled, onClick }: Props) => {
    const { t } = useI18n();
    
    return (
        <button
            type="button"
            className={`${styles.container} ${className ?? ""} ${disabled ? styles.disabled : ""}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={t("chat.clearChat")}
        >
            <Broom24Regular aria-hidden="true" />
            <Text>{t("chat.clearChat")}</Text>
        </button>
    );
};
