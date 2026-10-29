import { useSyncExternalStore } from 'react';
import {
    installPromptStore,
    promptInstall,
} from '@/shared/pwa/install-prompt.ts';

const DISMISS_KEY = 'pwa-install-dismissed-at';
const DISMISS_DAYS = 14;

export const wasInstallDismissedRecently = () => {
    try {
        const raw = localStorage.getItem(DISMISS_KEY);
        if (!raw) return false;
        return Date.now() - Number(raw) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
    } catch {
        return false;
    }
};

export const rememberInstallDismissed = () => {
    try {
        localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
        console.error('Failed to remember install dismissed');
    }
};

export const useInstallPrompt = () => {
    const snapshot = useSyncExternalStore(
        installPromptStore.subscribe,
        installPromptStore.getSnapshot,
    );

    return { ...snapshot, promptInstall };
};
