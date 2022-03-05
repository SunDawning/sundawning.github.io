import { defineConfig } from 'umi';
const config = {
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
};
// 配置HTML模板：标题、图标
{
  Object.assign(config, {
    title: '2019新型冠状病毒风险区域地图',
    favicon: 'https://map.wap.qq.com/online/h5-theme-map/favicon.ico',
  });
}
// 配置Cesium
{
  const CESIUM_BASE_URL = 'Cesium/';
  // 定义Cesium的内部变量CESIUM_BASE_URL
  if (config.define === undefined) {
    config.define = {};
  }
  config.define.CESIUM_BASE_URL = CESIUM_BASE_URL;
  // 复制Cesium的静态图片等到文件夹下
  if (config.copy === undefined) {
    config.copy = [];
  }
  ['Workers', 'Assets', 'Widgets'].forEach(function (item) {
    config.copy.push({
      from: 'node_modules/cesium/Build/Cesium/' + item,
      to: CESIUM_BASE_URL + item,
    });
  });
}
export default defineConfig(config);
