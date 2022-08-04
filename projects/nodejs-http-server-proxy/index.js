module.exports = index;
async function index({ port = 8280, services = "./services" } = {}) {
  const DATABASE = {
    services, // 本地缓存文件夹
  };
  const app = createKoaApp(); // 创建Koa app
  enableCors(app); // 允许跨域
  enableKoaRouters(app, DATABASE); // 启用Koa路由
  // port = await getPort(port); // 找到可用的端口
  console.log("本地缓存文件夹", services); // 提示当前缓存文件夹
  logPort(port); // 提示当前服务器端口
  startKoaApp(app, port); // 启动Koa app
}
/**
 * 启用Koa路由
 * @param {Koa} app
 * @param {object} DATABASE
 */
function enableKoaRouters(app, DATABASE) {
  const Router = require("koa-router");
  const router = new Router();
  registerKoaRouterMiddlewares(router, DATABASE); // 注册Koa路由中间件
  app.use(router.routes());
}
/**
 * 注册Koa路由中间件
 * @param {Router} router
 * @param {object} DATABASE 内存数据库
 * GET /10.89.9.234:8080/geoserver/rest/info?f=json
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer?f=pjson
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer?f=json
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer?f=fjson
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer?f=fjson
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer/tile/11/1025/1025
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_ZJ/MapServer/tile/11/1025/1025?layers=1
 * GET /10.89.9.234:8080/http://10.89.9.234:8080/geoserver/rest/services/Hosted/JZBM2020/SceneServer?f=json
 */
function registerKoaRouterMiddlewares(router, DATABASE) {
  [
    {
      description: "GET /10.89.9.234:8080/geoserver/rest/info?f=json",
      method: "GET",
      path: /\/.*\/rest\/info/,
      middleware: router_get_rest_info,
    },
    {
      description: `GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer
GET /10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_CSBJ_DT/MapServer?layers=140&tile=/tile/11/1024/1024`,
      method: "GET",
      path: /\/.*\/rest\/services\/.*\/MapServer$/,
      middleware: router_get_rest_services_MapServer,
    },
    {
      description:
        "GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer/tile/1/0/1",
      method: "GET",
      path: /\/.*\/rest\/services\/.*\/MapServer\/tile\/.*\/.*\/.*/,
      middleware: router_get_rest_services_MapServer_tile,
    },
    {
      description:
        "GET /10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_LGTS_DT/MapServer/tilemap/8/96/96/32/32?f=json",
      method: "GET",
      path: /\/.*\/rest\/services\/.*\/MapServer\/tilemap/,
      middleware: router_get_rest_services_MapServer_tilemap,
    },
    {
      description: `GET /10.89.9.234:8080/geoserver/rest/services/Hosted/JZBM2020/SceneServer`,
      method: "GET",
      path: /\/.*\/rest\/services\/.*\/SceneServer$/,
      middleware: router_get_rest_services_SceneServer,
    },
    {
      description: `GET /10.89.9.234:8080/geoserver/rest/services/Hosted/JZBM2020/SceneServer/layers/0?f=json`,
      method: "GET",
      path: /\/.*\/rest\/services\/.*\/SceneServer\/layers\/\d+$/,
      middleware: router_get_rest_services_SceneServer_layers,
    },
  ].forEach(function ({ method, path, middleware }) {
    router[method.toLowerCase()](path, async function (context) {
      const { url } = context;
      console.log(method, url);
      await middleware(context, DATABASE);
    });
  });
}
/**
 * GET /10.89.9.234:8080/geoserver/rest/services/Hosted/JZBM2020/SceneServer/layers/0
 * GET /10.89.9.234:8080/geoserver/rest/services/Hosted/JZBM2020/SceneServer/layers/0?f=json
 * @param {context} context
 * @returns
 */
async function router_get_rest_services_SceneServer_layers(context, DATABASE) {
  const { path } = context;
  console.log("path", path);
  let url = `http:/${path}?f=json`;
  context.response.body = await getURLData(url, DATABASE);
  context.response.type = "application/json";
}
/**
 * GET /10.89.9.234:8080/geoserver/rest/services/Hosted/JZBM2020/SceneServer
 * GET /10.89.9.234:8080/geoserver/rest/services/Hosted/JZBM2020/SceneServer?f=json
 * @param {context} context
 * @returns
 */
