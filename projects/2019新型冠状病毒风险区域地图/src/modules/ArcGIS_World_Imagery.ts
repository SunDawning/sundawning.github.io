import { ArcGisMapServerImageryProvider } from 'cesium';
/**
 * 使用Arcgis全球影像地图
 * https://cesium.com/learn/cesiumjs/ref-doc/ArcGisMapServerImageryProvider.html?classFilter=arcgis
 */
export default new ArcGisMapServerImageryProvider({
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
});
