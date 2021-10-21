import os
from pymongo import MongoClient
import csv

host = os.environ.get('MONGODB_HOST', '127.0.0.1')  # 本地数据库
port = os.environ.get('MONGODB_PORT', '27017')  # 数据库端口
mongo_url = 'mongodb://{}:{}'.format(host, port)
mongo_db = os.environ.get('MONGODB_DATABASE', 'Lianjia-2021-10-21')
print(mongo_db)
client = MongoClient(mongo_url)
print(client)
db = client[mongo_db]
db['zufang'].create_index('m_url', unique=True)  # 以m端链接为主键进行去重

with open('1634776085414.csv','r',encoding='utf-8')as csvfile:
    reader=csv.DictReader(csvfile)
    for item in reader:
        item["city"]="深圳";
        item["type"]="整租";
        db['zufang'].update_one({'m_url': item['m_url']}, {'$set': item}, upsert=True)
        pass
    pass


