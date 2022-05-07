<template>
  <a-layout-sider width="104">
    <Logo></Logo>
    <Menu
      @displayRecent="displayRecent"
      @login="login"
      @displayEdit="displayEdit"
    ></Menu>
  </a-layout-sider>
</template>
<script setup>
const emit = defineEmits(["displayRecent", "login", "displayEdit"]);
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
