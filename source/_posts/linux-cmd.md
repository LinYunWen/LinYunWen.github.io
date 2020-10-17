---
title: Linux 常用指令
date: 2020-10-01 21:42:41
tags: [note, linux-cmd, command]
---

# Linux 常用指令

## File System
- `ls`
    - 列出資料 (list)
    - 可以配合 `-a`，來顯示詳細資訊及隱藏資料 (all)
    - 而在 fish shell 上，簡化 `ls -l` 為 `ll` 指令
    <!--more-->
    
    ```c
    $ ls
    Applications/              Katalon Studio/            Pictures/                  ncku-team/                 temp.txt
    Desktop/                   Library/                   Postman/                   repos/
    Documents/                 Movies/                    Public/                    sideex/
    Downloads/                 Music/                     github-recovery-codes.txt  system/

    $ ls -a
    ./                         .conda/                    .oracle_jre_usage/         Documents/                 github-recovery-codes.txt
    .CFUserTextEncoding        .cups/                     .ssh/                      Katalon Studio/            repos/
    .DS_Store                  .gitconfig                 .viminfo                   Library/                   sideex/
    ...
    
    $ ls *.txt
    temp.txt
    
    // access permissions, # of hard link, ower, user group, size, date and time, name
    $ ls -l
    total 16
    drwx------@  4 linyunwen  staff   128B  8 27 16:36 Applications/
    drwx------@  5 linyunwen  staff   160B  8 27 20:00 Desktop/
    drwx------@ 10 linyunwen  staff   320B  9  5 10:29 Documents/
    drwx------@ 26 linyunwen  staff   832B 10  1 20:52 Downloads/
    drwx------@ 75 linyunwen  staff   2.3K  9 22 11:52 Library/
    drwx------+  8 linyunwen  staff   256B  9  1 23:44 Movies/
    drwx------+  4 linyunwen  staff   128B  8 30 22:41 Music/
    drwx------+  5 linyunwen  staff   160B  8 31 11:08 Pictures/
    drwxr-xr-x+  4 linyunwen  staff   128B  8 27 16:30 Public/
    drwxr-xr-x@ 32 linyunwen  staff   1.0K  9  3 13:20 system/
    -rw-r--r--@  1 linyunwen  staff   129B  9 29 23:20 temp.txt
    ```
- `pwd`
    - 輸出出目前工作目錄 (print work directory)
    > - cwd: current work directory
- cd
    - 進入資料夾 (change directory)
    ```c
    $ cd ${directory_name}
    // 進入根目錄
    $ cd /
    // 進入家目錄
    $ cd ~
    // 往上一層目錄
    $ cd ..
    ```
    
- mkdir
    - 建新資料夾 (make directory)
- cp
    - 複製檔案 (copy)
    ```c
    $ cp ${src} ${dist}
    ```
- mv
    - 移動檔案或是重新命名檔案 (move files)
    > - 若相同位置、不同檔名，則可以變成 rename
    ```c
    $ mv ${src} ${dist}
    ```
- rm
    - 刪除檔案 (remove file)
    ```c
    $ rm ${file_name}
    // 強制刪除 (force)
    $ rm -f
    // 刪除資料夾 (recursive)
    $ rm -r
    ```
- sl
    - 建立軟連結
- touch
    - 用來更新已存在文件的 timestamp 時間戳記
    - 新增空白檔案
- cat
    - 將文件印出在終端機上
- tail
    - 顯示檔案最後幾行內容
- more
    - 將檔案一頁頁印在終端機上
- file
    - 檢查檔案類型
