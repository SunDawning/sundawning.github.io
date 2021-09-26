function hello(){
    console.log("欢迎");
}
/**
 * 是否安装了模块
 */
function is_module_installed(module){
    let fs=require("fs");
    return fs.existsSync(`./node_modules/${module}`);
}
/**
 * 安装模块
 * 依赖：
 * - 模块：cross-spawn
 */
function install_module(module){
    if(is_module_installed(module)===true){return;}
    console.log(`将安装模块：${module}`);
    let cross_spawn=require("cross-spawn");
    cross_spawn.sync("pnpm",["add",module,"--save-dev"]);
    console.log(`已安装模块：${module}`);
}
/**
 * 安装与导入模块
 */
function install_require_module(module){
    install_module(module);
    return require(module);
}
/**
 * 获取系统正在运行的程序
 */
async function get_process_list(){
    let psList=install_require_module("ps-list");
    let list=await psList();
    return list;
}
/**
 * 后台运行系统程序
 * 依赖：
 * - 模块：cross-spawn
 * ```JavaScript
 * start_process({program:"sshd",args:["-p","8022"]});
 * ```
 */
function start_process(cmd){
    let cross_spawn=require("cross-spawn");
    console.log(`启动程序：${cmd.program}`);
    cross_spawn.spawn(cmd.program,cmd.args);
}
function start_process_sync(cmd){
    let cross_spawn=require("cross-spawn");
    console.log(`启动程序：${cmd.program}`);
    cross_spawn.sync(cmd.program,cmd.args);
}
/**
 * 安装程序
 * ```JavaScript
 * install_program("crontab",{program:"pkg",args:["install","cronie","-y"]});
 * ```
 */
function install_program(name,cmd,onInstall){
    install_require_module("which")(name,function(error,resolvePath){
        if(error){
            console.log(`未安装程序：${name}`);
            console.log(`将安装程序：${name}`);
            start_process_sync(cmd);
        }
        if(onInstall){onInstall();}
    });
}
/**
 * 后台启动一些程序
 * @param processes Object
 * ```JavaScript
 * start_processes({
 *     "crond":{cmd:{program:"crond",args:[]},install:{program:"pkg",args:["install","cronie","-y"]}},
 *     "sshd":{cmd:{program:"sshd",args:["-p","8022"]},install:{program:"pkg",args:["install","openssh","-y"]}}
 * })
 * ```
 */
async function start_processes(processes){
    if(processes===undefined){return;}
    let processList=await get_process_list();
    Object.keys(processes).forEach(function(name){
        let matched=processList.filter(function(item){
            return item.name===name;
        });
        if(matched.length===0){
            install_program(name,processes[name].install,function(){
                console.log(`启动程序：${name}`);
                start_process(processes[name].cmd);
            });
        }else{
            console.log(`已启动程序：${name}`);
        }
    });
}
/**
 * 添加crontab定时任务
 * 依赖：
 * - crontab终端命令
 * - crontab模块
 * ```JavaScript
 * create_crontab_tasks([
 *     ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
 *     ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
 * ]);
 * ```
 */
function create_crontab_tasks(tasks){
    if(tasks===undefined){return;}
    install_require_module("crontab").load(function(error,crontab){
        // 空白的crontab
        if(crontab===null){
            create_crontab_tasks(tasks);
            return;
        }
        let crontabList=crontab.jobs().map(function(job){return job.toString();});
        tasks.forEach(function(item){
            if(crontabList.includes(item.join(" "))===true){return;}
            crontab.create(item[1],item[0]);
            console.log("创建任务：",item[0],item[1]);
        });
        crontab.save();
    });
}
/**
 * 使用termux-notification发送消息到下拉消息栏
 * ```JavaScript
 * // termux-notification --id "test" --content "内容" --title "标题" --button1-action "termux-open-url https://bing.com" --button1 "必应搜索" --button2-action "am start -a android.settings.BLUETOOTH_SETTINGS" --button2 "设置Bluetooth" --led-color 00A4FF --led-on 500
 * termux_notification({
 *     "--id":"test",
 *     "--content":"内容",
 *     "--title":"标题",
 *     "--button1-action":"termux-open-url https://bing.com",
 *     "--button1":"必应搜索",
 *     "--button2-action":"am start -a android.settings.BLUETOOTH_SETTINGS",
 *     "--button2":"设置Blutetooth",
 *     "--led-color":"00A4FF",
 *     "--led-on":"500"
 * })
 * ```
 */
function termux_notification(options){
    if(options===undefined){options={};}
    let args=[];
    Object.keys(options).forEach(function(key){
        args.push(key,options[key]);
    });
    install_program("termux-notification",{program:"pkg",args:["install","termux-api","-y"]},function(){
        start_process({program:"termux-notification",args:args});
    });
}
/**
 * 运行本程序
 * 依赖：
 * - 模块：cross-spawn
 */
async function index(){
    hello();
    await start_processes({
        "crond":{cmd:{program:"crond",args:[]},install:{program:"pkg",args:["install","cronie","-y"]}},
        "sshd":{cmd:{program:"sshd",args:["-p","8022"]},install:{program:"pkg",args:["install","openssh","-y"]}}
    });
    create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
}
index();
