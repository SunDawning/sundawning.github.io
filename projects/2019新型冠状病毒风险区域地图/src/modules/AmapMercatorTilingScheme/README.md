高德地图纠偏

https://juejin.cn/post/7049681493685174286

在使用高德地图影像的时候，如果加载了 osm 或城市白膜，会发现地理坐标位置偏移。这里因为国内的地图开发商使用不用的坐标系统，所以在使用的时候要做一个坐标转换。

地理坐标系
WGS84

一种国际上采用的地心坐标系。坐标原点为地球质心，其地心空间直角坐标系的 Z 轴指向 BIH （国际时间服务机构）1984.O 定义的协议地球极（CTP)方向，X 轴指向 BIH 1984.0 的零子午面和 CTP 赤道的交点，Y 轴与 Z 轴、X 轴垂直构成右手坐标系，称为 1984 年世界大地坐标系统。

CGCS2000

2000 中国大地坐标系(China Geodetic Coordinate System 2000，CGCS2000)，又称之为 2000 国家大地坐标系，是中国新一代大地坐标系，21 世纪初已在中国正式实施。其与  WGS84  相差不大，国内天地图就是采用该坐标系。

GCJ02

GCJ-02 是由中国国家测绘局（G 表示 Guojia 国家，C 表示 Cehui 测绘，J 表示 Ju 局）制订的地理信息系统的坐标系统。它其实就是对真实坐标系统进行人为的加偏处理，按照特殊的算法，将真实的坐标加密成虚假的坐标，而这个加偏并不是线性的加偏，所以各地的偏移情况都会有所不同。而加密后的坐标也常被大家称为“火星坐标系统”。

BD09

BD09 经纬度投影属于百度坐标系，它是在标准经纬度的基础上进行 GCJ-02 加偏之后，再加上百度自身的加偏算法，也就是在标准经纬度的基础之上进行了两次加偏。

高德纠偏

通过 cesium 中的 UrlTemplateImageryProvider 的 tilingScheme 进行纠偏。

通过重载 WebMercatorTilingScheme 的\_projection.project 方法和\_projection.unproject 方法进行世界大地坐标系到火星坐标系的转换和火星坐标系到世界大地坐标系的转换

```ts
this.viewerCesium.imageryLayers.addImageryProvider(
  new UrlTemplateImageryProvider({
    url: 'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
    minimumLevel: 3,
    maximumLevel: 18,
    tilingScheme: new AmapMercatorTilingScheme(),
  }),
);
```

```ts
import {
  WebMercatorProjection,
  WebMercatorTilingScheme,
  Math,
  Cartographic,
  Cartesian2,
} from '../cesium/Cesium';
import CoordTransform from './CoordTransform';

class AmapMercatorTilingScheme extends WebMercatorTilingScheme {
  _projection: any;

  constructor() {
    super();

    let projection = new WebMercatorProjection();

    this._projection.project = function (cartographic: any, result: any) {
      result = CoordTransform.WGS84ToGCJ02(
        Math.toDegrees(cartographic.longitude),
        Math.toDegrees(cartographic.latitude),
      );
      result = projection.project(
        new Cartographic(Math.toRadians(result[0]), Math.toRadians(result[1])),
      );
      return new Cartesian2(result.x, result.y);
    };

    this._projection.unproject = function (cartesian: any, result: any) {
      let cartographic = projection.unproject(cartesian);
      result = CoordTransform.GCJ02ToWGS84(
        Math.toDegrees(cartographic.longitude),
        Math.toDegrees(cartographic.latitude),
      );
      return new Cartographic(
        Math.toRadians(result[0]),
        Math.toRadians(result[1]),
      );
    };
  }
}

export default AmapMercatorTilingScheme;
```

