---
title: Tmux
date: 2020-09-26 21:18:15
tags: note, tmux, book section
---
# Tmux
## Introduction
- 他可以快速且簡單的分割 terminal 的視窗
- 其實基本上他就是開啟一個 server 共同管理所有的 session，並同步輸入、輸出
    - 所以可以在離線後保留狀態
        - 做背景執行
        - 以不同電腦上可以同步的狀況
    - 如果使用 `who` 指令可以看出他的 session 值很特別
## Install
```clike
\# Ubuntu Linux 安裝 tmux
sudo apt install tmux
brew install tmux \# Mac
```

<!--more-->
## Config
```clike
vim ~/.tmux.conf
tmux source-file ~/.tmux.conf
```
> [終端機管理工具：tmux](https://mropengate.blogspot.com/2017/12/tmux.html)

- 設定完之後的結果
    - prefix: `ctrl+a`
    - split pane
        - horizontal: `${prefix}  | ` 
        - vertical: `${prefix} - ` 
    - pane navigation
        - left: `${prefix} h ` 
        - down: `${prefix} j ` 
        - up: `${prefix} k ` 
        - right: `${prefix} l ` 

    - pane resize
        - `${prefix} Left `
        - `${prefix} Down `
        - `${prefix} Up `
        - `${prefix} Right `
    - clear history
        - `ctrl+i`

## Command
* `tmux`      啟動
* `tmux ls`      列出所有 session
* `tmux detach`      背景執行
    * `${prefix} d`
* `tmux attach -t n`     回到第 n 個 session (target)
* `tmux kill-session -t n`     關閉第 n 個 session
* `tmux kill-session -a`     關閉除了自己的所有 session (all)
* Copy/paste the text
    * method 1:
        * copy: select the text with `shift`.
        * paste: `shift` key + `middle-button`
    - method 2:
        - copy:
            - `Ctrl+b, [` Enter edit mode
            - `Ctrl + space` highlight texts
            - `Alt+w` Copies selected text into **tmux clipboard**
        - paste:
            - `Ctrl+b, ]`
    > - copy to system clipboard
    >     - see ref
    - ref:
        - [Copy text from one tmux pane to another (using vim)](https://unix.stackexchange.com/questions/58763/copy-text-from-one-tmux-pane-to-another-using-vim)
        - [Everything you need to know about Tmux copy paste - Ubuntu](https://www.rushiagr.com/blog/2016/06/16/everything-you-need-to-know-about-tmux-copy-pasting-ubuntu/)


 
## Session
* `${prefix} d`     將目前的 session 放到背景執行 (detach)
* `${prefix} s`     以視覺化選單切換 session（select)
* `${prefix} L`     切換至上一個使用過的 session
* `${prefix} (`     切換至上一個 session
* `${prefix} )`     切換至下一個 session
* `${prefix} $`     重新命名目前的 session。
* `${prefix} [`     進入複製模式
* `${prefix} :`     進入命令模式
* `${prefix} ?`     查詢快捷鍵

## Window
* `${prefix} c`     開啟新 window（create）
* `${prefix} &`     關閉 window
* `${prefix} w`     以視覺化選單切換 window 
* `${prefix} 0~9`   切換至指定 window
* `${prefix} n`     切換到下一個 window (next)
* `${prefix} p`     切換到上一個 window (previous)
* `${prefix} f`     找尋指定 pattern 並跳到該 window (find)
* `${prefix} ,`     命名 window

## Pane
* `${prefix} |`     水平分割出 pane
    * ~~`${prefix} %`     水平分割出 pane~~
* `${prefix} -`     垂直分割出 pane
    * ~~`${prefix} "`     垂直分割出 pane~~
* `${prefix} !`     將目前的 pane 獨立生成一個 window
* `${prefix} 方向鍵`     pane 大小調整
* `${prefix} o`     以輪流方式輪流切換 pane (order)
* `${prefix} h,j,k,l` (vim 方向鍵)     切換游標所在的 pane
    * ~~`${prefix} 方向鍵`   切換游標所在的 pane~~ 
* `${prefix} space`     重新佈局分割視窗，內建多種佈局。 (沒試過)
* `${prefix} x`     關閉目前 pane
* `${prefix} q`     顯示 pane 編號
* `${prefix} {`     交換 pane 位置（向前）
* `${prefix} }`     交換 pane 位置（向後）


## Reference
- [終端機管理工具：tmux](https://mropengate.blogspot.com/2017/12/tmux.html)
- [Linux tmux 終端機管理工具使用教學](https://blog.gtwang.org/linux/linux-tmux-terminal-multiplexer-tutorial/)
- [tmux 快速入門筆記](https://andyyou.github.io/2017/11/27/tmux-notes/)
