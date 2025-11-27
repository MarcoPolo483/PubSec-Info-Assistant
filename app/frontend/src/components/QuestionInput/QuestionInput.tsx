// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useState } from "react";
import { Stack, TextField } from "@fluentui/react";
import { Send28Filled, Broom28Filled } from "@fluentui/react-icons";
import { RAIPanel } from "../RAIPanel";

import styles from "./QuestionInput.module.css";
import { useI18n } from "../../i18n";

interface Props {
    onSend: (question: string) => void;
    disabled: boolean;
    placeholder?: string;
    clearOnSend?: boolean;
    onAdjustClick?: () => void;
    onInfoClick?: () => void;
    showClearChat?: boolean;
    onClearClick?: () => void;
    onRegenerateClick?: () => void;
}

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, onAdjustClick, showClearChat, onClearClick, onRegenerateClick }: Props) => {
    const [question, setQuestion] = useState<string>("");
    const { t } = useI18n();

    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }

        onSend(question);

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setQuestion("");
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    };

    const sendQuestionDisabled = disabled || !question.trim();

    const [clearChatTextEnabled, setClearChatTextEnable] = useState<boolean>(true); 
    
    const onMouseEnter = () => {
        setClearChatTextEnable(false);
    }

    const onMouseLeave = () => {
        setClearChatTextEnable(true);
    }

    const handleClearKeyDown = (ev: React.KeyboardEvent) => {
        if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            onClearClick?.();
        }
    };

    const handleSendKeyDown = (ev: React.KeyboardEvent) => {
        if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            sendQuestion();
        }
    };

    return (
        <Stack>
            <Stack.Item>
            <Stack horizontal className={styles.questionInputContainer}>
                {showClearChat ? (
                    <div className={styles.questionClearButtonsContainer}>
                        <button
                            type="button"
                            className={styles.questionClearChatButton}
                            aria-label={t("chat.clearChat")}
                            onClick={onClearClick}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onKeyDown={handleClearKeyDown}
                        >
                            <Broom28Filled primaryFill="rgba(255, 255, 255, 1)" aria-hidden="true" />
                            <span hidden={clearChatTextEnabled}>{t("chat.clearChat")}</span>
                        </button>
                    </div>
                )
                : null}
                <TextField
                    className={styles.questionInputTextArea}
                    placeholder={placeholder || t("chat.placeholder")}
                    multiline
                    resizable={false}
                    borderless
                    value={question}
                    onChange={onQuestionChange}
                    onKeyDown={onEnterPress}
                    aria-label={t("chat.placeholder")}
                />
                <div className={styles.questionInputButtonsContainer}>
                    <button
                        type="button"
                        className={`${styles.questionInputSendButton} ${sendQuestionDisabled ? styles.questionInputSendButtonDisabled : ""}`}
                        aria-label={t("chat.askQuestion")}
                        onClick={sendQuestion}
                        onKeyDown={handleSendKeyDown}
                        disabled={sendQuestionDisabled}
                    >
                        <Send28Filled primaryFill="rgba(115, 118, 225, 1)" aria-hidden="true" />
                    </button>
                </div>
            </Stack>
            </Stack.Item>
            <Stack.Item align="center">
                <RAIPanel onAdjustClick={onAdjustClick} onRegenerateClick={onRegenerateClick} />
            </Stack.Item>
        </Stack>
    );
};
