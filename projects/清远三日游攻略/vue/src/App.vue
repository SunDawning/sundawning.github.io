<template>
  <a-layout class="container">
    <a-layout-header>清远三日游攻略</a-layout-header>
    <a-layout-content class="map"></a-layout-content>
    <a-layout-footer
      >Copyright © 2022 SunDawning, All Rights Reserved
    </a-layout-footer>
  </a-layout>
</template>
<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.map {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
<script setup>
import { onMounted } from "vue";
onMounted(function () {
  init(document.querySelector(".map"));
});
</script>
<script>
function init(container) {
  const map = new mars3d.Map(container, {
    scene: {
      center: {
        lat: 22.514728,
        lng: 113.93298,
        alt: 1389,
        heading: 37,
        pitch: -32,
      },
      globe: {
        depthTestAgainstTerrain: true,
      },
    },
    terrain: {
      url: "http://data.mars3d.cn/terrain",
      show: true,
    },
    basemaps: [
      {
        name: "高德电子",
        type: "gaode",
        layer: "vec",
        show: true,
      },
    ],
    layers: [
      {
        show: true,
        type: "osmBuildings",
        name: "全球城市白膜(OSM在线)",
        highlight: {
          type: "click",
          color: "#00FF00",
        },
        popup: "all",
        popupOptions: { maxHeight: 160 },
      },
    ],
    control: {
      homeButton: true,
      vrButton: false,
      fullscreenButton: true,
      fullscreenElement: "centerDiv3D",
      navigationHelpButton: true,
      animation: false,
      timeline: false,
      infoBox: false,
      geocoder: false,
      selectionIndicator: false,
      defaultContextMenu: true,
      mouseDownView: true,
      zoom: { insertIndex: 1 },
      distanceLegend: { left: "100px", bottom: "2px" },
      locationBar: {
        fps: true,
        crs: "CGCS2000_GK_Zone_3",
        crsDecimal: 0,
        template:
          "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div class='hide1000'>横{crsx}  纵{crsy}</div> <div>海拔：{alt}米</div> <div class='hide700'>层级：{level}</div><div>方向：{heading}°</div> <div>俯仰角：{pitch}°</div><div class='hide700'>视高：{cameraHeight}米</div>",
      },
    },
  });
}
</script>
