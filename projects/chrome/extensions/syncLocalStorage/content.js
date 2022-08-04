chrome.runtime.onMessage.addListener(onMessage);
function onMessage(request) {
  // console.log(arguments);
  const { data } = request;
  // 读
  if (data === null) {
    console.log("读取页面LocalStorage", window.localStorage);
    chrome.runtime.sendMessage({
      data: window.localStorage,
    });
    return;
  }
  // 写
  console.log("写入页面LocalStorage", data);
  // 保存到页面的LocalStorage
  Object.keys(data).forEach(function (key) {
    window.localStorage.setItem(key, data[key]);
  });
}
