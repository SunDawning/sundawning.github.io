import{style as iziToastStyle}from"./iziToast.min.css.js"; // https://izitoast.marcelodolza.com/
/**
 * 在＂head＂里创建一个＂style＂元素，并填入＂iziToast.min.css＂里的内容。
 * @param undefined
 * @return object 返回所创建的＂style＂元素
 */
export function addiziToastCSS(){
    let style=document.createElement("style");
    style.type="text/css";
    style.innerHTML=iziToastStyle;
    document.head.appendChild(style);
    return style;
}
