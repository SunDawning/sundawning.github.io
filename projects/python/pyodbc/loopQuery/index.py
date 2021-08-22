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
连接SQL Server数据库、查询和处理所查到的数据
sqlServer=SQLServer()
sqlServer.connect()
"""
class SQLServer:
    def __init__(SELF,driver="SQL Server",server="localhost",database="master",uid="sa",pwd="test"):
        SELF.connectString="Driver={{{}}};Server={};Database={};UID={};PWD={}".format(driver,server,database,uid,pwd)
        SELF.columns=[]
        SELF.json=[]
    """
    连接SQL Server数据库
    """
    def connect(SELF):
        import pyodbc
        SELF.connection=pyodbc.connect(SELF.connectString)
        SELF.cursor=SELF.connection.cursor()
    """
    查询数据库
    """
    def query(SELF,sql):
        SELF.cursor.execute(sql)
        SELF.rows=SELF.cursor.fetchall()
    """
    生成SQL语句
    """
    def getSQL(SELF,updateTime):
        return "select * from [master].[dbo].[spt_fallback_db]"
    """
    获取所有列的名字
    https://exceptionshub.com/output-pyodbc-cursor-results-as-python-dictionary.html
    """
    def getColumns(SELF):
        for column in SELF.cursor.description:
            SELF.columns.append(column[0])
        return SELF.columns
    """
    多行转成JSON对象
    """
    def rowsToJSON(SELF):
        for row in SELF.rows:
            SELF.json.append(dict(zip(SELF.columns,row)))
        return SELF.json
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
sqlServer=SQLServer()
sqlServer.connectString="Driver={SQL Server Native Client 11.0};Server=localhost;Database=master;UID=test;PwD=test"
sqlServer.connect()
print("CURSOR: {}".format(sqlServer.cursor))
rows=sqlServer.query(sqlServer.getSQL(UPDATETIME))
print("columns: {}".format(sqlServer.getColumns()))
print("Query Data: {}".format(sqlServer.rowsToJSON()))
def loop():
    global UPDATETIME
    data=sqlServer.query(sqlServer.getSQL(UPDATETIME))
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
# loop()
