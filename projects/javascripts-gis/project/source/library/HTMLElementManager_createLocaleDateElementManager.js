if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建本地日期的元素
 * @param {HTMLElement} container
 * @param {string} [options.to] 元素将要添加到的位置，譬如appendChild, before, after
 * @returns HTMLElement
 */
SunDawningGIS.HTMLElementManager_createLocaleDateElementManager = function (
  container,
  { to = "appendChild" } = {}
) {
  const SELF = {};
  const element = document.createElement("div");
  let id;
  function animate() {
    const locale_date = new Date().toLocaleDateString();
    if (element.innerHTML !== locale_date) {
      element.innerHTML = locale_date;
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
