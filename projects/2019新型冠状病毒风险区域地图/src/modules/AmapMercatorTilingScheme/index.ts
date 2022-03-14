import {
  WebMercatorProjection,
  WebMercatorTilingScheme,
  Cartographic,
  Cartesian2,
  Math as CesiumMath,
} from 'cesium';
import CoordTransform from './CoordTransform';
/**
 * https://juejin.cn/post/7049681493685174286
 */
export default class Index extends WebMercatorTilingScheme {
  constructor() {
    super();
    this._projection = {};
    let projection = new WebMercatorProjection();
    this._projection.project = function (cartographic, result) {
      result = CoordTransform.WGS84ToGCJ02(
        CesiumMath.toDegrees(cartographic.longitude),
        CesiumMath.toDegrees(cartographic.latitude),
      );
      result = projection.project(
        new Cartographic(
          CesiumMath.toRadians(result[0]),
          CesiumMath.toRadians(result[1]),
        ),
      );
      return new Cartesian2(result.x, result.y);
    };
    this._projection.unproject = function (cartesian, result) {
      let cartographic = projection.unproject(cartesian);
      result = CoordTransform.GCJ02ToWGS84(
        CesiumMath.toDegrees(cartographic.longitude),
        CesiumMath.toDegrees(cartographic.latitude),
      );
      return new Cartographic(
        CesiumMath.toRadians(result[0]),
        CesiumMath.toRadians(result[1]),
      );
    };
  }
}
