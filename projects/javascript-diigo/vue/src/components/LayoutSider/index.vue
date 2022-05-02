<template>
  <a-layout style="min-height: 100vh">
    <Sider ref="sider"></Sider>
    <Content ref="content"></Content>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import Sider from "./Sider/index.vue";
import Content from "./Content.vue";
const content = ref(null);
const sider = ref(null);
</script>
<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
