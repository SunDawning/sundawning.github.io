/**
 * 离线下载资源
 * 将所涉及到的在线资源都离线到本地
 * node server.js
 */
let child_process=require("child_process");
let Koa=require("koa");
let proxy_port=9081;
let http_server_process=child_process.exec(`http-server -p 9080 --proxy http://localhost:${proxy_port}`);
http_server_process.stdout.pipe(process.stdout);
let app=new Koa();
app.use(function(context,next){
    console.log(context.method,context.url);
});
app.listen(proxy_port);
