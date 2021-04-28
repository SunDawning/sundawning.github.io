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
export function warning(message){
    iziToast.warning({
        message: message,
        position: 'center',
    });
    console.warn(message);
}
export function success(message){
    iziToast.success({
        message:message,
        position:"center",
    });
    console.log(message);
}
export function info(message){
    iziToast.info({
        message:message,
        position:"center",
    });
    console.info(message);
}
