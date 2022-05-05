<template>
  <a-layout-sider width="104">
    <Logo></Logo>
    <Menu @displayRecent="displayRecent" @login="login"></Menu>
  </a-layout-sider>
</template>
<script setup>
const emit = defineEmits(["displayRecent","login"]);
function displayRecent(value) {
  emit("displayRecent", value);
}
function login(value){
  emit("login",value);
}
</script>
