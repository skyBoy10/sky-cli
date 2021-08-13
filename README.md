### sky-cli
自定义脚手架，命令sky，支持以下几个操作

add：添加模版，参数包括模版名称，git地址，分支；
delete：删除模版，参数包括模版名字；
init：初始化模版，参数包括模版名字；
list：查看所有模版；

### 常用的node插件

* inquirer: 交互式命令；
* child_process：开启子进程，执行各种命令；
* chalk：文字上色；
* funclib：工具库；
* commander：注册自定义命令
* ora：动态交互，例如loading
* fs：文件读写；
* fs-extra：文件操作工具集；
* simple-git：git的基础操作；

服务开发常用插件：

* nodemon：监视源文件中任何的更改并自动重启服务器；
* body-parser：处理程序之前，在中间件中对传入的请求体进行解析（response body）；
* mongoose：在node.js异步环境下对mongodb进行便捷操作的对象模型工具；
* koa（express）：服务端编程使用；

### 项目源码目录结构如下：

```
├── README.md
├── bin
│   └── index.js
├── commanders
│   ├── add.js
│   ├── custom.js
│   ├── delete.js
│   ├── init.js
│   └── list.js
├── package-lock.json
├── package.json
├── template.json
└── utils
    └── getCustomConfig.js
```