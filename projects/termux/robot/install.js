import{child_process_exec_sync}from"./utility.js";
function index(){
    let{exists,readFile,writeFileSync,appendFile}=require("fs");
    let path="/data/data/com.termux/files/home/.bashrc";
    let content="bash ~/termux-robot/index.bash";
    exists(path,function(exist){
        if(exist===false){
            console.log("文件不存在：",path);
            writeFileSync(path,content);
            console.log("创建文件：",path);
        }
        readFile(path,"utf8",async function(error,data){
            if(error){
                console.log(error);
            }else{
                let index=data.search(content);
                if(index===-1){
                    console.log("不存在启动命令：",content);
                    appendFile(path,content,function(error){
                        if(error){console.log(error);}
                        console.log("添加启动命令到：",path);
                    });
                }
                child_process_exec_sync("pm2 start index.min.js");
            }
        });

    });
}
index();
