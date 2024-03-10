<script lang="ts" setup>
import { shallowRef } from 'vue';
import { RelatedWebsite } from './adapters/BaseAdapter';
import { WebIdeAdapter } from './adapters';

function loadRelatedWebsites() {
    return [...new WebIdeAdapter().resolve({})];
}

const relatedWebsites = shallowRef<RelatedWebsite[]>(loadRelatedWebsites());

function handleChange(e: Event) {
    e.stopPropagation();
}
</script>

<template>
    <div class="h-screen px-20">
        <main class="mx-auto mt-32 min-w-96 bg-white shadow">
            <input
                class="h-10 w-full border border-solid border-black pl-2"
                @change="handleChange"
            />
            <ul>
                <li
                    class="flex h-10 cursor-pointer items-center border-b p-1"
                    v-for="site of relatedWebsites"
                >
                    <div v-html="site.icon"></div>
                    <div>
                        {{ site.title }}
                        <p>{{ site.description }}</p>
                    </div>
                </li>
            </ul>
        </main>
    </div>
</template>
