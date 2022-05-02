<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0" />
    <a-layout-content style="margin: 0 16px">
      <p v-if="displayRecent">所有最近书签</p>
    </a-layout-content>
    <a-layout-footer>
      Copyright © 2022 SunDawning
      <a href="mailto:jobsimi@qq.com">jobsimi@qq.com</a>, All Rights Reserved
    </a-layout-footer>
  </a-layout>
</template>
<script setup>
defineProps({
  displayRecent: false,
});
</script>
<style scoped>
.ant-layout-footer {
  text-align: center;
}
</style>
