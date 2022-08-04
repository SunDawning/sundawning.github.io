chrome.runtime.onMessage.addListener(function (request) {
  console.log(arguments);
  const { data } = request;
  if (data === null) {
    console.log(window.localStorage);
    chrome.runtime.sendMessage({
      data: window.localStorage,
    });
    return;
  }
  console.log(data);
  // 保存到popup的LocalStorage
  Object.keys(data).forEach(function (key) {
    window.localStorage.setItem(key, data[key]);
  });
});
