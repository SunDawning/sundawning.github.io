<template>
  <a-layout style="min-height: 100vh">
    <Sider @displayRecent="displayRecent"></Sider>
    <Content :displayRecent="state.displayRecent"></Content>
  </a-layout>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({
  displayRecent: false,
});
function displayRecent(value) {
  state.displayRecent = value;
}
</script>
<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
