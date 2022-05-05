<template>
  <a-layout-sider width="104">
    <Logo></Logo>
    <Menu @displayRecent="displayRecent"></Menu>
  </a-layout-sider>
</template>
<script setup>
const emit = defineEmits(["displayRecent"]);
function displayRecent(value) {
  emit("displayRecent", value);
}
</script>
