async function index() {
  await import(
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
  );
  console.log("Hello", THREE);
}
index();
