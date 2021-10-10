function index(){
    let{exists,readFile,writeFile}=require("fs");
    let path="~/.bashrc";
    let content="bash ~/termux-robot/index.bash";
    exists(path,function(exist){
        if(exist===false){
            console.log("文件不存在：",path);
            return;
        }else{
            readFile(path,"utf8",function(error,data){
                if(error){
                    console.log(error);
                }else{
                    let index=data.search(content);
                    if(index===-1){return;}
                    console.log("存在启动命令：",content);
                    data=data.replace(content,"");
                    writeFile(path,data,function(error){
                        if(error){console.log(error);}
                        console.log("移除启动命令");
                    });
                }
            });
        }
    });
}
index();
