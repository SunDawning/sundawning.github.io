从一个网站获取所有 LocalStorage，并将其设置到另一个网站，即 LocalStorage 同步。

2022-08-04 16:27:09

基于 chrome 版本 103.0.5060.134（正式版本） （64 位）

# 安装

1. chrome://extensions/
2. 开发者模式（右上角）
3. 加载已解压的扩展程序

# 开发调试

2022-08-04 21:35:39

1. 编写扩展
2. 检查 popup.html ，打开 popup.html 的开发者模式，再刷新
   与当前网页并排打开
3. 刷新当前网页

修改扩展之后，需要刷新 popup.html 页面和当前网页。

# 探索

2022-08-04 16:27:09

https://cloud.tencent.com/developer/ask/sof/75688

https://www.bookstack.cn/read/chrome-plugin-develop/spilt.2.spilt.4.8bdb1aac68bbdc44.md

https://www.jianshu.com/p/5464872fef93

入门系列 3 - background、content、popup 的通信
https://juejin.cn/post/6844903985711677453

## 引申

2022-08-04 22:17:59

可以有一个新的扩展，用来将一个网页的数据复制到另一个网页里，或者下载到本地、上传到网盘，或者从本地恢复、从网盘下载，这些数据不只是 LocalStorage 里的内容，可以是一个网页当时的运行数据。

本扩展解决的需求点在于：有一个在线的网页，有一个本地开发状态下的网页，二者都需要登录权限（存储在 LocalStorage 里）才能向接口请求数据，本地开发状态下却没有登录功能，登录功能位于另一个网页里，于是得在一个在线的网页里复制登录权限，并在本地网页里粘贴登录权限。
