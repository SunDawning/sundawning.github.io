<script setup>
import { ref, onMounted } from "vue";

import { Viewer } from "cesium"
function init(container) {
  let viewer = new Viewer(container);
}
let containerRef = ref(null);
onMounted(function () {
  init(containerRef.value);
});
</script>

<template>
  <div ref="containerRef"></div>
</template>

<style scoped>
</style>
