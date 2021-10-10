echo "Downloading file: ~/termux-robot/uninstall.min.js";
cd ~/termux-robot;
pwd;
curl https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/uninstall.min.js -o uninstall.min.js
node uninstall.min.js;
rm -r ~/termux-robot;
pnpm remove pm2 -g;
npm remove pnpm -g;
pkg uninstall nodejs -y;

