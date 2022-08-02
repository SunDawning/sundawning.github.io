让单线程 Node.js 能使用多个 CPU

2022-08-02 17:38:48

https://zhuanlan.zhihu.com/p/36728299
Node.js 集群（cluster）：扩展你的 Node.js 应用

# ab

https://www.cnblogs.com/cjsblog/p/9038838.html

"C:\Users\jobsimi\Downloads\httpd-2.4.54-o111p-x64-vs17\Apache24\bin\ab.exe"

## 测试数据

### server.js

```
npm run ab
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

> ab
> ab.exe -c200 -t10 http://localhost:8080/

This is ApacheBench, Version 2.3 <$Revision: 1901567 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 5000 requests
Completed 10000 requests
Completed 15000 requests
Completed 20000 requests
Completed 25000 requests
Finished 26345 requests


Server Software:
Server Hostname:        localhost
Server Port:            8080

Document Path:          /
Document Length:        25 bytes

Concurrency Level:      200
Time taken for tests:   10.002 seconds
Complete requests:      26345
Failed requests:        0
Total transferred:      2635000 bytes
HTML transferred:       658750 bytes
Requests per second:    2634.03 [#/sec] (mean)
Time per request:       75.929 [ms] (mean)
Time per request:       0.380 [ms] (mean, across all concurrent requests)
Transfer rate:          257.28 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0       1
Processing:    27   75   7.7     74     111
Waiting:        6   67   6.4     66      99
Total:         27   76   7.7     74     111

Percentage of the requests served within a certain time (ms)
  50%     74
  66%     78
  75%     80
  80%     82
  90%     86
  95%     90
  98%     96
  99%     98
 100%    111 (longest request)
```

### cluster.js

```
npm run ab
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

> ab
> ab.exe -c200 -t10 http://localhost:8080/

This is ApacheBench, Version 2.3 <$Revision: 1901567 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 5000 requests
Completed 10000 requests
Completed 15000 requests
Completed 20000 requests
Completed 25000 requests
Completed 30000 requests
Completed 35000 requests
Completed 40000 requests
Completed 45000 requests
Completed 50000 requests
Finished 50000 requests


Server Software:
Server Hostname:        localhost
Server Port:            8080

Document Path:          /
Document Length:        25 bytes

Concurrency Level:      200
Time taken for tests:   8.877 seconds
Complete requests:      50000
Failed requests:        28
   (Connect: 0, Receive: 0, Length: 28, Exceptions: 0)
Total transferred:      4999933 bytes
HTML transferred:       1249933 bytes
Requests per second:    5632.81 [#/sec] (mean)
Time per request:       35.506 [ms] (mean)
Time per request:       0.178 [ms] (mean, across all concurrent requests)
Transfer rate:          550.07 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0       1
Processing:     7   35   3.2     35      88
Waiting:        4   26   5.7     26      84
Total:          7   35   3.2     35      89

Percentage of the requests served within a certain time (ms)
  50%     35
  66%     36
  75%     37
  80%     37
  90%     39
  95%     41
  98%     44
  99%     47
 100%     89 (longest request)
```
