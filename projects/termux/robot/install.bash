command -v node >/dev/null 2>&1 || {
    echo "Installing command: nodejs";
    pwd;
    pkg install nodejs -y;
    npm config set registry https://registry.npm.taobao.org;
}
command -v pnpm >/dev/null 2>&1 || {
    echo "Installing command: pnpm";
    pwd;
    npm install pnpm -g;
}
command -v pm2 >/dev/null 2>&1 || {
    echo "Installing command: pm2";
    pwd;
    pnpm install pm2 -g;
}
if test -z "$(find ~/termux-robot)";then
    echo "Making directory: ~/termux-robot";
    mkdir ~/termux-robot;
fi
echo "Downloading file: ~/termux-robot/install.min.js";
cd ~/termux-robot;
pwd;
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/install.min.js -o install.min.js
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.bash -o index.bash
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/index.min.js -o index.min.js
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/koa.min.js -o koa.min.js
echo "Running script: install.min.js"
pm2 start install.min.js;
