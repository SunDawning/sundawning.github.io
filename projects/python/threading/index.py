class Loop:
    """
    一个循环
    - 使用多线程来执行
    - 可以停止或开始
    """
    def __init__(self,function=False):
        self.inWhile=True
        self.timer=False
        self.function=function
        pass
    def start(self):
        self.inWhile=True
        def childThreading():
            while self.inWhile==True:
                if self.function:
                    self.function()
                    pass
                continue
            return
        import threading
        self.timer=threading.Timer(0,childThreading)
        self.timer.start()
        return
    def stop(self):
        self.inWhile=False
        self.timer.cancel()
        return
    pass
def foo():
    print(1)
    import time
    time.sleep(1)
    return
loop=Loop(foo)
loop.start()
loop.stop()
