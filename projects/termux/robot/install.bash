if test -z "$(find ~/termux-robot)";then
    echo "Making directory: ~/termux-robot";
    mkdir ~/termux-robot;
fi
echo "Downloading file: ~/termux-robot/install.min.js";
cd ~/termux-robot;
pwd;
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/install.min.js -o install.min.js
echo "Running script: install.min.js"
command -v node >/dev/null 2>&1 || {
    echo "Installing command: nodejs";
    pwd;
    pkg install nodejs -y;
    npm config set registry https://registry.npm.taobao.org;
}
node install.min.js;
