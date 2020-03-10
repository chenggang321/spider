

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021967385" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">

---

## 一个小纠结

很多初学Java的小伙伴经常咨询：

*  到底该安装哪个版本的JDK比较好？
*  Java 8到底还够不够用？
*  Java 11究竟有什么改进？
*  是不是Java版本越新越好？
*  ……

是这样，官网现在其实都已经出到Java 13版本了，并且提供下载使用。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021967386" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">

但目前市场上主流的**稳定版**当然还得属**Java 8**和**Java 11**，而目前大部分公司的生产环境还是`Java 8`居多。所以如果从自学角度出发，我觉得这两个版本都OK，其他中间的一些比如`Java 9`、`Java 10`这些非稳定版就不用考虑了。

---

## Java11 vs Java8

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021967387" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">

Java 11相对于Java 8确实有一部分进化，除了有很多内部的升级（比如开销和时延更低的GC、TLS1.3加持等等）之外，对于初学使用者来说也有一些语言使用层面的进化。

正好最近我在自己的个人小项目上尝试升级使用了一下`Java 11`（公司项目咱也不敢动、也不敢问，只好动自己的个人项目），因此本文从实际代码编写角度来大致体验一下我个人使用`Java 11`之后相对`Java 8`所感觉到的一些比较深刻的进化，官方文档里说得也非常清楚了：`https://docs.oracle.com/en/java/javase/11/`

我这次实验装的`Java 11`版本是`11.0.6`：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021967388" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">


>
>`Java 11`
>
>`Java 9`
>
>`Java 10`
>
>`Java 11`

---

## 变量类型推断

新版Java引入了一个全新的类型关键字`var`，用`var`来定义的变量不用写具体类型，编译器能根据`=`右边的实际赋值来自动推断出变量的类型：

**1、普通局部变量**

```
var name = "codesheep"; // 自动推断name为String类型
System.out.println(name);
```

**2、for循环中使用**

```
var upList1 = List.of( "刘能", "赵四", "谢广坤" );
var upList2 = List.of( "永强", "玉田", "刘英" );
var upList3 = List.of( "谢飞机", "兰妮", "兰娜" );
var upListAll = List.of( upList1, upList2, upList3 );
for( var i : upListAll ) { // 用var接受局部变量的确非常简洁！
    for( var j : i  ) {
        System.out.println(j);
    }
}
```

这地方就能看出用`var`定义局部变量的优势了，假如这个例子中集合里的元素类型更为复杂，是类似`List<List<String>>`这种嵌套类型的话，`var`定义就非常简洁明了！

**3、当然，有些情况是不能使用的**

`var`类型变量一旦赋值后，重新赋不同类型的值是不行的，比如：

```
var name = "codesheep";
name = 666;  // 此时编译会提示不兼容的类型
```

定义`var`类型变量没有初始化是不行的，比如：

```
var foo;  // 此时编译会提示无法推断类型
foo = "Foo";
```

另外，像类的`成员变量类型`、`方法入参类型`、`返回值类型`等是不能使用`var`的，比如：

```
public class Test {
    
    private var name; // 会提示不允许使用var           

    public void setName( var name ) { // 会提示不允许使用var
        this.name = name;
    }

    public var getName() { // 会提示不允许使用var
        return name;
    }
     
}
```

---

## 官方HTTP Client加持

是的！

现在`JDK`官方就自带`HTTP Client`了，位于`java.net.http`包下，支持发送同步、异步的`HTTP`请求，这样一来，以前咱们常用的HTTP请求客户端诸如：`OKHttp`、`HttpClient`这种现在都可以退下了！

发送同步请求：

```
var request = HttpRequest.newBuilder()
        .uri( URI.create("https://www.codesheep.cn") )
        .GET()
        .build();
// 同步请求方式，拿到结果前会阻塞当前线程
var httpResponse = HttpClient.newHttpClient()
        .send( request, HttpResponse.BodyHandlers.ofString());
System.out.println( httpResponse.body() ); // 打印获取到的网页内容
```

发送异步请求：

```
CompletableFuture<String> future = HttpClient.newHttpClient().
        sendAsync( request, HttpResponse.BodyHandlers.ofString() )
        .thenApply( HttpResponse::body );
System.out.println("我先继续干点别的事情...");
System.out.println( future.get() ); // 打印获取到的网页内容
```

当然你也可以自定义请求头，比如携带`JWT Token`权限信息去请求等：

