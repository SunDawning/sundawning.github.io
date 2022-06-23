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
  let date_time_detail_container;
  // 事件
  async function onPointerDown(event) {
    console.log("onPointerDown", event);
    if (date_time_detail_container) {
      date_time_detail_container.remove();
      date_time_detail_container = null;
      return;
    }
    await import("./createDateTimeDetailContainer.js");
    date_time_detail_container =
      await SunDawningGIS.createDateTimeDetailContainer();
    date_container.shadowRoot
      .querySelector("div")
      .shadowRoot.appendChild(date_time_detail_container);
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
