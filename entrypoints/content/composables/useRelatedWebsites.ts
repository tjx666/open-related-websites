import Fuse from 'fuse.js';
import type { Ref } from 'vue';
import { computed, shallowRef } from 'vue';
import { onMessage, sendMessage } from 'webext-bridge/content-script';

import type { RelatedWebsite } from '@/entrypoints/background/rules/BaseRule';

import { createPageContext } from '../createPageContext';

export function useRelatedWebsites(searchStr: Ref<string>) {
    const relatedWebsites = shallowRef<RelatedWebsite[]>([]);

    (async function () {
        const syncResult = await sendMessage('getRelatedWebsites', {
            context: await createPageContext(),
        });
        relatedWebsites.value = syncResult;
    })();

    onMessage('asyncUpdateRelatedWebsites', ({ data }) => {
        relatedWebsites.value = [...relatedWebsites.value, ...data.moreRelatedWebsites];
    });

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
    return filteredWebsites;
}
