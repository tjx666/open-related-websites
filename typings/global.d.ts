import { ShadowRootContentScriptUi } from 'wxt/client';
import { App } from 'vue';

declare global {
    interface Window {
        /** Only can be accessed in content script */
        __contentScriptUI__?: ShadowRootContentScriptUi<App<Element>>;
    }
}
