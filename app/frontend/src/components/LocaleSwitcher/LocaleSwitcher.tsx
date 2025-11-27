// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Dropdown, IDropdownOption } from "@fluentui/react";
import { Globe20Regular } from "@fluentui/react-icons";
import { useI18n } from "../../i18n";
import styles from "./LocaleSwitcher.module.css";

const LOCALE_LABELS: Record<string, string> = {
    en: "English",
    es: "Español"
};

/**
 * Locale switcher dropdown component.
 * Allows users to change the application language.
 */
export function LocaleSwitcher() {
    const { locale, setLocale, supportedLocales, t } = useI18n();

    const options: IDropdownOption[] = supportedLocales.map(loc => ({
        key: loc,
        text: LOCALE_LABELS[loc] || loc
    }));

    const handleChange = (_: unknown, option?: IDropdownOption) => {
        if (option?.key) {
            setLocale(option.key as string);
        }
    };

    return (
        <div className={styles.container}>
            <Globe20Regular className={styles.icon} aria-hidden="true" />
            <Dropdown
                selectedKey={locale}
                options={options}
                onChange={handleChange}
                ariaLabel={t("locale.switchLanguage")}
                className={styles.dropdown}
                styles={{
                    dropdown: { minWidth: 100 },
                    title: { border: "none", background: "transparent" }
                }}
            />
        </div>
    );
}
