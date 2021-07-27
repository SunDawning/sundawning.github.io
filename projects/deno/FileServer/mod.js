// **** mod.js


// [[file:~/literate-programming/deno.org::*mod.js][mod.js:1]]
import{parse}from"https://deno.land/std/flags/mod.ts";
import{formatTime}from"https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/formatTime.js";
import{existsSync}from"https://deno.land/std/fs/mod.ts";
import{serve}from"https://deno.land/std/http/server.ts";
import{extname,posix}from"https://deno.land/std/path/mod.ts";
import{sendObjectInJSON}from"https://gitee.com/sundawning/deno-oak-rest-users/raw/master/sendObjectInJSON.js";
/**
 * @param options.name 服务器的名字，不填的话使用默认名字＂FileServer＂，在启动服务器的时候可以从命令行来命名，便于限制用户的访问。
 * @param options.internalLoginServer 内部登录服务器的地址，如果设置了登录服务器，则需要设置服务器的名字，用于在服务器里登录，需要提供端口。
 * @param externalLoginServer 外部登录服务器的地址，用于在网页里跳转，一般不需要端口。
 * @param cors Boolean 是否允许跨域访问
 * @param onNotExistsFille 进一步本地处理不存在的文件
 */
export function FileServer(options){
    let SELF={};
    if(options===undefined){options={};}
    SELF.root=options.root;
    if(SELF.root&&(existsSync(SELF.root)===true)){
        console.log(formatTime(),"根目录",SELF.root);
    }else{
        SELF.root=".";
    }
    SELF.hostname=options.hostname;
    if(SELF.hostname===undefined){
        SELF.hostname="0.0.0.0";
    }
    SELF.port=options.port;
    if(SELF.port===undefined){
        SELF.port=8080;
    }
    SELF.name=options.name;
    if(SELF.name===undefined){
        SELF.name="FileServer";
    }
    SELF.externalLoginServer=options.externalLoginServer;
    if(SELF.externalLoginServer){
        console.log(formatTime(),"外部登录服务器的地址",SELF.externalLoginServer);
        if(SELF.externalLoginServer.endsWith("/")){
            SELF.externalLoginServer=SELF.externalLoginServer.substring(0,SELF.externalLoginServer.lastIndexOf("/"));
        };
    }
    SELF.internalLoginServer=options.internalLoginServer;
    if(SELF.internalLoginServer){
        if(SELF.internalLoginServer.endsWith("/")){
            SELF.internalLoginServer=SELF.internalLoginServer.substring(0,SELF.internalLoginServer.lastIndexOf("/"));
        };
    }else if(SELF.externalLoginServer){//没有提供内网登录的服务器时，尝试使用外网登录的服务器来替代。
        SELF.internalLoginServer=SELF.externalLoginServer;
    }
    SELF.cors=options.cors;
    SELF.onNotExistsFile=options.onNotExistsFile;
    SELF.start=async function(){
        let server=serve({
            hostname:SELF.hostname,
            port:SELF.port,
        });
        console.log(formatTime(),`FileServer服务器${SELF.name}正在运行，地址：http://localhost:${SELF.port}/`);
        for await (let request of server){
            let pathname=decodeURIComponent(new URL(request.url,"http://request.com").pathname); //中文转义
            console.log(formatTime(),request.method,"访问",request.url,"=>",pathname);
            /**
             * 请求本地文件夹
             */
            async function requestDirectory(request,directory){
                console.log(formatTime(),"请求文件夹",directory);
                let entries=[];
                for await (let entry of Deno.readDir(directory)){ //https://doc.deno.land/builtin/stable#Deno.readDir
                    if(entry.isDirectory===true){ //是文件夹
                        entries.push(entry);
                    }else if(entry.isFile===true){ //是文件
                        if([
                            ".html",".js",".css",".json",".jpg",".mp4",
                        ].indexOf(extname(entry.name).toLowerCase())===-1){continue;}
                        entries.push(entry);
                    }
                }
                let body=new TextEncoder().encode(`
<meta charset='utf-8'>
<title>${directory}</title>
<meta name='viewport' content='width=device-width'>
<script type='module'>
  let json=${JSON.stringify(entries)};
  //console.log(json);
  let container=document.createElement('div');
  document.body.appendChild(container);
  json.map(function(item){
    let div=document.createElement('div');
    if(item.isDirectory===true){
      div.innerText=item.name+"/";
      div.title=item.name+"/";
    }else{
      div.innerText=item.name;
      div.title=item.name;
    }
    div.addEventListener('click',onClick);
    div.style.cssText=\`
cursor:pointer;
margin:8px 0;
padding:8px;
border:4px solid #eceff1;
border-radius:8px;
\`;
    function onClick(event){
      if(item.isFile===true){//是文件
        window.open(new URL(item.name,window.location));
      }else if(item.isDirectory===true){//是文件夹
        window.open(new URL(item.name+'/',window.location));
      }
    }
    container.appendChild(div);
  });
</script>
  `);
                let headers=new Headers();
                headers.set("content-type","text/html;charset=utf-8");
                request.respond({
                    status:200,
                    headers:headers,
                    body:body,
                });
            }
            /**
             * 请求本地文件
             * @param request ［必须
             * @param file ［可选］所请求的文件，不填时将从request.url里提取。
             * @param contentType ［可选］所请求文件的文件类型，不填时将根据file的文件名后缀来生成。
             */
            async function requestFile(request,file,contentType){
                if(file===undefined){ //不填文件的路径时
                    file=new URL(request.url,"http://request.com").pathname.substring(1);
                }
                if(existsSync(file)===false){ //文件不存在时
                    console.log(formatTime(),"文件不存在",file);
                    if(SELF.onNotExistsFile){SELF.onNotExistsFile(file);}
                    request.respond({status:404});
                }else{ //文件存在时，请求本地文件。
                    let content=await Deno.open(file);
                    request.done.then(function(){ //https://deno.land/std@0.97.0/http/file_server.ts#L122
                        content.close();
                        console.log(formatTime(),"解析完数据",file);
                    });
                    if(contentType===undefined){ //不填文件类型时
                        contentType={
                            ".md": "text/markdown",
                            ".html":"text/html",
                            ".htm":"text/html",
                            ".json":"application/json",
                            ".map":"application/json",
                            ".txt":"text/plain",
                            ".ts":"text/typescript",
                            ".tsx":"text/tsx",
                            ".js":"application/javascript",
                            ".jsx":"text/jsx",
                            ".gz":"application/gzip",
                            ".css":"text/css",
                            ".wasm":"application/wasm",
                            ".mjs":"application/javascript",
                            ".svg":"image/svg+xml",
                            ".mp4":"video/mp4",
                        }[extname(file)];
                    }
                    let response={};
                    let headers=new Headers();
                    if(contentType){
                        if(contentType==="video/mp4"){
                            // mp4视频不支持边加载边播放（流媒体）的根本原因及解决方法 - 网站优化技巧: https://www.ioperat.com/news/better-website/45.html
                            // 将mp4的元数据放到最前面时，就能边加载边播放而不用下载完所有才播放。
                            // ffmpeg -i input.mp4 -movflags faststart output.mp4
                            // 谷歌浏览器中video播放视频进度条无法拖动，一点击进度条就回到0重新播放_山有木兮木有枝 心悦君兮君不知-CSDN博客: https://blog.csdn.net/tt18473481961/article/details/112801768
                            // 必须满足如下条件才能拖动进度条播放
                            // 1. 设置Response Headers
                            //    - Accept-Ranges
                            //    - Content-Length
                            //    - Content-Range
                            //    - content-type
                            // 2. content.seek
                            // 3. response.status必须是206
                            //bytes=0-
                            let rangeQuery=request.headers.get("Range");
                            console.log(formatTime(),"Range",rangeQuery);
                            if(rangeQuery===null){ //直接下载视频
                                console.log(formatTime(),"直接下载视频");
                                headers.set("content-type",`application/octet-stream`);
                            }else{ //播放视频
                                let fileSize=(await content.stat()).size;
                                console.log(formatTime(),"播放视频",fileSize);
                                let startIndex=parseInt(rangeQuery.split("=")[1].split("-")[0]);
                                if(startIndex>fileSize){
                                    startIndex=0;
                                }
                                let contentLength=2*1024*1024;
                                let endIndex=startIndex+contentLength;
                                endIndex=Math.min(endIndex,fileSize);
                                contentLength=endIndex-startIndex;
                                headers.set("Accept-Ranges","bytes");
                                headers.set("Content-Length",contentLength);
                                headers.set("content-type",`${contentType}`);
                                headers.set("Content-Range",`bytes ${startIndex}-${endIndex}/${fileSize}`);
                                response.status=206; //
                                content.seek(startIndex,1); //startIndex作为文件当前Current的起点
                            }
                        }else{
                            headers.set("content-type",`${contentType};charset=utf-8`);
                        }
                    }
                    //cors
                    if(SELF.cors===true){
                        headers.set("access-control-allow-origin","*");
                        headers.set("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept, Range");
                    }
                    response.headers=headers;
                    response.body=content;
                    //ConnectionAborted: An established connection was aborted by the software in your host machine. (os error 10053)
                    //    at async requestFile (file:///C:/Users/sgs/AppData/Roaming/.emacs.d/site-lisp/deno/FileServer/mod.js:180:17)
                    try{
                        await request.respond(response);
                    }catch(error){
                        console.log(formatTime(),error);
                    }
                }
            }
            /**
             * 当有权限访问服务器时，属于有效访问。
             */
            function validRequest(){
                if(pathname.endsWith("/")){ //请求文件夹
                    let directory=posix.join(SELF.root,pathname);
                    if(existsSync(directory)===false){ //文件夹不存在
                        console.log(formatTime(),"文件夹不存在",directory);
                        request.respond({status:404});
                    }else{ //文件夹存在，尝试请求索引文件。
                        let index=directory+"index.html";
                        if(existsSync(index)===false){ //目录不存在＂index.html＂时将自动生成目录索引
                            console.log(formatTime(),"目录不存在索引文件",index);
                            requestDirectory(request,directory);
                            console.log(formatTime(),"自动生成目录索引");
                        }else{ //目录存在＂index.html＂时，将返回该网页。
                            console.log(formatTime(),"目录存在索引文件",index);
                            requestFile(request,index);
                        }
                    }
                }else{ //请求文件
                    let file=posix.join(SELF.root,pathname);
                    requestFile(request,file);
                }
            }
            if(SELF.internalLoginServer){ //从命令行设置了登录服务器
                console.log(formatTime(),"请求访问服务器",NAME);
                function getCookie(cookie,cname) { //JavaScript Cookie | 菜鸟教程: https://www.runoob.com/js/js-cookies.html
                    if(cookie===undefined){return "";}
                    if(cookie===null){return "";} //隐身登录时
                    var name = cname + "=";
                    var ca = cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i].trim();
                        if (c.indexOf(name) == 0)
                            return c.substring(name.length, c.length);
                    }
                    return "";
                }
                let token=getCookie(request.headers.get("cookie"),"token");
                //验证访问者是否有权限访问服务器
                let loginData={
                    authority:NAME,
                    token:token,
                };
                console.log(formatTime(),"登录数据",loginData);
                let loginResponse=await(await sendObjectInJSON(`${SELF.internalLoginServer}/login`,"POST",loginData)).json();
                console.log(formatTime(),"验证访问权限",loginResponse);
                let validToken=loginResponse.isValidToken;
                if(validToken===true){ //有权限访问
                    validRequest();
                }else{ //无权限访问
                    let headers=new Headers();
                    headers.set("content-type","text/html;charset=utf-8");
                    let body=new TextEncoder().encode(`
<script type="module">
  function setCookie(cname, cvalue, exdays) {//JavaScript Cookie | 菜鸟教程: https://www.runoob.com/js/js-cookies.html
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
  }
  setCookie("token","",-1);
  let meta=document.createElement("meta");
  meta.setAttribute("http-equiv","refresh");
  meta.setAttribute("content","0;url=${externalLoginServer}/?redirect="+window.location);
  document.head.appendChild(meta);
</script>
`);
                    request.respond({
                        headers:headers,
                        body:body,
                    });
                }
            }else{
                validRequest();
            }
        }
    };
    return SELF;
}
if(import.meta.main){
    let commandLineArgs=parse(Deno.args);
    if(commandLineArgs.help){
        console.log(`
A Simple File Server.

Version: <2021-07-27 Tue 21:52:30 UTC+08:00>

  USAGE:
    FileServer [options]

  OPTIONS:
    --help                      Prints help information
    --root        <ROOT>        Set Root Directory
    --port        <PORT>        Set port
    --name        <NAME>        Set name
    --internalLoginServer <internalLoginServer> Set internalLoginServer
    --externalLoginServer <externalLoginServer> Set externalLoginServer
    --cors                      Enable Cors
`);
        Deno.exit();
    }
    console.log(formatTime(),"commandLineArgs",commandLineArgs);
    let fileServer=new FileServer(commandLineArgs);
    fileServer.start();
}
// mod.js:1 ends here
