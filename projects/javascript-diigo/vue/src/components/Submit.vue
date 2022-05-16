<template>
  <a-form-item class="submit">
    <a-button type="primary" html-type="submit">{{ text || "登录" }}</a-button>
  </a-form-item>
</template>
<script setup>
defineProps({
  text: String,
});
</script>
<style scoped>
.submit {
  position: fixed;
  bottom: 72px;
  width: 80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1;
}
</style>
