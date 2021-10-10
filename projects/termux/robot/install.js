import{
    executable_find,
    child_process_exec_sync
}from"./utility.js";
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
            }
        });

    });
    [
        ["pnpm","npm install pnpm -g"],
        ["pm2","pnpm add pm2 -g"],
        ["emacs","pkg install emacs -y"],
        ["git","pkg install git -y"]
    ].forEach(function(item){
        if(executable_find(item[0])===undefined){
            child_process_exec_sync(item[1]);        
        }        
    });
}
index();
