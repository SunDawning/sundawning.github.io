class ThreadLoop:
    """
    一个循环
    - 使用多线程来执行
    - 可以停止或开始
    """
    def __init__(self,function=False):
        self.enabled=True
        self.timer=False
        self.function=function
        pass
    def start(self):
        self.enabled=True
        def loop():
            while self.enabled==True:
                if self.function:
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
        self.timer.cancel()
        return
    pass
def foo():
    print(1)
    import time
    time.sleep(1)
    return
threadLoop=ThreadLoop(foo)
threadLoop.start()
threadLoop.stop()
