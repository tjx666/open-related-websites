import '~/assets/main.css';

import { toggleExtension } from './toggleExtension';
import { onCommand } from './utils/message';

export default defineContentScript({
    matches: ['https://github.com/*', 'https://www.npmjs.com/*'],
    cssInjectionMode: 'ui',
    async main(ctx) {
        onCommand('toggleExtension', async () => {
            await toggleExtension(ctx);
        });
    },
});
