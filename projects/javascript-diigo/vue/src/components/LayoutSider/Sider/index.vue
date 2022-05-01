<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <Logo></Logo>
    <Menu></Menu>
  </a-layout-sider>
</template>
<script setup>
import Logo from "./Logo.vue";
import Menu from "./Menu.vue";
</script>
