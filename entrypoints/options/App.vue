<script lang="ts" setup>
import { ConfigProvider, Layout, LayoutContent, LayoutSider, Menu, MenuItem } from 'ant-design-vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <ConfigProvider
        :theme="{
            token: {
                colorPrimary: '#467ee7',
            },
        }"
    >
        <Layout class="h-screen overflow-y-scroll bg-white">
            <LayoutSider class="!bg-white">
                <Menu>
                    <MenuItem key="rules">
                        <RouterLink to="/rules">rules</RouterLink>
                    </MenuItem>
                    <MenuItem key="context">
                        <RouterLink to="/context">context</RouterLink>
                    </MenuItem>
                </Menu>
            </LayoutSider>
            <LayoutContent><RouterView /> </LayoutContent>
        </Layout>
    </ConfigProvider>
</template>
