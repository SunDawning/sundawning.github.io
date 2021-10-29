功能：
- 全量下载索引页面的数据：`indexPage/${new Date().getTime()}.txt`
- 增量缓存不在详情页面里的索引页面数据：indexPageIncrement.txt
- 增量下载详情页面的数据，并在下载完成后删除增量的索引数据：detailPage.txt
- 导入所有索引和详情数据到数据库mongodb里

数据采集与数据保存：
1. 数据采集（在其他设备上采集）
   1. 获取最新的detailPage.txt
      curl http://192.168.10.3:8080/detailPage.txt -O
   2. 全量下载索引数据到indexPage文件夹
      node indexPage.js
   3. 使用＂＂增量下载详情数据到detailPage.txt
      node detailPage.js
2. 数据保存（在装有Mongodb的电脑上保存到数据库）
   1. 移动全量索引数据到电脑上indexPage文件夹
   2. 转存最新详情数据detailPate.txt到电脑上
      curl http://192.168.10.2:8080/detailPage.txt -O
   3. 保存数据到数据库里
      node importPage.js
