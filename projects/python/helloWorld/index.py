"""
获取当前时间
"""
def now():
    import time
    return time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
"""
将字符串写到文件里
"""
def writeToFile(path,string):
    f=open(path,"w")
    f.write(string)
    f.close()
    return
"""
使用上面的功能
"""
def index(options):
    print("Hello, {}".format(options["say"]))
    import os
    os.system("pause")
    return
"""
生成可执行文件等
"""
def build():
    writeToFile("build.bat","python index.py")
    users=[
        {
            "name":"sgs",
            "config":{
                "say":"sgs",
                "timestamp":"2021-08-23 21:01"
            }
        },
        {
            "name":"simi",
            "config":'{"say":"simi","timestamp":now()}'
        }
    ]
    version="0.0.3"
    for user in users:
        name=user["name"]
        print("name {}".format(name))
        path="{}.py".format(name)
        print("path {}".format(path))
        config=user["config"]
        print("config {}".format(config))
        import json
        string="""
from index import *
index({})
""".format(config)
        print("string {}".format(string))
        writeToFile(path,string)
        exeName="HelloWorld-v{}-win10-64-{}".format(version,name)
        print("exeName {}.exe".format(exeName))
        import subprocess
        subprocess.Popen(["pyinstaller","-F","--name",exeName,path.format(user)])
if __name__=="__main__":
    build()
