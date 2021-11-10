import asyncio
from websockets import serve
from datetime import datetime

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
    while True:
        if(len(websockets)>0):
            tasks=[]
            for websocket in websockets:
                tasks.append(asyncio.create_task(websocket.send("{}".format(datetime.now()))))
                pass
            await asyncio.gather(*tasks)
            pass
        print("{} broadcast: {}".format(datetime.now(),asyncio.get_event_loop()))
        from time import sleep
        sleep(1)
        pass
    pass

def broadcastThreadTarget():
    asyncio.run(broadcast())
    pass
from threading import Thread
broadcastThread=Thread(target=broadcastThreadTarget,daemon=True)
broadcastThread.start()

def websocketServeThreadTarget():
    asyncio.run(websocketServe())
    pass
from threading import Thread
websocketServeThread=Thread(target=websocketServeThreadTarget,daemon=True)
websocketServeThread.start()
