import { defineConfig } from 'umi';
export default defineConfig({
  mfsu: {},
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  copy: [
    // Cesum文件
    { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Cesium/Workers' },
    { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Cesium/Assets' },
    { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Cesium/Widgets' },
  ],
});
