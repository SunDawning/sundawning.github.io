# python pyodbc https://blog.csdn.net/huwei2003/article/details/107387919
# https://blog.csdn.net/naichager/article/details/111378060
# pyinstaller -F index.py
import pyodbc
print("支持的数据库：{}".format(pyodbc.drivers()))
# ['SQL Server', 'SQL Server Native Client 11.0', 'ODBC Driver 17 for SQL Server', 'SQL Server Native Client RDA 11.0']
connection=pyodbc.connect("Driver={SQL Server Native Client 11.0};Server=localhost;Database=master;UID=test;PwD=test")
cursor=connection.cursor()
cursor.execute("select * from [master].[dbo].[spt_fallback_db]")
row=cursor.fetchone()
print("第一行数据：{}".format(row))
import os
os.system("pause")
