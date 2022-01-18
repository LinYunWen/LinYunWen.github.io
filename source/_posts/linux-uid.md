---
title: Linux uid
date: 2022-01-18 08:55:14
tags: [note, linux, uid, book section]
---

# Linux uid
- RUID, EUID,SUID來表示實際用戶ID，有效用戶ID，設置用戶ID
<!--more-->
## introduction
- RUID, 用於在系統中標識一個用戶是誰，當用戶使用用戶名和密碼成功登錄後一個UNIX系統後就唯一確定了他的RUID.
- EUID, 用於系統決定用戶對系統資源的訪問權限，通常情況下等於RUID。
- SUID，用於對外權限的開放。跟RUID及EUID是用一個用戶綁定不同，它是跟文件而不是跟用戶綁定。



|  | exec (w.o. suid) | exec (w. suid) | setuid (w. root) | setuid (w.o. root) |
| -------- | ---------------- | -------------- | ------ | ------------------ |
| ruid | 不變 | 不變 | 變成 uid | 不變 |
| euid | 不變 | 變成 suid | 變成 uid | 變成 uid |
| suid | 不變 (從 euid 複製過來) | 不變 (從 euid 複製過來) | 變成 uid | 不變 |


## reference
- [Linux內核學習筆記： uid之ruid，euid，suid_Linux內核](http://www.unixlinux.online/unixlinux/gdliunx/linuxnh/201702/38287.html)
- [Linux EUID，SUID，RUID簡單理解 - 台部落](https://www.twblogs.net/a/5b8d75e82b717718833e287a)
- [Linux ruid euid和suid區別](https://www.w3study.wiki/a/202106/174673.html)