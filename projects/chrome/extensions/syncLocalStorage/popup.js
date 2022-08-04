index();
function index() {
  document.querySelector("#read").addEventListener("click", read);
  document.querySelector("#write").addEventListener("click", write);
}

function read() {
  console.log("读");
}
function write() {
  console.log("写");
}
