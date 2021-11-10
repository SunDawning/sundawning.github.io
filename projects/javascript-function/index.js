/**
 * @see 默认参数值 - JavaScript | MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/default_parameters
 */
function test(num = 1) {
    console.log(typeof num);
}
test(2);
test({num:2});
