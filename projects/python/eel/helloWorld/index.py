try:
    import eel
except ImportError:
    from subprocess import run
    run("pip install eel".split(" "))
    import eel
    pass
eel.init(".")
@eel.expose
def index(string):
    print(string)
    return
from sys import argv
eel.index(argv[0])
eel.start("index.html",size=(640,480))
