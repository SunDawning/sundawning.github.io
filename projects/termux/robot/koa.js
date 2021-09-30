/*
 * 网页服务器
 */
import{install_require_module}from"./utility.js";
async function index(){
    let Koa=install_require_module("koa");
    let app=new Koa();
    app.use(function(context,next){
        context.body="Koa";
    });
    let port=8080;
    app.listen(port);
    console.log("启动网页服务器：",`http://localhost:${port}`);
}
index();
