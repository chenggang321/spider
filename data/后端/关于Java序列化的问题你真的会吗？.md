

## 引言

在持久化数据对象的时候我们很少使用Java序列化，而是使用数据库等方式来实现。但是在我看来，Java 序列化是一个很重要的内容，序列化不仅可以保存对象到磁盘进行持久化，还可以通过网络传输。在平时的面试当中，序列化也是经常被谈及的一块内容。

谈到序列化时，大家可能知道将类实现Serializable接口就可以达到序列化的目的，但当看到关于序列化的面试题时我们却常常一脸懵逼。  

1）可序列化接口和可外部接口的区别是什么？

2）序列化时，你希望某些成员不要序列化？该如何实现？

3）什么是 serialVersionUID ？如果不定义serialVersionUID，会发生什么？

是不是突然发现我们对这些问题其实都还存在很多疑惑？本文将总结一些Java序列化的常见问题，并且通过demo来进行测试和解答。

### 问题一：什么是 Java 序列化？

**序列化是把对象改成可以存到磁盘或通过网络发送到其它运行中的 Java 虚拟机的二进制格式的过程**，并可以通过反序列化恢复对象状态。Java 序列化API给开发人员提供了一个标准机制：通过实现 java.io.Serializable 或者 java.io.Externalizable 接口，ObjectInputStream 及ObjectOutputStream 处理对象序列化。实现java.io.Externalizable 接口的话，Java 程序员可自由选择基于类结构的标准序列化或是它们自定义的二进制格式，通常认为后者才是最佳实践，因为序列化的二进制文件格式成为类输出 API的一部分，可能破坏 Java 中私有和包可见的属性的封装。

序列化到底有什么用？

实现 java.io.Serializable。

定义用户类：

```
class User implements Serializable {
    private String username;
    private String passwd;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
}
```

我们把对象序列化，通过ObjectOutputStream存储到txt文件中，再通过ObjectInputStream读取txt文件，反序列化成User对象。

```
public class TestSerialize {

    public static void main(String[] args) {

        User user = new User();
        user.setUsername("hengheng");
        user.setPasswd("123456");

        System.out.println("read before Serializable: ");
        System.out.println("username: " + user.getUsername());
        System.err.println("password: " + user.getPasswd());

        try {
            ObjectOutputStream os = new ObjectOutputStream(
                    new FileOutputStream("/Users/admin/Desktop/test/user.txt"));
            os.writeObject(user); // 将User对象写进文件
            os.flush();
            os.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            ObjectInputStream is = new ObjectInputStream(new FileInputStream(
                    "/Users/admin/Desktop/test/user.txt"));
            user = (User) is.readObject(); // 从流中读取User的数据
            is.close();

            System.out.println("\nread after Serializable: ");
            System.out.println("username: " + user.getUsername());
            System.err.println("password: " + user.getPasswd());

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

运行结果如下：

```
序列化前数据: 
username: hengheng
password: 123456

序列化后数据: 
username: hengheng
password: 123456
```

到这里，我们大概知道了什么是序列化。

### 问题二：序列化时，你希望某些成员不要序列化，该如何实现？

答案：声明该成员为静态或瞬态，在 Java 序列化过程中则不会被序列化。

*  **静态变量**：加static关键字。
*  **瞬态变量：** 加transient关键字。

我们先尝试把变量声明为瞬态。

```
class User implements Serializable {
    private String username;
    private transient String passwd;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
```

在密码字段前加上了**transient**关键字再运行。运行结果：

```
序列化前数据: 
username: hengheng
password: 123456

序列化后数据: 
username: hengheng
password: null
```

通过运行结果发现密码没有被序列化，达到了我们的目的。

再尝试在用户名前加**static**关键字。

```
class User implements Serializable {
    private static String username;
    private transient String passwd;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
```

运行结果：

```
序列化前数据: 
username: hengheng
password: 123456

序列化后数据: 
username: hengheng
password: null
```

我们发现运行后的结果和预期的不一样，按理说username也应该变为null才对。是什么原因呢？

原因是：反序列化后类中static型变量username的值为当前JVM中对应的静态变量的值，而不是反序列化得出的。

我们来证明一下：

```
public class TestSerialize {

