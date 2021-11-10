# Python3+WebSockets实现WebSocket通信 - 诸子流 - 博客园: https://www.cnblogs.com/lsdb/p/10949766.html

import asyncio
import websockets
from datetime import datetime

# 客户端主逻辑
async def main_logic():
    async with websockets.connect('ws://localhost:8765') as websocket:
        async for message in websocket:
            print("{} 收到信息：{}".format(datetime.now(),message))
            pass
        pass
    pass

asyncio.get_event_loop().run_until_complete(main_logic())
