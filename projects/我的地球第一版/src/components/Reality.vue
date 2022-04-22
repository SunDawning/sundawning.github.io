<script setup>
import { ref, onMounted } from "vue";
const mapRef = ref(null);
onMounted(function () {
  init(mapRef.value);
});
</script>
<script>
function init(container) {
  const map = new mars3d.Map(container, {
    scene: {
      center: {
        lat: 22.530534267425537,
        lng: 113.9517791569233,
        alt: 500,
        heading: 0,
        pitch: -90,
      },
    },
    basemaps: [
      {
        type: "xyz",
        url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        minimumLevel: 3,
        maximumLevel: 18,
        show: true,
      },
    ],
  });
}
</script>

<template>
  <div ref="mapRef"></div>
</template>

<style></style>
