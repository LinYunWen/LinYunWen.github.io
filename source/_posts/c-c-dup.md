---
title: c-c++-dup
date: 2021-09-28 22:45:12
tags: [note, c/c++, dup, book section]
---

# C/C++ dup
- dup() 和 dup2() 是兩個非常有用的系統調用，都是用來複製一個文件的描述符，使新的文件描述符也標識舊的文件描述符所標識的文件。  
- 鑰匙相當於文件描述符，鎖相當於文件，本來一個鑰匙開一把鎖，相當於，一個文件描述符對應一個文件，現在，我們去配鑰匙，通過舊的鑰匙複製了一把新的鑰匙，這樣的話，舊的鑰匙和新的鑰匙都能開啟這把鎖
> #include <unistd.h>
<!--more-->
## dup
- `int dup(int oldfd);`
- 通過 oldfd 複製出一個新的文件描述符，新的文件描述符是調用進程文件描述符表中最小可用的文件描述符
- 最終 oldfd 和新的文件描述符都指向同一個文件。
> - 新文件描述符編號保證是最小編號，在調用過程中未使用的文件描述符。
## dup2
- `int dup2(int oldfd, int newfd);`
- 通過 oldfd 複製出一個新的文件描述符 newfd
    - 如果成功，newfd 和函數返回值是同一個返回值，最終 oldfd 和新的文件描述符 newfd 都指向同一個文件。
- newfd: 新的文件描述符，這個描述符可以人為指定一個合法數字（0-1023
    - 如果指定的數子已經被占用 (和某個文件有關聯) ，此函數會自動關閉 close() 斷開這個數字和某個文件的關聯，再來使用這個合法數字。
## dup3
- `int dup3(int oldfd, int newfd, int flags);`
- dup3() is the same as dup2(), except that:
    - The caller can force the close-on-exec flag to be set for the new file descriptor by specifying O_CLOEXEC in flags.
    - See the description of the same flag in open(2) for reasons why this may be useful.
   *  If oldfd equals newfd, then dup3() fails with the error EINVAL.

## return
- On success, these system calls return the new file descriptor.
- On error, -1 is returned, and _[errno](https://man7.org/linux/man-pages/man3/errno.3.html)_ is set to indicate the error.

## reference
- [C 語言中的 dup2 函式 | D棧 - Delft Stack](https://www.delftstack.com/zh-tw/howto/c/dup2-in-c/)
- [dup(2) - Linux manual page](https://man7.org/linux/man-pages/man2/dup.2.html)
- [Linux系統編程——文件描述符的複製：dup()和dup2() - 每日頭條](https://kknews.cc/zh-tw/news/zebbnpa.html)