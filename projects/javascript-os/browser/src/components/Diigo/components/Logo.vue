<template>
  <div class="logo">
    <a-menu-item :key="menu_item_key"></a-menu-item>
  </div>
</template>
<script setup>
defineProps({
  menu_item_key: String,
});
</script>
<style scoped>
.logo {
  background-image: url(../assets/logo.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 72px;
}
.logo :deep() li {
  height: 100%;
}
</style>
