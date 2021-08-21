"""
获取当前时间
"""
def now():
    import time
    return time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
"""
判断文件是否存在
"""
def isFileExists(path):
    import os
    return os.path.exists(path)
"""
将字符串写到文件里
"""
def writeToFile(path,string):
    f=open(path,"w")
    f.write(string)
    f.close()
    return
"""
读取文件的所有内容为字符串
"""
def readFile(path):
    content=""
    with open(path) as f:
        content=f.read()
        f.close()
    return content
"""
连接SQL Server数据库
"""
def connect():
    import pyodbc
    connection=pyodbc.connect("Driver={SQL Server Native Client 11.0};Server=localhost;Database=master;UID=test;PwD=test")
    cursor=connection.cursor()
    return cursor
"""
查询数据库
"""
def query(cursor,sql):
    cursor.execute(sql)
    rows=cursor.fetchall()
    return rows
"""
生成SQL语句
"""
def getSQL(updateTime):
    return "select * from [master].[dbo].[spt_fallback_db]"
"""
上传数据
"""
def upload(data):
    import requests
    response=requests.post(url="https://httpbin.org/post",headers={"Content-Type":"application/json"},data=data)
    return response.text

UPDATETIMEFILE="./updateTime.txt"
if isFileExists(UPDATETIMEFILE)==False:
    writeToFile(UPDATETIMEFILE,now())

UPDATETIME=readFile(UPDATETIMEFILE)
print("Previous updateTime: {}".format(UPDATETIME))
CURSOR=connect()
print("CURSOR: {}".format(CURSOR))
def loop():
    global UPDATETIME
    data=query(CURSOR,getSQL(UPDATETIME))
    if len(data)==0:
        import threading
        threading.Timer(3,loop).start()
    else:
        print("Query data: {}".format(data))
        response=upload(data)
        print("Upload response: {}".format(response))
        UPDATETIME=now()
        print("Newest updateTime: {}".format(UPDATETIME))
        writeToFile(UPDATETIMEFILE,UPDATETIME)
        import threading
        threading.Timer(3,loop).start()
loop()
