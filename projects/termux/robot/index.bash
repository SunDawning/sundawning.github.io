#!/bin/bash
function index(){
    if test -z "$(pgrep sshd)";then
	echo "Not start tasks.";
	echo "Starting tasks.";
	cd ~/termux-robot;
	pwd;
	node index.min.js;
    fi
}
index;
