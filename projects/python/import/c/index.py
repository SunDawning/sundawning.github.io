def addToImportPath(path):
    """
    将.py添加到模块路径里
    Import Python Script Into Another? - Stack Overflow: https://stackoverflow.com/questions/15696461/import-python-script-into-another
    """
    from sys import path as sysPath
    if((path in sysPath)==False):
        sysPath.append(path)
        pass
    return sysPath
addToImportPath("..")
from a.index import fromA
fromA()
addToImportPath("..")
from b.index import fromB
fromB()

