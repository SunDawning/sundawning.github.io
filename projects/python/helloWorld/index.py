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
生成可执行文件等：
- 生成build.bat
- 生成{name}.py
- 生成build-{os}-{machine}-{name}.bat
- 生成HelloWorld-v{version}-{os}-{machine}-{name}.exe
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
    version="0.0.7"
    import platform
    os=platform.platform()
    machine=platform.machine()
    ico="index.ico"
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
        exeName="HelloWorld-v{}-{}-{}-{}".format(version,os,machine,name)
        print("exeName {}.exe".format(exeName))
        cmd=["pyinstaller","-F","--name",exeName,"-i",ico,path]
        print("cmd {}".format(cmd))
        import subprocess
        subprocess.Popen(cmd)
        bat="build-{}-{}-{}.bat".format(os,machine,name)
        print("bat {}".format(bat))
        cmdString=" ".join(cmd)
        print("cmd string {}".format(cmdString))
        writeToFile(bat,cmdString)
if __name__=="__main__":
    build()
