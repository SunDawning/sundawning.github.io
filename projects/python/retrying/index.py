# Python重试模块retrying - 学一点也是好 - 博客园: https://www.cnblogs.com/mangM/p/11207202.html
from retrying import retry
@retry(wait_fixed=1000)
def hello():
    from datetime import datetime
    print(datetime.now())
    raise Exception("出错了")
hello()