async function router_get_rest_services_SceneServer(context, DATABASE) {
  const { path } = context;
  console.log("path", path);
  let url = `http:/${path}?f=json`;
  context.response.body = await getURLData(url, DATABASE);
  context.response.type = "application/json";
}
/**
 * GET /10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_LGTS_DT/MapServer/tilemap/8/96/96/32/32?f=json
 * @param {context} context
 */
async function router_get_rest_services_MapServer_tilemap(context) {
  context.response.body = {
    error: { code: 404, message: "Not Found", details: [] },
  };
}
/**
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer/tile/1/0/1
 * @param {context} context
 */
async function router_get_rest_services_MapServer_tile(context, DATABASE) {
  const _parseContextURL = parseContextURL(context);
  if (_parseContextURL === undefined) {
    return;
  }
  const { host, service, L_3857, Y_3857, X_3857 } = _parseContextURL;
  let MapServer_json = await getMapServerJSON(
    `http://${host}/rest/services/${service}/MapServer?f=json`,
    DATABASE
  ); // 请求MapServer的json
  const { tileInfo } = MapServer_json;
  if (tileInfo) {
    // 底图、遥感
    console.log("底图、遥感");
    await getYaoGanTile(context, DATABASE, MapServer_json);
    return;
  }
  // 要素图层服务
  console.log("要素图层服务");
  await getFeatureTile(context, DATABASE);
}
/**
 * 解析context的url
 * @param {context} context
 * @returns
 */
function parseContextURL(context) {
  if (context === undefined) {
    return;
  }
  const { url: contextURL } = context;
  // 不带有MapServer
  if (contextURL.match(/\/.*\/rest\/services\/.*\/MapServer/) === null) {
    return;
  }
  // 带有MapServer/tile
  if (contextURL.match("MapServer/tile")) {
    const match = contextURL.match(
      /\/(.*)\/rest\/services\/(.*)\/MapServer\/tile\/(.*)\/(.*)\/(.*)/
    );
    // console.log("match", match);
    if (match === null) {
      return;
    }
    // console.log("match", match);
    let [full, host, service, L_3857, Y_3857, X_3857] = match;
    [L_3857, Y_3857, X_3857] = [L_3857, Y_3857, X_3857].map(function (item) {
      return parseInt(item);
    });
    return { host, service, L_3857, Y_3857, X_3857 };
  }
  // 在查询字符串里带有tile
  if (context.query && context.query.tile) {
    let match_0 = contextURL.match(/\/(.*)\/rest\/services\/(.*)\/MapServer/);
    if (match_0 === null) {
      return;
    }
    let [full_0, host, service] = match_0;
    let match_1 = context.query.tile.match(/\/tile\/(.*)\/(.*)\/(.*)/);
    if (match_1 === null) {
      return;
    }
    let [full_1, L_3857, Y_3857, X_3857] = match_1;
    [L_3857, Y_3857, X_3857] = [L_3857, Y_3857, X_3857].map(function (item) {
      return parseInt(item);
    });
    return { host, service, L_3857, Y_3857, X_3857 };
  }
}
/**
 * 获取要素图层服务
 * @param {context} context
 * @param {object} DATABASE
 * @returns
 */
