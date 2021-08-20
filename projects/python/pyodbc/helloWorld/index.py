import pyodbc
print(pyodbc.drivers())
# ['SQL Server', 'SQL Server Native Client 11.0', 'ODBC Driver 17 for SQL Server', 'SQL Server Native Client RDA 11.0']
connection=pyodbc.connect("Driver={SQL Server Native Client 11.0};Server=localhost;Database=master;UID=test;PwD=test")
cursor=connection.cursor()
cursor.execute("select * from [master].[dbo].[spt_fallback_db]")
row=cursor.fetchone()
print(row)
