// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { Catalog } from "../types";

/**
 * English (en) locale translations.
 * Keys follow the pattern: page.section.element
 */
const en: Catalog = {
    common: {
        appTitle: "Information Assistant",
        loading: "Loading...",
        error: "An error occurred",
        close: "Close",
        cancel: "Cancel",
        confirm: "Confirm",
        save: "Save",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
        search: "Search",
        clear: "Clear",
        submit: "Submit",
        retry: "Retry",
        back: "Back",
        next: "Next",
        preview: "preview",
        skipToContent: "Skip to main content"
    },
    nav: {
        chat: "Chat",
        manageContent: "Manage Content",
        mathAssistant: "Math Assistant",
        tabularDataAssistant: "Tabular Data Assistant"
    },
    chat: {
        title: "Chat",
        clearChat: "Clear chat",
        adjust: "Adjust",
        info: "Info",
        placeholder: "Type a new question (e.g. Who are Microsoft's top executives, provided as a table?)",
        askQuestion: "Ask question",
        chatWithWorkData: "Chat with your work data",
        chatWithWorkAndWebData: "Chat with your work and web data",
        chatWithLLM: "Chat directly with a LLM",
        askAnything: "Ask anything or try an example",
        transparencyNote: "Information Assistant uses AI. Check for mistakes.",
        transparencyLink: "Transparency Note",
        defaultFromWork: "Questions will be answered by default from Work",
        defaultFromWeb: "Questions will be answered by default from Web",
        modes: {
            workOnly: "Work",
            workPlusWeb: "Work + Web",
            ungrounded: "Ungrounded"
        },
        settings: {
            title: "Configure answer generation",
            defaultDatasource: "Use this datasource to answer Questions by default:",
            web: "Web",
            work: "Work",
            retrieveDocuments: "Retrieve this many documents from search:",
            suggestFollowup: "Suggest follow-up questions",
            userPersona: "User Persona",
            systemPersona: "System Persona",
            filterResults: "Filter Search Results by"
        },
        response: {
            length: "Response Length",
            temperature: "Response Temperature",
            shorter: "Shorter",
            medium: "Medium",
            longer: "Longer",
            creative: "More Creative",
            balanced: "Balanced",
            precise: "More Precise"
        },
        errors: {
            noResponse: "No response body",
            generic: "Sorry, there was an error processing your request."
        }
    },
    content: {
        title: "Manage Content",
        upload: "Upload",
        delete: "Delete",
        refresh: "Refresh",
        status: "Status",
        fileName: "File Name",
        fileSize: "File Size",
        uploadDate: "Upload Date"
    },
    tutor: {
        title: "Math Assistant"
    },
    tda: {
        title: "Tabular Data Assistant"
    },
    a11y: {
        mainContent: "Main content",
        navigation: "Main navigation",
        closeDialog: "Close dialog",
        openMenu: "Open menu",
        expandSection: "Expand section",
        collapseSection: "Collapse section"
    },
    locale: {
        switchLanguage: "Switch language",
        en: "English",
        es: "Español"
    }
};

export default en;