async function getFeatureTile(context, DATABASE) {
  const _parseContextURL = parseContextURL(context);
  if (_parseContextURL === undefined) {
    return;
  }
  const { host, service, L_3857, Y_3857, X_3857 } = _parseContextURL;
  const MapServer_json = `http://${host}/rest/services/${service}/MapServer?f=json`;
  const _DATABASE = DATABASE[MapServer_json]; // 内存里的MapServer json数据，{ json }
  const rectangle_3857 = xyz2prj3857(L_3857, X_3857, Y_3857); // 3857瓦片的边界范围
  // console.log("rectangle_3857", rectangle_3857);
  // console.log("fullExtent", _DATABASE.json.fullExtent); // 影像服务的边界范围
  if (
    isFullExtentContainRectangle(_DATABASE.json.fullExtent, rectangle_3857) ===
    false
  ) {
    console.log("超出边界");
    await router_get_blank_tile(context);
    return;
  }
  let layers_ids;
  // 从查询字符串里读取layers
  const { query } = context;
  if (query) {
    let { layers } = query;
    if (layers) {
      layers_ids = ascendJoinArray(getSplitString(layers));
    }
  }
  // 从MapServer json里读取layers
  if (layers_ids === undefined) {
    // console.log("DATABASE", DATABASE);
    if (_DATABASE[layers_ids] === undefined) {
      _DATABASE[layers_ids] = _DATABASE.json.layers
        .filter(function ({ parentLayerId }) {
          return parentLayerId === -1;
        })
        .map(function ({ id }) {
          return id;
        });
      _DATABASE[layers_ids] = ascendJoinArray(_DATABASE[layers_ids]);
    }
    layers_ids = _DATABASE[layers_ids];
  }
  console.log("layers_ids", layers_ids);
  const path = require("path");
  const locale_file = path.join(
    DATABASE.services,
    urlToLocalFileName(
      `http://${host}/rest/services/${service}/MapServer/${layers_ids}/tile/${L_3857}/${Y_3857}/${X_3857}.png`
    )
  );
  const fs = require("fs-extra");
  // 读取缓存的图片
  if (fs.existsSync(locale_file) === true) {
    console.log("读取缓存的图片", locale_file);
    context.response.body = fs.readFileSync(locale_file);
    context.response.type = "image/png";
    return;
  }
  // 请求原始图片
  const axios = require("axios");
  const { data } = await axios({
    method: "GET",
    url: `http://${host}/rest/services/${service}/MapServer/export`,
    params: {
      bbox: rectangle_3857.join(","),
      bboxSR: 102100,
      imageSR: 102100,
      size: [256, 256].join(","),
      dpi: 96,
      format: "png32",
      transparent: true,
      layers: `show:` + layers_ids,
      f: "image",
    },
    responseType: "arraybuffer",
  });
  context.response.body = data;
  context.response.type = "image/png";
  saveDataToLocalFile(locale_file, data); // 保存到本地文件
}
/**
 * 影像服务的边界范围是否包含某个瓦片的边界范围
 * @param {array} fullExtent 一个边界范围，影像服务的边界范围
 * @param {array} rectangle 一个边界范围，计算出的瓦片的边界范围
 * @returns
 */
function isFullExtentContainRectangle(fullExtent, rectangle) {
  const [xmin_3857, ymin_3857, xmax_3857, ymax_3857] = rectangle;
  const {
    xmin: xmin_LG,
    ymin: ymin_LG,
    xmax: xmax_LG,
    ymax: ymax_LG,
  } = fullExtent;
  if (xmin_3857 < xmin_LG) {
    return false;
  }
  if (ymin_3857 < ymin_LG) {
    return false;
  }
  if (xmax_3857 > xmax_LG) {
    return false;
  }
  if (ymax_3857 > ymax_LG) {
    return false;
  }
  return true;
}
/**
 * 数字数组升序后拼接成字符串
 * @param {array} array 每个元素是数字字符串或数字
 * @param {string} seperator
 * @returns
 */
function ascendJoinArray(array, seperator = ",") {
  return array
    .map(function (item) {
      return parseInt(item);
    })
    .sort(function (a, b) {
      return a - b;
    })
    .join(seperator);
}
/**
 * 空白（空格、换行、tab）和逗号分隔的字符串，变成用逗号分隔 @see https://blog.csdn.net/qq_38900565/article/details/109643193
 * @param {string} str
 * @returns
 */
function getSplitString(str) {
  return str
    .split(",")
    .map(function (item) {
      return item.trim();
    })
    .filter(function (item) {
      return item.trim() != "";
    });
}
/**
 * 行列号转经纬度 @see https://blog.csdn.net/u012260672/article/details/123633641
 * @param {number} z
 * @param {number} x
 * @param {number} y
 * @returns
 */
