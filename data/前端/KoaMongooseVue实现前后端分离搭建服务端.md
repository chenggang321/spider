

## 工作内容

*  搭建服务端
*  运行起来

## 准备工作

### 创建目录结构

|-client|-server   |--bin // 可执行文件目录   |--app.js

### 初始化项目

*  切换到server目录下`cd server`
*  初始化项目`npm init -y` // `-y`以默认值初始化
*  `npm i -S koa` //安装项目依赖koa

## 构建服务端

### 编写app.js

```
const koa = require('koa');

const app = new koa();

app.use((ctx, next) => {
  ctx.body = '测试测试测试';
  next();
})

app.listen(3000, 'localhost', () => {
  console.log('Server is running!')
})

app.on('error', err => {
  log.error('server error', err)
});
```

### 运行服务端

*  方式一：`cli`
   
   *  直接在项目路径`server`下，开启命令行，运行`node app.js`

*  方式二：`scripts`
   
   *  在`server/package.json`文件的`scripts`编写`"start": "node app.js"`，然后在项目路径`server`下，开启命令行`npm start`

*  方式三：编辑器vs code
   
   *  鼠标聚焦在`server/app.js`文件内，`f5`选择`Node.js`运行环境（必须聚焦在可执行文件中）
   *  <img referrerpolicy="no-referrer" data-src="/img/bVbD9wm" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="调试" title="调试">

*  方式四：vs code创建launch.json文件
   
   *  直接通过右下角的“**添加配置** --> Node.js启动程序”添加新的配置内容，将`program": "${workspaceFolder}/app.js",`改为program": "${workspaceFolder}/server/app.js"即可
   *  <img referrerpolicy="no-referrer" data-src="/img/bVbD9xk" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="添加配置" title="添加配置">
   *  开启调试运行<img referrerpolicy="no-referrer" data-src="/img/bVbD9Fc" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="开启调试" title="开启调试">

使用vs code运行可执行文件是调试运行，可以在vs code中打断点，页面请求时，进行调试。<img referrerpolicy="no-referrer" data-src="/img/bVbD9FI" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="断点调试" title="断点调试">

### 优化代码

*  将服务端的监听移动到可执行目录下`./bin`，`app.js`只是服务端的配置
*  将端口/域名提出到配置目录下
*  **注意**：需要修改运行服务端的可执行文件的路径（这里就不贴出方法来了，下方监听变化的时候会有）

```
// server/app.js
const koa = require('koa');

const app = new koa();

app.use((ctx, next) => {
  ctx.body = '测试测试测试';
  next();
})

app.on('error', err => {
  log.error('server error', err)
});
module.exports = app;
```

```
// server/bin/index.js
const app = require('../app');
const Server = require('../config/server');

const {host, port} = Server;

app.listen(port, host, () => {
  console.log(`server is running at http://${host}:${port}`);
})
```

```
// 新建server/config/server.js
module.exports = {
  port: 3000,
  host: 'localhost'
}
```

## 监听变化

如果修改了`server/app.js`中

```
app.use((ctx, next) => {
  ctx.body = '测试测试测试1111';  // 初始值为ctx.body = '测试测试测试';
  next();
})
```

刷新浏览器`http://localhost:3000/`发现输出并没有改变，需要重新启动服务端，才能得到新的输出。

那如何实现监听变化，刷新页面后，不需要重启服务就能得到新的输出呢？

### 准备工作

`npm i -D nodemon`安装`nodemon`包

### 改变运行方式

将`node`运行改成`nodemon`运行可执行文件`server/bin/index.js`。对应上方的运行改变：

*  方式一：`cli`
   
   *  直接在项目路径`server`下，开启命令行，运行`$(npm bin)/nodemon app.js`

*  方式二：`scripts`
   
   *  在`server/package.json`文件的`scripts`编写`"start": "nodemon app.js"`，然后在项目路径`server`下，开启命令行`npm start`

*  方式三：编辑器vs code
   
   *  鼠标聚焦在`server/bin/index.js`文件内，`f5`选择`Node.js`运行环境（必须聚焦在可执行文件中）

*  方式四：vs code创建launch.json文件

```
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/server/bin/index.js",
      "skipFiles": [
        "<node_internals>/**"
      ]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "${workspaceFolder}/server/node_modules/.bin/nodemon",
      "program": "${workspaceFolder}/server/bin/index.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "skipFiles": [
        "<node_internals>/**"
      ]
    }
  ]
}
```

接下来都是以`launch.json`运行服务。

## 参考文档

[koa](https://koa.bootcss.com/)
