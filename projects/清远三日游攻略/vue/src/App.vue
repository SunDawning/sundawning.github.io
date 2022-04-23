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
        lat: 21.846991,
        lng: 113.494748,
        alt: 809958,
        heading: 360,
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
      { id: 10, name: "地图底图", type: "group" },
      {
        id: 2021,
        pid: 10,
        name: "天地图影像",
        icon: "http://mars3d.cn/img/basemaps/tdt_img.png",
        type: "group",
        layers: [
          {
            name: "底图",
            type: "tdt",
            layer: "img_d",
            key: ["789e558be762ff832392a0393fd8a4f1"],
          },
          {
            name: "注记",
            type: "tdt",
            layer: "img_z",
            key: ["789e558be762ff832392a0393fd8a4f1"],
          },
        ],
        show: true,
      },
      {
        pid: 10,
        name: "天地图电子",
        icon: "http://mars3d.cn/img/basemaps/tdt_vec.png",
        type: "group",
        layers: [
          {
            name: "底图",
            type: "tdt",
            layer: "vec_d",
            key: ["789e558be762ff832392a0393fd8a4f1"],
          },
          {
            name: "注记",
            type: "tdt",
            layer: "vec_z",
            key: ["789e558be762ff832392a0393fd8a4f1"],
          },
        ],
      },
      {
        pid: 10,
        name: "高德影像",
        type: "group",
        icon: "http://mars3d.cn/img/basemaps/gaode_img.png",
        layers: [
          { name: "底图", type: "gaode", layer: "img_d" },
          { name: "注记", type: "gaode", layer: "img_z" },
        ],
      },
      {
        pid: 10,
        name: "高德电子",
        type: "gaode",
        icon: "http://mars3d.cn/img/basemaps/gaode_vec.png",
        layer: "vec",
      },
      {
        pid: 10,
        name: "百度影像",
        type: "group",
        icon: "http://mars3d.cn/img/basemaps/bd-img.png",
        layers: [
          { name: "底图", type: "baidu", layer: "img_d" },
          { name: "注记", type: "baidu", layer: "img_z" },
        ],
      },
      {
        pid: 10,
        name: "百度电子",
        icon: "http://mars3d.cn/img/basemaps/bd-vec.png",
        type: "baidu",
        layer: "vec",
      },
      {
        pid: 10,
        name: "腾讯影像",
        icon: "http://mars3d.cn/img/basemaps/gaode_img.png",
        type: "group",
        layers: [
          { name: "底图", type: "tencent", layer: "img_d" },
          { name: "注记", type: "tencent", layer: "img_z" },
        ],
      },
      {
        pid: 10,
        name: "腾讯电子",
        icon: "http://mars3d.cn/img/basemaps/gaode_vec.png",
        type: "tencent",
        layer: "vec",
      },
      {
        pid: 10,
        name: "ArcGIS影像",
        icon: "http://mars3d.cn/img/basemaps/esriWorldImagery.png",
        type: "xyz",
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        enablePickFeatures: false,
      },
      {
        pid: 10,
        name: "微软影像",
        icon: "http://mars3d.cn/img/basemaps/bingAerial.png",
        type: "bing",
        key: "Am5SdKm6pNdkP1P5zuUOMZwleCHeA7GD5vuQgZ3xBUbEMBeQ5cQ1WN4B8xqqV1Vt",
        layer: "Aerial",
      },
      {
        pid: 10,
        name: "OSM地图",
        type: "xyz",
        icon: "http://mars3d.cn/img/basemaps/osm.png",
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        subdomains: "abc",
      },
      {
        id: 2017,
        pid: 10,
        name: "暗色底图",
        type: "gaode",
        icon: "http://mars3d.cn/img/basemaps/blackMarble.png",
        layer: "vec",
        invertColor: true,
        filterColor: "#4e70a6",
        brightness: 0.6,
        contrast: 1.8,
        gamma: 0.3,
        hue: 1,
        saturation: 0,
      },
      {
        pid: 10,
        name: "蓝色底图",
        icon: "http://mars3d.cn/img/basemaps/bd-c-midnight.png",
        type: "xyz",
        url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        chinaCRS: "GCJ02",
        enablePickFeatures: false,
      },
      {
        pid: 10,
        name: "黑色底图",
        icon: "http://mars3d.cn/img/basemaps/bd-c-dark.png",
        type: "tencent",
        layer: "custom",
        style: "4",
      },
      {
        pid: 10,
        name: "离线地图 (供参考)",
        type: "group",
        icon: "http://mars3d.cn/img/basemaps/google_img.png",
        layers: [
          {
            name: "全球",
            type: "xyz",
            url: "{dataServer}/tile/googleImg/{z}/{x}/{y}.jpg",
            minimumLevel: 0,
            maximumLevel: 9,
          },
          {
            name: "中国",
            type: "xyz",
            url: "{dataServer}/tile/googleImg/{z}/{x}/{y}.jpg",
            minimumTerrainLevel: 10,
            minimumLevel: 10,
            maximumLevel: 12,
            rectangle: {
              xmin: 69.706929,
              xmax: 136.560941,
              ymin: 15.831038,
              ymax: 52.558005,
            },
          },
          {
            name: "具体项目(如合肥)",
            type: "xyz",
            url: "{dataServer}/tile/googleImg/{z}/{x}/{y}.jpg",
            minimumTerrainLevel: 12,
            minimumLevel: 12,
            maximumLevel: 18,
            rectangle: {
              xmin: 116.33236,
              xmax: 118.183557,
              ymin: 31.143784,
              ymax: 32.565035,
            },
          },
        ],
      },
      {
        pid: 10,
        name: "单张图片 (本地离线)",
        icon: "http://mars3d.cn/img/basemaps/offline.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/world.jpg",
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
        name: "清远市边界墙",
        url: "https://data.mars3d.cn/file/geojson/areas/441800.json",
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
        name: "地点",
        data: {
          type: "FeatureCollection",
          features: [
            { text: "洞天仙境", coordinates: [112.894503, 24.154852, 65.9] },
            { text: "千军峰林", coordinates: [112.895639, 24.122405, 65.9] },
            { text: "小赵州桥", coordinates: [112.906407, 24.205682, 65.9] },
            {
              text: "笔架山",
              coordinates: [113.030693, 23.772138, 65.9],
            },
          ].map(function ({ text, coordinates }) {
            return {
              type: "Feature",
              properties: {
                name: "",
                type: "billboard",
                style: {
                  image: "https://mars3d.cn/img/marker/mark1.png",
                  horizontalOrigin: 0,
                  verticalOrigin: 1,
                  label: {
                    text: text,
                    font_size: 26,
                    color: "#6EFF2A",
                    outline: true,
                    outlineColor: "#000000",
                    pixelOffsetY: -60,
                    font_family: "楷体",
                    font_weight: "bold",
                    font_style: "normal",
                    opacity: 1,
                    outlineOpacity: 0.18,
                    outlineWidth: 3,
                    background: false,
                    backgroundColor: "#000000",
                    backgroundOpacity: 0.5,
                    backgroundPadding: 5,
                    pixelOffsetX: 0,
                    scaleByDistance: false,
                    scaleByDistance_far: 1000000,
                    scaleByDistance_farValue: 0.1,
                    scaleByDistance_near: 1000,
                    scaleByDistance_nearValue: 1,
                    distanceDisplayCondition: false,
                    distanceDisplayCondition_far: 100000,
                    distanceDisplayCondition_near: 0,
                    clampToGround: true,
                    visibleDepth: true,
                  },
                  scaleByDistance: false,
                  scaleByDistance_far: 1000000,
                  scaleByDistance_farValue: 0.1,
                  scaleByDistance_near: 1000,
                  scaleByDistance_nearValue: 1,
                  distanceDisplayCondition: false,
                  distanceDisplayCondition_far: 10000,
                  distanceDisplayCondition_near: 0,
                  clampToGround: true,
                  visibleDepth: true,
                },
                edittype: "billboard",
                _layer: "",
              },
              geometry: {
                type: "Point",
                coordinates: coordinates,
              },
            };
          }),
        },
      },
    ],
    control: {
      homeButton: true,
      baseLayerPicker: true,
      fullscreenButton: false,
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
