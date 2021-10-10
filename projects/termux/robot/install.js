import{
    executable_find,
    child_process_exec_sync,
}from"./utility.js";
function index(){
    child_process_exec_sync("curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.bash -o index.bash");
    let{existsSync,readFileSync,writeFileSync,appendFileSync}=require("fs");
    let path="/data/data/com.termux/files/home/.bashrc";
    let content="bash ~/termux-robot/index.bash";
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
    [
        ["pnpm","npm install pnpm -g"],
        ["pm2","pnpm add pm2 -g"],
        ["git","pkg install git -y"],
        ["sshd","pkg install openssh -y"],
    ].forEach(function(item){
        if(executable_find(item[0])===undefined){
            child_process_exec_sync(item[1]);        
        }        
    });
    child_process_exec_sync("curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.min.js -o index.min.js");
    child_process_exec_sync("pm2 start index.min.js");
    if(executable_find("emacs")===undefined){
        child_process_exec_sync("pkg install emacs -y");
    }
    child_process_exec_sync("curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/init.el -o ~/.emacs.d/init.el");
}
index();
