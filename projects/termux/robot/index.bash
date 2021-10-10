#!/bin/bash
function install_node_js(){
    command -v node >/dev/null 2>&1 || {
	pkg install nodejs -y;
	npm config set registry https://registry.npm.taobao.org;
	npm install pnpm -g;
	pnpm install pm2 -g;
    }
}
function index(){
    cd ~/termux-robot;
    pwd;
    install_node_js;
    pwd;
    pm2 start index.min.js;
}
index;
