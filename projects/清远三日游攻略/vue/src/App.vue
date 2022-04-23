<template>
  <a-layout>
    <a-layout-header>清远三日游攻略</a-layout-header>
    <a-layout-content></a-layout-content>
    <a-layout-footer
      >Copyright © 2022 SunDawning
      <a href="mailto:jobsimi@qq.com">jobsimi@qq.com</a>, All Rights Reserved
    </a-layout-footer>
  </a-layout>
</template>
<style scoped>
section {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
header {
  color: white;
}
main {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
footer {
  text-align: center;
}
</style>
<script setup>
import { onMounted, onUnmounted } from "vue";
let map;
onMounted(function () {
  map = init(document.querySelector("main"));
});
onUnmounted(function () {
  map.destroy();
  map = null;
});
</script>
<script>
function init(container) {
  const map = new mars3d.Map(container, {
    scene: {
      center: {
        lat: 20.648193,
        lng: 113.518305,
        alt: 961591,
        heading: 0,
        pitch: -78,
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
      {
        show: true,
        type: "geojson",
        name: "广东省边界墙",
        url: "https://data.mars3d.cn/file/geojson/areas/440000.json",
        symbol: {
          type: "wallP",
          styleOptions: {
            setHeight: -15000,
            diffHeight: 30000, // 墙高
            materialType: mars3d.MaterialType.Image2,
            image: "https://mars3d.cn/img/textures/grawall.png",
            color: "rgba(0,255,255,0.6)",
          },
        },
      },
      {
        show: true,
        type: "geojson",
        name: "广东省各市边界线",
        url: "https://data.mars3d.cn/file/geojson/areas/440000_full.json",
        symbol: {
          type: "wallP",
          styleOptions: {
            setHeight: -15000,
            diffHeight: 30000, // 墙高
            materialType: mars3d.MaterialType.Image2,
            image: "https://mars3d.cn/img/textures/grawall.png",
            color: "rgba(255,255,255,0.3)",
          },
          styleField: "name",
          styleFieldOptions: {
            广州市: { color: "rgba(0,255,255,0.3)" },
            深圳市: { color: "rgba(0,255,255,0.3)" },
            清远市: { color: "rgba(0,255,255,0.3)" },
          },
        },
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
      compass: { bottom: "toolbar", left: "5px" },
      distanceLegend: { left: "100px", bottom: "24px" },
      locationBar: {
        fps: true,
        crs: "CGCS2000_GK_Zone_3",
        crsDecimal: 0,
        template:
          "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div class='hide1000'>横{crsx}  纵{crsy}</div> <div>海拔：{alt}米</div> <div class='hide700'>层级：{level}</div><div>方向：{heading}°</div> <div>俯仰角：{pitch}°</div><div class='hide700'>视高：{cameraHeight}米</div>",
      },
    },
  });
  /**
   * 只显示一定区域
   */
  {
    const { viewer } = map;
    {
      const scene = viewer.scene;
      const globe = scene.globe;
      // Tropics of Cancer and Capricorn
      const coffeeBeltRectangle = Cesium.Rectangle.fromDegrees(
        109 + 39 / 60,
        20 + 13 / 60,
        117 + 19 / 60,
        25 + 31 / 60
      );
      globe.cartographicLimitRectangle = coffeeBeltRectangle;
      globe.showSkirts = false;
      globe.backFaceCulling = false;
      globe.undergroundColor = undefined;
      scene.skyAtmosphere.show = false;
    }
  }
  return map;
}
</script>
