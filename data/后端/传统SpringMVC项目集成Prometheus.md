

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021926201" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="undefined" title="undefined">

## 前言

春节前的两个星期，本人写了两篇Spring Boot 应用集成Prometheus + Grafana实现监控告警功能的文章。

*  [Spring Boot Actuator 模块 详解：健康检查，度量，指标收集和监控](https://ricstudio.top/archives/spring_boot_actuator_learn)
*  [SpringBoot 微服务应用集成Prometheus + Grafana 实现监控告警](https://ricstudio.top/archives/monitor_integrate_prometheus_grafana)

凭借着 Spring Boot Actuator 模块 + `micrometer-registry-prometheus` 模块，Spring Boot 应用和 Prometheus 集成变得非常的简单。

但是一些老项目可能是非 Spring Boot 的 Spring MVC 项目。这一次就是来讲一讲传统 Spring MVC 如何集成 Prometheus。也算是把这个系列完整一下。

相关的理论部分，实际上在往期两篇文章中都有说明，这里就不赘述了，直接进入实操部分。

## 实操

### 1. 引入依赖

这里实际上就是引入 Prometheus 最基础的 Java 客户端依赖。

```
        <properties>
            ...
            <io.prometheus.version>0.8.0</io.prometheus.version>
        </properties>
        
        
        <dependency>
            <groupId>io.prometheus</groupId>
            <artifactId>simpleclient</artifactId>
            <version>${io.prometheus.version}</version>
        </dependency>
        
        <dependency>
            <groupId>io.prometheus</groupId>
            <artifactId>simpleclient_hotspot</artifactId>
            <version>${io.prometheus.version}</version>
        </dependency>
        
        <dependency>
            <groupId>io.prometheus</groupId>
            <artifactId>simpleclient_servlet</artifactId>
            <version>${io.prometheus.version}</version>
        </dependency>
```


>
>`simpleclient_hotspot`
>
>[官方github](https://github.com/prometheus/client_java#javadocs)

### 2. 配置新的endpoint

```
    <servlet>
        <servlet-name>metrics</servlet-name>
        <servlet-class>io.prometheus.client.exporter.MetricsServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>metrics</servlet-name>
        <url-pattern>/metrics</url-pattern>
    </servlet-mapping>
```


>
>`shiro`
>
>`spring security`

### 3. 开启JVM监控参数

在启动类中增加如下代码，

```
@PostConstruct
public void init() {
    //输出JVM信息
    DefaultExports.initialize();
}
```

#### 测试

现在启动项目，访问`http://ip:port/metrics`，可以看到相关的指标数据：

```
# HELP jvm_buffer_pool_used_bytes Used bytes of a given JVM buffer pool.
# TYPE jvm_buffer_pool_used_bytes gauge
jvm_buffer_pool_used_bytes{pool="direct",} 1791403.0
jvm_buffer_pool_used_bytes{pool="mapped",} 0.0
# HELP jvm_buffer_pool_capacity_bytes Bytes capacity of a given JVM buffer pool.
# TYPE jvm_buffer_pool_capacity_bytes gauge
jvm_buffer_pool_capacity_bytes{pool="direct",} 1791403.0
jvm_buffer_pool_capacity_bytes{pool="mapped",} 0.0
# HELP jvm_buffer_pool_used_buffers Used buffers of a given JVM buffer pool.
# TYPE jvm_buffer_pool_used_buffers gauge
jvm_buffer_pool_used_buffers{pool="direct",} 44.0
jvm_buffer_pool_used_buffers{pool="mapped",} 0.0
# HELP jvm_memory_pool_allocated_bytes_total Total bytes allocated in a given JVM memory pool. Only updated after GC, not continuously.
# TYPE jvm_memory_pool_allocated_bytes_total counter
jvm_memory_pool_allocated_bytes_total{pool="Code Cache",} 2.4131136E7
jvm_memory_pool_allocated_bytes_total{pool="PS Eden Space",} 1.157973728E9
jvm_memory_pool_allocated_bytes_total{pool="PS Old Gen",} 4.2983992E7
jvm_memory_pool_allocated_bytes_total{pool="PS Survivor Space",} 2.3271936E7
jvm_memory_pool_allocated_bytes_total{pool="Compressed Class Space",} 6964912.0
jvm_memory_pool_allocated_bytes_total{pool="Metaspace",} 5.9245208E7
# HELP jvm_classes_loaded The number of classes that are currently loaded in the JVM
# TYPE jvm_classes_loaded gauge
......
```

有了数据之后，后面的步骤（Prometheus 采集指标，可视化）在[SpringBoot 微服务应用集成Prometheus + Grafana 实现监控告警](https://ricstudio.top/archives/monitor_integrate_prometheus_grafana)有详细的说明。

### 4. 数据埋点（自定义Metrics指标）

Prometheus提供了4中不同的Metrics类型:Counter, Gauge, Histogram, Summary。

*  Counter - 只增不减的计数器
*  Gauge - 可增可减的仪表盘
*  Histogram - 自带buckets区间用于统计分布统计图
*  Summary - 客户端定义的数据分布统计图

至于怎么使用，[官方doc](https://github.com/prometheus/client_java#javadocs)中详细的说明，这里简单举两个例子：

你可以先声明一个专门的拦截器，来处理统计Metrics的操作：

```
public class PrometheusMetricsInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return super.preHandle(request, response, handler);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        super.afterCompletion(request, response, handler, ex);
    }
}
```

#### Counter

计数器可以用于记录只会增加不会减少的指标类型，比如记录应用请求的总量(http_requests_total)。

对于Counter类型的指标，只包含一个inc()方法，用于计数器+1

```
public class PrometheusMetricsInterceptor extends HandlerInterceptorAdapter {

    // 用请求路径和http method 当做标签
    private Counter requestCounter = Counter.build()
            .name("io_namespace_http_requests_total")
            .labelNames("path", "method")
            .help("Total requests.")
            .register();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return super.preHandle(request, response, handler);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        
        // 调用inc() 技术+1
        requestCounter.labels(request.getRequestURI(), request.getMethod()).inc();
        super.afterCompletion(request, response, handler, ex);
    }
}
```

一些对应的常用的聚合操作的PromQL：

```
# 常用PromQL
## 查询应用的请求总量
sum(io_namespace_http_requests_total)
## 查询每秒Http请求量
sum(rate(io_wise2c_gateway_requests_total[5m]))
## 查询当前应用请求量Top N的URI
topk(10, sum(io_namespace_http_requests_total) by (path))
```

#### Histogram

主要用于在指定分布范围内(Buckets)记录大小(如http request bytes)或者事件发生的次数。

以请求响应时间requests_latency_seconds为例，假如我们需要记录http请求响应时间符合在分布范围{.005, .01, .025, .05, .075, .1, .25, .5, .75, 1, 2.5, 5, 7.5, 10}中的次数时。

```
public class PrometheusMetricsInterceptor extends HandlerInterceptorAdapter {

    private Histogram requestLatencyHistogram = Histogram.build()
            .labelNames("path", "method", "code")
            .name("io_namespace_http_requests_latency_seconds_histogram")
            .help("Request latency in seconds.")
            .register();

    // spring interceptor 单例，线程不安全，所以使用threadlocal
    private ThreadLocal<Histogram.Timer> timerThreadLocal = new ThreadLocal<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Histogram.Timer histogramRequestTimer = requestLatencyHistogram.labels(request.getRequestURI(), request.getMethod()).startTimer();
        timerThreadLocal.set(histogramRequestTimer);
        return super.preHandle(request, response, handler);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        Histogram.Timer histogramRequestTimer = timerThreadLocal.get();
        histogramRequestTimer.observeDuration();
        timerThreadLocal.remove();
        super.afterCompletion(request, response, handler, ex);
    }
}
```

最后访问前面配置的 `/metrics`端点，查看对应埋点数据。

## 结语

到这里传统Spring MVC如何集成 Prometheus 也就算讲述完毕了，可以结合前两篇文章一起食用。

希望能给你带来一些收获。

## 参考

*  [官方doc](https://github.com/prometheus/client_java#javadocs)
*  [Prometheus Book](https://yunlzheng.gitbook.io/prometheus-book/)
