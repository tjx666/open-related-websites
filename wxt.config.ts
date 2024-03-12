import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'wxt';
import type { Manifest } from 'wxt/browser';

import type { Command } from './lib/commands';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: 'Open Related Website',
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
        startUrls: ['https://github.com/tjx666/react-webpack-boilerplate'],
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
