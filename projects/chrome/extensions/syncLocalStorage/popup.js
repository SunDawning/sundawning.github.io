index();
function index() {
  document.querySelector("#read").addEventListener("click", read);
  document.querySelector("#write").addEventListener("click", write);
}
function read() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        data: "读",
      });
    }
  );
}
function write() {
  console.log("写");
}
