# 性能调试：
# pip install line_profiler
# python -m kernprof -l -v index.py

import asyncio
from websockets import connect
from websockets import serve
from datetime import datetime
from time import sleep

websockets=set()

async def echo(websocket, path):
    websockets.add(websocket)
    await websocket.send("来自Python里的WebSockets服务器")
    print("在线：{}".format(len(websockets)))
    async for message in websocket:
        print("收到信息：{}".format(message))
        print("{} websocket: {}".format(datetime.now(),asyncio.get_event_loop()))
        await websocket.send(message)
        pass
    pass

async def websocketServe():
    """
    https://pypi.org/project/websockets/
    启动WebSocket服务器
    """
    async with serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever
        pass
    pass

async def broadcast():
    """
    广播通知所有用户
    """
    if(len(websockets)>0):
        tasks=[]
        for websocket in websockets:
            tasks.append(asyncio.create_task(websocket.send("{}".format(datetime.now()))))
            pass
        await asyncio.gather(*tasks)
        pass
    print("{} broadcast: {}".format(datetime.now(),asyncio.get_event_loop()))
    pass

async def websocketClient():
    async with connect('ws://localhost:8765') as websocket:
        async for message in websocket:
            print("{} 收到信息：{}".format(datetime.now(),message))
            pass
        pass
    pass

def broadcastThreadTarget():
    asyncio.run(broadcast())
    pass

def websocketServeThreadTarget():
    asyncio.run(websocketServe())
    pass

def websocketClientThreadTarget():
    asyncio.run(websocketClient())
    pass

from threading import Thread
websocketServeThread=Thread(target=websocketServeThreadTarget,daemon=True)
websocketServeThread.start()

# 给Python websocket server服务器新增一个Python client客户端来应对网页client 客户端index.html频繁接收消息时会卡一会后再出现批量消息的情况
from threading import Thread
websocketClientThread=Thread(target=websocketClientThreadTarget,daemon=True)
websocketClientThread.start()

while True:
    sleep(1)
    from threading import Thread
    broadcastThread=Thread(target=broadcastThreadTarget,daemon=True)
    broadcastThread.start()
    pass
