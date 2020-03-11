

接口调试是每个软件开发从业者必不可少的一项技能，一个项目的的完成，可能接口测试调试的时间比真正开发写代码的时间还要多，几乎是每个开发的日常工作项。  

所谓工欲善其事必先利其器，在没有尝到IDEA REST真香之前，postman确实是一个非常不错的选择，具有完备的REST Client功能和请求历史记录功能。

但是当使用了IDEA REST之后，postman就可以丢了，因为，IDEA REST Client具有postman的所有功能，而且还有postman没有的功能，继续往下看。

**真香定律的原因有如下几个：**

1、首先postman的所有功能IDEA REST Client都具备了，如REST Client控制台和历史请求记录

2、其次如果能够在一个生产工具里完成开发和调试的事情，干嘛要切换到另一个工具呢

3、然后IDEA REST Client还支持环境配置区分的功能，以及接口响应断言和脚本化处理的能力

4、IDEA REST Client的请求配置可以用文件配置描述，所以可以跟随项目和项目成员共享

# **IDEA REST Client控制台**

从顶层工具栏依次Tools -> HTTP Client -> Test RESTFUL Web Service 打开后，IDEA REST Client控制台的界面如下样式：  

<img referrerpolicy="no-referrer" data-src="/img/bVbEnTN" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

可以看到，这个控制台展示的功能区和postman已经没什么差别了，包括请求方式，请求参数和请求头的填充都已经包含了。

特别说明下的是，如果请求的方式是Authorization :Basic这种方式认证的话，可以点击下图所示的按钮，会弹出填充用户名和密码的窗口出来，填完后会自动补充到Authorization 的header里面去

<img referrerpolicy="no-referrer" data-src="/img/bVbEnTO" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

**历史请求记录**