```ts
// 定义一些常量
const BD_FACTOR = (3.14159265358979324 * 3000.0) / 180.0;
const PI = 3.1415926535897932384626;
const RADIUS = 6378245.0;
const EE = 0.00669342162296594323;

class CoordTransform {
  /**
   * BD-09(百度坐标系) To GCJ-02(火星坐标系)
   * @param lng
   * @param lat
   * @returns {number[]}
   */
  static BD09ToGCJ02(lng: number, lat: number) {
    let x = +lng - 0.0065;
    let y = +lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * BD_FACTOR);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * BD_FACTOR);
    let gg_lng = z * Math.cos(theta);
    let gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat];
  }

  /**
   * GCJ-02(火星坐标系) To BD-09(百度坐标系)
   * @param lng
   * @param lat
   * @returns {number[]}
   * @constructor
   */
  static GCJ02ToBD09(lng: number, lat: number) {
    lat = +lat;
    lng = +lng;
    let z =
      Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * BD_FACTOR);
    let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * BD_FACTOR);
    let bd_lng = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
  }

  /**
   * WGS-84(世界大地坐标系) To GCJ-02(火星坐标系)
   * @param lng
   * @param lat
   * @returns {number[]}
   */
  static WGS84ToGCJ02(lng: number, lat: number) {
    lat = +lat;
    lng = +lng;
    if (this.out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      let d = this.delta(lng, lat);
      return [lng + d[0], lat + d[1]];
    }
  }

  /**
   * GCJ-02(火星坐标系) To WGS-84(世界大地坐标系)
   * @param lng
   * @param lat
   * @returns {number[]}
   * @constructor
   */
  static GCJ02ToWGS84(lng: number, lat: number) {
    lat = +lat;
    lng = +lng;
    if (this.out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      let d = this.delta(lng, lat);
      let mgLng = lng + d[0];
      let mgLat = lat + d[1];
      return [lng * 2 - mgLng, lat * 2 - mgLat];
    }
  }

  /**
   *
   * @param lng
   * @param lat
   * @returns {number[]}
   */
  static delta(lng: number, lat: number) {
    let dLng = this.transformLng(lng - 105, lat - 35);
    let dLat = this.transformLat(lng - 105, lat - 35);
    const radLat = (lat / 180) * PI;
    let magic = Math.sin(radLat);
    magic = 1 - EE * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    dLng = (dLng * 180) / ((RADIUS / sqrtMagic) * Math.cos(radLat) * PI);
    dLat = (dLat * 180) / (((RADIUS * (1 - EE)) / (magic * sqrtMagic)) * PI);
    return [dLng, dLat];
  }

  /**
   *
   * @param lng
   * @param lat
   * @returns {number}
   */
  static transformLng(lng: number, lat: number) {
    lat = +lat;
    lng = +lng;
    let ret =
      300.0 +
      lng +
      2.0 * lat +
      0.1 * lng * lng +
      0.1 * lng * lat +
      0.1 * Math.sqrt(Math.abs(lng));
    ret +=
      ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) /
      3.0;
    ret +=
      ((150.0 * Math.sin((lng / 12.0) * PI) +
        300.0 * Math.sin((lng / 30.0) * PI)) *
        2.0) /
      3.0;
    return ret;
  }

  /**
   *
   * @param lng
   * @param lat
   * @returns {number}
   */
  static transformLat(lng: number, lat: number) {
    lat = +lat;
    lng = +lng;
    let ret =
      -100.0 +
      2.0 * lng +
      3.0 * lat +
      0.2 * lat * lat +
      0.1 * lng * lat +
      0.2 * Math.sqrt(Math.abs(lng));
    ret +=
      ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) /
      3.0;
    ret +=
      ((160.0 * Math.sin((lat / 12.0) * PI) +
        320 * Math.sin((lat * PI) / 30.0)) *
        2.0) /
      3.0;
    return ret;
  }

  /**
   * 判断是否在国内。不在国内不做偏移
   * @param lng
   * @param lat
   * @returns {boolean}
   */
  static out_of_china(lng: number, lat: number) {
    lat = +lat;
    lng = +lng;
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
  }
}

export default CoordTransform;
```
