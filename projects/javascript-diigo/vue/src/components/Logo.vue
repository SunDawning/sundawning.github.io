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
  height: 64px;
  background-color: white;
  background-image: url(../assets/logo.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.logo :deep() li {
  height: 100%;
  margin: 0;
  background-color: #ffffff00 !important;
}
</style>
