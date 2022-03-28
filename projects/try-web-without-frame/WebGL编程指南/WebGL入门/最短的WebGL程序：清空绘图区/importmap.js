const script = document.createElement("script");
script.type = "importmap";
script.textContent = JSON.stringify({
  imports: {
    Canvas: "./Canvas.js",
  },
});
document.currentScript.after(script);
