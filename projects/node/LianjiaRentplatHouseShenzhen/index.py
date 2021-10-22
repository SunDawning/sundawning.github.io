import os
host = os.environ.get('MONGODB_HOST', '127.0.0.1')  # 本地数据库
port = os.environ.get('MONGODB_PORT', '27017')  # 数据库端口
mongo_url = 'mongodb://{}:{}'.format(host, port)
mongo_db = os.environ.get('MONGODB_DATABASE', 'Lianjia')
print(mongo_db)
from pymongo import MongoClient
client = MongoClient(mongo_url)
print(client)
db = client[mongo_db]
db['zufang'].create_index('m_url', unique=True)  # 以m端链接为主键进行去重
# 读取CSV文件夹
dbDirectory="dbDirectory"
dbDirectoryBackup="{}Backup".format(dbDirectory)
if(os.path.exists(dbDirectoryBackup)==False):
    os.makedirs(dbDirectoryBackup)
    pass
files=os.listdir(dbDirectory)
def update(file):
    path="{}/{}".format(dbDirectory,file)
    # 不处理正在下载数据的CSV文件
    from time import time
    if((time()-os.path.getmtime(path))>120):
        print("Import csv to mongodb: {}".format(path))
        name=os.path.splitext(file)[0]
        # 导入csv文件里的数据到mongodb数据库
        with open(path,'r',encoding='utf-8')as csvfile:
            from csv import DictReader
            reader=DictReader(csvfile)
            for item in reader:
                item["city"]="深圳";
                item["type"]="整租";
                item["timestamp"]=name;
                exists=db["zufang"].find_one({"m_url":item["m_url"]})
                # 记录首次将该租房数据存到数据库的时间戳
                if((exists==None) or (exists.get("first_timestamp")==None)):
                    item["first_timestamp"]=name
                    pass
                # 数据库里不存在记录;数据不存在时间戳;数据时间戳比当前的要旧
                if((exists==None) or (exists.get("timestamp")==None) or (int(exists.get("timestamp"))<int(name))):
                    db['zufang'].update_one({'m_url': item['m_url']}, {'$set': item}, upsert=True)
                    pass
                pass
            pass
        backupPath="{}/{}".format(dbDirectoryBackup,file)
        print("Move {} => {}".format(path,backupPath))
        from shutil import move
        move(path,backupPath)
        pass
    else:
        print("Locked: {}".format(path))
        pass
    pass
from threading import Thread
for file in files:
    thread=Thread(target=update,args=(file,))
    thread.start()
    pass
