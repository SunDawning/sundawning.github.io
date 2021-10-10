#!/bin/bash
function index(){
    if test -z "$(ps -aef | grep 'node /data/data/com.termux/files/home/termux-robot/index.min.js' | grep -v 'grep')";then
	echo "Not start tasks.";
	echo "Starting tasks.";
	cd ~/termux-robot;
	pwd;
	pm2 start index.min.js;
    fi
}
index;