- chmod
    - 改變檔案權限模式 (change mode)
    > - 查看另外一篇 [Linux File Access Permission](https://hackmd.io/@LinYunWen/SyT4OIQ8v)

## System management
- sudo
    - 使用最高權限（superuser）執行指令
    - 會要求輸入自己密碼
- su
    - 登入最高管理者帳戶
    - 取得 root 權限
- kill
    - 根據 Process ID 指定要終止程式
    ```c
    $ kill ${pid}
    
    // kill processes
    $ kill ${pid}, ${pid}...
    
    // kill immediately
    $ kill -9 ${pid}
    ```

## Network
- ping
    - 網路檢測工具
    - 透過發送 `ICMP ECHO_REQUEST` 的封包，檢查自己與特定設備之間的網路是否暢通，速度是否正常
    - 輸入 hostname 或是 IP
    ```c
    $ ping linyunwen.github.io
    PING linyunwen.github.io (185.199.111.153): 56 data bytes
    64 bytes from 185.199.111.153: icmp_seq=0 ttl=51 time=51.394 ms
    64 bytes from 185.199.111.153: icmp_seq=1 ttl=51 time=51.378 ms
    64 bytes from 185.199.111.153: icmp_seq=2 ttl=51 time=52.142 ms
    ...
    ```

- traceroutes
    - 檢查從你的電腦到網路另一端的主機是走的什麼路徑
    ```c
    $ traceroute linyunwen.github.io
    traceroute: Warning: linyunwen.github.io has multiple addresses; using 185.199.111.153
    traceroute to linyunwen.github.io (185.199.111.153), 64 hops max, 52 byte packets
     1  192.168.1.1 (192.168.1.1)  17.736 ms  0.989 ms  0.928 ms
     2  192.168.0.1 (192.168.0.1)  2.950 ms  1.545 ms  1.234 ms
     3  h254.s98.ts.hinet.net (168.95.98.254)  12.588 ms  12.550 ms  11.930 ms
     4  tne1-3302.hinet.net (168.95.55.38)  18.027 ms  13.021 ms  15.191 ms
     5  tne1-3021.hinet.net (220.128.26.102)  17.115 ms  17.483 ms  16.929 ms
     6  pcpd-3211.hinet.net (220.128.14.70)  16.963 ms  19.865 ms  16.796 ms
     7  220-128-26-78.hinet-ip.hinet.net (220.128.26.78)  17.225 ms
        220-128-26-106.hinet-ip.hinet.net (220.128.26.106)  17.577 ms
        220-128-26-78.hinet-ip.hinet.net (220.128.26.78)  16.448 ms
     8  r4103-s2.tp.hinet.net (220.128.1.41)  18.387 ms  17.184 ms  18.287 ms
     9  r4003-s2.tp.hinet.net (220.128.6.225)  21.350 ms
        r4003-s2.tp.hinet.net (220.128.6.237)  18.326 ms  19.232 ms
    10  63-218-147-145.static.pccwglobal.net (63.218.147.145)  48.311 ms  48.148 ms  61.407 ms
    11  hundredge0-0-0-9.clbr01.tok02.pccwbtn.net (63.218.250.193)  57.048 ms
        hundredge0-0-0-0.clbr01.tok02.pccwbtn.net (63.218.250.173)  49.587 ms
        hundredge0-0-0-9.clbr01.tok02.pccwbtn.net (63.218.250.193)  50.911 ms
    ```
- nslookup
    - 查詢 DNS 回應是否正常
    ```c
    $ nslookup linyunwen.github.io
    Server:		192.168.1.1
    Address:	192.168.1.1#53

    Non-authoritative answer:
    Name:	linyunwen.github.io
    Address: 185.199.111.153
    Name:	linyunwen.github.io
    Address: 185.199.110.153
    Name:	linyunwen.github.io
    Address: 185.199.109.153
    Name:	linyunwen.github.io
    Address: 185.199.108.153
    ```
    
## Others
- man
    - 查詢 Linux 手冊（manual page）
    ```c
    $ man ${command or function}
    ```
- find
    - 查詢檔案
- grep
    - 字串搜尋工具 (globally search for RE and print it)
- crontab
    - 例行性工作排程
        - 編輯 crontab
        ```c
         $ crontab -e
        ```

## Reference
- [Linux Command 命令列指令與基本操作入門教學](https://blog.techbridge.cc/2017/12/23/linux-commnd-line-tutorial/)