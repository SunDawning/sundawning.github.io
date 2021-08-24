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
    f=open(path,"w",encoding="utf-8")
    f.write(string)
    f.close()
    return
"""
读取文件的所有内容为字符串
"""
def readFile(path):
    content=""
    with open(path,encoding="utf-8") as f:
        content=f.read()
        f.close()
    return content
"""
判断文件是否存在
"""
def isFileExists(path):
    import os
    return os.path.exists(path)
"""
使用上面的功能
"""
def index(options):
    print("Hello, {}".format(options["say"]))
    print("It's {}".format(options["timestamp"]))
    import os
    os.system("pause")
    return
"""
生成源代码
"""
def buildSource():
    content=readFile("./index.py")
    if(isFileExists("build")==False):
        import os
        os.mkdir("build")
        pass
    if(isFileExists("./build/source")==False):
        import os
        os.mkdir("./build/source")
        pass
    writeToFile("./build/source/index.py",content)
    return

"""
生成可执行文件等：
- 生成build.bat
- 生成{name}.py
- 生成build-v{version}-{os}-{machine}-{name}.bat
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
    version="0.0.8"
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
        bat="build-v{}-{}-{}-{}.bat".format(version,os,machine,name)
        print("bat {}".format(bat))
        cmdString=" ".join(cmd)
        print("cmd string {}".format(cmdString))
        writeToFile(bat,cmdString)
    return
"""
以命令行的方式使用
"""
def main():
    import sys
    arguments=sys.argv
    print("sys.argv: {}".format(arguments))
    if("buildSource" in arguments):
        buildSource()
        print("builded source")
    else:
        print("""
buildSource build source directory
        """)
    return
if(__name__=="__main__"):
    main()
        
