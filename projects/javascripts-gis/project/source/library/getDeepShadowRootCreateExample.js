/**
 * 示例：测试创建嵌套的shadow元素
 * - 可以创建嵌套的shadow元素
 * - 外部样式默认不影响里面的元素
 * - 共享内存
 */
globalThis.getDeepShadowRootCreateExample = function () {
  let div = document.createElement("div");
  div.attachShadow({ mode: "open" });
  document.body.appendChild(div);

  {
    let div2 = document.createElement("div");
    div.shadowRoot.appendChild(div2);
    div2.attachShadow({ mode: "open" });

    let style = document.createElement("style");
    style.innerHTML = `
div{
    position:absolute;
    width:200px;
    height:200px;
    top:0;
    left:0;
}`;
    div.shadowRoot.appendChild(style);

    {
      let div3 = document.createElement("div");
      div2.shadowRoot.appendChild(div3);

      let style2 = document.createElement("style");
      style2.innerHTML = `
  div{
      position:absolute;
      width:100px;
      height:100px;
      top:0;
      right:0;
  }`;
      div2.shadowRoot.appendChild(style2);
    }
  }
};
