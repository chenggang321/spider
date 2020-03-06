

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021928343" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>上篇关于[Go模板库应用](https://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484271&idx1&sn6dfef42f172b6a177fd372e619796991&chksmfa80d2f8cdf75bee931b7516f41e0aa4ba48b38d41ecce1fec055c255aaa51a5a828f7450f4e&token335746779&langzh_CN#rd)的文章最后我们留下一个问题，页面模板是通过`CDN`引用的`BootStrap`的`css`，`js`文件。到目前位置我们的服务器还无法伺服客户端的静态文件请求把服务器磁盘上的文件响应给客户端。使用和配置过`Nginx`服务器的一定知道`Nginx`天然支持静态资源的访问，那么我们是不是也要借助`Nginx`才能实现处理静态文件请求呢？其实不是，在最开始的文章我们说过“Go语言不需要依赖任何第三方组件就能构建并启动一个高并发的 HTTP 服务器。”，这篇文章就让我们了解一下如何用`Go`语言的`net/http`库实现处理静态资源请求的问题。

我们先用一个简单的例子学习一下使用`net/http`如何创建一个静态资源服务器，然后再应用到我们的`http_demo`项目中。


>
>`gohttp08`

### 创建静态资源服务器

我们新建一个`main.go`存放创建静态资源服务器和监听请求的代码，同时在相同目录下创建`assets/css`和`assets/js`目录用于存放上篇文章页面模板使用到的静态文件。

```
main.go
assets/
└── css
    └── bootstrap.min.css
└── js
    └── bootstrap.min.js
```

`main.go`中的代码如下：

```
package main

import "net/http"

func main() {
    fs := http.FileServer(http.Dir("assets/"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    http.ListenAndServe(":8080", nil)
}
```

*  首先我们使用`http.FileServer`创建一个使用给定文件系统的内容响应所有`HTTP`请求的处理程序。
*  `http.Handle("/static/", http.StripPrefix("/static/", fs))`让文件服务器使用`assets`目录下的文件响应`URL`路径以`/static/`开头的所有`HTTP`请求。
*  `assets`被设置为文件服务器的文件系统根目录，文件服务器会处理以`/static`开头的`URL`的请求，所以我们需要使用`http.StripPrefix()`把`static`前缀去掉才能在`assets`目录中搜索到请求的文件。

运行程序，然后用`cURL`请求一下`css`文件，看看有没有奏效。

```
$ go run main.go

$ curl -s http://localhost:8080/static/css/bootstrap.min.css

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 ......
```

### 结合`gorillia/mux`使用文件服务器

上面的例子中文件服务器的处理程序是注册到`net/http`库提供的标准的`ServeMux`（服务复用器）中的，我们`http_demo`项目为了支持复杂的路由注册使用的是`gorillia/mux`库提供的服务复用器。两者的工作方式不太一样，所以把文件服务器应用到我们项目里还需要做些调整才能起作用。

首先我们先把`assets`目录整个拷贝到项目的根目录。

```
func RegisterRoutes(r *mux.Router) {
   // serve static file request
   fs := http.FileServer(http.Dir("assets/"))
   serveFileHandler := http.StripPrefix("/static/", fs)
   r.PathPrefix("/static/").Handler(serveFileHandler)
   ......
}
```

*  使用`router.PathPrefix("/static")`创建一个匹配有`/static`前缀请求的路由。
*  然后使用`route.Handler`方法将文件服务器注册成路由对应的处理程序（`Handler`是`*mux.Route`上的方法)。

注册好文件服务器后，我们把之前页面模板引用的`CDN`上的`js`和`css`文件换成自己服务器上的文件链接。

```
<html lang="en">
<head>
    ......
    <link href="/static/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

{{ template "nav" .}}

<div class="container">
    {{template "content" .}}
</div> 

<script src="/static/js/bootstrap.min.js"></script>
</body>
</html>
```

然后重启服务器，访问之前的页面`http:localhost:/view/index`，验证一下我们的服务器现在是否能伺服静态文件的请求了。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021928344" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

页面样式正常，现在只要在服务器这个`assets`目录下的文件，我们都可以通过`http://localhost:8000/static/*`路径的`URL`访问到。

今天的文章对应的源码已经打包上传，公众号回复`gohttp08`获取下载链接，赶快下载下来动手练习一下吧。如果文章能帮助到你，不要忘记转发、点在看分享给更多人啊。关注公众号每周第一时间获取文章更新。

**前文回顾**

**[深入学习用Go编写HTTP服务器](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484112&idx1&sn79d0d3167d0d962fe41ec00cdafffbb0&chksmfa80d347cdf75a51183182f14622af766538ca0c5335012e5e1cc50b100e78f2954fa3943770&scene21#wechat_redirect)****[使用gorilla/mux 路由器](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484172&idx1&sn6dc988c86c3572a8092bdc79feb8d4e8&chksmfa80d29bcdf75b8d06fc56366352671131c06e1c299a4929a56d7f5ab7137d1e1aec213c5e40&scene21#wechat_redirect)****[Go Web编程--应用数据库](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484200&idx1&sna6d41c6aa4b3e22eac313966fb7eac57&chksmfa80d2bfcdf75ba9faadd03100fc22688afb77cdbaa3f18d915dd8832121a0ac69d40bffe6e4&scene21#wechat_redirect)****[Go Web编程--深入学习解析HTTP请求](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484246&idx1&sn6de3644dcb1877a3e205745aaf9fed71&chksmfa80d2c1cdf75bd78fbedbfc28931b213986bc861c757c8d0a1ad3efa088726a7e176bde2f61&scene21#wechat_redirect)****[Go Web 编程--超详细的模板库应用指南](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484271&idx1&sn6dfef42f172b6a177fd372e619796991&chksmfa80d2f8cdf75bee931b7516f41e0aa4ba48b38d41ecce1fec055c255aaa51a5a828f7450f4e&scene21#wechat_redirect)**<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021928345" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>
