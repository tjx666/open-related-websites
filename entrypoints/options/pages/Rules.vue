<script lang="ts" setup>
import type { TableColumnType } from 'ant-design-vue';

import { useRules } from '../composables/useRules';
import { useSyncStorage } from '../composables/useStorage';

const columns: TableColumnType[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
];
const showBuiltinRules = useSyncStorage<boolean>('showBuiltinRules', false);
const dataSource = useRules(showBuiltinRules);
</script>

<template>
    <div>
        <div class="my-6">
            <label>
                <a-switch v-model:checked="showBuiltinRules" />
                <span>Show builtin</span>
            </label>
        </div>
        <a-table :columns :data-source />
    </div>
</template>

<style scoped>
label {
    @apply flex w-fit items-center justify-center;

    button {
        @apply mr-2;
    }
}
</style>
