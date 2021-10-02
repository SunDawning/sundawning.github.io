/**
 * 生成UMD格式的JavaScript文件
 */
import{
    install_require_module
}from"./utility.js";
let{terser}=install_require_module("rollup-plugin-terser");
export default[
    "index","koa","utility"
].map(function(name){
    return {
        input:`${name}.js`,
        output:{file:`${name}.min.js`,format:"umd",name:`termux_robot_${name}`},
        plugins:[terser()]
    };
});;
