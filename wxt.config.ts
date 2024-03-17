import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'wxt';
import type { Manifest } from 'wxt/browser';

import type { Command } from './lib/commands';

export default defineConfig({
    manifest: {
        name: 'Open Related Website',
        permissions: ['storage'],
        commands: {
            toggleExtension: {
                suggested_key: {
                    default: 'Alt+O',
                },
                description: 'Activate or deactivate extension',
            },
        } satisfies Record<Command, Manifest.WebExtensionManifestCommandsType>,
    },
    runner: {
        chromiumArgs: ['--auto-open-devtools-for-tabs'],
        startUrls: [
            'https://github.com/lodash/lodash',
            'chrome-extension://lliohlaehpeobmekpjhdhlbokgcmhpab/options.html',
        ],
    },
    imports: {
        addons: {
            vueTemplate: true,
        },
    },
    vite: () => ({
        plugins: [vue()],
    }),
});
