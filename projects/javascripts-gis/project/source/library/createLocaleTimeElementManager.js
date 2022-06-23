if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建本地时间的元素
 * @param {HTMLElement} container
 * @param {string} [options.to="appendChild"] 元素将要添加到的位置，譬如appendChild, before, after
 * @param {boolean} [options.hasSeconds=false] 是否显示秒数
 * @returns HTMLElement
 */
SunDawningGIS.createLocaleTimeElementManager = function (
  container,
  { to = "appendChild", hasSeconds = false } = {}
) {
  const SELF = {};
  const element = document.createElement("div");
  let id;
  function animate() {
    let locale_time = new Date().toLocaleTimeString();
    if (hasSeconds === false) {
      locale_time = locale_time.split(":").slice(0, 2).join(":");
    }
    if (element.innerHTML !== locale_time) {
      element.innerHTML = locale_time;
    }
    id = requestAnimationFrame(animate);
  }
  animate();
  container[to](element);
  /**
   * 销毁
   */
  SELF.destroy = function () {
    element.remove();
    cancelAnimationFrame(id);
    Object.keys(SELF).forEach(function (key) {
      SELF[key] = null;
      delete SELF[key];
    });
  };
  return SELF;
};