```
var requestWithAuth = HttpRequest.newBuilder()
        .uri( URI.create("http://www.xxxxxx.com/sth") )
        .header("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTIwNTE2MTE5NiIsImNyZWF0ZWQiOjE1ODMzMTA2ODk0MzYsImV4cCI6MTU4MzM5NzA4OSwidXNlcmlkIjoxMDAwNH0.OE9R5PxxsvtVJZn8ne-ksTb2aXXi7ipzuW9kbCiQ0uNoW0fJJr_wckLFmgDzxmBs3IdzIhWDAtaSIvmTshK_RQ")
        .GET()
        .build();
var response = HttpClient.newHttpClient()
        .send( requestWithAuth, HttpResponse.BodyHandlers.ofString() );
System.out.println( response.body() ); // 打印获取到的接口返回内容
```

---

## String处理增强

新版字符串`String`类型增加了诸如：`isBlank()`、`strip()`、`repeat()`等方便的字符串处理方法

```
String myName = " codesheep ";
System.out.println( "  ".isBlank() ); // 打印：true
System.out.println( "  ".isEmpty() ); // 打印：false

System.out.println( myName.strip() );         // 打印codesheep，前后空格均移除
System.out.println( myName.stripLeading() );  // 打印codesheep ，仅头部空格移除
System.out.println( myName.stripTrailing() ); // 打印 codesheep，仅尾部空格移除
System.out.println( myName.repeat(2) );       // 打印 codesheep  codesheep
```

---

## 集合增强

主要是增加了诸如`of()`和`copyOf()`等方法用于更加方便的**创建**和**复制**集合类型

```
var upList = List.of( "刘能", "赵四", "谢广坤" );
var upListCopy = List.copyOf( upList );
System.out.println(upList);     // 打印 [刘能, 赵四, 谢广坤]
System.out.println(upListCopy); // 打印 [刘能, 赵四, 谢广坤]

var upSet = Set.of("刘能","赵四");
var upSetCopy = Set.copyOf( upSet );
System.out.println(upSet);      // 打印 [赵四, 刘能]
System.out.println(upSetCopy);  // 打印 [赵四, 刘能]

var upMap = Map.of("刘能","58岁","赵四","59岁");
var upMapCopy = Map.copyOf( upMap );
System.out.println(upMap);      // 打印 {刘能=58岁, 赵四=59岁}
System.out.println(upMapCopy);  // 打印 {刘能=58岁, 赵四=59岁}
```

---

## 函数式编程增强

我印象最深的是对`Stream`流增加了诸如`takeWhile()`和`dropWhile()`的截止结算方法：

```
var upList = List.of( "刘能", "赵四", "谢广坤" );

// 从集合中依次删除满足条件的元素，直到不满足条件为止
var upListSub1 = upList.stream()
        .dropWhile( item -> item.equals("刘能") )
        .collect( Collectors.toList() );
System.out.println(upListSub1);  // 打印 [赵四, 谢广坤]

// 从集合中依次获取满足条件的元素，知道不满足条件为止
var upListSub2 = upList.stream()
        .takeWhile( item -> item.equals("刘能") )
        .collect( Collectors.toList() );
System.out.println( upListSub2 ); // 打印 [刘能]
```

---

## 文件读写增强

**1、Files类增强**

我们以前心心念的直接能把文件内容读取到`String`以及`String`回写到文件的功能终于支持了,可以通过`Files`类的静态方法`writeString()`和`readString()`完成：

```
Path path = Paths.get("/Users/CodeSheep/test.txt");
String content = Files.readString(path, StandardCharsets.UTF_8);
System.out.println(content);
Files.writeString( path, "王老七", StandardCharsets.UTF_8 );
```

**2、InputStream增强**

`InputStream`则增加了一个`transferTo()`方法，直接将数据丢到`OutputStream`去：

```
InputStream inputStream = new FileInputStream( "/Users/CodeSheep/test.txt" );
OutputStream outputStream = new FileOutputStream( "/Users/CodeSheep/test2.txt" );
inputStream.transferTo( outputStream );
```

---

## 支持源文件直接运行（666！）

比如我写一个最简单的`Hello World`程序：

```
public class Hello {
    
    public static void main( String[] args ) {
        System.out.println("hello world");
    }
     
}
```

并保存为`hello.java`文件，这时候可以直接用`java`指令去运行这个Java源文件，直接省去以前`javac`编译源文件的过程：

```
java hello.java
```

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021967389" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">

怎么样？是不是和python源文件的运行有点像？这个信息量就有点大了，大家可以自行脑补一下

---

## 小结

Java 11确有很多改进，但还是那句话，对于初学者来说Java 8了，没必要刻意求新，稳才是最重要的！

---
