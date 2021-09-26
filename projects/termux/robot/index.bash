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
function install_npm_module(){
    if test -z "$(find ./node_modules/$1)";then
        echo "Not Install $1";
        echo "Installing $1";
        pnpm add $1 --save-dev;
    fi
}
function index(){
    pwd;
    install_node_js;
    install_pnpm;
    install_npm_module cross-spawn;
    node ./index.js;
}
cd ~/.termux-robot;
index;
