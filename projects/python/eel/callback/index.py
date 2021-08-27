try:
    import eel
except ImportError:
    from subprocess import run
    run("pip install eel".split(" "))
    import eel
    pass
eel.init(".")
from sys import argv
@eel.expose
def index(string):
    print(string)
    return argv[0]
eel.index(argv[0])(callback=print)
eel.start("index.html",size=(640,480))
