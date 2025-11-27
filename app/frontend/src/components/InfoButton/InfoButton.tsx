// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Text } from "@fluentui/react";
import { Info24Regular } from "@fluentui/react-icons";
import styles from "./InfoButton.module.css";
import { useI18n } from "../../i18n";

interface Props {
    className?: string;
    onClick: () => void;
}

export const InfoButton = ({ className, onClick }: Props) => {
    const { t } = useI18n();
    
    return (
        <button
            type="button"
            className={`${styles.container} ${className ?? ""}`}
            onClick={onClick}
            aria-label={t("chat.info")}
        >
            <Info24Regular aria-hidden="true" />
            <Text>{t("chat.info")}</Text>
        </button>
    );
};