function xyz2prj3857(z, x, y) {
  const n = Math.pow(2, z);
  const lon_min = (x / n) * 40075016.0 - 20037508.0;
  const lat_min = 20037508.0 - ((y + 1) / n) * 40075016.0;
  const lon_max = ((x + 1) / n) * 40075016.0 - 20037508.0;
  const lat_max = 20037508.0 - (y / n) * 40075016.0;
  const rectangle = [lon_min, lat_min, lon_max, lat_max];
  return rectangle;
}
/**
 * 获取底图、遥感瓦片
 * @param {context} context
 * @param {object} DATABASE
 * @param {json} MapServer_json
 * @returns
 */
async function getYaoGanTile(context, DATABASE, MapServer_json) {
  const _parseContextURL = parseContextURL(context);
  if (_parseContextURL === undefined) {
    return;
  }
  const { host, service, L_3857, Y_3857, X_3857 } = _parseContextURL;
  let L_offset = 9; // 3857与临港级别之间的偏移，一般是3857第9级对应临港第0级。
  let L_LG = L_3857 - L_offset;
  if (L_LG < 0) {
    await router_get_blank_tile(context);
    return;
  }

  let {
    tileInfo: { lods: lods_3857 },
  } = getWorldStreetMapJSON(DATABASE);
  // console.log("lods_3857", lods_3857);
  let {
    tileInfo: { lods: lods_LG },
  } = MapServer_json;
  // console.log("lods_LG", lods_LG);

  if (L_LG > lods_LG.length - 1) {
    // TypeError: Cannot read properties of undefined (reading 'scale')
    return;
  }
  /**
   * 配置影像MapServer的网址
   */
  let MapServer_LG = `http://${host}/rest/services/${service}/MapServer`; // MapServer的地址，以MapServer结尾
  console.log("MapServer_LG", MapServer_LG);
  const path = require("path");
  const Services_Directory = path.join(
    DATABASE.services,
    urlToLocalFileName(`http://${host}/rest/services`)
  );
  const MapServer_local_LG = `${Services_Directory}/${service}/MapServer/tile`; // 缓存的原始临港影像图片
  const MapServer_local_3857 = `${Services_Directory}/${service}_3857/MapServer/tile`; // 缓存生成的3857标准网格集的临港影像图片
  let locale_file = `${MapServer_local_3857}/${L_3857}/${Y_3857}/${X_3857}.png`;
  const fs = require("fs-extra");
  if (fs.existsSync(locale_file) === true) {
    console.log("读取缓存的二次图片", locale_file);
    context.response.body = fs.readFileSync(locale_file);
    context.response.type = "image/png";
    return;
  }
  /**
   * 当前级别一张图片对应的范围
   * 3857图层的一张图片对应实际的地理范围，在临港图层里用该地理范围，框出得到9张临港的图片。
   * 先将9张图片合并成一张768*768的图片，再从这张大图片里截取一张该地理范围对应的289*289的图片。
   */
  let resolution_3857 = (lods_3857[L_3857].scale * 2.54) / 96 / 100; // 分辨率，每个像素所对应的实际地理距离，单位是米。因为瓦片json里的自带resolution有误差，便重新计算该值。
  let resolution_LG = (lods_LG[L_LG].scale * 2.54) / 96 / 100;
  let per_3857 = 256 * resolution_3857; // 一张256*256像素的图片所对应的实际地理距离，单位是米
  let per_LG = 256 * resolution_LG;
  let X_LG = (X_3857 * per_3857) / per_LG;
  let Y_LG = (Y_3857 * per_3857) / per_LG;
  let X_LG_floor = Math.floor(X_LG);
  let Y_LG_floor = Math.floor(Y_LG);
  let tile_size_LG = Math.ceil((256 * resolution_3857) / resolution_LG); // 生成的临港图片的大小，该值越大，在3857的网格集里，显示出来的图片就越小，以达到缩放图片的效果。其值为289。
  let x_count = 3; // 3*3九宫格，默认是3
  let y_count = 3;
  /**
   * 只需要四宫格或六宫格即可包含最后截取的区域，减少网络请求，无需九宫格
   */
  {
    if (256 * (X_LG - X_LG_floor) + tile_size_LG < 256 * 2) {
      x_count = 2;
    }
    if (256 * (Y_LG - Y_LG_floor) + tile_size_LG < 256 * 2) {
      y_count = 2;
    }
  }
  let count = 3; // 9宫格
  let composite = []; // 拼接9张图片的参数，九宫格；或四宫格或六宫格；
  let blank_image_count = 0; // 请求在线图片时，没有得到图片，为自定义的透明图片。
  {
    for (let x = 0; x < x_count; x = x + 1) {
      for (let y = 0; y < y_count; y = y + 1) {
        const { input, blank } = await get_Tile_LG(
          {
            z: L_LG,
            x: X_LG_floor + x,
            y: Y_LG_floor + y,
          },
          { MapServer_local_LG, MapServer_LG, Services_Directory }
        );
        if (blank === true) {
          blank_image_count = blank_image_count + 1;
        }
        composite.push({
          input: input,
          left: 256 * x,
          top: 256 * y,
        });
      }
    }
  }
  // 临港原始影像第0级和第1级的影像强制获取
  // 临港原始影像第2级之后的，只要存在透明图片，则默认影像不存在，避免拼接后的影像存在空白的内容。
  if ([0, 1].includes(L_LG) === false && blank_image_count > 0) {
    console.log("blank_image_count", blank_image_count, x_count * y_count);
    // 透明图片
    return;
  }
  let data;
  // 1. 拼接成九宫格
  const sharp = require("sharp");
  data = await sharp({
    create: {
      width: 256 * count,
      height: 256 * count,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite(composite)
    .png()
    .toBuffer();
  // 2. 截取289*289的区域
  data = await sharp(data)
    .extract({
      left: Math.ceil(256 * (X_LG - X_LG_floor)),
      top: Math.ceil(256 * (Y_LG - Y_LG_floor)),
      width: tile_size_LG,
      height: tile_size_LG,
    })
    .png();
  // 3. 转成256*256图片
  data = data.resize(256, 256).png();
  context.response.body = data;
  context.response.type = "image/png";
  saveDataToLocalFile(locale_file, await data.toBuffer()); // 保存到本地文件
}
/**
 * 生成空白的图片响应
 * @param {context} context
 */
async function router_get_blank_tile(context) {
  const sharp = require("sharp");
  const data = await sharp({
    create: {
      width: 256,
      height: 256,
      channels: 4,
      background: { r: 255, g: 255, b: 0, alpha: 0 },
    },
  })
    // Error: Input buffer contains unsupported image format
    .png();
  context.response.body = data;
  context.response.type = "image/png";
}
/**
 * 请求原始临港瓦片
 * @see https://stackoverflow.com/questions/52512065/handling-error-from-async-await-syntax-with-axios
 */
async function get_Tile_LG(
  { z, x, y },
  { MapServer_local_LG, MapServer_LG, Services_Directory }
) {
  console.log("请求原始图片，[z, x, y]", [z, x, y]);
  let output;
  let locale_file = `${MapServer_local_LG}/${z}/${y}/${x}.png`;
  const fs = require("fs-extra");
  if (fs.existsSync(locale_file) === true) {
    console.log("读取缓存的原始图片", locale_file);
    const sharp = require("sharp");
    return {
      input: await sharp(locale_file).toBuffer(),
    };
  }
  try {
    const axios = require("axios");
    let data = (
      await axios({
        method: "GET",
        url: `${MapServer_LG}/tile/${z}/${y}/${x}`,
        responseType: "arraybuffer",
        // timeout: 1000,
      })
    ).data;
    const sharp = require("sharp");
    output = {
      input: await sharp(data).toBuffer(),
    };
    saveDataToLocalFile(locale_file, data); // 保存到本地文件
  } catch (error) {
    // console.log("请求瓦片出错");
    const sharp = require("sharp");
    output = {
      input: await sharp({
        create: {
          width: 256,
          height: 256,
          channels: 4,
          background: { r: 255, g: 255, b: 0, alpha: 0 },
        },
      })
        // Error: Input buffer contains unsupported image format
        .png()
        .toBuffer(),
      blank: true,
    };
  }
  return output;
}
/**
 * 请求MapServer的json
 * @param {string} url
 * @param {object} DATABASE
 * @returns
 */
async function getMapServerJSON(url, DATABASE) {
  let MapServer_json = await getURLData(url, DATABASE);
  if (DATABASE[url].json === undefined) {
    console.log("JSON.parse");
    DATABASE[url].json = JSON.parse(MapServer_json.toString());
  }
  MapServer_json = DATABASE[url].json;
  return MapServer_json;
}
/**
 * 将网址转换成本地文件的路径
 * @param {string} url
 * http://10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_ZJ/MapServer?f=json
 * =>
 * http/10.89.9.234/8080/geoserver/rest/services/LG/LG_T520001_HP_ZJ/MapServer/f_json
 */
function urlToLocalFileName(url) {
  return url
    .replace("://", "/")
    .replace(":", "/")
    .replace("?", "/")
    .replace("=", "_");
}
/**
 * 获取url所指向的数据：来自本地缓存的文件、内存或远程服务器
 * @param {string} url
 * @param {object} DATABASE
 * @returns
 */
async function getURLData(url, DATABASE) {
  if (DATABASE[url] === undefined) {
    DATABASE[url] = {};
  }
  let _DATABASE = DATABASE[url]; // 从内存读取数据
  let { data } = _DATABASE;
  if (data) {
    console.log("从内存读取", url);
    return data;
  }
  const path = require("path");
  const locale_file = path.join(DATABASE.services, urlToLocalFileName(url));
  const fs = require("fs-extra");
  if (fs.existsSync(locale_file) === true) {
    console.log("从本地缓存读取", locale_file);
    data = fs.readFileSync(locale_file);
    _DATABASE.data = data; // 保存数据到内存
    return data;
  }
  console.log("从远程服务器下载", url);
  const axios = require("axios");
  const { data: _data, headers } = await axios({
    method: "GET",
    url,
    responseType: "arraybuffer",
  });
  _DATABASE.data = _data;
  data = _data;
  saveDataToLocalFile(locale_file, _data); // 保存数据到本地文件
  return data;
}
/**
 * 递归创建目录 同步方法
 * @see https://www.cnblogs.com/luzhanshi/p/11691430.html
 */
function mkdirsSync(dirname) {
  const fs = require("fs-extra");
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    const path = require("path");
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
/**
 * 保存数据到本地文件
 */
function saveDataToLocalFile(locale_file, data) {
  const fs = require("fs-extra");
  if (fs.existsSync(locale_file) === false) {
    const path = require("path");
    mkdirsSync(path.dirname(locale_file));
    fs.writeFileSync(locale_file, data); // 保存到本地文件
  }
}
function readLocalFileToData(locale_file) {
  const fs = require("fs-extra");
  if (fs.existsSync(locale_file) === false) {
    return;
  }
  fs.readFileSync(locale_file, { encoding: "utf8" });
}
/**
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer
 * GET /10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_CSBJ_DT/MapServer?layers=140&tile=/tile/11/1024/1024
 * @param {context} context
 * @returns
 */
async function router_get_rest_services_MapServer(context, DATABASE) {
  const { query } = context;
  if (Object.keys(query).length > 0) {
    // 查询字符串里有tile
    if (query.tile) {
      return router_get_rest_services_MapServer_tile(context, DATABASE);
    }
    return router_get_rest_services_MapServer_index_with_query(
      context,
      query,
      DATABASE
    );
  }
  await router_get_rest_services_MapServer_index(context, DATABASE);
}
/**
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer?f=json
 * @param {context} context
 * @param {object} query
 */
async function router_get_rest_services_MapServer_index_with_query(
  context,
  query,
  DATABASE
) {
  const { f } = query;
  if (f === undefined) {
    return;
  }
  if (["json", "fjson", "pjson"].includes(f) === true) {
    return router_get_rest_services_MapServer_index_with_query_json(
      context,
      DATABASE
    );
  }
}
/**
 * GET /10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer?f=json
 * @param {context} context
 */
async function router_get_rest_services_MapServer_index_with_query_json(
  context,
  DATABASE
) {
  requestDataFromAssets(context, DATABASE, "World_Street_Map.json");
}
/**
 * 从assets里请求数据
 * @param {context} context
 * @param {object} DATABASE 内存数据库
 * @param {string} fileName 文件名
 * @param {string} [type] 响应请求的MIME类型
 */
function requestDataFromAssets(context, DATABASE, fileName, type) {
  context.response.body = getDataFromAssets(DATABASE, fileName);
  const mime = require("mime");
  context.response.type = type || mime.getType(fileName);
}
/**
 * 从assets里读取数据
 * @param {object} DATABASE
 * @param {string} fileName
 * @returns
 */
function getDataFromAssets(DATABASE, fileName) {
  if (DATABASE[fileName] === undefined) {
    console.log("从本地缓存读取", fileName);
    const fs = require("fs-extra");
    const path = require("path");
    DATABASE[fileName] = fs.readFileSync(
      path.join(__dirname, `assets/${fileName}`)
    );
  }
  return DATABASE[fileName];
}
function getWorldStreetMapJSON(DATABASE) {
  const fileName = "World_Street_Map.json";
  const key = `_${fileName}`;
  if (DATABASE[key] === undefined) {
    const data = getDataFromAssets(DATABASE, fileName);
    DATABASE[key] = JSON.parse(data.toString());
  }
  return DATABASE[key];
}
/**
 * GET http://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer
 * @param {context} context
 */
async function router_get_rest_services_MapServer_index(context, DATABASE) {
  requestDataFromAssets(context, DATABASE, "World_Street_Map.html");
}
/**
 * GET /10.89.9.234:8080/geoserver/rest/info?f=json
 * @param {context} context
 */
async function router_get_rest_info(context) {
  context.response.body = {
    currentVersion: 10.91,
    fullVersion: "10.9.1",
    soapUrl: "https://server.arcgisonline.com/arcgis/services",
    secureSoapUrl: null,
    authInfo: { isTokenBasedSecurity: false },
  };
}
/**
 * 创建Koa app
 */
function createKoaApp() {
  const Koa = require("koa");
  const app = new Koa();
  return app;
}
/**
 * 找到可用的端口
 * @param {number} port
 * @returns
 */
async function getPort(port) {
  const get_port = require("@sundawning/get-port");
  port = await get_port({ port }); // 找到可用的端口
  return port;
}
/**
 * 提示当前服务器端口
 * @param {number} port
 */
function logPort(port) {
  const url = `http://localhost:${port}`;
  console.log(`转发来自 ${url} 的 MapServer 请求
一般形如：${url}/10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer
在UE4下图层的地址形如：
  - ${url}/10.89.9.234:8080/geoserver/rest/services/LG/LG_T520001_HP_TILE/MapServer
  - 要素服务单个图层：${url}/10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_LGTS_DT/MapServer?layers=53&tile=
  - 要素服务多个图层：${url}/10.89.9.234:8080/geoserver/rest/services/LGFL/LG_T520001_LGTS_DT/MapServer?layers=0,46,49,50,53&tile=
`);
  // 不间断提示当前服务器端口
  setTimeout(function () {
    console.log("中间服务器", url);
  }, 10 * 1000);
  setInterval(function () {
    console.log("中间服务器", url);
  }, 60 * 1000);
}
/**
 * 允许跨域
 * @param {Koa} app
 */
function enableCors(app) {
  const cors = require("@koa/cors");
  app.use(cors());
}
/**
 * 启动Koa app
 * @param {Koa} app
 * @param {number} port
 */
function startKoaApp(app, port) {
  const server = app.listen(port);
  // server.timeout = 5 * 1000; // 所有请求的超时时间为1秒
}
