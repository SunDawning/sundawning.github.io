import"./iziToast.min.js";
import{addiziToastCSS}from"./addiziToastCSS.js";
addiziToastCSS();
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
