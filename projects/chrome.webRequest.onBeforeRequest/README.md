一个 chrome 插件，拦截所有的请求

2022-07-15 10:51:19

譬如

http://10.253.102.69/gw/TILE_3D_MODEL/sz/longgang/tileset.json => http://localhost:18080/services/10.253.102.69/gw/TILE_3D_MODEL/sz/longgang/tileset.json

# nginx 跨域设置

```conf
location /services {
    #CORS 配置
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' '*';
    #是否允许cookie传输
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Headers' '*';

    #针对浏览器的options预请求直接返回200，否则会被403 forbidden--invalie CORS request
    if ( $request_method = 'OPTIONS' ) {
            return 200;
    }

    root D:/模型代理服务器;
}
```
