// 1. Import the style
import { createApp } from 'vue';
import App from './Search.vue';
import '~/assets/main.css';

export default defineContentScript({
    matches: ['https://github.com/*', 'https://gitlab.com/*'],
    // 2. Set cssInjectionMode
    cssInjectionMode: 'ui',

    async main(ctx) {
        // 3. Define your UI
        const ui = await createShadowRootUi(ctx, {
            name: 'open-related-website',
            position: 'modal',
            isolateEvents: true,
            onMount: (container) => {
                // Define how your UI will be mounted inside the container
                const app = createApp(App);
                app.mount(container);
                return app;
            },
            onRemove: (app) => {
                // Unmount the app when the UI is removed
                app?.unmount();
            },
        });

        // 4. Mount the UI
        ui.mount();
    },
});
