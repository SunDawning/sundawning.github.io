import{
    install_require_module
}from"./src/utility.js";
let{terser}=install_require_module("rollup-plugin-terser");
export default{
    input:"src/index.js",
    output:{file:"index.js",format:"umd",name:""},
    plugins:[terser()]
};
