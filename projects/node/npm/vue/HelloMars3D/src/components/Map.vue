<script setup>
import { onMounted } from "vue";
function init(container) {
  new mars3d.Map(container);
}
onMounted(function () {
  init(document.querySelector("#map"));
});
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
