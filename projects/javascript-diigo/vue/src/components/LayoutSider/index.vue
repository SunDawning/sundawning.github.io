<template>
  <a-layout style="min-height: 100vh">
    <Sider class="sider" @displayRecent="displayRecent"></Sider>
    <Content class="content" :displayRecent="state.displayRecent"></Content>
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
.sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
.content {
  margin-left: 200px;
}
</style>
