

#### 一、Glances介绍

glances是一个基于python语言开发，可以为linux或者UNIX性能提供监视和分析性能数据的功能。glances在用户的终端上显示重要的系统信息，并动态的进行更新，让管理员实时掌握系统资源的使用情况，而动态监控并不会消耗大量的系统资源，比如CPU资源，通常消耗小于2%，glances默认每两秒更新一次数据。同时glances还可以将相同的数据捕获到一个文件，便于以后对报告进行分析和图形绘制，支持的文件格式有.csv电子表格格式和和html格式。

github地址：[https://github.com/nicolargo/...](https://github.com/nicolargo/glances)

glances工具的功能如下：

*  CPU使用率
*  内存使用率
*  内核统计信息和运行队列信息
*  磁盘I/O速度、传输和读/写比率
*  磁盘适配器
*  网络I/O速度、传输和读/写比率
*  页面监控
*  进程监控-消耗资源最多的进程
*  计算机信息和系统资源

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021853774" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

效果图

#### 二、glances安装方式

*  源码安装
*  pip命令安装
*  yum安装

源码安装比较复杂，可能会遇到依赖问题不好解决；pip安装和yum安装都可以选择。文档手册：[https://glances.readthedocs.i...](https://glances.readthedocs.io/en/latest/index.html)

#### 三、安装glances

Glances 一般已集成到大多数 Linux 发行版的官方软件源中，可以直接使用系统的包管理器（如 apt-get、yum）安装：

```
sudo apt-get install glances
```

```
yum install epel* -yyum -y install glances
```

当然也可以使用 Python 的包管理器（pip 命令）进行安装：

```
pip install glances
```

**温度监控工具安装**  

lm_sensors 的软件可以帮助我们来监控主板、CPU 的工作电压、风扇转速、温度等数据。这些数据我们通常在主板的 BIOS 也可以看到。当我们可以在机器运行的时候通过 lm_sensors 随时来监测着 CPU 的温度变化，可以预防呵保护因为 CPU 过热而会烧掉。lm_sensors 软件监测到的数据可以被 glances 调用并且显示_。_

```
yum -y install lm_sensors
```

其实，这些开源软件的安装非常简单，基本100%是傻瓜式的，没有什么太大的问题。

#### 四、Glances的使用

---

Glances 有 4 种颜色标记，分别表示不同的紧急程度：

*  绿色：OK
*  蓝色：CAREFUL
*  紫色：WARNING
*  红色：CRITICAL


>
>蓝色表示系统性能有一些小问题，用户应当开始关注系统性能；（此时 CPU 使用率、磁盘空间使用率和内存使用率在 50%-70% 之间，系统负载在 0.7-1 之间）。
>
>品红表示性能报警，应当采取措施比如备份数据；（此时 CPU 使用率、磁盘空间使用率和内存使用率在 70%-90% 之间，，系统负载在 1-5 之间）。
>
>红色表示性能问题严重，可能宕机；（此时 CPU 使用率、磁盘空间使用率和内存使用率在大于 90%，系统负载大于 5）。

**glances 使用方法**

---

glances 是一个命令行工具包括如下命令选项：

*  -b：显示网络连接速度 Byte/ 秒
*  -B @IP|host ：绑定服务器端 IP 地址或者主机名称
*  -c @IP|host：连接 glances 服务器端
*  -C file：设置配置文件默认是 /etc/glances/glances.conf
*  -d：关闭磁盘 I/O 模块
*  -e：显示传感器温度
*  -f file：设置输出文件（格式是 HTML 或者 CSV）
*  -m：关闭挂载的磁盘模块
*  -n：关闭网络模块
*  -p PORT：设置运行端口默认是 61209
*  -P password：设置客户端 / 服务器密码
*  -s：设置 glances 运行模式为服务器
*  -t sec：设置屏幕刷新的时间间隔，单位为秒，默认值为 2 秒，数值范围：1~32767
*  -h : 显示帮助信息
*  -v : 显示版本信息

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021853775" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

**glances 工作界面的说明 :**  在图中 的上部是 CPU 、Load（负载）、Mem（内存使用）、 Swap（交换分区）的使用情况。在图中的中上部是网络接口、Processes（进程）的使用情况。通常包括如下字段：

*  VIRT: 虚拟内存大小
*  RES: 进程占用的物理内存值
*  %CPU：该进程占用的 CPU 使用率
*  %MEM：该进程占用的物理内存和总内存的百分比
*  PID: 进程 ID 号
*  USER: 进程所有者的用户名
*  TIME+: 该进程启动后占用的总的 CPU 时间
*  IO_R 和 IO_W: 进程的读写 I/O 速率
*  NAME: 进程名称
*  NI: 进程优先级
*  S: 进程状态，其中 S 表示休眠，R 表示正在运行，Z 表示僵死状态。

**另外 glances 可以使用交互式的方式运行该工具，用户可以使用如下快捷键：**

*  h ：显示帮助信息
*  q ：离开程序退出
*  c ：按照 CPU 实时负载对系统进程进行排序
*  m ：按照内存使用状况对系统进程排序
*  i：按照 I/O 使用状况对系统进程排序
*  p：按照进程名称排序
*  d ：显示磁盘读写状况
*  w ：删除日志文件
*  l ：显示日志
*  s：显示传感器信息
*  f ：显示系统信息
*  1 ：轮流显示每个 CPU 内核的使用情况

#### 五、Glances的C/S模式

glances还支持C/S模式监控，被监控机运行服务端，监控端运行客户端既可以实现远程监控，两端都安装Glances服务即可。

服务端启动

服务端使用的端口默认是61209，启动命令如下：

```
glances -s -B 192.168.1.253glances server is running on 192.168.1.253:61209
```

客户端访问

```
glances -c 192.168.1.253
```

也可以使用用户名与密码进行访问，默认用户名是glances，如果想更改的话可以使用--username进行更换。下面是官方的原文：

In client/server mode, limits are set by the server side.

You can set a password to access to the server using the `--password`. By default, the username is `glances` but you can change it with `--username`.

```
glances -s --usernameDefine the Glances server username: testDefine the Glances server password (test username):Password (confirm):Do you want to save the password? [Yes/No]: YesGlances XML-RPC server is running on 0.0.0.0:61209
```

**客户端连接方式如下：**

```
glances -c 192.168.1.253 --username test
```

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021853776" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

#### 六、Glances的WebServer 模式

---

在 glances 的 WebServer 模式下，客户端只通过浏览器访问就可以获取远程服务器的运行状态。只需要安装 Python 的 Bottle 模块：

```
pip install bottle
```

安装成功后，使用`glances -w`命令即可开启 WebServer 模式。  客户端使用浏览器访问`http://SERVER_IP:61208/`进入监控界面。  

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021853773" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

它的WEB模式还可以在手机上看，如下图。  

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021853779" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

来源官方文档  

七、其它高级应用

导出数据为CSV格式，命令如下：

```
glances --export-csv /tmp/1.csv
```

glances还可以与InfluxDB、Grafana这些开源软件一起配合，构建成一个监控平台，和其它监控软件一样，能形成实时化、图表化的数据显示。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021853777" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021853778" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

感兴趣的朋友可以自己在测试环境玩玩，一个很好的，功能强大的工具。

**你有什么好用的性能工具？**

**欢迎留言分享一起交流下！**
