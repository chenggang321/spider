

在开发小程序的时候，经常会用到一些第三方的 API。但是第三方的 API 往往会有各种各样的问题，比如：

1. 没有HTTPS
2. 没有备案
3. 小程序不支持其中的一些方法

等等。但是，在业务中，我们又必须要使用这些接口，应该如何操作呢？

## 使用云开发中转

一个比较简单的方法，就是使用云开发来做中转。将有限制的小程序请求，转化为没有限制的云函数请求，就可以轻松实现未备案、无 HTTPS 接口的请求。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021744519" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

## 具体实现方式

在具体的实现时，主要有以下几个步骤：

1. 创建用于中转的云函数
2. 编写请求代码
3. 上传并部署云函数
4. 在小程序端请求云函数

## 代码部分

我们重点讲解一下「请求代码的创建」和「在小程序请求云函数」

### API 介绍

**假设我们要请求快递 100 的 API，来查询快递信息。由于其没有 HTTPS 证书，所以我们没有办法直接在小程序端查询**。所以，我们建立了一个新的云函数 getKuaiDi 来查询快递信息。

我们要调用的 API 地址是 `http://www.kuaidi100.com/query?type=快递公司代号&postid=快递单号` ，我们只需要将这里的快递代号和单号替换，并发送一个 get 请求，就可以获取到下面这样的结果。

```
{
    "message": "ok",
    "nu": "11111111111",
    "ischeck": "1",
    "com": "yuantong",
    "status": "200",
    "condition": "F00",
    "state": "3",
    "data": [
        {
            "time": "2020-02-10 08:47:03",
            "context": "查无结果",
            "ftime": "2020-02-10 08:47:03"
        }
    ]
}
```

### 请求代码的创建

接下来来编写代码，首先，我们需要安装依赖，在云函数上右击，选择「在终端中打开」,执行命令安装 *got*

```
npm install --save got@9
```

安装完成后，我们开始编写代码。因为刚刚安装了 got ，我们在云函数中编写代码就简单许多。

```
const got = require('got')

// 云函数入口函数
exports.main = async (event, context) => {
  const response = await got(`http://www.kuaidi100.com/query?type=${event.type}&postid=${event.id}`)
  return response.body
}
```

删除掉无用的代码后，我们只需要保留上面这些代码，就完成了云函数侧的代码。

这段代码中，通过 ES6 的新语法，拼接了 event 的参数，形成一个完成的 API 地址，并通过 got 请求了我们刚刚拼接好的 API。再将获取到的 Response 中的 Body 返回给小程序端。

### 小程序端的调用

上传部署云函数以后，我们可以在小程序端调用这个 API 以验证。在你的小程序端输入这样的代码

```
wx.cloud.callFunction({ name:"getKuaiDi",data:{
  "type": "yuantong",
  "id":"11111111111"
}}).then(console.log).catch(console.error)
```

你会看到这样的返回，则说明你的 API 接口正常工作。

```
{"message":"ok","nu":"11111111111","ischeck":"0","condition":"B00","com":"yuantong","status":"200","state":"1","data":[{"time":"2020-02-11 11:59:11","ftime":"2020-02-11 11:59:11","context":"揽收任务已分配给王国贤,配送员电话17767187183","location":""}]}
```

后续，你只需要在调用云函数的时候，通过 data 参数，传入快递公司，以及快递单号，就可以完成接口的查询了。

## 总结

最后，我们再总结一下。因为小程序限制了 request 的请求必须是备案域名，且必须有 https，如果你想要请求一个没有备案，或者没有 HTTPS 证书的 API，可以借助云函数环境下不受任何限制的 HTTP 请求来获取到数据，并通过云函数的返回，返回给小程序端使用。这样，就可以很方便的绕过小程序请求的一些限制。
