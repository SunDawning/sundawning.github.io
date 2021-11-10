import asyncio
from websockets import serve

websockets=set()

async def echo(websocket, path):
    websockets.add(websocket)
    await websocket.send("来自Python里的WebSockets服务器")
    print("在线：{}".format(len(websockets)))
    async for message in websocket:
        print("收到信息：{}".format(message))
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
        await asyncio.sleep(1)
        pass
    pass

async def main():
    """
    主入口
    """
    tasks=[]
    tasks.append(asyncio.create_task(websocketServe()))
    tasks.append(asyncio.create_task(broadcast()))
    await asyncio.gather(*tasks)
    pass

asyncio.run(main())
