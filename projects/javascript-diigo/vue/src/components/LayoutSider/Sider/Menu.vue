<template>
  <a-menu theme="dark" mode="inline">
    <a-menu-item key="1">
      <span>新建书签</span>
    </a-menu-item>
    <a-menu-item key="2" @click="displayRecent">
      <span>最近书签</span>
    </a-menu-item>
  </a-menu>
</template>
<script setup>
function displayRecent() {
  console.log("显示最近书签");
}
</script>
