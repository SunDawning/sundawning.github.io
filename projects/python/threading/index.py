class ThreadLoop:
    """
    一个循环
    - 使用多线程来执行
    - 可以停止或开始
    """
    def __init__(self,function=None):
        self.enabled=None
        self.timer=None
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
        import threading
        self.timer=threading.Timer(0,loop)
        self.timer.start()
        return
    def stop(self):
        self.enabled=False
        if(self.timer):
            self.timer.cancel()
            pass
        return
    pass
def foo():
    print(1)
    import time
    time.sleep(1)
    return
threadLoop=ThreadLoop()
