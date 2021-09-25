#!/bin/bash
function install_node_js(){
    command -v node >/dev/null 2>&1 || {
        pkg install nodejs -y;
    }
}
function install_pnpm(){
    command -v pnpm >/dev/null 2>&1 || {
        npm install pnpm -g;
    }
}
# 有些npm模块不能在node里面安装并立即使用
function install_npm_module(){
    if test -z "$(find ~/.termux-robot/node_modules/$1)";then
        echo "Not Install $1";
        echo "Installing $1";
        cd ~/.termux-robot/ && pnpm add $1 --save-dev;
    fi
}
function index(){
    install_node_js;
    install_pnpm;
    install_npm_module is-module-installed;
    install_npm_module which;
    install_npm_module crontab;
    install_npm_module fs-extra;
    cd ~/.termux-robot/ && node ./index.js;
}
index;
