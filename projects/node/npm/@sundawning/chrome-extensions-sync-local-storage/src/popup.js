index();
function index() {
  document.querySelector("#copy").addEventListener("click", copy);
  document.querySelector("#paste").addEventListener("click", paste);
  chrome.runtime.onMessage.addListener(onMessage);
}
function copy() {
  sendMessageToContent(null, "已复制");
}
function paste() {
  sendMessageToContent(window.localStorage, "已粘贴");
}
function sendMessageToContent(data, text) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      chrome.tabs
        .sendMessage(tabs[0].id, {
          data,
        })
        .then(function (response) {
          document.querySelector(
            "#result"
          ).innerHTML = `${new Date()}：${text}`;
        })
        .catch(function (error) {
          document.querySelector("#result").innerHTML = `${error}`;
        });
    }
  );
}
function onMessage(request) {
  const { data } = request;
  console.log(data);
  console.log("清空popup的LocalStorage");
  window.localStorage.clear();
  console.log("保存到popup的LocalStorage");
  Object.keys(data).forEach(function (key) {
    window.localStorage.setItem(key, data[key]);
  });
}
