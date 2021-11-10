import asyncio
from websockets import serve

websockets=set()

async def echo(websocket, path):
    websockets.add(websocket)
    await websocket.send("来自Python里的WebSockets服务器")
    print("在线：{}".format(len(websockets)))
    async for message in websocket:
        from time import sleep
        sleep(10)
        print("收到信息：{}".format(message))
        print("websocket: {}".format(asyncio.get_event_loop()))
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
                from datetime import datetime
                tasks.append(asyncio.create_task(websocket.send("{}".format(datetime.now()))))
                pass
            await asyncio.gather(*tasks)
            pass
        print("broadcast: {}".format(asyncio.get_event_loop()))
        from time import sleep
        sleep(1)
        pass
    pass

def broadcastThreadTarget():
    loop=asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(broadcast())
    pass
from threading import Thread
broadcastThread=Thread(target=broadcastThreadTarget,daemon=True)
broadcastThread.start()

def websocketServeThreadTarget():
    loop=asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(websocketServe())
    pass
from threading import Thread
websocketServeThread=Thread(target=websocketServeThreadTarget,daemon=True)
websocketServeThread.start()

async def loop():
    while True:
        await asyncio.sleep(1)
        pass
    pass
async def main():
    """
    Python黑魔法asyncio之----在多线程中启用多个事件循环 - 简书: https://www.jianshu.com/p/29ffdbd65679
    """
    await loop()
    pass
asyncio.run(main())
