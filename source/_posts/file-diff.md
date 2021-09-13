---
title: How to tell same-content files on Linux
date: 2021-09-13 22:38:39
tags: [note, linux, file, diff]
---

# How to tell same-content files on Linux

## md5sum
- `md5sum date1.txt date2.txt date3.txt`
- `md5sum date1.txt date2.txt date3.txt > date.md5sum`
    - `-c` 的檢查用參數可以自動進行檔案的 MD5 校驗碼比對：
    - `md5sum -c date.md5sum`
<!--more-->
## sha1sum
> - SHA1 hashes
- compute and check SHA1 message digest
```clike
sha1sum date1.txt date2.txt date3.txt
fb9249f09b589241e3556ff6b6fab5f80015ed5c  date1.txt
40e691d0d06673c9d5bc31aececafac85a9011be  date2.txt
a428582cace49024d5964bac8ab71d00b191b9fa  date3.txt
```
### 常用參數
- 也可以使用 `-c` 參數：
- --quiet
    - don't print OK for each successfully verified file
- -b, --binary
    - read in binary mode
- -t, --text
    - read in text mode (default)
### reference
- [Linux 產生 MD5 與 SHA1 校驗碼 Checksum 使用教學，檢查檔案是否損毀 - G. T. Wang](https://blog.gtwang.org/linux/generate-verify-check-files-md5-sha1-checksum-linux/)
- [sha1sum(1) - Linux manual page](https://man7.org/linux/man-pages/man1/sha1sum.1.html)

## cksum (check sum)
- Linux cksum命令用于检查文件的CRC是否正确。确保文件从一个系统传输到另一个系统的过程中不被损坏。
- CRC是一种排错检查方式，该校验法的标准由CCITT所指定，至少可检测到99.998%的已知错误。
- `cksum [--help][--version][文件...]`
```clike
$ cksum *.html
2819078353 228029 backup.html
4073570409 227985 home.html
4073570409 227985 index.html
```
### reference
- [Linux cksum命令 | 菜鸟教程](https://www.runoob.com/linux/linux-comm-cksum.html)

## diff
- diff命令能比較單個文件或者目錄內容。
- 如果指定比較的是文件，則只有當輸入為文本文件時才有效。
- 如果指定比較的是目錄的的時候，diff 命令會比較兩個目錄下名字相同的文本文件。
- 以逐行的方式，比較文本文件的異同處。
- 列出不同的二進制文件、公共子目錄和只在一個目錄出現的文件。
```clike
diff [-abBcdefHilnNpPqrstTuvwy][-<行数>][-C <行数>][-D <巨集名称>][-I <字符或字符串>][-S <文件>][-W <宽度>][-x <文件或目录>][-X <文件>][--help][--left-column][--suppress-common-line][文件或目录1][文件或目录2]
```
### 常用參數
-   -b或--ignore-space-change 　不检查空格字符的不同。
-   -B或--ignore-blank-lines 　不检查空白行。
-   -c 　显示全部内文，并标出不同之处。
-   -H或--speed-large-files 　比较大文件时，可加快速度。
-   -i或--ignore-case 　不检查大小写的不同。
-   -p 　若比较的文件为C语言的程序码文件时，显示差异所在的函数名称。
-   -q或--brief 　仅显示有无差异，不显示详细的信息。
-   -r或--recursive 　比较子目录中的文件。
-   -w或--ignore-all-space 　忽略全部的空格字符。
-   -x<文件名或目录>或--exclude<文件名或目录> 　不比较选项中所指定的文件或目录。
-   -y或--side-by-side 　以并列的方式显示文件的异同之处。

### example
> The < and > signs indicate whether the extra lines are in the first (<) or second (>) file provided as arguments

- 比较两个文件
```clike
$ diff log2014.log log2013.log
3c3
< 2014-03
---
> 2013-03
8c8
< 2013-07
---
> 2013-08
11,12d10
< 2013-11
< 2013-12
```
- 并排格式输出
```clike
[root@localhost test3]# diff log2014.log log2013.log  -y -W 50
2013-01                 2013-01
2013-02                 2013-02
2014-03               | 2013-03
2013-04                 2013-04
2013-05                 2013-05
2013-06                 2013-06
2013-07                 2013-07
2013-07               | 2013-08
2013-09                 2013-09
2013-10                 2013-10
2013-11               <
2013-12               <
```
### reference
- [快樂街學堂 - 一天學一個UNIX指令：diff](http://www.happystreet.com.tw/index.php/system-dynamic-teaching/unix-linux/405-a-day-of-school-a-unix-command-diff)
- [Linux diff 命令 | 菜鸟教程](https://www.runoob.com/linux/linux-comm-diff.html)
## cmp
- 比較兩個檔案的內容並報告不同的第一個字元。
- `cmp --silent $old $new`

## reference
- [Fastest Method to Check If Two Files Have the Same Contents | Baeldung on Linux](https://www.baeldung.com/linux/fastest-check-files-same-content)
- [How to identify same-content files on Linux | Network World](https://www.networkworld.com/article/3390204/how-to-identify-same-content-files-on-linux.html)