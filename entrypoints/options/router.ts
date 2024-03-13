import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import Context from './pages/Context.vue';
import Rules from './pages/Rules.vue';

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/rules' },
    { path: '/context', component: Context },
    { path: '/rules', component: Rules },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
