VERSION="0.0.13"
def getVersion():
    """
    当前版本号
    """
    global VERSION
    return VERSION
def formatTime(datetime):
    """
    格式化时间
    """
    return datetime.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
def now():
    """
    获取当前时间
    """
    import datetime
    return formatTime(datetime.datetime.now())
def writeToFile(path,string):
    """
    将字符串写到文件里
    """
    f=open(path,"w",encoding="utf-8")
    f.write(string)
    f.close()
    return
def readFile(path):
    """
    读取文件的所有内容为字符串
    """
    content=""
    with open(path,encoding="utf-8") as f:
        content=f.read()
        f.close()
    return content
def isFileExists(path):
    """
    判断文件是否存在
    """
    import os
    return os.path.exists(path)
def mkdir(directory):
    """
    创建文件夹
    """
    if(isFileExists(directory)==False):
        import os
        os.mkdir(directory)
        pass
    return
def copyFile(source,destination):
    """
    复制文件
    """
    import shutil
    shutil.copyfile(source,destination)
    return
def index(options):
    """
    使用上面的功能
    """
    print("Hello, {}".format(options["say"]))
    print("It's {}".format(options["timestamp"]))
    import os
    os.system("pause")
    return
def tangle(version="0.0.1",build=False,run=False):
    """
    - 创建打包的目录 build/source/{version}
    - 在打包的目录下生成 {name}.py
    - 在打包的目录下生成build-{os}-{machine}-{name}.bat
    - 在打包的目录下生成HelloWorld-v{version}-{os}-{machine}-{name}.exe
    """
    buildSourceDirectory="./build/source/{}".format(version)
    mkdir("./build")
    mkdir("./build/source")
    mkdir(buildSourceDirectory)
    copyFile("./index.py","{}/index.py".format(buildSourceDirectory))
    ico="index.ico"
    copyFile(ico,"{}/{}".format(buildSourceDirectory,ico))
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
    import platform
    osType=platform.platform()
    machine=platform.machine()
    for user in users:
        name=user["name"]
        print("name {}".format(name))
        pyScript="{}.py".format(name)
        print(".py {}".format(pyScript))
        config=user["config"]
        print("config {}".format(config))
        import json
        string="""
from index import *
index({})
""".format(config)
        print("string {}".format(string))
        writeToFile("{}/{}".format(buildSourceDirectory,pyScript),string)
        exeName="HelloWorld-v{}-{}-{}-{}".format(version,osType,machine,name)
        print("exeName {}.exe".format(exeName))
        cmd=["pyinstaller","-y","-F","--name",exeName,"-i",ico,pyScript]
        print("cmd {}".format(cmd))
        bat="{}/build-{}-{}-{}.bat".format(buildSourceDirectory,osType,machine,name)
        print("bat {}".format(bat))
        cmdString=" ".join(cmd)
        print("cmd string {}".format(cmdString))
        writeToFile(bat,cmdString)
        if(build==True and run==False):
            import subprocess
            subprocess.Popen(cmd,cwd=buildSourceDirectory)
            pass
        if(build==True and run ==True):
            import subprocess
            subprocess.run(cmd,cwd=buildSourceDirectory)
            pass
        if(run==True):
            import os
            os.system('start "" {}/dist/{}.exe'.format(buildSourceDirectory,exeName))
            pass
        continue
    return
def main():
    """
    以命令行的方式使用
    """
    import sys
    arguments=sys.argv
    print("sys.argv: {}".format(arguments))
    build=False
    if("build" in arguments):
        build=True
        pass
    run=False
    if("run" in arguments):
        run=True
        pass
    make=False
    if("make" in arguments):
        make=True
        pass
    try:
        if(make==True or build==True or run==True):
            tangle(
                version=getVersion(),
                build=build,
                run=run,
            )
            pass
        else:
            print("""
            [Sub COMMAND]:

            - make
            - build
            - run
            """)
    except Exception as error:
        print(error)
        import os
        os.system("pause")
if(__name__=="__main__"):
    main()
