/**
 * 离线下载资源
 * 将所涉及到的在线资源都离线到本地
 * npx nodemon server.js
 */
let child_process=require("child_process");
let Koa=require("koa");
let fs=require("fs");
let axios=require("axios");
let proxy_port=9081;
let http_server_process=child_process.exec(`npx http-server -p 9080 --proxy http://localhost:${proxy_port}`);
http_server_process.stdout.pipe(process.stdout);
let app=new Koa();
app.use(async function(context,next){
    let url=context.url;
    console.log(context.method,url);
    if(context.url.search("^/assets/")>-1){
        // "/assets/61.144.226.124:10000/AddressWeb/favicon.ico"
        let online_url=url.replace("/assets/","http://");
        let response=await axios.get(online_url,{
            responseType:"arraybuffer"
        });
        fs.writeFileSync("favicon.ico",response.data);
        context.set("content-type",response.headers["content-type"]);
        context.body=response.data;
    }
});
app.listen(proxy_port);
