if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建时间日期栏
 * @param {HTMLElement} container
 * @param {string} [options.to]
 * @returns object
 */
SunDawningGIS.createLocaleDateTimeElementManager = async function (
  container,
  { to = "appendChild" } = {}
) {
  const SELF = {};
  await import("./createDateContainer.js");
  const date_container = await SunDawningGIS.createDateContainer();
  // 显示在网页里
  container[to](date_container);
  let date_detail_container;
  // 事件
  async function onPointerDown(event) {
    console.log("onPointerDown", event);
    if (date_detail_container) {
      date_detail_container.remove();
      date_detail_container = null;
      return;
    }
    await import("./createDivWithShadowRoot.js");
    date_detail_container = SunDawningGIS.createDivWithShadowRoot();
    await import("./appendStyleText.js");
    SunDawningGIS.appendStyleText(
      date_detail_container.shadowRoot,
      `
div{
  position: absolute;
  top: -688px;
  height: 688px;
  right: 0;
  width: 360px;
  background: #3e3d3ced;
}    
    `
    );
    date_container.shadowRoot
      .querySelector("div")
      .shadowRoot.appendChild(date_detail_container);
    const _container = document.createElement("div");
    date_detail_container.shadowRoot.appendChild(_container);
  }
  date_container.addEventListener("pointerdown", onPointerDown);
  // 时间
  await import("./createLocaleTimeElementManager.js");
  const localeTimeElementManager = SunDawningGIS.createLocaleTimeElementManager(
    date_container.shadowRoot.querySelector("div").shadowRoot,
    { to: "appendChild", hasSeconds: true }
  );
  // 日期
  await import("./createLocaleDateElementManager.js");
  const localeDateElementManager = SunDawningGIS.createLocaleDateElementManager(
    date_container.shadowRoot.querySelector("div").shadowRoot
  );
  /**
   * 销毁
   */
  SELF.destroy = function () {
    // 日期
    localeDateElementManager.destroy();
    // 时间
    localeTimeElementManager.destroy();
    // 事件
    date_container.removeEventListener("pointerdown", onPointerDown);
    // 从网页里移除
    date_container.remove();
    Object.keys(SELF).forEach(function (key) {
      SELF[key] = null;
      delete SELF[key];
    });
  };
  return SELF;
};
