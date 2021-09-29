let{
    hello,
    install_program,
    start_processes,
    create_crontab_tasks
}=require("./utility.js");
/**
 * 运行本程序
 * 依赖：
 * - 模块：cross-spawn
 */
async function index(){
    hello();
    install_program("pm2",{program:"pnpm",args:["add","pm2","-g"]},function(){
        start_processes({
            "mysqld":{cmd:{program:"pm2",args:["start","mysqld"]},install:{program:"pkg",args:["install","mariadb","-y"]}},
        });
    });
    await start_processes({
        "sshd":{cmd:{program:"sshd",args:["-p","8022"]},install:{program:"pkg",args:["install","openssh","-y"]}}
    });
    await create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
}
index();
