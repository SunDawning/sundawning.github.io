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
   3. 增量下载详情数据到detailPage.txt
      node detailPage.js
2. 数据保存（在装有Mongodb的电脑上保存到数据库）
   1. 移动全量索引数据到电脑上indexPage文件夹
   2. 转存最新详情数据detailPate.txt到电脑上
      curl http://192.168.10.2:8080/detailPage.txt -O
   3. 保存数据到数据库里
      node importPage.js

数据分析：
- 按性价比排行
  性价比：性能除以价格。
  性能为房屋的功能，包括地理位置、层高、可使用面积、布局、家具。
  价格为平均每月的必要支出，包括租金、物业费、水费、电费、网费、燃气费、伙食费、交通费、车位费。
  先满足性能，再谈价格。
