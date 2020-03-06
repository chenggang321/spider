

<img referrerpolicy="no-referrer" data-src="/img/bVbD9sx" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="稿定设计导出-20200229-235632.png" title="稿定设计导出-20200229-235632.png">

JavaScript 的是没有操作文件的能力，但是 Node 是可以做到的，Node 提供了操作文件系统模块，是 Node 中使用非常重要和高频的模块，是绝对要掌握的一个模块系统。

`fs` 模块提供了非常多的接口，这里主要说一下一些常用的接口。

## 1.常用API快速复习

### 
`fs.stat` 检测是文件还是目录

```
const fs = require('fs')
fs.stat('hello.js', (error,stats)=>{
    if(error) {
        console.log(error)
    } else {
        console.log(stats)
        console.log(`文件：${stats.isFile()}`)
        console.log(`目录：${stats.isDirectory()}`)
    }
})
```

### 
`fs.mkdir` 创建目录

```
const fs = require('fs')
fs.mkdir('logs', error => {
    if(error) {
        console.log(error)
    } else {
        console.log('目录创建成功！')
    }
})
```

### 
`fs.rmdir` 删除目录

```
const fs = require('fs')
fs.rmdir('logs', error => {
    if(error) {
        console.log(error)
    } else {
        console.log('成功删除了目录 logs')
    }
})
```

### 
`fs.writeFile` 创建写入文件

```
const fs = require('fs')
fs.writeFile('logs/hello.log','您好~\n', error => {
    if(error) {
        console.log(error)
    } else {
        console.log('成功写入文件');
    }
})
```

### 
`fs.appendFile` 追加文件

```
const fs = require('fs')
fs.appendFile('logs/hello.log','hello~\n', error => {
    if(error) {
        console.log(error)
    } else {
        console.log('成功写入文件');
    }
})
```

### 
`fs.readFile` 读取文件

```
const fs = require('fs')
fs.readFile('logs/hello.log','utf-8', (error, data) => {
    if(error) {
        console.log(error)
    } else {
        console.log(data);
    }
})
```

### 
`fs.unlink` 删除文件

```
const fs = require('fs')
fs.unlink(`logs/${file}`, error => {
    if(error) {
        console.log(error)
    } else {
        console.log(`成功删除了文件： ${file}`)
    }
})
```

### 
`fs.readdir` 读取目录

```
const fs = require('fs')
fs.readdir('logs', (error, files) => {
    if(error) {
        console.log(error)
    } else {
        console.log(files);
    }
})
```

### 
`fs.rename` 重命名，还可以更改文件的存放路径

```
const fs = require('fs')
fs.rename('js/hello.log', 'js/greeting.log', error => {
    if(error) {
        console.log(error)
    } else {
        console.log('重命名成功')
    }
})
```

## 2.第三方NPM包 mkdirp 的使用

[mkdirp](https://www.npmjs.com/package/mkdirp) 不仅可以创建文件夹，还可以创建多层的文件夹，类似 `mkdir -p` 命令

```
midir -p tmp/foo/bar/baz
```

上述命令也可以在当前目录创建多层几文件夹。

如下代码在当前目录生成多层级文件夹

```
const mkdirp = require('mkdirp')

mkdirp('tmp/foo/bar/baz').then(made => console.log(`创建目录于： ${made}`))

// 创建目录于： /Users/zhangbing/github/CodeTest/Node/fs/tmp
```

结果

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021923476" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

## 3.实战举例

### 实战1

判断服务器上面有没有 upload 目录。如果没有就创建这个目录，如果有的话不做操作

```
const fs = require('fs')

const path = './upload'
fs.stat(path, (err, data) => {
    if(err) {
        // 执行创建目录
        mkdir(path)
        return
    }
    if(data.isDirectory()) {
        console.log('upload目录存在');
    }else{
        // 首先删除文件，再去执行创建目录
        fs.unlink(path, err => {
            if(!err) {
                mkdir(path)
            }
        })
    }
})

function mkdir(dir) {
    fs.mkdir(dir, err => {
        if(err) {
            console.log(err);
            return
        }
    })
}
```

### 实战2

wwwroot 文件夹下面有 images css js 以及 index.html, 找出 wwwroot 目录下面的所有的目录，然后放在一个数组中

使用同步方法方式

```
const fs = require('fs')
const path = './wwwroot'
const dirArr = []

const dirs = fs.readdirSync(path)
dirs.forEach(item => {
    if(fs.statSync(path + '/' + item).isDirectory()) {
        dirArr.push(item)
    }
})
console.log('dirArr', dirArr)
// dirArr [ 'css', 'images', 'js' ]
```

使用 async/await 方式

```
const fs = require('fs')
const path = './wwwroot'
const dirArr = []

function isDir(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (error, stats) => {
            if(error) {
                console.log(error)
                reject(error)
                return
            }
            if(stats.isDirectory()) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

function main(){
    fs.readdir(path, async (error, data) => {
        if(error) {
            console.log(error)
            return
        } else {
            for(let i = 0; i < data.length; i++) {
                if(await isDir(path + '/' + data[i])) {
                    dirArr.push(data[i])
                }
            }
            console.log('dirArr', dirArr)
        }
    })
}

main() // dirArr [ 'css', 'images', 'js' ]
```

## 4.管道流

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。

```
const fs = require("fs")
//创建一个可读流
const readerStream = fs.createReadStream('input.txt')
//创建一个可写流
const writerStream = fs.createWriteStream('output.txt')
//管道读写操作
//读取input.txt文件内容，并将内容写入到output.txt文件中
readerStream.pipe(writerStream)
console.log("程序执行完毕")
```

### 
`fs.createReadStream` 从文件流中读取数据

```
const fs = require('fs')
const fileReadStream = fs.fileReadStream('demo1.js')
let count = 0
let str = ''
fileReadStream.on('data', chunk => {
    console.log(`${++count}接收到：${chunk.length}`)
    str += chunk
})
fileReadStream.on('end', () => {
    console.log('---结束---')
    console.log(count + '，' + star)
})
fileReadStream.on('error', error => {
    console.log(error)
})
```

### 
`fs.createWriteStream` 写入文件

```
const fs = require("fs")
const data ='我是从数据库获取的数据，我要保存起来'
//创建一个可以写入的流，写入到文件output.txt中
const writerStream = fs.createWriteStream('output.txt')
//使用utf8编码写入数据
writerStream.write(data,'UTF8')
//标记文件末尾
writerStream.end()
//处理流事件-->finish事件
writerStream.on('finish', () => {
    /*finish-所有数据已被写入到底层系统时触发。*/
    console.log("写入完成。")
})
writerStream.on('error', err => {
    console.log(err.stack);
})
console.log("程序执行完毕")
```

### 实战：复制图片

在项目根目录有一张图片`2020.png`，把它复制到 `/wwwroot/images` 中

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021923475" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

代码如下

```
const fs = require("fs")

const readStream = fs.createReadStream('./2020.png')
const writeStream = fs.createWriteStream('./wwwroot/images/2021.png')

readStream.pipe(writeStream)
```

需要特别注意的是，`fs.createWriteStream` 要写入的目录一定要带上要复制的文件名，也就是不能写成 `fs.createWriteStream('./wwwroot/images/')` 否则在 macOS 下会报如下错误：

```
Error: EISDIR: illegal operation on a directory, open <directory>
```

---

本文源码：[https://github.com/dunizb/CodeTest/tree/master/Node/fs](https://github.com/dunizb/CodeTest/tree/master/Node/fs)
