index();
function index() {
  document.querySelector("#copy").addEventListener("click", copy);
  document.querySelector("#paste").addEventListener("click", paste);
  chrome.runtime.onMessage.addListener(onMessage);
}
function copy() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      chrome.tabs
        .sendMessage(tabs[0].id, {
          data: null,
        })
        .then(function (response) {
          document.querySelector("#result").innerHTML = `${new Date()}：已复制`;
        })
        .catch(function (error) {
          document.querySelector("#result").innerHTML = `${error}`;
        });
    }
  );
}
function paste() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      chrome.tabs
        .sendMessage(tabs[0].id, {
          data: window.localStorage,
        })
        .then(function (response) {
          document.querySelector("#result").innerHTML = `${new Date()}：已粘贴`;
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
