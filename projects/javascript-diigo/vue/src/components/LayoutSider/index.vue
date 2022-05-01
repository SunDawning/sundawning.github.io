<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <Logo></Logo>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>新建书签</span>
        </a-menu-item>
        <a-menu-item key="2">
          <pie-chart-outlined />
          <span>最近书签</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px"> </a-layout-content>
      <a-layout-footer>
        Copyright © 2022 SunDawning
        <a href="mailto:jobsimi@qq.com">jobsimi@qq.com</a>, All Rights Reserved
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>
import Logo from "./Logo.vue";
</script>
<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
.ant-layout-footer {
  text-align: center;
}
</style>
