import{
    install_require_module
}from"./utility.js";
let{terser}=install_require_module("rollup-plugin-terser");
export default{
    input:"index.js",
    output:{file:"index.min.js",format:"umd",name:""},
    plugins:[terser()]
};
