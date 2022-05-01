<template>
  <a-layout style="min-height: 100vh">
    <Sider></Sider>
    <Content></Content>
  </a-layout>
</template>
<script setup>
import Sider from "./Sider/index.vue";
import Content from "./Content.vue";
</script>
<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