    public static void main(String[] args) {

        User user = new User();
        user.setUsername("hengheng");
        user.setPasswd("123456");

        System.out.println("序列化前数据: ");
        System.out.println("username: " + user.getUsername());
        System.err.println("password: " + user.getPasswd());

        try {
            ObjectOutputStream os = new ObjectOutputStream(
                    new FileOutputStream("/Users/admin/Desktop/test/user.txt"));
            os.writeObject(user); // 将User对象写进文件
            os.flush();
            os.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        User.username = "小明";
        try {
            ObjectInputStream is = new ObjectInputStream(new FileInputStream(
                    "/Users/admin/Desktop/test/user.txt"));
            user = (User) is.readObject(); // 从流中读取User的数据
            is.close();

            System.out.println("\n序列化后数据: ");
            System.out.println("username: " + user.getUsername());
            System.err.println("password: " + user.getPasswd());

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

class User implements Serializable {
    public static String username;
    private transient String passwd;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
}
```

在反序列化前把静态变量username的值改为『小明』。

```
User.username = "小明";
```

再运行一次：

```
序列化前数据: 
username: hengheng
password: 123456

序列化后数据: 
username: 小明
password: null
```

果然，这里的username是JVM中静态变量的值，并不是反序列化得到的值。

### 问题三：serialVersionUID有什么用？

我们经常会在类中自定义一个serialVersionUID：

```
private static final long serialVersionUID = 8294180014912103005L
```

这个serialVersionUID有什么用呢？如果不设置的话会有什么后果？

serialVersionUID 是一个 private static final long 型 ID，当它被印在对象上时，它通常是对象的哈希码。serialVersionUID可以自己定义，也可以自己去生成。

不指定 serialVersionUID的后果是：当你添加或修改类中的任何字段时，已序列化类将无法恢复，因为新类和旧序列化对象生成的 serialVersionUID 将有所不同。Java 序列化的过程是依赖于正确的序列化对象恢复状态的，并在序列化对象序列版本不匹配的情况下引发 java.io.InvalidClassException 无效类异常。

举个例子大家就明白了：

我们保持之前保存的序列化文件不变，然后修改User类。

```
class User implements Serializable {
    public static String username;
    private transient String passwd;
    private String age;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}
```

加了一个属性age，然后单另写一个反序列化的方法：

```
public static void main(String[] args) {
        try {
            ObjectInputStream is = new ObjectInputStream(new FileInputStream(
                    "/Users/admin/Desktop/test/user.txt"));
            User user = (User) is.readObject(); // 从流中读取User的数据
            is.close();

            System.out.println("\n修改User类之后的数据: ");
            System.out.println("username: " + user.getUsername());
            System.err.println("password: " + user.getPasswd());

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
```

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021967787" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="在这里插入图片描述" title="在这里插入图片描述">

报错了，我们发现之前的User类生成的serialVersionUID和修改后的serialVersionUID不一样（因为是通过对象的哈希码生成的），导致了InvalidClassException异常。

自定义serialVersionUID：

```
class User implements Serializable {
    private static final long serialVersionUID = 4348344328769804325L;

    public static String username;
    private transient String passwd;
    private String age;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}
```

再试一下：

```
序列化前数据: 
username: hengheng
password: 123456

序列化后数据: 
username: 小明
password: null
```

运行结果无报错，所以一般都要自定义serialVersionUID。

### 问题四：是否可以自定义序列化过程？

答案当然是可以的。

之前我们介绍了序列化的第二种方式：

实现Externalizable接口，然后重写writeExternal() 和readExternal()方法，这样就可以自定义序列化。

比如我们尝试把变量设为瞬态。

```
public class ExternalizableTest implements Externalizable {

    private transient String content = "我是被transient修饰的变量哦";

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeObject(content);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException,
            ClassNotFoundException {
        content = (String) in.readObject();
    }

    public static void main(String[] args) throws Exception {

        ExternalizableTest et = new ExternalizableTest();
        ObjectOutput out = new ObjectOutputStream(new FileOutputStream(
                new File("test")));
        out.writeObject(et);

        ObjectInput in = new ObjectInputStream(new FileInputStream(new File(
                "test")));
        et = (ExternalizableTest) in.readObject();
        System.out.println(et.content);

        out.close();
        in.close();
    }
}
```

运行结果：

```
我是被transient修饰的变量哦
```

这里实现的是Externalizable接口，则没有任何东西可以自动序列化，需要在writeExternal方法中进行手工指定所要序列化的变量，这与是否被transient修饰无关。

通过上述介绍，是不是对Java序列化有了更多的了解？


>
>来源：宜信技术学院
