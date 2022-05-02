<template>
  <a-layout-sider width="104">
    <Logo></Logo>
    <Menu @displayRecent="displayRecent"></Menu>
  </a-layout-sider>
</template>
<script setup>
import Logo from "./Logo.vue";
import Menu from "./Menu.vue";
const emit = defineEmits(["displayRecent"]);
function displayRecent(value) {
  emit("displayRecent", value);
}
</script>
