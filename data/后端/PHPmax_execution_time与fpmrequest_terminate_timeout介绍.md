

前段时间一位同事跟我说php脚本超时时间以fpm配置优先。经过自己测试后，其实不然,前面的观点只是在某些情况下成立。

php脚本超时时间可以在php.ini的max_execution_time和fpm.conf的request_terminate_timeout参数两处进行设置.那么这两者有什么区别呢？

当我们设置php.ini的max_execution_time参数后，zend引擎处理脚本时，其内部会根据设定的时间定义一个定时器(setitimer)，这是linux的API。

而fpm.confrequest_terminate_timeout的检测是通过主进程遍历定时事件fpm_pctl_heartbeat来判断PHP脚本执行是否超时。

下面通过实例进行分析。

example:

```
$a = time();
var_dump('begin');
for($i=0;;$i++){
    if(time()-$a>10){
        break;
    }   
}
var_dump('end');
```

上面的代码比较容易理解，首先，输出“begin”字符串，10秒后再输出“end”字符串。

方案1：修改php.ini的配置max_execution_time=3，fpm.conf的request_terminate_timeout=20.

example执行的结果：

string(5) "begin"1chrome浏览器抓包：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021914646" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image" title="image">

根据上面运行的结果和效果图可以看出，example运行3秒后中止。也就是说，此时，php.ini的max_execution_time生效了。

方案2：修改php.ini的配置max_execution_time=20，fpm.conf的request_terminate_timeout=3.

example执行的结果：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021914647" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image" title="image">

chrome浏览器抓包：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021914649" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image" title="image">

从上面的截图可以看出，程序也只执行了3S。此时脚本的运行受到fpm.conf的request_terminate_timeout配置影响。

从上面两个方案推断出，对于example实例，php脚本取max_execution_time与request_terminate_timeout最小值作为脚本的超时时间。那是不是只要设置max_execution_time参数即可呢？

下面继续分析，我们对example代码稍微调整下。

```
$a = time();
var_dump('begin');
sleep(10);
var_dump('end');
```

这段代码与上面功能类似，唯一的区别是由循环改成sleep()。

采用方案1的配置，结果如下：

string(5) "begin" string(3) "end"1采用方案2的配置，结果如下：example执行的结果：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021914647" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image" title="image">

对比两个结果可以看出此时max_execution_time的配置未起到效果。以下是引用php手册的一段话([http://php.net/manual/zh/func...](http://php.net/manual/zh/function.set-time-limit.php))：

set_time_limit()函数和配置指令max_execution_time只影响脚本本身执行的时间。任何发生在诸如使用system()的系统调用，流操作，数据库操作等的脚本执行的最大时间不包括其中，当该脚本已运行。在测量时间是实值的Windows中，情况就不是如此了。

SO,为了保证生产环境的安全，建议同时设置max_execution_time和request_terminate_timeout参数值。
