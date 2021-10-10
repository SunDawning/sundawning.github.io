import{
    hello,
    create_crontab_tasks,
    executable_find,
    child_process_exec_sync,
    is_file_exists
}from"./utility.js";
async function index(){
    hello();
    // pm2 start mysqld
    if(executable_find("mysqld")===undefined){
        child_process_exec_sync("pkg install mariadb -y");
    }
    [
        ["pnpm","npm install pnpm -g"],
        ["pm2","pnpm add pm2 -g"],
    ].forEach(function(item){
        if(executable_find(item[0])===undefined){
            child_process_exec_sync(item[1]);        
        }        
    });    
    child_process_exec_sync("pm2 start mysqld");
    // pm2 start koa.min.js
    if(is_file_exists("koa.min.js")===false){
        child_process_exec_sync("curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/koa.min.js -o koa.min.js");
    }
    child_process_exec_sync("pm2 start koa.min.js");
    // sshd -p 8022
    if(executable_find("sshd")===undefined){
        child_process_exec_sync("pkg install openssh -y");
    }
    child_process_exec_sync("sshd -p 8022");
    // crond
    await create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
}
index();
