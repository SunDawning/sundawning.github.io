import{
    hello,
    create_crontab_tasks,
    executable_find,
    child_process_exec_sync,
    is_process_live,
}from"./utility.js";
async function index(){
    hello();
    // sshd -p 8022
    if(executable_find("sshd")===undefined){
        child_process_exec_sync("pkg install openssh -y");
    }
    if(is_process_live("sshd")===false){
        child_process_exec_sync("sshd -p 8022");
    }
    // crond
    await create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
}
index();
