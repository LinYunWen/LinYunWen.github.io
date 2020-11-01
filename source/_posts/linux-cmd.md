---
title: Linux 常用指令
date: 2020-10-01 21:42:41
tags: [note, linux-cmd, command]
---

## File System
- `ls`
    - 列出資料 (list)
    - 可以配合 `-a`，來顯示詳細資訊及隱藏資料 (all)
    - 而在 fish shell 上，簡化 `ls -l` 為 `ll` 指令
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
<!--more-->
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
- less
    - [Linux less命令](https://www.runoob.com/linux/linux-comm-less.html)
- file
    - 檢查檔案類型
- chmod
    - 改變檔案權限模式 (change mode)
    > - 查看另外一篇 [Linux File Access Permission](https://hackmd.io/@LinYunWen/SyT4OIQ8v)
- sort
    - [Linux 的 sort 排序指令教學與常用範例整理](https://blog.gtwang.org/linux/linux-sort-command-tutorial-and-examples/)
- uniq
    - [Linux 的 uniq 指令教學與範例：刪除重複文字行、去除相同的內容](https://blog.gtwang.org/linux/linux-uniq-command-tutorial/)
- cut
    - [Linux 的 cut 擷取部份字元、欄位指令教學與常用範例整理](https://blog.gtwang.org/linux/linux-cut-command-tutorial-and-examples/)
- echo
- fmt (format)
    - [Linux fmt命令](http://www.w3big.com/zh-TW/linux/linux-comm-fmt.html)
- tr (translate)
    - [Linux面試指令---tr指令](https://www.itread01.com/content/1544992767.html)
- nl
    - [一天學一個UNIX指令：nl](http://www.happystreet.com.tw/index.php/system-dynamic-teaching/unix-linux/176-a-day-of-school-a-unix-command-nl)

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
- who
- ps (process status)
    - [
[筆記]Linux指令-ps(process status)](https://david50.pixnet.net/blog/post/45224451-%5B%E7%AD%86%E8%A8%98%5Dlinux%E6%8C%87%E4%BB%A4-ps(process-status))
- top
    - [Unix/Linux TOP 指令使用詳解](https://tigercosmos.xyz/post/2020/04/unix/top-usage/)
    - [[筆記]Linux - top資訊及參數說明](https://david50.pixnet.net/blog/post/45252072-%5B%E7%AD%86%E8%A8%98%5Dlinux---top%E8%B3%87%E8%A8%8A)
    - [Linux 用 ps 與 top 指令找出最耗費 CPU 與記憶體資源的程式](https://blog.gtwang.org/linux/ps-top-find-processes-by-cpu-memory-usage/)
- nmon
    - [效能監看工具nmon介紹1](https://ithelp.ithome.com.tw/articles/10161037)
- iostat
    - [一天學一個UNIX指令：iostat](http://www.happystreet.com.tw/index.php/system-dynamic-teaching/unix-linux/416-a-day-of-school-a-unix-command-iostat)
    - [iostat命令性能监测与优化](https://man.linuxde.net/iostat)
- sar
    - [Linux SAR 指令大全](https://www.twblogs.net/a/5cd38884bd9eee67a77f1005)
- vmstat
    - [【Linux】效能監控指令vmstat](https://www.itread01.com/p/185034.html)
    - [vmstat命令性能监测与优化](https://man.linuxde.net/vmstat)

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
    - [traceroute 指令 — 路由跟蹤工具](https://www.opencli.com/linux/traceroute-command)
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
- curl
    - [Curl 指令基本介紹與常見用法](https://blog.techbridge.cc/2019/02/01/linux-curl-command-tutorial/)
- wget
    - [Linux 使用 wget 指令自動下載網頁檔案教學與範例
](https://blog.gtwang.org/linux/linux-wget-command-download-web-pages-and-files-tutorial-examples/)
- ssh
    - [Linux 的 SSH 安全加密連線指令使用教學、設定檔配置範例](https://blog.gtwang.org/linux/ssh-command-tutorial-and-script-examples/)
- nmap
    - [Nmap 網路診斷工具基本使用技巧與教學](https://blog.gtwang.org/linux/nmap-command-examples-tutorials/)
- tcpdump
    - [linux tcpdump](https://crmne0707.pixnet.net/blog/post/322655604-linux-tcpdump)
- mtr
    - [MTR：Linux 網路診斷工具使用教學](https://blog.gtwang.org/linux/mtr-linux-network-diagnostic-tool/)
- dig
    - [Dig 常用參數 與 DNS 偵錯追蹤](https://blog.longwin.com.tw/2013/03/dig-dns-query-debug-2013/)
- airmon, airodump
    - [kali破解wifi握手包-GPU破解，速度翻番好幾倍](https://kknews.cc/zh-tw/digital/y5kegnn.html)
    - [Aircrack-ng之Airodump-ng命令](https://blog.csdn.net/qq_28208251/article/details/47975161)
- iptables
    - [iptables 指令入門](https://www.opencli.com/linux/iptables-command)
- netstat
    - [使用 Netstat 指令檢測網路的技巧](https://blog.gtwang.org/linux/linux-netstat-command-examples/)

## Kernel Debugging
- strace
    - [strace命令](https://man.linuxde.net/strace)
- dtrace
    - [DTrace](https://www.itread01.com/p/365549.html)
    - [強勁的Linux Trace工具：bpftrace (DTrace 2.0) for Linux 2018](https://www.luoow.com/dc_tw/200778753)
- systemptap
    - [Systemtap學習筆記](https://www.itread01.com/content/1546138291.html)
    - [核心除錯神器SystemTap](https://www.itread01.com/content/1547046370.html)
- uname
    - [uname命令内核与模块管理](https://man.linuxde.net/uname)
    - [linux uname指令介紹](http://code-notes-blog.blogspot.com/2017/09/linux-uname.html)
- df
    - [Linux 檢查硬碟使用量 df 指令教學與指令稿範例](https://blog.gtwang.org/linux/linux-df-command-check-disk-space-usage-tutorial-script-example/)


## Others
- man
    - 查詢 Linux 手冊（manual page）
    ```c
    $ man ${command or function}
    ```
- find
    - 查詢檔案
    - [Unix/Linux 的 find 指令使用教學、技巧與範例整理](https://blog.gtwang.org/linux/unix-linux-find-command-examples/)
- grep
    - 字串搜尋工具 (globally search for RE and print it)
- crontab
    - 例行性工作排程
        - 編輯 crontab
        ```c
         $ crontab -e
        ```
- awk, sed
    - [Linux中 sed 和 awk的用法詳解](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/392291/)
    - [[資工雜筆] awk 好用用法整理](https://noootown.com/awk-useful-usage/)
- history
    - [Linux 指令歷史紀錄（History）的操作教學與範例](https://blog.gtwang.org/linux/mastering-linux-command-line-history/)
## Reference
- [Linux Command 命令列指令與基本操作入門教學](https://blog.techbridge.cc/2017/12/23/linux-commnd-line-tutorial/)