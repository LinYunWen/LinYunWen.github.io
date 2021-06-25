---
title: gbd
date: 2021-06-25 16:39:47
tags: [note]
---

# GDB

## Introduction
- GDB 的全稱是 GNU Debuger
- 在 gdb 裡，為了方便除錯，它將程式碼以副程式為單位分成一個個的區塊 (frame)。比如說，在上例裡的 main() 會被視為一個 frame，而 Password() 則會被視為另一個 frame

- 在 frame 與 frame 之間，正在執行的區塊就是 frame 0。呼叫該區塊的就是 frame 1；而再上上一層的就叫 frame 2，以此類推。

- 在 gdb 進入另一個 frame 之前，它會將該 frame 的一些變數值之類的儲存至堆疊 (stack) 裡，等到從 frame 回來後再從這些 stack 裡把這些變數值取回來。

<!--more-->
## Install
### Linux
```
$ sudo apt-get update
$ sudo apt-get install gdb
```
### mac
- `brew install gdb`
- Creating a Certificate
    - 
## Usage
- basic
    - 那麼首先,在你 compile 程式的時候, 要加上 -g 的選項.那麼首先,在你 compile 程式的時候, 要加上 -g 的選項.
        > - （可以用-g, -g2, -g3具體請看 man gcc）
    - commands
        - usual
            ```
            (gdb) l		(l = list source code）
            (gdb) r		(r = run)
            (gdb) n		(n = next)
            (gdb) p b	(p = print, 後面可放變數名或是運算式)
            (gdb) c     (c = contiune)
            (gdb) q		(q = quit, 也可以按 ctrl + d)
            (gdb) s (s = step, 連function都會進去一行一行執行)
            ```
        - breakpoint
            ```
            (gdb) b 2	(b = breakpoint, 2 是行數)
            (gdb) disable b 1 (1 是第幾個 breakpoint, 如果沒有加就是 all)
            (gdb) enable b 2
            (gdb) delete b 1
            (gdb) break 38 if a[0] == 0
            ```
        - display
            ```
            (gdb) display a	(在每一次的 next 時, 都顯示變數的 value)
            (gdb) disable display 1 (1 是第幾個 display, 如果沒有加就是 all)
            (gdb) enable display 2
            (gdb) delete display 1
            ```
        - info
            - info break/display/... （可以用斜線分隔)
            ```
            (gdb) info display 
            Num Enb Expression
            1:   y  b	（這裡的 y 就是說, display b 是 enable 的)
            (gdb) info break
            Num Type           Disp Enb Address    What
            1   breakpoint     keep n   0x080483a0 in main at test.c:2
                    breakpoint already hit 1 time
            (gdb) info args：顯示傳給副程式的參數值。
            (gdb) info locals：顯示該副程式內所有區域變數的值。
            (gdb) info reg：顯示暫存器的值。
            (gdb) info all-registers (看所有register的數值)
            ```
        - others
            - kill：中止程式的執行。
            - backtrace (bt)：堆疊追蹤。會顯示出上層所有的 frame 的簡略資訊。
            - whatis：印出變數的型態。例： whatis i，印出變數 i 的型態。
            - frame：顯示正在執行的行數、副程式名稱、及其所傳送的參數等等 frame 資訊。frame 2：看到 #2，也就是上上一層的 frame 的資訊。
            - commands：在遇到中斷點時要自動執行的指令。
            - until(u) [位置] # 一直執行到當前行或指定位置，或是當前函數返回

- [透過GDB自動化除錯](https://jasonblog.github.io/note/gdb/gdbshi_yong_jiao_xue_ff1a_zi_dong_hua_ni_de_debug.html)
    - 有些memory/stack的問題，並非每次都會發生，但發生了又不知道問題在哪
- 如何去 debug 一個已經在 run 的程式
    - 先用 ps aux 找出你要 debug 的程式的 process id.
    ```
    $ gdb -q
    (gdb) attach 1182			截入 process 1182 到 gdb 裡面
    ...
    ...
    (gdb) detach				debug 完畢以後,記得要用 detach 這個命令
    ```

### GDB tui
- gui 版的 gdb
```
$ gdb -tui
or
$ gdbtui
or
(gdb) ctrl + x +a 
```


## Reference
- [Debugging with GDB （入門篇）](http://www.study-area.org/goldencat/debug.htm)
- [GDB實用教學：自動化你的debug](https://jasonblog.github.io/note/gdb/gdbshi_yong_jiao_xue_ff1a_zi_dong_hua_ni_de_debug.html)
- [GDB Installation on Mac OS X](https://www.ics.uci.edu/~pattis/common/handouts/macmingweclipse/allexperimental/mac-gdb-install.html)
- [Setup gdb on macOS in 2020](https://dev.to/jasonelwood/setup-gdb-on-macos-in-2020-489k)
- [GDB 使用教學 | 曾俊宏](https://henrybear327.gitbooks.io/gitbook_tutorial/content/Linux/GDB/index.html)
- [Visual Studio Code （VSCode） 之 C/C++ 除錯配置詳解](https://www.itread01.com/content/1546218741.html)
- [Debug C++ in Visual Studio Code](https://code.visualstudio.com/docs/cpp/cpp-debug)
- [\[轉貼\]GDB 介紹](https://b8807053.pixnet.net/blog/post/336154079-%5b%e8%bd%89%e8%b2%bc%5dgdb-%e4%bb%8b%e7%b4%b9)
- [GDB dashboard](https://github.com/cyrus-and/gdb-dashboard)
- [gdb 除錯技術](https://jasonblog.github.io/note/gdb/187.html)