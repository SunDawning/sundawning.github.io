function hello(){
    console.log("欢迎");
}
/**
 * 是否安装了模块
 */
function is_module_installed(module){
    let fs=require("fs");
    let path=require("path");
    return fs.existsSync(path.resolve(__dirname,`./node_module/${module}`));
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
    cross_spawn.sync("pnpm",["ls",module]);
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
 * 安装全局npm包
 */
async function npmInstall(){
}
/**
 * 后台运行系统程序
 * 依赖：
 * - 模块：cross-spawn
 */
function start_process(cmd){
    let cross_spawn=require("cross-spawn");
    cross_spawn.spawn(cmd.program,cmd.args);
}
function start_process_sync(cmd){
    let cross_spawn=require("cross-spawn");
    cross_spawn.sync(cmd.program,cmd.args);
}
/**
 * 后台启动一些程序
 */
async function start_processes(){
    let processes={
        "crond":{cmd:{program:"crond",args:[]},install:{program:"pkg",args:["install","cronie","-y"]}},
        "sshd":{cmd:{program:"sshd",args:["-p","8022"]},install:{program:"pkg",args:["install","openssh","-y"]}}
    };
    let which=install_require_module("which");
    let processList=await get_process_list();
    Object.keys(processes).forEach(function(name){
        let matched=processList.filter(function(item){
            return item.name===name;
        });
        if(matched.length===0){
            which(name,function(error,resolvePath){
                if(error){
                    console.log(`未安装程序：${name}`);
                    console.log(`将安装程序：${name}`);
                    start_process_sync(processes[name].install);
                }
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
 */
function create_crontab_tasks(tasks){
    if(tasks===undefined){return;}
    install_require_module("crontab").load(function(error,crontab){
        // 空白的crontab
        if(crontab===null){
            crontab.create("30 8 * * *","ls");
            crontab.save();
            crontab.jobs().forEach(function(job){
                crontab.remove(job);
            });
            crontab.save();
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
 * 运行本程序
 * 依赖：
 * - 模块：is-module-installed
 * - 模块：which
 * - 模块：crontab
 */
async function index(){
    hello();
    install_module("which");
    await start_processes();
    create_crontab_tasks([
        ["30 8 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"],
        ["0 18 * * *","am start -n com.alibaba.android.rimet/com.alibaba.android.rimet.biz.LaunchHomeActivity"]
    ]);
}
index();
