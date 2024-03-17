import type { JsonValue } from 'type-fest';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import { storage } from 'wxt/storage';

export function useSyncStorage<V extends JsonValue>(key: string): Ref<V | null>;
export function useSyncStorage<V extends JsonValue>(key: string, defaultValue: V): Ref<V>;
export function useSyncStorage<V extends JsonValue>(key: string, defaultValue?: V) {
    const v = ref(defaultValue === undefined ? null : defaultValue) as Ref<V | null>;

    const syncKey = `sync:${key}`;
    async function syncStorage() {
        const storageValue = await storage.getItem<V>(syncKey);
        if (storageValue !== null) {
            v.value = storageValue;
        }
    }
    syncStorage();

    watch(v, async () => {
        await storage.setItem(syncKey, v.value);
    });

    return v;
}
