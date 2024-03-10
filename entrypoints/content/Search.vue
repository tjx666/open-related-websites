<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import Fuse from 'fuse.js';
import { computed, ref, shallowRef } from 'vue';

import { useEscListener } from '@/hooks/useEscListener';

import { adapters } from './adapters';
import type { RelatedWebsite } from './adapters/BaseAdapter';
import type { ResolveContext } from './createContext';
import { createContext } from './createContext';

function loadRelatedWebsites(context: ResolveContext) {
    return adapters
        .filter((adapter) => adapter.matches.some((regexp) => regexp.test(context.url)))
        .flatMap((adapter) => adapter.resolve(context));
}
const context = createContext();
const relatedWebsites = shallowRef<RelatedWebsite[]>(loadRelatedWebsites(context));

// fuzzy search
const searchStr = ref('');
const filteredWebsites = computed(() => {
    if (searchStr.value.trim() === '') return relatedWebsites.value;

    return new Fuse(relatedWebsites.value, {
        keys: ['name', 'title', 'description'],
    })
        .search(searchStr.value)
        .map((item) => {
            return item.item;
        });
});

// exit
const root = ref<HTMLDivElement>();
function exit() {
    window.__contentScriptUI__.remove();
}
useEscListener(exit, root);
const main = ref<HTMLDivElement>();
onClickOutside(main, exit);

function openWebsite(site: RelatedWebsite) {
    window.open(site.url, site.openInNewTab ? '_blank' : '_self');
}
</script>

<template>
    <div ref="root" class="h-screen px-20">
        <main ref="main" class="mx-auto mt-32 min-w-96 max-w-2xl bg-white shadow">
            <input
                v-model="searchStr"
                class="h-10 w-full border border-solid border-black pl-2"
                autofocus
            />
            <ul class="max-h-80 overflow-y-scroll overscroll-contain">
                <li
                    v-for="site of filteredWebsites"
                    :key="site.name"
                    class="flex h-10 cursor-pointer items-center border-b p-1 hover:bg-gray-300"
                    @click="openWebsite(site)"
                >
                    <div v-if="site.icon" class="mr-2" v-html="site.icon"></div>
                    <p class="overflow-hidden text-ellipsis whitespace-nowrap">
                        <span class="mr-2 font-bold">{{ site.title }}</span>
                        <span class="text-gray-600">{{ site.description }}</span>
                    </p>
                </li>
            </ul>
        </main>
    </div>
</template>
