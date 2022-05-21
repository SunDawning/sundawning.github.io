浏览器

# 启动

## win32

```sh
pnpm run dev -- --port 3002 -- --proxy_port 3001
```

或

```
vite --port 3002 -- --proxy_port 3001
```

启动端口为 3002 的服务器，设置代理服务器的端口是 3001。

## android

## win32

```sh
pnpm run dev --port 3002 -- --proxy_port 3001
```

或

```
vite --port 3002 -- --proxy_port 3001
```

启动端口为 3002 的服务器，设置代理服务器的端口是 3001。

# 打包之后如果要启动

1. 确保验证登录权限的在线服务器在线：http://sundawning.vaiwan.cn
2. 启动代理服务器：`cd ../server && node index.js --port 12335`
3. 启动 HTTP 服务器：`npx http-server ./dist --port 8080 --cors --proxy http://localhost:12335`
