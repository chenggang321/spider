

我从来不是个标题党，标题永远这么朴实无华。

微信开发者工具更新到现在，已经很好用了，但是依然很卡。不是说运行慢，而是觉得不够丝滑。我曾经从sublime转战到atom，后来入坑vscode，就再也没转移过阵地了。

vscode的优势，就是插件太全面了。不管你如何不喜欢微软，但不得不承认，vs是用户群超级庞大的一款开发工具，vscode依然如此。用户多了，插件自然就全了，那么今天我们需要用到的核心插件，就是[Run on Save](https://marketplace.visualstudio.com/items?itemNameemeraldwalk.RunOnSave)。

## 思路

思路很简单：vscode保存后触发自动执行某个命令，这个命令运行了一个AppleScript脚本，脚本里告诉目标App也就是开发者工具，该做什么。

## 插件介绍

这款插件可以让你在保存某些特定后缀文件的时候，自动执行一个命令。安装插件以后，在vscode的设置里，选择编辑settings.json文件，将

```
"emeraldwalk.runonsave": {
        "commands": [
            {
                "match": ".wxss",
                "isAsync": true,
                "cmd": "osascript ~/develop/preview.scpt"
            },
            {
                "match": ".wxml",
                "isAsync": true,
                "cmd": "osascript ~/develop/preview.scpt"
            },
            {
                "match": ".js",
                "isAsync": true,
                "cmd": "osascript ~/develop/preview.scpt"
            }
        ]
    }
```

这段代码直接贴进去，isAsync我也没懂啥意思，cmd就是你要执行的命令了，match可以配置你需要的文件后缀名。

**友情提示：在vscode的command palette里，可以快速开关这个插件，方便你做其他项目的时候，禁用插件。**

## AppleScript脚本

这玩意是个非常冷门的神器，如果你是这方面大神，你的Mac肯定已经被你调教的服服贴贴，然而我，可能还包括看帖子的你，都是小白。所以我直接贴教程，最核心的部分参考了[这篇](https://sspai.com/post/43758)，如果你想举一反三，再推荐[另外一篇](https://segmentfault.com/a/1190000011273388?utm_sourcetag-newest)。随便翻翻基本上就够用了，尤其是前者。

AppleScript代码竟然不能直接粘贴，贴图片吧，只有寥寥几行。<img referrerpolicy="no-referrer" data-src="/img/bVbDG5H" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="截屏2020-02-22下午11.50.59.png" title="截屏2020-02-22下午11.50.59.png">

小伙伴们赶快跑起来吧！实测有效（2020年02月22日）！
