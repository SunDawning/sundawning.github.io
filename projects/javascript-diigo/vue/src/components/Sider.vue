<template>
  <a-layout-sider width="100%">
    <Menu
      @displaySearch="displaySearch"
      :selectedKeys="selectedKeys"
      @displayWelcome="displayWelcome"
      @displayEdit="displayEdit"
      @displayRecent="displayRecent"
      @login="login"
    ></Menu>
  </a-layout-sider>
</template>
<script setup>
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
function login(value) {
  emit("login", value);
}
</script>
<style scoped>
.ant-layout-sider :deep() .ant-layout-sider-children {
  width: 100%;
}
.ant-layout-sider :deep() .ant-menu {
  display: flex;
}
</style>
