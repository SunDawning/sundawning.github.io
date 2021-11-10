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

async def main():
    """
    https://pypi.org/project/websockets/
    """
    async with serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever
        pass
    pass

asyncio.run(main())
