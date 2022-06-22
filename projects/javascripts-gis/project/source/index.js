if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 给根节点添加全局样式
 */
async function appendRootStyle(root) {
  await import("./library/appendStyleText.js");
  SunDawningGIS.appendStyleText(
    root,
    `
body{
  margin:0;
}
  `
  );
}
/**
 * @param {HTMLElement} root
 * @param {function} getImageryProvider
 * @returns Cesium.CesiumWidget
 */
async function createEarth(root, getImageryProvider) {
  globalThis.CESIUM_BASE_URL =
    "https://cdn.bootcdn.net/ajax/libs/cesium/1.94.3";
  await import(
    "./library/getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot.js"
  );
  SunDawningGIS.cesiumWidget =
    await SunDawningGIS.getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
      root,
      CESIUM_BASE_URL,
      {
        imageryProvider: await getImageryProvider(CESIUM_BASE_URL),
      }
    );
  return SunDawningGIS.cesiumWidget;
}
/**
 * 设置右键菜单
 */
function setRightKeyMenu() {
  document.documentElement.oncontextmenu = function (event) {
    console.log("document.documentElement.oncontextmenu", event);
  };
}
/**
 * 创建UI，在右上角输出相机的视角，鼠标移动停下随即更新
 * @param {HTMLElement} root
 * @param {Cesium.Viewer||Cesium.CesiumWidget} cesiumWidget
 */
async function create_ui_printCesiumCameraSetViewOptionsOnMoveEnd(
  root,
  cesiumWidget
) {
  await import("./library/printCesiumCameraSetViewOptionsOnMoveEnd.js");
  SunDawningGIS.ui_printCesiumCameraSetViewOptionsOnMoveEnd =
    await SunDawningGIS.printCesiumCameraSetViewOptionsOnMoveEnd(
      root,
      cesiumWidget
    );
}
globalThis.onload = async function () {
  SunDawningGIS.root = document.body;
  appendRootStyle(SunDawningGIS.root);
  await import("./library/getArcGISWorldImageryProviderByBaseURL.js");
  const cesiumWidget = await createEarth(
    SunDawningGIS.root,
    SunDawningGIS.getArcGISWorldImageryProviderByBaseURL
  );
  cesiumWidget.camera.setView({
    destination: {
      x: -2924819.4945182353,
      y: 9022799.347751182,
      z: 4775396.196561911,
    },
    orientation: {
      heading: 0,
      pitch: -1.3768327359474233,
      roll: 0,
    },
  });
  // 底部工具栏
  function getTaskbarCreate() {
    const container = document.createElement("div");
    container.attachShadow({ mode: "open" });
    SunDawningGIS.appendStyleText(
      container.shadowRoot,
      `
div{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 48px;
  width: 100%;
  background-color: #3e3d3ced;   
}       
    `
    );
    const _container = document.createElement("div");
    _container.attachShadow({ mode: "open" });
    SunDawningGIS.appendChild(container.shadowRoot, _container);
    return container;
  }
  const taskbar = getTaskbarCreate();
  SunDawningGIS.root.appendChild(taskbar);
  // 时间日期栏
  {
    function getDateElementCreate() {
      const container = document.createElement("div");
      container.attachShadow({ mode: "open" });
      SunDawningGIS.appendStyleText(
        container.shadowRoot,
        `
  div{
    position: absolute;
    width: 64px;
    right: 0;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;    
    font-size: 12px;
  }   
      `
      );
      const _container = document.createElement("div");
      _container.attachShadow({ mode: "open" });
      SunDawningGIS.appendChild(container.shadowRoot, _container);
      return container;
    }
    const date_element = getDateElementCreate();
    taskbar.shadowRoot
      .querySelector("div")
      .shadowRoot.appendChild(date_element);
    // 时间
    {
      const locale_time_element = document.createElement("div");
      function animate() {
        const locale_time = new Date()
          .toLocaleTimeString()
          .split(":")
          .slice(0, 2)
          .join(":");
        if (locale_time_element.innerHTML !== locale_time) {
          locale_time_element.innerHTML = locale_time;
        }
        requestAnimationFrame(animate);
      }
      animate();
      date_element.shadowRoot
        .querySelector("div")
        .shadowRoot.appendChild(locale_time_element);
    }
    // 日期
    {
      const locale_date_element = document.createElement("div");
      function animate() {
        const locale_date = new Date().toLocaleDateString();
        if (locale_date_element.innerHTML !== locale_date) {
          locale_date_element.innerHTML = locale_date;
        }
        requestAnimationFrame(animate);
      }
      animate();
      date_element.shadowRoot
        .querySelector("div")
        .shadowRoot.appendChild(locale_date_element);
    }
  }
};
