import { onMessage } from 'webext-bridge/background';

export default defineBackground(() => {
    // because CORS limitation in content script
    onMessage('getNpmPackageJson', async ({ data }) => {
        return fetch(data.url).then((response) => response.json());
    });
});
