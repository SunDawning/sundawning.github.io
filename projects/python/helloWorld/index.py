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
                "say":"sgs"
            }
        },
        {
            "name":"simi",
            "config":{
                "say":"simi"
            }
        }
    ]
    version="0.0.2"
    for user in users:
        name=user["name"]
        print("name {}".format(name))
        path="{}.py".format(name)
        print("path {}".format(path))
        config=user["config"]
        print("config {}".format(config))
        string="""
from index import *
index({})
    """.format(config)
        print("string {}".format(string))
        writeToFile(path,string)
        exeName="HelloWorld-v{}-win10-64-{}".format(version,name)
        import subprocess
        subprocess.Popen(["pyinstaller","-F","--name",exeName,path.format(user)])
if __name__=="__main__":
    build()
