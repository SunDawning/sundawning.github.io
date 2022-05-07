<template>
  <div class="logo" @click="displayWelcome"></div>
</template>
<script setup>
const emit = defineEmits();
function displayWelcome(value) {
  emit("displayWelcome", true);
}
</script>
<style scoped>
.logo {
  height: 64px;
  background-color: white;
  background-image: url(../../../assets/logo.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
