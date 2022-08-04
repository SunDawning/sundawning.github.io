index();
function index() {
  document.querySelector("#read").addEventListener("click", read);
  document.querySelector("#write").addEventListener("click", write);
  chrome.runtime.onMessage.addListener(function (request) {
    const { data } = request;
    console.log(data);
    window.localStorage.clear(); // 清空popup的LocalStorage
    // 保存到popup的LocalStorage
    Object.keys(data).forEach(function (key) {
      window.localStorage.setItem(key, data[key]);
    });
  });
}
function read() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        data: null,
      });
    }
  );
}
function write() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        data: window.localStorage,
      });
    }
  );
}
