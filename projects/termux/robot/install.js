import{
    executable_find,
    child_process_exec_sync,
    is_file_exists,
}from"./utility.js";
function index(){
    // ~/.bashrc
    child_process_exec_sync("curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.bash -o index.bash");
    let{existsSync,readFileSync,writeFileSync,appendFileSync}=require("fs");
    let path="/data/data/com.termux/files/home/.bashrc";
    let content="nohup bash ~/termux-robot/index.bash &";
    if(existsSync(path)===false){
        console.log("文件不存在：",path);
        writeFileSync(path,content);
        console.log("创建文件：",path);
    }
    let data=readFileSync(path,"utf8");
    let index=data.search(content);
    if(index===-1){
        console.log("不存在启动命令：",content);
        appendFileSync(path,content);
        console.log("添加启动命令到：",path);
    }
    child_process_exec_sync("curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.min.js -o index.min.js");
    child_process_exec_sync(content);
}
index();
