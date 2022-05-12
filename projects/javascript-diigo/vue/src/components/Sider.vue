<template>
  <a-layout-sider width="104">
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
