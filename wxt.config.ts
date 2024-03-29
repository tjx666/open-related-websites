import vue from '@vitejs/plugin-vue';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
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
        css: {
            devSourcemap: true,
        },
        plugins: [
            vue(),
            Components({
                resolvers: [
                    AntDesignVueResolver({
                        importStyle: false,
                    }),
                ],
            }),
        ],
    }),
});
