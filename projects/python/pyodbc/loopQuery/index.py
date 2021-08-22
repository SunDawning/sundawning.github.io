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
    print("Supported Drivers: {}".format(pyodbc.drivers()))
    connection=pyodbc.connect("Driver={SQL Server};Server=localhost;Database=master;UID=test;PwD=test")
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
"""
获取所有列的名字
https://exceptionshub.com/output-pyodbc-cursor-results-as-python-dictionary.html
"""
def getColumns(cursor):
    output=[]
    for column in cursor.description:
        output.append(column[0])
    return output
"""
多行转成JSON对象
"""
def rowsToJSON(columns,rows):
    output=[]
    for row in rows:
        output.append(dict(zip(columns,row)))
    return output

UPDATETIMEFILE="./updateTime.txt"
if isFileExists(UPDATETIMEFILE)==False:
    writeToFile(UPDATETIMEFILE,now())

UPDATETIME=readFile(UPDATETIMEFILE)
print("Previous updateTime: {}".format(UPDATETIME))
CURSOR=connect()
print("CURSOR: {}".format(CURSOR))
rows=query(CURSOR,getSQL(UPDATETIME))
print("columns: {}".format(getColumns(CURSOR)))
print("Query Data: {}".format(rowsToJSON(getColumns(CURSOR),rows)))
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
