

<img referrerpolicy="no-referrer" data-src="/img/bVbEddV" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="0a7bb9ab8214a8e1a2ffb57069af289d.png" title="0a7bb9ab8214a8e1a2ffb57069af289d.png">

如果文章和笔记能带您一丝帮助或者启发，请不要吝啬你的赞和收藏，你的肯定是我前进的最大动力😁

*  附笔记链接，阅读往期更多优质文章可移步查看，喜欢的可以给我点赞鼓励哦：[https://github.com/Wscats/CV/issues/27](https://github.com/Wscats/CV/issues/27)

# 为元素添加on方法

```
Element.prototype.on = Element.prototype.addEventListener;

NodeList.prototype.on = function (event, fn) {、
    []['forEach'].call(this, function (el) {
        el.on(event, fn);
    });
    return this;
};
```

# 为元素添加trigger方法

```
Element.prototype.trigger = function(type, data) {
  var event = document.createEvent("HTMLEvents");
  event.initEvent(type, true, true);
  event.data = data || {};
  event.eventName = type;
  event.target = this;
  this.dispatchEvent(event);
  return this;
};

NodeList.prototype.trigger = function(event) {
  []["forEach"].call(this, function(el) {
    el["trigger"](event);
  });
  return this;
};
```

# 转义html标签

```
function HtmlEncode(text) {
  return text
    .replace(/&/g, "&")
    .replace(/\"/g, '"')
    .replace(//g, ">");
}
```

# HTML标签转义

```
// HTML 标签转义
// @param {Array.<DOMString>} templateData 字符串类型的tokens
// @param {...} ..vals 表达式占位符的运算结果tokens
//
function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);
    // Escape special characters in the substitution.
    s += arg
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">");
    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
// 调用
var html = SaferHTML`<p>这是关于字符串模板的介绍</p>`;
```

# 跨浏览器绑定事件

```

function addEventSamp(obj, evt, fn) {
  if (!oTarget) {
    return;
  }
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent("on" + evt, fn);
  } else {
    oTarget["on" + sEvtType] = fn;
  }
}
```

# 加入收藏夹

```

function addFavorite(sURL, sTitle) {
  try {
    window.external.addFavorite(sURL, sTitle);
  } catch (e) {
    try {
      window.sidebar.addPanel(sTitle, sURL, "");
    } catch (e) {
      alert("加入收藏失败，请使用Ctrl+D进行添加");
    }
  }
}
```

# 提取页面代码中所有网址

```
var aa = document.documentElement.outerHTML
  .match(
    /(url\(|src=|href=)[\"\']*([^\"\'\(\)\<\>\[\] ]+)[\"\'\)]*|(http:\/\/[\w\-\.]+[^\"\'\(\)\<\>\[\] ]+)/gi
  )
  .join("\r\n")
  .replace(/^(src=|href=|url\()[\"\']*|[\"\'\>\) ]*$/gim, "");
alert(aa);
```

# 动态加载脚本文件

```
function appendscript(src, text, reload, charset) {
  var id = hash(src + text);
  if (!reload && in_array(id, evalscripts)) return;
  if (reload && $(id)) {
    $(id).parentNode.removeChild($(id));
  }

  evalscripts.push(id);
  var scriptNode = document.createElement("script");
  scriptNode.type = "text/javascript";
  scriptNode.id = id;
  scriptNode.charset = charset
    ? charset
    : BROWSER.firefox
    ? document.characterSet
    : document.charset;
  try {
    if (src) {
      scriptNode.src = src;
      scriptNode.onloadDone = false;
      scriptNode.onload = function() {
        scriptNode.onloadDone = true;
        JSLOADED[src] = 1;
      };
      scriptNode.onreadystatechange = function() {
        if (
          (scriptNode.readyState == "loaded" ||
            scriptNode.readyState == "complete") &&
          !scriptNode.onloadDone
        ) {
          scriptNode.onloadDone = true;
          JSLOADED[src] = 1;
        }
      };
    } else if (text) {
      scriptNode.text = text;
    }
    document.getElementsByTagName("head")[0].appendChild(scriptNode);
  } catch (e) {}
}
```

# 返回顶部的通用方法

```
function backTop(btnId) {
  var btn = document.getElementById(btnId);
  var d = document.documentElement;
  var b = document.body;
  window.onscroll = set;
  btn.style.display = "none";
  btn.onclick = function() {
    btn.style.display = "none";
    window.onscroll = null;
    this.timer = setInterval(function() {
      d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
      b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
      if (d.scrollTop + b.scrollTop == 0)
        clearInterval(btn.timer, (window.onscroll = set));
    }, 10);
  };
  function set() {
    btn.style.display = d.scrollTop + b.scrollTop > 100 ? "block" : "none";
  }
}
backTop("goTop");
```

# 实现base64解码

```

function base64_decode(data) {
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    ac = 0,
    dec = "",
    tmp_arr = [];
  if (!data) {
    return data;
  }
  data += "";
  do {
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));
    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;
    o1 = (bits >> 16) & 0xff;
    o2 = (bits >> 8) & 0xff;
    o3 = bits & 0xff;
    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);
  dec = tmp_arr.join("");
  dec = utf8_decode(dec);
  return dec;
}
```

# 确认是否是键盘有效输入值

```
function checkKey(iKey) {
  if (iKey == 32 || iKey == 229) {
    return true;
  } /*空格和异常*/
  if (iKey > 47 && iKey < 58) {
    return true;
  } /*数字*/
  if (iKey > 64 && iKey < 91) {
    return true;
  } /*字母*/
  if (iKey > 95 && iKey < 108) {
    return true;
  } /*数字键盘1*/
  if (iKey > 108 && iKey < 112) {
    return true;
  } /*数字键盘2*/
  if (iKey > 185 && iKey < 193) {
    return true;
  } /*符号1*/
  if (iKey > 218 && iKey < 223) {
    return true;
  } /*符号2*/
  return false;
}
```

# 全角半角转换

```
//iCase: 0全到半，1半到全，其他不转化
function chgCase(sStr, iCase) {
  if (
    typeof sStr != "string" ||
    sStr.length <= 0 ||
    !(iCase === 0 || iCase == 1)
  ) {
    return sStr;
  }
  var i,
    oRs = [],
    iCode;
  if (iCase) {
    /*半->全*/
    for (i = 0; i < sStr.length; i += 1) {
      iCode = sStr.charCodeAt(i);
      if (iCode == 32) {
        iCode = 12288;
      } else if (iCode < 127) {
        iCode += 65248;
      }
      oRs.push(String.fromCharCode(iCode));
    }
  } else {
    /*全->半*/
    for (i = 0; i < sStr.length; i += 1) {
      iCode = sStr.charCodeAt(i);
      if (iCode == 12288) {
        iCode = 32;
      } else if (iCode > 65280 && iCode < 65375) {
        iCode -= 65248;
      }
      oRs.push(String.fromCharCode(iCode));
    }
  }
  return oRs.join("");
}
```

# 版本对比

```
function compareVersion(v1, v2) {
  v1 = v1.split(".");
  v2 = v2.split(".");

  var len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }

  while (v2.length < len) {
    v2.push("0");
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i]);
    var num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}
```

# 压缩CSS样式代码

```
function compressCss(s) {
  //压缩代码
  s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
  s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
  s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理
  s = s.replace(/;\s*;/g, ";"); //清除连续分号
  s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
  return s == null ? "" : s[1];
}
```

# 获取当前路径

```
var currentPageUrl = "";
if (typeof this.href === "undefined") {
  currentPageUrl = document.location.toString().toLowerCase();
} else {
  currentPageUrl = this.href.toString().toLowerCase();
}
```

# 字符串长度截取

```
function cutstr(str, len) {
    var temp,
        icount = 0,
        patrn = /[^\x00-\xff]/，
        strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                   icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
            } else {
            break;
        }
    }
    return strre + "..."
}
```

# 时间日期格式转换

```
Date.prototype.format = function(formatStr) {
  var str = formatStr;
  var Week = ["日", "一", "二", "三", "四", "五", "六"];
  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(
    /yy|YY/,
    this.getYear() % 100 > 9
      ? (this.getYear() % 100).toString()
      : "0" + (this.getYear() % 100)
  );
  str = str.replace(
    /MM/,
    this.getMonth() + 1 > 9
      ? (this.getMonth() + 1).toString()
      : "0" + (this.getMonth() + 1)
  );
  str = str.replace(/M/g, this.getMonth() + 1);
  str = str.replace(/w|W/g, Week[this.getDay()]);
  str = str.replace(
    /dd|DD/,
    this.getDate() > 9 ? this.getDate().toString() : "0" + this.getDate()
  );
  str = str.replace(/d|D/g, this.getDate());
  str = str.replace(
    /hh|HH/,
    this.getHours() > 9 ? this.getHours().toString() : "0" + this.getHours()
  );
  str = str.replace(/h|H/g, this.getHours());
  str = str.replace(
    /mm/,
    this.getMinutes() > 9
      ? this.getMinutes().toString()
      : "0" + this.getMinutes()
  );
  str = str.replace(/m/g, this.getMinutes());
  str = str.replace(
    /ss|SS/,
    this.getSeconds() > 9
      ? this.getSeconds().toString()
      : "0" + this.getSeconds()
  );
  str = str.replace(/s|S/g, this.getSeconds());
  return str;
};

// 或
Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return format;
};
alert(new Date().format("yyyy-MM-dd hh:mm:ss"));
```

# 跨浏览器删除事件

```
function delEvt(obj, evt, fn) {
  if (!obj) {
    return;
  }
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
  } else if (oTarget.attachEvent) {
    obj.attachEvent("on" + evt, fn);
  } else {
    obj["on" + evt] = fn;
  }
}
```

# 判断是否以某个字符串结束

```
String.prototype.endWith = function(s) {
  var d = this.length - s.length;
  return d >= 0 && this.lastIndexOf(s) == d;
};
```

# 返回脚本内容

```
function evalscript(s) {
  if (s.indexOf("<script") == -1) return s;
  var p = /<script[^\>]*?>([^\x00]*?)<\/script>/gi;
  var arr = [];
  while ((arr = p.exec(s))) {
    var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
    var arr1 = [];
    arr1 = p1.exec(arr[0]);
    if (arr1) {
      appendscript(arr1[1], "", arr1[2], arr1[3]);
    } else {
      p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
      arr1 = p1.exec(arr[0]);
      appendscript("", arr1[2], arr1[1].indexOf("reload=") != -1);
    }
  }
  return s;
}
```

# 格式化CSS样式代码

```
function formatCss(s) {
  //格式化代码
  s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
  s = s.replace(/;\s*;/g, ";"); //清除连续分号
  s = s.replace(/\,[\s\.\#\d]*{/g, "{");
  s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
  s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
  s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
  return s;
}
```

# 获取cookie值

```
function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}
```

# 获得URL中GET参数值

```
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]
function getGet() {
  querystr = window.location.href.split("?");
  if (querystr[1]) {
    GETs = querystr[1].split("&");
    GET = [];
    for (i = 0; i < GETs.length; i++) {
      tmp_arr = GETs.split("=");
      key = tmp_arr[0];
      GET[key] = tmp_arr[1];
    }
  }
  return querystr[1];
}
```

# 获取移动设备初始化大小

```
function getInitZoom() {
  if (!this._initZoom) {
    var screenWidth = Math.min(screen.height, screen.width);
    if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
      screenWidth = screenWidth / window.devicePixelRatio;
    }
    this._initZoom = screenWidth / document.body.offsetWidth;
  }
  return this._initZoom;
}
```

# 获取页面高度

```
function getPageHeight() {
  var g = document,
    a = g.body,
    f = g.documentElement,
    d = g.compatMode == "BackCompat" ? a : g.documentElement;
  return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
```

# 获取页面scrollLeft

```
function getPageScrollLeft() {
  var a = document;
  return a.documentElement.scrollLeft || a.body.scrollLeft;
}
```

# 获取页面scrollTop

```
function getPageScrollTop() {
  var a = document;
  return a.documentElement.scrollTop || a.body.scrollTop;
}
```

# 获取页面可视高度

```
function getPageViewHeight() {
  var d = document,
    a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientHeight;
}
```

# 获取页面可视宽度

```
function getPageViewWidth() {
  var d = document,
    a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientWidth;
}
```

# 获取页面宽度

```
function getPageWidth() {
  var g = document,
    a = g.body,
    f = g.documentElement,
    d = g.compatMode == "BackCompat" ? a : g.documentElement;
  return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}
```

# 获取移动设备屏幕宽度

```
function getScreenWidth() {
  var smallerSide = Math.min(screen.width, screen.height);
  var fixViewPortsExperiment =
    rendererModel.runningExperiments.FixViewport ||
    rendererModel.runningExperiments.fixviewport;
  var fixViewPortsExperimentRunning =
    fixViewPortsExperiment && fixViewPortsExperiment.toLowerCase() === "new";
  if (fixViewPortsExperiment) {
    if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
      smallerSide = smallerSide / window.devicePixelRatio;
    }
  }
  return smallerSide;
}
```

# 获取网页被卷去的位置

```
function getScrollXY() {
  return document.body.scrollTop
    ? {
        x: document.body.scrollLeft,
        y: document.body.scrollTop
      }
    : {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop
      };
}
```

# 获取URL上的参数

```
// 获取URL中的某参数值,不区分大小写
// 获取URL中的某参数值,不区分大小写,
// 默认是取'hash'里的参数，
// 如果传其他参数支持取‘search’中的参数
// @param {String} name 参数名称
export function getUrlParam(name, type = "hash") {
  let newName = name,
    reg = new RegExp("(^|&)" + newName + "=([^&]*)(&|$)", "i"),
    paramHash = window.location.hash.split("?")[1] || "",
    paramSearch = window.location.search.split("?")[1] || "",
    param;

  type === "hash" ? (param = paramHash) : (param = paramSearch);

  let result = param.match(reg);

  if (result != null) {
    return result[2].split("/")[0];
  }
  return null;
}
```

# 检验URL链接是否有效

```
function getUrlState(URL) {
  var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
  xmlhttp.Open("GET", URL, false);
  try {
    xmlhttp.Send();
  } catch (e) {
  } finally {
    var result = xmlhttp.responseText;
    if (result) {
      if (xmlhttp.Status == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
```

# 获取窗体可见范围的宽与高

```
function getViewSize() {
  var de = document.documentElement;
  var db = document.body;
  var viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
  var viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
  return Array(viewW, viewH);
}
```

# 获取移动设备最大化大小

```
function getZoom() {
  var screenWidth =
    Math.abs(window.orientation) === 90
      ? Math.max(screen.height, screen.width)
      : Math.min(screen.height, screen.width);
  if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
    screenWidth = screenWidth / window.devicePixelRatio;
  }
  var FixViewPortsExperiment =
    rendererModel.runningExperiments.FixViewport ||
    rendererModel.runningExperiments.fixviewport;
  var FixViewPortsExperimentRunning =
    FixViewPortsExperiment &&
    (FixViewPortsExperiment === "New" || FixViewPortsExperiment === "new");
  if (FixViewPortsExperimentRunning) {
    return screenWidth / window.innerWidth;
  } else {
    return screenWidth / document.body.offsetWidth;
  }
}
```

# 判断是否安卓移动设备访问

```
function isAndroidMobileDevice() {
  return /android/i.test(navigator.userAgent.toLowerCase());
}
```

# 判断是否苹果移动设备访问

```
function isAppleMobileDevice() {
  return /iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase());
}
```

# 判断是否为数字类型

```
function isDigit(value) {
  var patrn = /^[0-9]*$/;
  if (patrn.exec(value) == null || value == "") {
    return false;
  } else {
    return true;
  }
}
```

# 是否是某类手机型号

```
// 用devicePixelRatio和分辨率判断
const isIphonex = () => {
  // X XS, XS Max, XR
  const xSeriesConfig = [
    {
      devicePixelRatio: 3,
      width: 375,
      height: 812
    },
    {
      devicePixelRatio: 3,
      width: 414,
      height: 896
    },
    {
      devicePixelRatio: 2,
      width: 414,
      height: 896
    }
  ];
  // h5
  if (typeof window !== "undefined" && window) {
    const isIOS = /iphone/gi.test(window.navigator.userAgent);
    if (!isIOS) return false;
    const { devicePixelRatio, screen } = window;
    const { width, height } = screen;
    return xSeriesConfig.some(
      item =>
        item.devicePixelRatio === devicePixelRatio &&
        item.width === width &&
        item.height === height
    );
  }
  return false;
};
```

# 判断是否移动设备

```
function isMobile() {
  if (typeof this._isMobile === "boolean") {
    return this._isMobile;
  }
  var screenWidth = this.getScreenWidth();
  var fixViewPortsExperiment =
    rendererModel.runningExperiments.FixViewport ||
    rendererModel.runningExperiments.fixviewport;
  var fixViewPortsExperimentRunning =
    fixViewPortsExperiment && fixViewPortsExperiment.toLowerCase() === "new";
  if (!fixViewPortsExperiment) {
    if (!this.isAppleMobileDevice()) {
      screenWidth = screenWidth / window.devicePixelRatio;
    }
  }
  var isMobileScreenSize = screenWidth < 600;
  var isMobileUserAgent = false;
  this._isMobile = isMobileScreenSize && this.isTouchScreen();
  return this._isMobile;
}
```

# 判断吗是否手机号码

```
function isMobileNumber(e) {
  var i =
      "134,135,136,137,138,139,150,151,152,157,158,159,187,188,147,182,183,184,178",
    n = "130,131,132,155,156,185,186,145,176",
    a = "133,153,180,181,189,177,173,170",
    o = e || "",
    r = o.substring(0, 3),
    d = o.substring(0, 4),
    s =
      !!/^1\d{10}$/.test(o) &&
      (n.indexOf(r) >= 0
        ? "联通"
        : a.indexOf(r) >= 0
        ? "电信"
        : "1349" == d
        ? "电信"
        : i.indexOf(r) >= 0
        ? "移动"
        : "未知");
  return s;
}
```

# 判断是否是移动设备访问

```
function isMobileUserAgent() {
  return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(
    window.navigator.userAgent.toLowerCase()
  );
}
```

# 判断鼠标是否移出事件

```
function isMouseOut(e, handler) {
  if (e.type !== "mouseout") {
    return false;
  }
  var reltg = e.relatedTarget
    ? e.relatedTarget
    : e.type === "mouseout"
    ? e.toElement
    : e.fromElement;
  while (reltg && reltg !== handler) {
    reltg = reltg.parentNode;
  }
  return reltg !== handler;
}
```

# 判断是否Touch屏幕

```
function isTouchScreen() {
  return (
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  );
}
```

# 判断是否为网址

```

function isURL(strUrl) {
  var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
  if (regular.test(strUrl)) {
    return true;
  } else {
    return false;
  }
}
```

# 判断是否打开视窗

```
function isViewportOpen() {
  return !!document.getElementById("wixMobileViewport");
}
```

# 加载样式文件

```
function loadStyle(url) {
  try {
    document.createStyleSheet(url);
  } catch (e) {
    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(cssLink);
  }
}
```

# 替换地址栏

```
function locationReplace(url) {
  if (history.replaceState) {
    history.replaceState(null, document.title, url);
    history.go(0);
  } else {
    location.replace(url);
  }
}
```

# 解决offsetX兼容性问题

```
// 针对火狐不支持offsetX/Y
function getOffset(e) {
  var target = e.target, // 当前触发的目标对象
    eventCoord,
    pageCoord,
    offsetCoord;

  // 计算当前触发元素到文档的距离
  pageCoord = getPageCoord(target);

  // 计算光标到文档的距离
  eventCoord = {
    X: window.pageXOffset + e.clientX,
    Y: window.pageYOffset + e.clientY
  };

  // 相减获取光标到第一个定位的父元素的坐标
  offsetCoord = {
    X: eventCoord.X - pageCoord.X,
    Y: eventCoord.Y - pageCoord.Y
  };
  return offsetCoord;
}

function getPageCoord(element) {
  var coord = { X: 0, Y: 0 };
  // 计算从当前触发元素到根节点为止，
  // 各级 offsetParent 元素的 offsetLeft 或 offsetTop 值之和
  while (element) {
    coord.X += element.offsetLeft;
    coord.Y += element.offsetTop;
    element = element.offsetParent;
  }
  return coord;
}
```

# 打开一个窗体通用方法

```
function openWindow(url, windowName, width, height) {
  var x = parseInt(screen.width / 2.0) - width / 2.0;
  var y = parseInt(screen.height / 2.0) - height / 2.0;
  var isMSIE = navigator.appName == "Microsoft Internet Explorer";
  if (isMSIE) {
    var p = "resizable=1,location=no,scrollbars=no,width=";
    p = p + width;
    p = p + ",height=";
    p = p + height;
    p = p + ",left=";
    p = p + x;
    p = p + ",top=";
    p = p + y;
    retval = window.open(url, windowName, p);
  } else {
    var win = window.open(
      url,
      "ZyiisPopup",
      "top=" +
        y +
        ",left=" +
        x +
        ",scrollbars=" +
        scrollbars +
        ",dialog=yes,modal=yes,width=" +
        width +
        ",height=" +
        height +
        ",resizable=no"
    );
    eval("try { win.resizeTo(width, height); } catch(e) { }");
    win.focus();
  }
}
```

# 将键值对拼接成URL带参数

```
export default const fnParams2Url = obj=> {
      let aUrl = []
      let fnAdd = function(key, value) {
        return key + '=' + value
      }
      for (var k in obj) {
        aUrl.push(fnAdd(k, obj[k]))
      }
      return encodeURIComponent(aUrl.join('&'))
 }
```

# 去掉url前缀

```
function removeUrlPrefix(a) {
  a = a
    .replace(/：/g, ":")
    .replace(/．/g, ".")
    .replace(/／/g, "/");
  while (
    trim(a)
      .toLowerCase()
      .indexOf("http://") == 0
  ) {
    a = trim(a.replace(/http:\/\//i, ""));
  }
  return a;
}
```

# 替换全部

```
String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
};
```

# resize的操作

```
(function() {
  var fn = function() {
    var w = document.documentElement
        ? document.documentElement.clientWidth
        : document.body.clientWidth,
      r = 1255,
      b = Element.extend(document.body),
      classname = b.className;
    if (w < r) {
      //当窗体的宽度小于1255的时候执行相应的操作
    } else {
      //当窗体的宽度大于1255的时候执行相应的操作
    }
  };
  if (window.addEventListener) {
    window.addEventListener("resize", function() {
      fn();
    });
  } else if (window.attachEvent) {
    window.attachEvent("onresize", function() {
      fn();
    });
  }
  fn();
})();
```

# 滚动到顶部

```
// 使用document.documentElement.scrollTop 或 document.body.scrollTop 获取到顶部的距离，从顶部
// 滚动一小部分距离。使用window.requestAnimationFrame()来滚动。
// @example
// scrollToTop();
function scrollToTop() {
  var c = document.documentElement.scrollTop || document.body.scrollTop;

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}
```

# 设置cookie值

```
function setCookie(name, value, Hours) {
  var d = new Date();
  var offset = 8;
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  var nd = utc + 3600000 * offset;
  var exp = new Date(nd);
  exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
  document.cookie =
    name +
    "=" +
    escape(value) +
    ";path=/;expires=" +
    exp.toGMTString() +
    ";domain=360doc.com;";
}
```

# 设为首页

```
function setHomepage() {
  if (document.all) {
    document.body.style.behavior = "url(#default#homepage)";
    document.body.setHomePage("http://w3cboy.com");
  } else if (window.sidebar) {
    if (window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege(
          "UniversalXPConnect"
        );
      } catch (e) {
        alert(
          "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true"
        );
      }
    }
    var prefs = Components.classes[
      "@mozilla.org/preferences-service;1"
    ].getService(Components.interfaces.nsIPrefBranch);
    prefs.setCharPref("browser.startup.homepage", "http://w3cboy.com");
  }
}
```

# 按字母排序，对每行进行数组排序

```
function setSort() {
  var text = K1.value
    .split(/[\r\n]/)
    .sort()
    .join("\r\n"); //顺序
  var test = K1.value
    .split(/[\r\n]/)
    .sort()
    .reverse()
    .join("\r\n"); //反序
  K1.value = K1.value != text ? text : test;
}
```

# 延时执行

```
// 比如 sleep(1000) 意味着等待1000毫秒，还可从 Promise、Generator、Async/Await 等角度实现。
// Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};

sleep(1000).then(() => {
  console.log(1);
});


// Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve, reject) {
    setTimeout(resolve, time);
  });
}

sleepGenerator(1000)
  .next()
  .value.then(() => {
    console.log(1);
  });

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}

output();

function sleep(callback, time) {
  if (typeof callback === "function") {
    setTimeout(callback, time);
  }
}

function output() {
  console.log(1);
}

sleep(output, 1000);
```

# 判断是否以某个字符串开头

```
String.prototype.startWith = function(s) {
  return this.indexOf(s) == 0;
};
```

# 清除脚本内容

```
function stripscript(s) {
  return s.replace(/<script.*?>.*?<\/script>/gi, "");
}
```

# 时间个性化输出功能

```
/*
1、< 60s, 显示为“刚刚”
2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
*/
function timeFormat(time) {
  var date = new Date(time),
    curDate = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 10,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    curYear = curDate.getFullYear(),
    curHour = curDate.getHours(),
    timeStr;

  if (year < curYear) {
    timeStr = year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
  } else {
    var pastTime = curDate - date,
      pastH = pastTime / 3600000;

    if (pastH > curHour) {
      timeStr = month + "月" + day + "日 " + hour + ":" + minute;
    } else if (pastH >= 1) {
      timeStr = "今天 " + hour + ":" + minute + "分";
    } else {
      var pastM = curDate.getMinutes() - minute;
      if (pastM > 1) {
        timeStr = pastM + "分钟前";
      } else {
        timeStr = "刚刚";
      }
    }
  }
  return timeStr;
}
```

# 全角转换为半角函数

```
function toCDB(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}
```

# 半角转换为全角函数

```
function toDBC(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(str.charCodeAt(i) + 65248);
    } else if (code == 32) {
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}
```

# 金额大写转换函数

```
function transform(tranvalue) {
  try {
    var i = 1;
    var dw2 = new Array("", "万", "亿"); //大单位
    var dw1 = new Array("拾", "佰", "仟"); //小单位
    var dw = new Array(
      "零",
      "壹",
      "贰",
      "叁",
      "肆",
      "伍",
      "陆",
      "柒",
      "捌",
      "玖"
    ); 
    //整数部分用
    //以下是小写转换成大写显示在合计大写的文本框中
    //分离整数与小数
    var source = splits(tranvalue);
    var num = source[0];
    var dig = source[1];
    //转换整数部分
    var k1 = 0; //计小单位
    var k2 = 0; //计大单位
    var sum = 0;
    var str = "";
    var len = source[0].length; //整数的长度
    for (i = 1; i <= len; i++) {
      var n = source[0].charAt(len - i); //取得某个位数上的数字
      var bn = 0;
      if (len - i - 1 >= 0) {
        bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
      }
      sum = sum + Number(n);
      if (sum != 0) {
        str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
        if (n == "0") sum = 0;
      }
      if (len - i - 1 >= 0) {
        //在数字范围内
        if (k1 != 3) {
          //加小单位
          if (bn != 0) {
            str = dw1[k1].concat(str);
          }
          k1++;
        } else {
          //不加小单位，加大单位
          k1 = 0;
          var temp = str.charAt(0);
          if (temp == "万" || temp == "亿")
            //若大单位前没有数字则舍去大单位
            str = str.substr(1, str.length - 1);
          str = dw2[k2].concat(str);
          sum = 0;
        }
      }
      if (k1 == 3) {
        //小单位到千则大单位进一
        k2++;
      }
    }
    //转换小数部分
    var strdig = "";
    if (dig != "") {
      var n = dig.charAt(0);
      if (n != 0) {
        strdig += dw[Number(n)] + "角"; //加数字
      }
      var n = dig.charAt(1);
      if (n != 0) {
        strdig += dw[Number(n)] + "分"; //加数字
      }
    }
    str += "元" + strdig;
  } catch (e) {
    return "0元";
  }
  return str;
}
//拆分整数与小数
function splits(tranvalue) {
  var value = new Array("", "");
  temp = tranvalue.split(".");
  for (var i = 0; i < temp.length; i++) {
    value = temp;
  }
  return value;
}
```

# 清除空格

```
String.prototype.trim = function() {
  var reExtraSpace = /^\s*(.*?)\s+$/;
  return this.replace(reExtraSpace, "$1");
};

// 清除左空格
function ltrim(s) {
  return s.replace(/^(\s*|　*)/, "");
}

// 清除右空格
function rtrim(s) {
  return s.replace(/(\s*|　*)$/, "");
}
```

# 随机数时间戳

```
function uniqueId() {
  var a = Math.random,
    b = parseInt;
  return (
    Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a())
  );
}
```

# 实现utf8解码

```
function utf8_decode(str_data) {
  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0;
  str_data += "";
  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 < 128) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 > 191 && c1 < 224) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(
        ((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
      );
      i += 3;
    }
  }
  return tmp_arr.join("");
}
```

以下是[Puxiao](https://github.com/Puxiao/input-value)投稿推荐的几个函数，用作常见的输入值校验和替换操作，主要针对中国大陆地区的校验规则：

# 校验是否为一个数字，以及该数字小数点位数是否与参数floats一致

校验规则：

*  若参数floats有值，则校验该数字小数点后的位数。
*  若参数floats没有值，则仅仅校验是否为数字。

```
function isNum(value,floats=null){
    let regexp = new RegExp(`^[1-9][0-9]*.[0-9]{${floats}}$|^0.[0-9]{${floats}}$`);
    return typeof value === 'number' && floats?regexp.test(String(value)):true;
}
```

```
function anysicIntLength(minLength,maxLength){
    let result_str = '';
    if(minLength){
        switch(maxLength){
            case undefined:
                result_str = result_str.concat(`{${minLength-1}}`);
                break;
            case null:
                result_str = result_str.concat(`{${minLength-1},}`);
                break;
            default:
                result_str = result_str.concat(`{${minLength-1},${maxLength-1}}`);
        }
    }else{
        result_str = result_str.concat('*');
    }

    return result_str;
}
```

# 校验是否为非零的正整数

```
function isInt(value,minLength=null,maxLength=undefined){
    if(!isNum(value)) return false;

    let regexp = new RegExp(`^-?[1-9][0-9]${anysicIntLength(minLength,maxLength)}$`);
    return regexp.test(value.toString());
}
```

# 校验是否为非零的正整数

```
function isPInt(value,minLength=null,maxLength=undefined) {
    if(!isNum(value)) return false;

    let regexp = new RegExp(`^[1-9][0-9]${anysicIntLength(minLength,maxLength)}$`);
    return regexp.test(value.toString());
}
```

# 校验是否为非零的负整数

```
function isNInt(value,minLength=null,maxLength=undefined){
    if(!isNum(value)) return false;
    let regexp = new RegExp(`^-[1-9][0-9]${anysicIntLength(minLength,maxLength)}$`);
    return regexp.test(value.toString());
}
```

# 校验整数是否在取值范围内

校验规则：

*  minInt为在取值范围中最小的整数
*  maxInt为在取值范围中最大的整数

```
function checkIntRange(value,minInt,maxInt=9007199254740991){
    return Boolean(isInt(value) && (Boolean(minInt!=undefined && minInt!=null)?value>=minInt:true) && (value<=maxInt));
}
```

# 校验是否为中国大陆手机号

```
function isTel(value) {
    return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}
```

# 校验是否为中国大陆传真或固定电话号码

```
function isFax(str) {
    return /^([0-9]{3,4})?[0-9]{7,8}$|^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str);
}
```

# 校验是否为邮箱地址

```
function isEmail(str) {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str);
}
```

# 校验是否为QQ号码

校验规则：

*  非0开头的5位-13位整数

```
function isQQ(value) {
    return /^[1-9][0-9]{4,12}$/.test(value.toString());
}
```

# 校验是否为网址

校验规则：

*  以[https://]()、http://、ftp://、rtsp://、mms://开头、或者没有这些开头
*  可以没有www开头(或其他二级域名)，仅域名
*  网页地址中允许出现/%*?@&等其他允许的符号

```
function isURL(str) {
    return /^(https:\/\/|http:\/\/|ftp:\/\/|rtsp:\/\/|mms:\/\/)?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
}
```

# 校验是否为不含端口号的IP地址

校验规则：

*  IP格式为xxx.xxx.xxx.xxx，每一项数字取值范围为0-255
*  除0以外其他数字不能以0开头，比如02

```
function isIP(str) {
    return /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/.test(str);
}
```

# 校验是否为IPv6地址

校验规则：

*  支持IPv6正常格式
*  支持IPv6压缩格式

```
function isIPv6(str){
    return Boolean(str.match(/:/g)?str.match(/:/g).length<=7:false && /::/.test(str)?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str):/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}
```

# 校验是否为中国大陆第二代居民身份证

校验规则：

*  共18位，最后一位可为X(大小写均可)
*  不能以0开头
*  出生年月日会进行校验：年份只能为18/19/2*开头，月份只能为01-12，日只能为01-31

```
function isIDCard(str){
    return /^[1-9][0-9]{5}(18|19|(2[0-9]))[0-9]{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)[0-9]{3}[0-9Xx]$/.test(str);
}
```

# 校验是否为中国大陆邮政编码

参数value为数字或字符串

校验规则：

*  共6位，且不能以0开头

```
function isPostCode(value){
    return /^[1-9][0-9]{5}$/.test(value.toString());
}
```

# 校验两个参数是否完全相同，包括类型

校验规则：

*  值相同，数据类型也相同

```
function same(firstValue,secondValue){
    return firstValue===secondValue;
}
```

# 校验字符的长度是否在规定的范围内

校验规则：

*  minInt为在取值范围中最小的长度
*  maxInt为在取值范围中最大的长度

```
function lengthRange(str,minLength,maxLength=9007199254740991) {
    return Boolean(str.length >= minLength && str.length <= maxLength);
}
```

# 校验字符是否以字母开头

校验规则：

*  必须以字母开头
*  开头的字母不区分大小写

```
function letterBegin(str){
    return /^[A-z]/.test(str);
}
```

# 校验字符是否为纯数字(整数)

校验规则：

*  字符全部为正整数(包含0)
*  可以以0开头

```
function pureNum(str) {
    return /^[0-9]*$/.test(str);
}
```

```
function anysicPunctuation(str){
    if(!str) return null;
    let arr = str.split('').map(item => {
        return item = '\\' + item;
    });
    return arr.join('|');
}
```

```
function getPunctuation(str){
    return anysicPunctuation(str) || '\\~|\\`|\\!|\\@|\\#|\\$|\\%|\\^|\\&|\\*|\\(|\\)|\\-|\\_|\\+|\\=|\\||\\\|\\[|\\]|\\{|\\}|\\;|\\:|\\"|\\\'|\\,|\\<|\\.|\\>|\\/|\\?';
}
```

```
function getExcludePunctuation(str){
    let regexp = new RegExp(`[${anysicPunctuation(str)}]`,'g');
    return getPunctuation(' ~`!@#$%^&*()-_+=\[]{};:"\',<.>/?'.replace(regexp,''));
}
```

# 返回字符串构成种类(字母，数字，标点符号)的数量

LIP缩写的由来：L(letter 字母) + I(uint 数字) + P(punctuation 标点符号)

参数punctuation的说明：

*  punctuation指可接受的标点符号集
*  若需自定义符号集，例如“仅包含中划线和下划线”，将参数设置为"-_"即可
*  若不传值或默认为null，则内部默认标点符号集为除空格外的其他英文标点符号：~`!@#$%^&*()-_+=[]{};:"',

```
function getLIPTypes(str,punctuation=null){
    let p_regexp = new RegExp('['+getPunctuation(punctuation)+']');
    return /[A-z]/.test(str) + /[0-9]/.test(str) + p_regexp.test(str);
}
```

# 校验字符串构成的种类数量是否大于或等于参数num的值。 通常用来校验用户设置的密码复杂程度。

校验规则：

*  参数num为需要构成的种类(字母、数字、标点符号)，该值只能是1-3。
*  默认参数num的值为1，即表示：至少包含字母，数字，标点符号中的1种
*  若参数num的值为2，即表示：至少包含字母，数字，标点符号中的2种
*  若参数num的值为3，即表示：必须同时包含字母，数字，标点符号
*  参数punctuation指可接受的标点符号集，具体设定可参考getLIPTypes()方法中关于标点符号集的解释。

```
function pureLIP(str,num=1,punctuation=null){
    let regexp = new RegExp(`[^A-z0-9|${getPunctuation(punctuation)}]`);
    return Boolean(!regexp.test(str) && getLIPTypes(str,punctuation)>= num);
}
```

# 清除所有空格

```
function clearSpaces(str){
    return str.replace(/[ ]/g,'');
}
```

# 清除所有中文字符(包括中文标点符号)

```
function clearCNChars(str){
    return str.replace(/[\u4e00-\u9fa5]/g,'');
}
```

# 清除所有中文字符及空格

```
function clearCNCharsAndSpaces(str){
    return str.replace(/[\u4e00-\u9fa5 ]/g,'');
}
```

# 除保留标点符号集以外，清除其他所有英文的标点符号(含空格)

全部英文标点符号为： ~`!@#$%^&*()-_+=[]{};:"',

参数excludePunctuation指需要保留的标点符号集，例如若传递的值为'_'，即表示清除_以外的其他所有英文标点符号。

```
function clearPunctuation(str,excludePunctuation=null){
    let regexp = new RegExp(`[${getExcludePunctuation(excludePunctuation)}]`,'g');
    return str.replace(regexp,'');
}
```

# 校验是否包含空格

```
function haveSpace(str) {
    return /[ ]/.test(str);
}
```

# 校验是否包含中文字符(包括中文标点符号)

```
function haveCNChars(str){
    return /[\u4e00-\u9fa5]/.test(str);
}
```
