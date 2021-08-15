---
title: Core File
date: 2021-08-15 16:54:29
tags: [note, core file, core dump]
---

# Core File
- In most GNU/Linux systems (all of those I personally have used, at least), core dump files generated after an uncaught signal in a process (as a SIGSEGV or SIGQUIT), are generated in the base directory where the program was executed, and named as “core” or “core.PID”.
<!--more-->
- 會產生core檔案，可用gdb來看此檔
- For example:  
    ```clike
    $> cd /home/user  

    $> ulimit -c unlimited  
    $> kill -s SIGSEGV $$
    ```
    - ulimit -c:用來看core dump寫入的容量限制
    - Ubuntu 預設為 ulimit -c 0，表示不產生 core dump
    - This will trigger a segmentation fault in your current shell (you probably guessed it after seeing that the shell session where you executed it was closed), and generate a core file in: `/home/user/core`
- the kernel configuration includes a file named “core_pattern”
    - `/proc/sys/kernel/core_pattern`

## Here is a small list of possible variables
```
%p:       pid
%<NUL>:   '%' is dropped  
%%:       output one '%'  
%u:       uid  
%g:       gid  
%s:       signal number  
%t:       UNIX time of dump  
%h:       hostname  
%e:       executable filename  
%<OTHER>: both are dropped
```
- core pattern 可以是 “|PROGRAM”, 這樣會將 core dump 導到 PROGRAM 的標準輸入, 可以自己寫 PROGRAM 做控制
- 需要特別注意的是, | 和 PROGRAM 之間不可以有空白。

## tools
- gdb
- dbx
- pstack
    - `$ pstack ${core_file} > pstack.out`
- pmstack

## 用gdb看core檔
```clike
gdb <executable> <core-file>
# or
gdb <executable> -c <core-file> or
# or
gdb <executable>
...
(gdb) core <core-file>
```
- 首先先找到當時 core dump 出來的 core 檔案 ( 跟執行的binary 同資料夾 )
```
11781124 11月 27日 17:23 core
```
- 接下來用 gdb 來看這個 core file
```
gdb executefile core
```
- 舉例來說 我有一個叫 Close 的程式執行的時後會發生 core dump，就這樣做
```
gdb Close core
```
> - 要同時放入 `程式的執行檔` 和 `core file`

## trace stack
- process the core file
- check timestamp of the failure
- check the active threads at the time of the failure
- how to review the steps leading up to the failure

## reference
- [Linux Howtos: Tips and Tricks -> setting the core dump name schema](https://www.linuxhowtos.org/Tips%20and%20Tricks/coredump.htm)
- [在 Linux 上允許產生 core dump. man 5 core 上有詳細說明，踩了許多雷才發現文件有寫… | by fcamel | Medium](https://medium.com/@fcamel/%E5%9C%A8-linux-%E4%B8%8A%E5%85%81%E8%A8%B1%E7%94%A2%E7%94%9F-core-dump-7d6d26b05b75)
- [c - Core dumped, but core file is not in the current directory? - Stack Overflow](https://stackoverflow.com/questions/2065912/core-dumped-but-core-file-is-not-in-the-current-directory)
- [Linux - coredump @ 逗點大的雨滴 :: 痞客邦 ::](https://ysliang105.pixnet.net/blog/post/74231757)
- [The Core Pattern (core_pattern), or how to specify filename and path for core dumps | SIGQUIT](https://sigquit.wordpress.com/2009/03/13/the-core-pattern/)
- [How to review core files for troubleshooting - YouTube](https://www.youtube.com/watch?v=23ZKGT4nk9I&t=51s&ab_channel=InformaticaSupport)
- [[c/c++]gdb core dump debugging. 利用 gdb 追蹤 core dump 藉此找出程式炸掉的原因 | by Lion | cubemail88 | Medium](https://medium.com/cubemail88/c-c-gdb-core-dump-debugging-737b83829743)
- [linux - How do I analyze a program's core dump file with GDB when it has command-line parameters? - Stack Overflow](https://stackoverflow.com/questions/8305866/how-do-i-analyze-a-programs-core-dump-file-with-gdb-when-it-has-command-line-pa)