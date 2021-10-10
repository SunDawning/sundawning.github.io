#!/bin/bash
function install_node_js(){
    command -v node >/dev/null 2>&1 || {
	pwd;
	pkg install nodejs -y;
	npm config set registry https://registry.npm.taobao.org;
    }
    command -v pnpm >/dev/null 2>&1 || {
	pwd;
	npm install pnpm -g;
    }
    command -v pm2 >/dev/null 2>&1 || {
	pwd;
	pnpm install pm2 -g;
    }
}
function index(){
    cd ~/termux-robot;
    install_node_js;
    if test -z "$(pgrep node)";then
	echo "Not start tasks.";
	echo "Starting tasks.";
	pwd;
	pm2 start index.min.js;
    fi
}
index;
