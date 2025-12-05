// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Outlet, NavLink } from "react-router-dom";
import openai from "../../assets/openai.svg";
import { WarningBanner } from "../../components/WarningBanner/WarningBanner";
import { LocaleSwitcher } from "../../components/LocaleSwitcher";
import styles from "./Layout.module.css";
import { Title } from "../../components/Title/Title";
import { getFeatureFlags, GetFeatureFlagsResponse } from "../../api";
import { useEffect, useState } from "react";
import { useI18n } from "../../i18n";

export const Layout = () => {
    const [featureFlags, setFeatureFlags] = useState<GetFeatureFlagsResponse | null>(null);
    const { t } = useI18n();

    async function fetchFeatureFlags() {
        try {
            const fetchedFeatureFlags = await getFeatureFlags();
            setFeatureFlags(fetchedFeatureFlags);
        } catch (error) {
            // Handle the error here
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFeatureFlags();
    }, []);

    return (
        <div className={styles.layout}>
            <header className={styles.header} role="banner">
                <WarningBanner />
                <div className={styles.headerContainer}>
                    <div className={styles.headerTitleContainer}>
                        <img src={openai} alt="Azure OpenAI" className={styles.headerLogo} />
                        <h3 className={styles.headerTitle}><Title /></h3>
                    </div>
                    <nav aria-label={t("a11y.navigation")}>
                        <ul className={styles.headerNavList} role="list">
                            <li>
                                <NavLink 
                                    to="/" 
                                    className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                >
                                    {t("nav.chat")}
                                </NavLink>
                            </li>
                            <li className={styles.headerNavLeftMargin}>
                                <NavLink 
                                    to="/content" 
                                    className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                >
                                    {t("nav.manageContent")}
                                </NavLink>
                            </li>
                            {featureFlags?.ENABLE_MATH_ASSISTANT &&
                                <li className={styles.headerNavLeftMargin}>
                                    <NavLink 
                                        to="/tutor" 
                                        className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                    >
                                        {t("nav.mathAssistant")}
                                        <br />  
                                        <span className={styles.centered}>({t("common.preview")})</span>
                                    </NavLink>
                                </li>
                            }
                            {featureFlags?.ENABLE_TABULAR_DATA_ASSISTANT &&
                                <li className={styles.headerNavLeftMargin}>
                                    <NavLink 
                                        to="/tda" 
                                        className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                    >
                                        {t("nav.tabularDataAssistant")}
                                        <br />  
                                        <span className={styles.centered}>({t("common.preview")})</span>
                                    </NavLink>
                                </li>
                            }
                        </ul>
                    </nav>
                    <div className={styles.localeSwitcherContainer}>
                        <LocaleSwitcher />
                    </div>
                </div>
            </header>

            <main id="main" role="main" tabIndex={-1}>
                <Outlet />
            </main>

            <footer role="contentinfo">
                <WarningBanner />
            </footer>
        </div>
    );
};
