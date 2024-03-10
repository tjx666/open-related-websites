import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: 'Open Related Website',
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
