---
title: Nmap
date: 2021-08-26 21:11:00
tags: [note, nmap, net]
---

# NMAP（Network Mapper）
- Nmap 是一個開放原始碼的網路掃描與探測工具，可以讓網路管理者掃描整個子網域或主機的連接埠等

## install
- sudo apt-get install nmap
<!--more-->
## usage
### 基本主機掃描
- Nmap 最基本的用法就是掃描主機是否有開機，並且開啟哪些連接埠：
```clike
nmap www.hinet.net
# or
nmap 202.39.253.11
```
- multiple
```clike
nmap www.hinet.net tw.yahoo.com www.google.com.tw
# or
nmap 192.168.0.*
# or
nmap 192.168.0.0/24
# or
nmap 192.168.0.123,124,125
# or
nmap 192.168.0.123-140
```
### 指定掃描的連接埠
- 掃描連接埠 `80`：
```clike
nmap -p 80 192.168.1.1
```
- 指定 TCP 連接埠 `80`：
```clike
nmap -p T:80 192.168.1.1
```
- 指定 UDP 連接埠 `53`：
```clike
nmap -p U:53 192.168.1.1
```
- 掃描兩個連接埠：
```clike
nmap -p 80,443 192.168.1.1
```
- 指定連接埠範圍：
```clike
nmap -p 80-200 192.168.1.1
```

## **Nmap data file directory search order**
1.  If the `--datadir` option was specified, check the directory given as its argument.
2.  If the `NMAPDIR` environmental variable is set, check that directory.
3.  If Nmap is not running on Windows, search in `~/.nmap` of the user running Nmap. It tries the real user ID's home directory, and then the effective UID's if they differ.
4.  Check the directory in which the Nmap binary resides. On non-Windows platforms, additionally check the same directory with `../share/nmap` appended.
5.  Check the compiled-in `NMAPDATADIR` directory. That value is defined to `c:\nmap` on Windows, and ``_`<$prefix>`_/share/nmap`` on Unix. _`<$prefix>`_ is `/usr/local` for the default source build and `/usr` for the Linux RPMs. The _`<$prefix>`_ can be changed by giving **./configure** the `--prefix` option when compiling the source.


## Reference
- [Nmap 網路診斷工具基本使用技巧與教學 - G. T. Wang](https://blog.gtwang.org/linux/nmap-command-examples-tutorials/)
- [Using Customized Data Files | Nmap Network Scanning](https://nmap.org/book/data-files-replacing-data-files.html)