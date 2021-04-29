import"./iziToast.min.js";
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
