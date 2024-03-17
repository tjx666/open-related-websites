import type { Ref } from 'vue';
import { shallowRef, watch } from 'vue';
import { sendMessage } from 'webext-bridge/options';

import type { RuleItem } from '@/entrypoints/background/services/getRules';

export function useRules(showBuiltin: Ref<boolean>) {
    const rules = shallowRef<RuleItem[]>([]);

    async function updateRules() {
        let allRules = await sendMessage('getRules', {});
        if (showBuiltin.value === false) {
            allRules = allRules.filter((rule) => !rule.isBuiltin);
        }
        rules.value = allRules;
    }

    watch(showBuiltin, () => {
        updateRules();
    });

    return rules;
}
