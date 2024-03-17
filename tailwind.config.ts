import type { Config } from 'tailwindcss';

export default {
    content: ['./entrypoints/**/*.{html,ts,vue}', './components/**/*.{ts,vue}'],
    theme: {
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
} satisfies Config;
