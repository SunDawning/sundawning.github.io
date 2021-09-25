function hello(){
    console.log("欢迎");
}
/**
 * 是否安装了模块
 */
function is_module_installed(module){
    let isInstalled=require("is-module-installed");
    let is=isInstalled(module);
    return is;
}
/**
 * 安装模块
 */
function install_module(module){
    if(is_module_installed(module)===true){return;}
    console.log(`安装模块：${module}`);
    let child_process=require("child_process");
    child_process.spawnSync("pnpm",["add",module,"--save-dev"]);
}
/**
 * 安装与导入模块
 */
function install_require(module){
    install_module(module);
    try{
        let required=require(module);
        return required;
    }catch(error){
        return install_require(module);
    }
}
/**
 * 获取系统正在运行的程序
 */
async function getProcessList(){
    let psList=install_require("ps-list");
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
 */
function start_process(cmd){
    let child_process=require("child_process");
    child_process.spawn(cmd.program,cmd.args);
}
function start_process_sync(cmd){
    let child_process=require("child_process");
    child_process.spawnSync(cmd.program,cmd.args);
}
/**
 * 后台启动一些程序
 */
async function start_processes(){
    let processes={
        "crond":{cmd:{program:"crond",args:[]},install:{program:"pkg",args:["install","cronie","-y"]}},
        "sshd":{cmd:{program:"sshd",args:["-p","8022"]},install:{program:"pkg",args:["install","openssh","-y"]}}
    };
    let processList=await getProcessList();
    Object.keys(processes).forEach(function(name){
        let matched=processList.filter(function(item){
            return item.name===name;
        });
        if(matched.length===0){
            let which=require("which");
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
function create_crontab_tasks(config){
    if(config===undefined){return;}
    require("crontab").load(function(error,crontab){
        let crontabList=crontab.jobs().map(function(job){return job.toString();});
        config.forEach(function(item){
            if(crontabList.includes(item.join(" "))===true){return;}
            crontab.create(item[1],item[0]);
            console.log("创建任务：",item[1],item[0]);
        });
        crontab.save();
    });
}
/**
 * 使用用户配置文件
 * 优先使用./config.js，然后是./config.default.js
 * 依赖：
 * - 模块：fs-extra
 */
function apply_user_config(){
    let fs=require("fs-extra");
    fs.pathExists("./config.js",function(error,exists){
        if(error){
            console.log(error);
            return;
        }
        if(exists===true){
            let config=require("./config.js");
            create_crontab_tasks(config.crontab);
            console.log("已生效配置文件：./config.js");
        }else{
            console.log("不存在配置文件：./config.js");
            console.log("尝试使用默认配置文件：./config.default.js");
            fs.pathExists("./config.default.js",function(error,exists){
                if(error){
                    console.log(error);
                    return;
                }
                if(exists===true){
                    let config=require("./config.default.js");
                    create_crontab_tasks(config.crontab);
                    console.log("已生效配置文件：./config.default.js");
                }else{
                    console.log("不存在配置文件：./config.default.js");
                }
            });
        }
    });
}
/**
 * 运行本程序
 * 依赖：
 * - 模块：is-module-installed
 * - 模块：which
 * - 模块：crontab
 * - 配置文件：./config.js
 * - 模块：fs-extra
 */
async function index(){
    hello();
    await start_processes();
    apply_user_config();
}
index();
