import { createApp } from 'vue';
import App from './Search.vue';
import '~/assets/main.css';

export default defineContentScript({
    matches: ['https://github.com/*', 'https://gitlab.com/*'],
    cssInjectionMode: 'ui',
    async main(ctx) {
        const ui = await createShadowRootUi(ctx, {
            name: 'open-related-website',
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
