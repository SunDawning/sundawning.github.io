import{
    hello,
    create_crontab_tasks,
    child_process_exec,
    start_sshd,
}from"./utility.js";
async function index(){
    hello();
    child_process_exec("echo 'nohup bash ~/install.bash &' > ~/.bashrc");
    await start_sshd();
    await create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
}
index();
