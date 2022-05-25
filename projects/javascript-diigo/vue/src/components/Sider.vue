<template>
  <a-layout-sider width="100%">
    <Menu
      @displaySearch="displaySearch"
      :selectedKeys="selectedKeys"
      @displayWelcome="displayWelcome"
      @displayEdit="displayEdit"
      @displayRecent="displayRecent"
      @displayFeedback="displayFeedback"
      @displayBlogMode="displayBlogMode"
      @login="login"
    ></Menu>
  </a-layout-sider>
</template>
<script setup>
import Menu from "./Menu.vue";
defineProps({
  selectedKeys: Array,
});
const emit = defineEmits();
function displaySearch(value) {
  emit("displaySearch", value);
}
function displayWelcome(value) {
  emit("displayWelcome", value);
}
function displayEdit(value) {
  emit("displayEdit", value);
}
function displayRecent(value) {
  emit("displayRecent", value);
}
function displayFeedback(value) {
  emit("displayFeedback", value);
}
function displayBlogMode(value) {
  emit("displayBlogMode", value);
}
function login(value) {
  emit("login", value);
}
</script>
<style scoped>
.ant-layout-sider :deep() .ant-menu-horizontal {
  height: 100%;
  border-radius: 8px;
  border: 1px solid #001529;
}
</style>
