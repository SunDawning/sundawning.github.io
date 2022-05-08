<template>
  <a-layout-sider width="104">
    <Menu
      @displayWelcome="displayWelcome"
      @displayEdit="displayEdit"
      @displayRecent="displayRecent"
      @login="login"
    ></Menu>
  </a-layout-sider>
</template>
<script setup>
const emit = defineEmits();
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
