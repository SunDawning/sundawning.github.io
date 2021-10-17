安装:

cd ~/ && curl -fsSL https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/install.bash -o install.bash && nohup bash install.bash &

删除：

curl -fsSL https://gitee.com/sundawning/sundawning.gitee.io/raw/master/projects/termux/robot/uninstall.bash | bash

生成文档：

jsdoc . -c jsdoc.json -r -d docs
