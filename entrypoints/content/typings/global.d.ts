import { ShadowRootContentScriptUi } from 'wxt/client';
import { App } from 'vue';

declare global {
    interface Window {
        __contentScriptUI__: ShadowRootContentScriptUi<App<Element>>;
    }
}
