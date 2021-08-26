class ThreadLoop:
    """
    一个循环
    - 使用多线程来执行
    - 可以停止或开始
    """
    def __init__(self,function=None):
        self.enabled=None
        self.thread=None
        self.function=function
        pass
    def start(self):
        self.enabled=True
        def loop():
            while self.enabled==True:
                from inspect import isfunction
                if(isfunction(self.function)==True):
                    self.function()
                    pass
                continue
            return
        from threading import Thread
        self.thread=Thread(target=loop)
        self.thread.start()
        return
    def stop(self):
        self.enabled=False
        return
    pass
def foo():
    print(1)
    from time import sleep
    sleep(1)
    return
threadLoop=ThreadLoop(foo)
threadLoop.start()
