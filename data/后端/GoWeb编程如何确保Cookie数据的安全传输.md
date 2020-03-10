

<img referrerpolicy="no-referrer" data-src="/img/bVbEf7w" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="cookie.png" title="cookie.png">

## 什么是Cookie

`Cookie`（也叫`Web Cookie`或浏览器`Cookie`）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。`Cookie`使基于[无状态](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#HTTP_is_stateless_but_not_sessionless)的HTTP协议记录稳定的状态信息成为了可能。

`Cookie`主要用于以下三个方面：

*  会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
*  个性化设置（如用户自定义设置、主题等）
*  浏览器行为跟踪（如跟踪分析用户行为等）

## Go语言如何表示Cookie

在`Go`的`net/http`库中使用`http.Cookie`结构体表示一个`Cookie`数据，调用`http.SetCookie`函数则会告诉终端用户的浏览器把给定的`http.Cookie`值设置到浏览器`Cookie`里，类似下面：

```
func someHandler(w http.ResponseWriter, r *http.Request) {
  c := http.Cookie{
    Name: "UserName",
    Value: "Casey",
  }
  http.SetCookie(w, &c)
}
```

`http.Cookie`结构体类型的定义如下：

```
type Cookie struct {
   Name  string
   Value string

   Path       string    // optional
   Domain     string    // optional
   Expires    time.Time // optional
   RawExpires string    // for reading cookies only

   // MaxAge=0 means no 'Max-Age' attribute specified.
   // MaxAge<0 means delete cookie now, equivalently 'Max-Age: 0'
   // MaxAge>0 means Max-Age attribute present and given in seconds
   MaxAge   int
   Secure   bool
   HttpOnly bool
   SameSite SameSite
   Raw      string
   Unparsed []string // Raw text of unparsed attribute-value pairs
}
```

`Name`和`Value`字段就不多说了，单独针对几个需要解释的字段进行说明。

### Domain

默认值是当前正在访问的`Host`的域名，假设我们现在正在访问的是`www.example.com`，如果需要其他子域名也能够访问到正在设置的`Cookie`值的话，将它设置为`example.com` 。注意，只有正在被设置的`Cookie`需要被其他子域名的服务访问到时才这么设置。

```
c := Cookie{
  ......
  Domain: "example.com",
}
```

### Path

设置当前的 Cookie 值只有在访问指定路径时才能被服务器程序读取。默认为服务端应用程序上的任何路径，但是您可以使用它限制为特定的子目录。例如：

```
c := Cookie{
  Path: "/app/",
}
```

### Secure

标记为`Secure` 的Cookie只应通过被`HTTPS`协议加密过的请求发送给服务端。但即便设置了 `Secure` 标记，敏感信息也不应该通过`Cookie`传输，因为`Cookie`有其固有的不安全性，`Secure `标记也无法提供确实的安全保障。从 Chrome 52 和 Firefox 52 开始，不安全的站点（`http:`）无法使用`Cookie`的 `Secure` 标记。

### HttpOnly

为避免跨域脚本 ([XSS](https://developer.mozilla.org/en-US/docs/Glossary/XSS)) 攻击，通过`JavaScript`的API无法访问带有 `HttpOnly` 标记的Cookie，它们只应该发送给服务端。如果包含服务端`Session` 信息的`Cookie` 不想被客户端`JavaScript` 脚本调用，那么就应该为其设置 `HttpOnly` 标记。

## 安全地传输Cookie

接下来我们探讨两种安全传输`Cookie`的方法

### 对Cookie数据进行数字签名

对数据进行数字签名是在数据上添加“签名”的行为，以便可以验证其真实性。不需要对数据进行加密或屏蔽。

签名的工作方式是通过散列-我们对数据进行散列，然后将数据与数据散列一起存储在`Cookie`中。然后，当用户将`Cookie`发送给我们时，我们再次对数据进行哈希处理，并验证其是否与我们创建的原始哈希匹配。

我们不希望用户也用篡改后的数据创建新的哈希，因此经常会看到使用`HMAC`之类的哈希算法，以便可以使用密钥对数据进行哈希。这样可以防止最终用户同时编辑数据和数字签名（哈希）。

`JWT`也是使用的这种数字签名的方式进行传输的。

上面的数据签名过程并不需要我们自己去实现，我们可以在`Go`中使用`gorilla/securecookie`的程序包来完成此操作，在该程序包中，你可以在创建`SecureCookie`时为其提供哈希密钥，然后使用该对象来保护你的`Cookie`。

#### 对`Cookie`数据进行签名：

```
//var s = securecookie.New(hashKey, blockKey)
var hashKey = securecookie.GenerateRandomKey(64)
var s = securecookie.New(hashKey, nil)

func SetCookieHandler(w http.ResponseWriter, r *http.Request) {
  encoded, err := s.Encode("cookie-name", "cookie-value")
  if err == nil {
    cookie := &http.Cookie{
      Name:  "cookie-name",
      Value: encoded,
      Path:  "/",
    }
    http.SetCookie(w, cookie)
    fmt.Fprintln(w, encoded)
  }
```

#### 解析被签名的 Cookie:

```
func ReadCookieHandler(w http.ResponseWriter, r *http.Request) {
  if cookie, err := r.Cookie("cookie-name"); err == nil {
    var value string
    if err = s.Decode("cookie-name", cookie.Value, &value); err == nil {
      fmt.Fprintln(w, value)
    }
  }
}
```

注意这里的`Cookie`数据未加密，仅仅是被编码了，任何人都可以把`Cookie`数据解码回来。

### 加密Cookie 数据

每当将数据存储在`Cookie`中时，请始终尽量减少存储在`Cookie`中的敏感数据量。不要存储用户密码之类的东西，并确保任何编码数据也没有此信息。在某些情况下，开发人员在不知不觉中将敏感数据存储在`Cookie`或`JWT`中，因为它们是`base64`编码的，但实际上任何人都可以解码该数据。它已编码，未加密。

这是一个很大的错误，因此，如果你担心意外存储敏感内容，建议 你使用`gorilla/securecookie`之类的软件包。

之前我们讨论了如何将其用于对`Cookie`进行数字签名，但是`securecookie`也可以用于加密和解密`Cookie`数据，以使其无法轻松解码和读取。

要使用该软件包加密`Cookie`，只需在创建`SecureCookie`实例时传入一个`blockKey`即可。

将上面签名`Cookie`的代码片段进行一些小改动，其他地方完全不用动，`securecookie`包会帮助我们进行`Cookie`的加密和解密：

```
var hashKey = securecookie.GenerateRandomKey(64)
var blockKey = securecookie.GenerateRandomKey(32)
var s = securecookie.New(hashKey, blockKey)
```

## 总结

今天的文章除了阐述如何使用`Go`语言安全地传输`Cookie`数据外，再次格外强调一遍，编码和加密的不同，从数据可读性上看，两者差不多，但本质上是完全不一样的：

*  编码使用公开可用的方案将数据转换为另一种格式，以便可以轻松地将其反转。
*  加密将数据转换为另一种格式，使得只有特定的个人才能逆转转换。

我们在做数据传输时一定要记住两者的区别，某种意义上，我觉得记住这两点的区别比你学会今天文章里怎么安全传输`Cookie`更重要。

**前文回顾：**

[深入学习用Go编写HTTP服务器](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484112&idx1&sn79d0d3167d0d962fe41ec00cdafffbb0&chksmfa80d347cdf75a51183182f14622af766538ca0c5335012e5e1cc50b100e78f2954fa3943770&scene21#wechat_redirect)

[使用gorilla/mux增强Go HTTP服务器的路由能力](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484172&idx1&sn6dc988c86c3572a8092bdc79feb8d4e8&chksmfa80d29bcdf75b8d06fc56366352671131c06e1c299a4929a56d7f5ab7137d1e1aec213c5e40&scene21#wechat_redirect)

[十分钟学会用Go编写Web中间件](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484180&idx1&snb66497c5428c25577068f18132b2d59d&chksmfa80d283cdf75b95cc49d08c56d0fa9b00c47d0457c894be3ca3ea02bd3c404cfb5312fa1d93&scene21#wechat_redirect)

[Go Web编程--应用ORM](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484212&idx1&snfc64a905c8f32acab908cc7d3d848680&chksmfa80d2a3cdf75bb5f47244145b965e9be3ee002270154f53a1c16802a375001cd7822490986d&scene21#wechat_redirect)

[Go Web编程--深入学习解析HTTP请求](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484246&idx1&sn6de3644dcb1877a3e205745aaf9fed71&chksmfa80d2c1cdf75bd78fbedbfc28931b213986bc861c757c8d0a1ad3efa088726a7e176bde2f61&scene21#wechat_redirect)

[Go Web编程--使用Go语言创建静态文件服务器](http://mp.weixin.qq.com/s?__bizMzUzNTY5MzU2MA&mid2247484278&idx1&sn488a0c0304237e15c53c74ebd7a8296a&chksmfa80d2e1cdf75bf70efcf95f708bc54cf9564f1f22340754abef14ee0baf2a181d48230723c5&scene21#wechat_redirect)

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021949080" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>
