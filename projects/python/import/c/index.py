def addToImportPath(path):
    """
    将.py添加到模块路径里
    Import Python Script Into Another? - Stack Overflow: https://stackoverflow.com/questions/15696461/import-python-script-into-another
    """
    import sys
    if((path in sys.path)==False):
        sys.path.append(path)
        pass
    return sys.path
addToImportPath("..")
from a.index import fromA
fromA()
addToImportPath("..")
from b.index import fromB
fromB()

