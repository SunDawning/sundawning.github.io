import"./iziToast.min.js";
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

