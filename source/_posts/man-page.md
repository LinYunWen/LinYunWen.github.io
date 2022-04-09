---
title: man-page
date: 2022-02-19 11:43:17
tags: [note, man page, linux]
---

# Man Page

## introduction
- 手冊頁（英語：Manual pages，縮寫man page）是在Unix或類Unix作業系統線上軟體文件的一種普遍的形式
<!--more-->
## section
> - 每個章節對應不同的類別：
-   1：可執行的程式或是 shell 指令。
-   2：系統呼叫（system calls，Linux 核心所提供的函數）。
-   3：一般函式庫函數。
-   4：特殊檔案（通常位於 `/dev`）。
-   5：檔案格式與協定，如 `/etc/passwd`
-   6：遊戲。
-   7：雜項（巨集等，如 `man(7)`、`groff(7)`）。
-   8：系統管理者指令（通常是管理者 `root` 專用的）。
-   9：Kernel routines（非標準）。

```bash
man 3 printf
```
- e.g.
    - ls(1) 就代表這份文件隸屬於第 1 個章節。

## reference
- [手冊頁 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E6%89%8B%E5%86%8C%E9%A1%B5)
- [善用 man 指令查詢 Linux 線上手冊（Man Page） - G. T. Wang](https://blog.gtwang.org/linux/linux-man-page-command-examples/)
- [為什麼 Ubuntu 手冊頁存儲庫中有不同版本的手冊頁？ - 詢問 Ubuntu](https://askubuntu.com/questions/342102/why-are-there-different-versions-of-a-man-page-in-the-ubuntu-manpage-repository)