chrome.runtime.onMessage.addListener(function () {
  // console.log(arguments);
  console.log(window.localStorage);
  chrome.runtime.sendMessage({
    data: window.localStorage,
  });
});
