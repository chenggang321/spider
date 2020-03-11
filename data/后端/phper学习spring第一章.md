

最近疫情在家，就想着研究一下spring。我是第一次学习JAVA，当然也是第一次学习spring框架，个人认为先把helloworld项目跑起来，建立起信心，这样才有利于接下来的学习。所以我会力求把小细节说清楚，免得和我一样的新手，还没有开始学习JAVA和spring，先放弃安装环境了。先装JDK和IDE，这个就是下一步下一步的事情，IDE大家随意，我用的是eclipse，spring官方推荐的JDK版本是OPENJDK8和11。

先跑个helloworld。整个过程非常简单，去官方一个[spring初始化网站](https://start.spring.io/)去填写一些包信息，再添加依赖，就可以生成一个压缩文件，解压到你喜欢的目录下面。<img referrerpolicy="no-referrer" data-src="/img/bVbEmKQ" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

然后切换到这个目录下，运行`./mvnw spring-boot:run`，首先这个程序会先下载指定版本的maven，然后再通过maven下载依赖。下载maven的过程还算顺利，但maven下载依赖的速度太感人了，只能换个源。笔者的系统是windows，所以在`用户目录/.m2/wrapper/dists/apache-maven-version-bin/一串哈希/apache-maven-version/conf/settings.xml`文件中的mirrors标签新增一项mirror。

```
<mirror>
        <id>nexus-aliyun</id>
        <mirrorOf>central</mirrorOf>
        <name>Nexus aliyun</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>
```

<img referrerpolicy="no-referrer" data-src="/img/bVbEmLa" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">再切换到spring目录下面运行`./mvnw spring-boot:run`，舒服了。想要看到页面，还得加一步，下载下来的包没有路由，和对应的控制器，要稍微加工一下。

打开IDE，导入项目，eclipse会自动更新依赖，但是eclipse用的maven是默认自带的maven，默认的maven下载依赖速度太慢，所以要配置成刚才我们设置为阿里源的maven。<img referrerpolicy="no-referrer" data-src="/img/bVbEmMj" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

然后强制下载依赖，alt+f5，勾选强行更新<img referrerpolicy="no-referrer" data-src="/img/bVbEmMp" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

等待maven下载依赖，然后将以下代码复制到DemoApplication.java

```
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

public static void main(String[] args) {
SpringApplication.run(DemoApplication.class, args);
}

@GetMapping("/hello")
public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
return String.format("Hello %s!", name);
}
}
```

重新运行`./mvnw spring-boot:run`，输入`http://localhost:8080/hello`，成功看到页面。<img referrerpolicy="no-referrer" data-src="/img/bVbEmLM" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

**到这里，最重要的步骤其实是配置maven和IDE，只要配置好maven的下载镜像和正确配置好IDE，整个项目就能跑起来，很多人会因为下载速度过慢就已经放弃了，也不用谈接下来的学习**

到这里还没有结束，趁热打铁，趁着项目跑起来建立的信心，看一波DemoApplication.java的代码，有个大概。

package对应php中的namespace，就是个命名空间。import就是use的别名。因为是强类型语言，函数和参数多了类型。首字母大写驼峰式看来是JAVA的类命名习惯，方法名看来是首字母小写驼峰式，方法的花括号看来是和方法名或类名同一行。多了一些注解，这个PHP没有原生支持的语法，有用注释实现的[doctrine annotations](https://www.doctrine-project.org/projects/doctrine-annotations/en/1.6/index.html#introduction)。这么看来，这个包的想法也是来源于java，命名上也是像素级拷贝。doctrine annotations我也没有研究过，只是知道有这个东西，现在也不用去研究PHP这个包，系统地学习JAVA的注解就可以了。

这样，也为下一步的学习明确了方向。边学习spring，边学习JAVA，虽然不算科学，但应该是相对有意思的一种学习方法了。

还没有完，再看一看spring的运行方式，PHP的典型的运行方式是FASTCGI，一般前面有个NGINX服务器，转发给PHP-FPM，PHP处理完成之后，把结果发给NGINX，NGINX发给客户端，PHP释放资源，包括与MYSQL服务器的连接，与REDIS服务器的连接等等。下一次，新请求来了，PHP再与MYSQL和REDIS建立连接，然后处理完成之后又释放掉这些资源，如此往复。但这样的工作方式明显低效，因为TCP三次握手和四次挥手，都是耗时的工作，增加了单次请求的响应时间，降低了系统的并发量。Swoole扩展的出世，常驻内存，不用每次处理完请求就释放资源，复用连接大量节省时间和资源，一定程度上解决了这个问题。但本文并不讨论swoole，只是用PHPER的方式去看spring，试图分析一下spring是怎么运行，怎么样服务客户端。

我去翻了翻在终端运行起来的spring服务，发现了一些端倪，spring似乎内嵌了一个tomcat，并侦听8080端口。去搜索引擎搜一下"spring 内嵌tomcat"，了解了一下相关的信息，果然如我猜测的一样，spring内嵌了一个tomcat，用于方便开发者的开发阶段。tomcat可以作为一个jar包让JAVA进行调用，这真是方便。PHP目前也只有Swoole提供了httpServer开发接口，另外PHP实现的workerman和reactphp也提供了httpServer，个人更喜欢用reactphp，设计得很好，模块化，按需引入。

本章节就先到这里，有一些PHPER的视角和感想，大家见笑。
