---
title: time
date: 2020-10-02 16:58:35
tags: [note, time]
---

# Time
> - 雙系統 linux, windows 系統時間差異問題
>     - 因為 windows 認為BIOS時間是本地時間，linux 認為BIOS時間是UTC時間
>     - 將 windows把系統硬體時間當作本地時間(local time)，即操作系統中顯示的時間跟BIOS中顯示的時間是一樣的。
>     ```c
>     $ sudo apt-get install ntpdate
>     // 確認時間已經和網路同步
>     $ sudo ntpdate time.windows.com
>     ```
>     ```c
>     // 將時間更新到硬件上
>     $ sudo hwclock --localtime --systohc
>     ```
>     - 重新進入windows10

<!--more-->

## 格林威治平均時間 (中原標準時間)
- Greenwich Mean Time (GMT)

## 世界協調時間
- Coordinated Universal Time (UTC)
- ![](https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/World_Time_Zones_Map.png/1280px-World_Time_Zones_Map.png)
- 台北 UTS+8

## Others
- CST
    - Central Standard Time
    - 美國中部標準時間
    - UTC -6
- EST
    - Central Standard Time
    - 美國東部標準時間
    - UTC -5
- DST
    - daylight saving time/summer time
    - 日光節約時間
## Reference
- [CST – Central Standard Time / Central Time (Standard Time)](https://www.timeanddate.com/time/zones/cst)
- [EST – Eastern Standard Time / Eastern Time (Standard Time)](https://www.timeanddate.com/time/zones/est)
- [\[雙系統\]同步 Ubuntu 與 Windows時間](https://tdlin00009.pixnet.net/blog/post/310933040-%E5%90%8C%E6%AD%A5-%E9%9B%99%E7%B3%BB%E7%B5%B1-ubuntu-%E8%88%87-windows%E6%99%82%E9%96%93)
- [如何解決 Linux (Ubuntu) 與 Windows 雙系統產生的時間不同步 (時差) 問題？](https://justhodl.blogspot.com/2018/02/linux-ubuntu-windows-utc-time.html)
- [Windows + Ubuntu雙系統時間不一致](https://www.itread01.com/content/1541607620.html)