import asyncio
from websockets import serve

async def echo(websocket, path):
    await websocket.send("来自Python里的WebSockets服务器")
    async for message in websocket:
        print("收到信息：{}".format(message))
        await websocket.send(message)

async def main():
    """
    https://pypi.org/project/websockets/
    """
    async with serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())
