if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
if (globalThis.SunDawningGIS.UI === undefined) {
  globalThis.SunDawningGIS.UI = {};
}
/**
 * 给根节点添加全局样式
 */
async function appendRootStyle(root) {
  await import("./library/HTMLElement_appendStyleText.js");
  SunDawningGIS.HTMLElement_appendStyleText(
    root,
    `
body{
  margin:0;
  background-image: url(https://cn.bing.com/th?id=OHR.MostarBridge_ZH-CN5920156936_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp);
  background-size: cover;
}
  `
  );
}
/**
 * @param {HTMLElement} root
 */
async function createEarth(root) {
  globalThis.CESIUM_BASE_URL =
    "https://cdn.bootcdn.net/ajax/libs/cesium/1.94.3";
  await import(
    "./library/CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot.js"
  );
  await import(
    "./library/CesiumImageryProvider_getArcGISWorldImageryProviderByBaseURL.js"
  );
  SunDawningGIS.cesiumWidget =
    await SunDawningGIS.CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
      root,
      CESIUM_BASE_URL,
      {
        imageryProvider:
          await SunDawningGIS.CesiumImageryProvider_getArcGISWorldImageryProviderByBaseURL(
            CESIUM_BASE_URL
          ),
      }
    );
  // 初始视角
  SunDawningGIS.cesiumWidget.camera.setView({
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
  await import(
    "./library/HTMLElementManager_printCesiumCameraSetViewOptionsOnMoveEnd.js"
  );
  SunDawningGIS.UI.HTMLElementManager_printCesiumCameraSetViewOptionsOnMoveEnd =
    await SunDawningGIS.HTMLElementManager_printCesiumCameraSetViewOptionsOnMoveEnd(
      root,
      cesiumWidget
    );
}
/**
 * 创建工具栏
 * @param {HTMLElement} root
 */
async function createToolbar(root) {
  await import("./library/HTMLElement_createWindows10TaskbarContainer.js");
  const taskbar_container =
    await SunDawningGIS.HTMLElement_createWindows10TaskbarContainer();
  root.appendChild(taskbar_container);
  // 时间日期栏
  await import(
    "./library/HTMLElementManager_createLocaleDateTimeElementManager.js"
  );
  SunDawningGIS.UI.dateManager =
    await SunDawningGIS.HTMLElementManager_createLocaleDateTimeElementManager(
      taskbar_container.shadowRoot.querySelector("div").shadowRoot,
      {
        detail_offsetElement: taskbar_container.shadowRoot.querySelector("div"),
      }
    );
  taskbar_container.shadowRoot.querySelector("div").style["z-index"] = 1;
  // 开始
  {
    const start_container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
    SunDawningGIS.HTMLElement_appendStyleText(
      start_container.shadowRoot,
      `
div{
  width: 48px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;  
}
div:hover{
  background-color: black;
}    
    `
    );
    taskbar_container.shadowRoot
      .querySelector("div")
      .shadowRoot.appendChild(start_container);
    {
      const _container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
      start_container.shadowRoot.appendChild(_container);
      SunDawningGIS.HTMLElement_appendStyleText(
        _container.shadowRoot,
        `
div{
  background-image: url(https://cn.bing.com/th?id=OHR.MostarBridge_ZH-CN5920156936_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp);
  background-size: cover;
  width:32px;
  height:32px;
}        
      `
      );
      _container.shadowRoot.appendChild(document.createElement("div"));
    }
  }
  {
    const start_container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
    SunDawningGIS.HTMLElement_appendStyleText(
      start_container.shadowRoot,
      `
div{
  width: 48px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;  
}
div:hover{
  background-color: black;
}    
    `
    );
    taskbar_container.shadowRoot
      .querySelector("div")
      .shadowRoot.appendChild(start_container);
    {
      const _container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
      start_container.shadowRoot.appendChild(_container);
      SunDawningGIS.HTMLElement_appendStyleText(
        _container.shadowRoot,
        `
div{
  background-image: url(https://cn.bing.com/th?id=OHR.MostarBridge_ZH-CN5920156936_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp);
  background-size: cover;
  width:32px;
  height:32px;
}        
      `
      );
      _container.shadowRoot.appendChild(document.createElement("div"));
    }
  }
}
globalThis.onload = async function () {
  SunDawningGIS.root = document.body;
  appendRootStyle(SunDawningGIS.root);
  // 创建地球
  // createEarth(SunDawningGIS.root);
  // 底部工具栏
  createToolbar(SunDawningGIS.root);
};
