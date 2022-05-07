<template>
  <a-layout-sider width="104">
    <Logo
      @displayWelcome="displayWelcome"
      @displayRecent="displayRecent"
      @displayEdit="displayEdit"
    ></Logo>
    <Menu
      @displayWelcome="displayWelcome"
      @displayRecent="displayRecent"
      @displayEdit="displayEdit"
      @login="login"
    ></Menu>
  </a-layout-sider>
</template>
<script setup>
const emit = defineEmits([
  "displayWelcome",
  "displayRecent",
  "login",
  "displayEdit",
]);
function displayWelcome(value) {
  emit("displayWelcome", value);
}
function displayRecent(value) {
  emit("displayRecent", value);
}
function login(value) {
  emit("login", value);
}
function displayEdit(value) {
  emit("displayEdit", value);
}
</script>
