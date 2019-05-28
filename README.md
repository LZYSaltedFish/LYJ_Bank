# 云计算项目仓库

## 快速启动
``` bash
# 构建容器
$ docker-compose build
# 启动服务
$ docker-compose up -d
```
## 本地测试
``` bash
npm run test      # 需要安装mongodb服务
```

# 目录结构
```
cloud-server
├── app                           后台服务
│   ├── models                    数据库模型
│   └── routes                    路由
│       └── apidefine             apidoc定义
├── app.js                        应用入口
├── bank                          前端静态文件
│   ├── css
│   ├── html
│   ├── js
│   ├── images
│   └── README.md
├── config                        配置文件
├── package.json                  版本控制
└── server.js                     服务入口, 监听端口
```
