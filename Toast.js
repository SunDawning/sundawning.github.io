import"./iziToast.min.js"; // https://izitoast.marcelodolza.com/
import{style as iziToastStyle}from"./iziToast.min.css.js";
function addiziToastCSS(){
    let style=document.createElement("style");
    style.type="text/css";
    style.innerHTML=iziToastStyle;
    document.head.appendChild(style);
    return style;
}
addiziToastCSS();
/**
 * 用来在网页里和console里显示＂警告＂信息
 * @param message 是一个字符串，表示将要输出的信息。
 * @return undefined
 */
export function warning(message){
    iziToast.warning({
        message: message,
        position: 'center',
    });
    console.warn(message);
}
/**
 * 用来在网页里和console里显示＂成功＂信息
 * @param message 是一个字符串，表示将要输出的信息。
 * @return undefined
 */
export function success(message){
    iziToast.success({
        message:message,
        position:"center",
    });
    console.log(message);
}
/**
 * 用来在网页里和console里显示＂提示＂信息
 * @param message 是一个字符串，表示将要输出的信息。
 * @return undefined
 */
export function info(message){
    iziToast.info({
        message:message,
        position:"center",
    });
    console.info(message);
}
