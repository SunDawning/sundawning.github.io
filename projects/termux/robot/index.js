import{
    hello,
    create_crontab_tasks,
    executable_find,
    child_process_exec,
    start_sshd,
    install_emacs,
    pnpm_add_g
}from"./utility.js";
async function index(){
    hello();
    child_process_exec("echo 'nohup bash ~/install.bash &' > ~/.bashrc");
    await start_sshd();
    await create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
    install_emacs();
    // 下载、安装npm模块http-server来便于启动静态网页服务器，在多个设备之间以http的方式来共享文件。
    pnpm_add_g("http-server");
}
index();