IntelliJ [IDEA](http://mp.weixin.qq.com/s?__bizMzI3ODcxMzQzMw&mid2247490877&idx1&sn1574b67cb75b20ee7290da32b01d6fcd&chksmeb53980bdc24111deb2c771bdf254e739edc2eadd350ff3fa33b3b127bf9027a6466ca29e2bd&scene21#wechat_redirect)自动将最近执行的50个请求保存到http-requests-log.http 文件中，该文件存储在项目的.idea / httpRequests / 目录下。

使用请求历史记录，您可以快速导航到特定响应并再次发出请求。文件内容大如下图所示，再次发出请求只要点击那个运行按钮即可。

如果从请求历史记录再次发出请求，则其执行信息和响应输出的链接将添加到请求历史记录文件的顶部。

<img referrerpolicy="no-referrer" data-src="/img/bVbEnTP" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

# **构建HTTP请求脚本**

上面的历史记录就是一个完整的IDEA REST Client请求脚本，如果你是从控制台触发的，那么可以直接复制历史请求记录的文件放到项目里作为HTTP请求的脚本，给其他成员共享，如果不是，也可以直接新建一个.http或者.rest结尾的文件，IDEA会自动识别为HTTP请求脚本。

**语法部分**

```
### 演示POST请求  
POST {{baseUrl}}}get?show_env=1  
Accept: application/json  
  
{  
   "name":"a"  
}  
  
### 演示GET请求  
  
GET {{baseUrl}}}/post  
Content-Type: application/x-www-form-urlencoded  
  
id=999&value=content
```

首先通过###三个井号键来分开每个请求体，然后请求url和header参数是紧紧挨着的，请求参数不管是POST的body传参还是GET的parameter传参，都是要换行的。[几个牛逼的 IDEA 插件，](http://mp.weixin.qq.com/s?__bizMzI3ODcxMzQzMw&mid2247488782&idx1&sna6c7d34d62f344176f6681f88b7052b1&chksmeb539038dc24192e4f5d408dad80aba8c6de794a0fa27ca85c57d25846a4f09819834c4cdfea&scene21#wechat_redirect)推荐大家看下。

另外，大家可以关注微信公众号“Java技术栈”，在后台回复：idea，可以获取我整理的 N 篇最新 idea 教程，都是干货。

**环境区分**  

细心的你可能发现了上面示例的代码，没有真实的请求地址，取而代之的，是一个{{baseUrl}}的占位符，这个就是IDEA REST Client真香的地方，支持从指定的配置文件中获取到环境相关的配置参数，不仅baseUrl可以通过占位符替换，一些请求的参数如果和接口环境相关的都可以通过配置文件来区分。

首先在.http的脚本同目录下创建一个名为http-client.private.env.json的文件，然后内容如下，一级的key值时用来区分环境的，比如，dev、uat、pro等，环境下的对象就是一次HTTP请求中能够获取到的环境变量了，你可以直接在请求的HTTP的脚本中通过{{xx}}占位符的方式获取到这里配置的参数：

```
{  
  "uat": {  
    "baseUrl": "http://gateway.xxx.cn/",  
    "username": "",  
    "password": ""  
  },  
  "dev": {  
    "baseUrl": "http://localhsot:8888/",  
    "username": "",  
    "password": ""  
  }  
}
```

那么在选择执行请求的时候，[IDEA](http://mp.weixin.qq.com/s?__bizMzI3ODcxMzQzMw&mid2247490877&idx1&sn1574b67cb75b20ee7290da32b01d6fcd&chksmeb53980bdc24111deb2c771bdf254e739edc2eadd350ff3fa33b3b127bf9027a6466ca29e2bd&scene21#wechat_redirect)就会让你选执行那个环境的配置，如：

<img referrerpolicy="no-referrer" data-src="/img/bVbEnTQ" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

# **结果断言**

IDEA REST Client可以针对接口的响应值进行脚本化的断言处理，立马从一个接口调试工具上升到测试工具了，比如：

```
### Successful test: check response status is 200  
GET https://httpbin.org/status/200  
  
> {%  
client.test("Request executed successfully", function() {  
  client.assert(response.status === 200, "Response status is not 200");  
});  
%}
```

# **结果值暂存到环境变量**

试想下这样的场景，当一个系统需要通过认证才能访问的时候，如果用postman的时候，是不是先访问登录接口，然后获得token后，手动粘贴复制到新的调试接口的header参数里面去，这太麻烦了，IDEA REST Client还有一个真香的功能，可以完美解决这个问题，请看下面的脚本：

```
### 演示POST请求  
POST https://httpbin.org/post  
Content-Type: application/json  
  
{  
  "user": "admin",  
  "password": "123456"  
}  
  
> {% client.global.set("auth_token", response.body.json.token); %}  
### 演示GET请求  
  
GET https://httpbin.org/headers  
Authorization: Bearer {{auth_token}}
```

在第一个认证的请求结束后，可以在response里拿到返回的token信息，然后我们通过脚本设置到了全局变量里，那么在接下来的接口请求中，就可以直接使用双大括号占位符的方式获取到这个token了

## **结语**

postman有口皆碑，确实是一个非常不错的必备工具，之前给比人推荐这种工具时总是安利他postman。

但是，IDEA REST Client也真的很不错，值得尝试一下，后面安利这种工具就切换到IDEA REST Client了，postman反正被我丢掉了。

和第三方做接口对接时，项目里必备一个rest-http.http接口请求文件，满足自己的同时也成方便了他人。

**本文已在Java技术栈网站同步更新：**

1.[Java JVM、集合、多线程、新特性系列教程](http://www.javastack.cn/categories/Java/)

2.[Spring MVC、Spring Boot、Spring Cloud 系列教程](http://www.javastack.cn/categories/Spring/)

3.[Maven、Git、Eclipse、Intellij IDEA 系列工具教程](http://www.javastack.cn/categories/Tools/)

4.[Java、后端、架构、阿里巴巴等大厂最新面试题](http://www.javastack.cn/categories/Interview-Question/)

生活很美好，明天见～
