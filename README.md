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
├── app.js
├── bank
│   └── assets                   样式文件/图片
├── global                        全局数据库配置 / 错误枚举
├── jest.config.js                jest配置文件
├── models                        数据库模型
├── package.json                  版本控制
├── routes                        路由 / apidoc文档定义
├── server.js                     服务入口, 监听端口
├── tests                         jest测试
└── utils                         工具包
```
