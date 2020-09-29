---
title: grep
date: 2020-09-29 23:42:15
tags: note, grep, tip, book section
---


# grep
> - `grep` 這個指令名稱其實是來自於正規表示法的 `g/RE/p`，其意義是代表以正規表示法全域搜尋並列印出來（globally search for RE and print it）

## 基本使用
>
> ```
> // temp.txt
> It is a great day, and IS sunny day
> he want to say hello world for each one
> there are many works to do
> let's keep moving forward
> ```
- 用法
```c
grep key_word file1 file2 ...
```
- e.g.
    ```c
    $ grep "hello world" ~/temp.txt
    i want to say hello world for each one

    $ grep "hello world" ~/*.txt
                           * 
    /Users/linyunwen/temp.txt:i want to say hello world for each one
    ```

    <!--more-->
## 參數引用
- options
    - -a : 把binary 檔案用 text 檔案的方式搜尋資料
    - -c : 計算找到 '搜尋字串' 的次數(count)
        ```
        grep "he" ~/temp.txt -c
        2
        ```
    - -i : 忽略大小寫的不同 (case-insensitive search)
        ```
        $ grep "is" ~/temp.txt -i
        It is a great day, and IS sunny day
        $ grep "is" ~/temp.txt
        It is a great day, and IS sunny day
        ```
    - -n : 輸出行號,在每行的前面加上行號
        ```
        $ grep "hello world" ~/temp.txt -n
        2:he want to say **hello world** for each one
        ```
    - -v : 反向搜索，意指去除匹配到的結果 (--invert-match)
        ```
        $ grep -v "hello world" ~/temp.txt
        It is a great day, and IS sunny day
        there are many works to do
        let's keep moving forward
        ```
    - -V : 大寫的V,顯示出來grep的版本 (version)
        ```
        $ grep -V
        grep (BSD grep) 2.5.1-FreeBSD
        ```
    - -r : recursive search
        ```
        $ grep -r "hello word" ~/Downloads/
        
        // 可以使用 -r 搭配 --include 指定檔案類型：
        $ grep -r --include=".html" "hello word" ~/Downloads/
        ```
    - -A [n] : 多顯示後 n 行 (after)
        ```
        $ grep -A 2 "hello world" ~/temp.txt
        he want to say hello world for each one
        there are many works to do
        let's keep moving forward
        ```
    - -B [n] : 多顯示前 n 行 (before)
        ```
        $ grep -B 1 "hello world" ~/temp.txt
        It is a great day, and IS sunny day
        he want to say hello world for each one
        ```
    - -C [n] : 多顯示前後各 n 行 (content)
        ```    
        $ grep -C 1 "hello world" ~/temp.txt
        It is a great day, and IS sunny day
        he want to say hello world for each one
        there are many works to do
        ```
    - -w : whole word
        ```
        $ grep  "he" ~/temp.txt
        he want to say hello world for each one
        there are many works to do
        $ grep -w "he" ~/temp.txt
        he want to say hello world for each one
        ```

- 亦可搭配 pipe 處理資料流
    - e.g.
        ```c
        # 篩選含有 network 關鍵字的檔案名稱
        ls /etc/ | grep network
        ```

- 顏色標示
    - grep 可以使用顏色標示的方式，將成功匹配的部分文字標示出來，方便使用者閱讀
    - 顏色標示功能可以透過
        - `--color=never`、`--color=always`、`--color=auto` 
        ```
        export GREP\_OPTIONS='--color=auto' GREP\_COLOR='100;8'
        ```


### reference
- [Linux 匹配文字 grep 指令用法教學與範例](https://blog.gtwang.org/linux/linux-grep-command-tutorial-examples/)
- [[轉][Linux] grep 的用法](https://blog.xuite.net/dizzy03/murmur/211200293-%5B%E8%BD%89%5D%5BLinux%5D+grep+%E7%9A%84%E7%94%A8%E6%B3%95)
- [grep命令](https://man.linuxde.net/grep)
- [15 Practical Grep Command Examples In Linux / UNIX](https://www.thegeekstuff.com/2009/03/15-practical-unix-grep-command-examples/)
- [Grep Command In Unix With Simple Examples](https://www.softwaretestinghelp.com/grep-command-in-unix/)