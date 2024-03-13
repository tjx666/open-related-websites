import { onMessage, sendMessage } from 'webext-bridge/background';

import type { Command } from '@/lib/commands';

export default defineBackground(() => {
    // because CORS limitation in content script
    onMessage('getNpmPackageJson', async ({ data }) => {
        return fetch(data.url).then((response) => response.json());
    });

    // transfer commands to content script
    browser.commands.onCommand.addListener(async (command) => {
        const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
        sendMessage(
            'triggerCommand',
            { command: command as Command },
            `content-script@${activeTab.id}`,
        );
    });
});
