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
    // pm2 start index.min.js
    child_process_exec_sync("curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.min.js -o index.min.js");
    [
        ["pnpm","npm install pnpm -g"],
        ["pm2","pnpm add pm2 -g"],
    ].forEach(function(item){
        if(executable_find(item[0])===undefined){
            child_process_exec_sync(item[1]);
        }
    });
    child_process_exec_sync("pm2 kill");
    child_process_exec_sync("pm2 start index.min.js");
    // emacs
    if(executable_find("emacs")===undefined){
        child_process_exec_sync("pkg install emacs -y");
    }
    child_process_exec_sync("rm -r ~/.emacs.d");
    if(is_file_exists("/data/data/com.termux/files/home/.emacs.d")===false){
        child_process_exec_sync("mkdir ~/.emacs.d");
    }
    child_process_exec_sync("curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/init.el -o ~/.emacs.d/init.el");
    // rollup
    if(executable_find("rollup")===undefined){
        child_process_exec_sync("pnpm add rollup -g");
    }
    child_process_exec_sync("curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/rollup.config.js -o rollup.config.js");
    [
        "install","uninstall","index","koa","utility",
    ].forEach(function(name){
        child_process_exec_sync(`curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/${name}.js -o ${name}.js`);
    });
}
index();
