<template>
  <a-menu theme="dark" mode="inline" @select="select">
    <a-menu-item key="新建书签">
      <span>新建书签</span>
    </a-menu-item>
    <a-menu-item key="最近书签">
      <span>最近书签</span>
    </a-menu-item>
  </a-menu>
</template>
<script setup>
function select({ item, key, selectedKeys }) {
  console.log("{ item, key, selectedKeys }", { item, key, selectedKeys });
}
</script>
