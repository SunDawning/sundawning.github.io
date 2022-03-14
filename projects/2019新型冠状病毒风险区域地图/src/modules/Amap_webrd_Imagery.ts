import { UrlTemplateImageryProvider } from 'cesium';
import AmapMercatorTilingScheme from './AmapMercatorTilingScheme';
/**
 * 高德地图
 * 道路详图
 * http://webrd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scale=1&style=8
 */
export default new UrlTemplateImageryProvider({
  url: 'http://webrd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
  minimumLevel: 3,
  maximumLevel: 18,
  tilingScheme: new AmapMercatorTilingScheme(),
});
