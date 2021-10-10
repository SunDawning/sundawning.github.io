import{
    hello,
    create_crontab_tasks,
    child_process_exec_sync
}from"./utility.js";
async function index(){
    hello();
    // 启动termux后执行：~/.bashrc
    child_process_exec_sync("echo 'nohup bash ~/install.bash &' > ~/.bashrc");
    // crond
    await create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
}
index();
