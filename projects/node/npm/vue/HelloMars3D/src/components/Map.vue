<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";
window.Cesium = Cesium;
function init(container) {
  const viewer = new Cesium.Viewer(container);
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
      113.9517791569233,
      22.530534267425537,
      500
    ),
  });
  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      minimumLevel: 3,
      maximumLevel: 18,
    })
  );
}
onMounted(function () {
  init(document.querySelector("#map"));
});
</script>

<template>
  <div class="map" id="map"></div>
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
