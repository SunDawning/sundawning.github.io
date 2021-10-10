command -v node >/dev/null 2>&1 || {
    echo "Installing command: nodejs";
    pwd;
    pkg install nodejs -y;
    npm config set registry https://registry.npm.taobao.org;
}
if test -z "$(find ~/termux-robot)";then
    echo "Making directory: ~/termux-robot";
    mkdir ~/termux-robot;
fi
echo "Downloading file: ~/termux-robot/index.min.js";
cd ~/termux-robot;
pwd;
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.min.js -o index.min.js;
echo "Run script: index.min.js";
node index.min.js;
