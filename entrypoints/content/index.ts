import '~/assets/main.css';

import { createApp } from 'vue';

import App from './Search.vue';

export default defineContentScript({
    matches: ['https://*/*'],
    cssInjectionMode: 'ui',
    async main(ctx) {
        const ui = await createShadowRootUi(ctx, {
            name: 'open-related-website',
            zIndex: 9999,
            position: 'modal',
            isolateEvents: true,
            onMount: (container) => {
                const app = createApp(App);
                app.mount(container);
                return app;
            },
            onRemove: (app) => {
                app?.unmount();
            },
        });

        window.__contentScriptUI__ = ui;
        ui.mount();
    },
});
