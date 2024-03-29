import { createApp } from 'vue';
import type { ContentScriptContext } from 'wxt/client';

import App from './Search.vue';

export function exit() {
    if (window.__contentScriptUI__) {
        window.__contentScriptUI__.remove();
        window.__contentScriptUI__ = undefined;
    }
}

export async function openRelatedWebsite(ctx: ContentScriptContext) {
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
}

export async function toggleExtension(ctx: ContentScriptContext) {
    if (window.__contentScriptUI__) {
        exit();
    } else {
        await openRelatedWebsite(ctx);
    }
}
