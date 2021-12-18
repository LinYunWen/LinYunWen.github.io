---
title: linux-uniq
date: 2021-12-17 22:59:20
tags: [note, linux, book section, uniq]
---

# uniq
- 以每一行為單位，**相鄰兩行**內容重複的話，uniq 將會去除重複的行
<!--more-->
## params
* -c, --count
    * prefix lines by the number of occurrences
* -d, --repeated
    * only print duplicate lines, one for each group
* -D
    * print all duplicate lines
* --all-repeated[=METHOD]
    * like -D, but allow separating groups with an empty line; METHOD={none(default),prepend,separate}
* -f, --skip-fields=N
    * avoid comparing the first N fields
* --group[=METHOD]
    * show all items, separating groups with an empty line; METHOD={separate(default),prepend,append,both}
* -i, --ignore-case
    * ignore differences in case when comparing
* -s, --skip-chars=N
    * avoid comparing the first N characters
* -u, --unique
    * only print unique lines
* -z, --zero-terminated
    * line delimiter is NUL, not newline
* -w, --check-chars=N
    * compare no more than N characters in lines

## count
```clike
# uniq 若加上 -c 參數，可以在刪除重複文字行之後，標示出每一行的重複次數：
uniq -c example1.txt
```
## print line
```clike
# 若只要輸出有重複的文字行
uniq -D example1.txt
# 要將這個輸出中重複的行刪掉
uniq -d example1.txt
# 輸出沒有重複的文字行，也就是說只要出現重複的文字行，就完全刪掉
uniq -u example1.txt
```

## reference
- [Linux 的 uniq 指令教學與範例：刪除重複文字行、去除相同的內容 - G. T. Wang](https://blog.gtwang.org/linux/linux-uniq-command-tutorial/)
- [Linux uniq 去除連續重複用法與範例 | ShengYu Talk](https://shengyu7697.github.io/linux-uniq/)
- [uniq(1) - Linux manual page](https://man7.org/linux/man-pages/man1/uniq.1.html)