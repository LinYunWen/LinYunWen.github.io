---
title: c-c++-file-sync
date: 2021-09-23 21:15:22
tags: [note, c/c++, file sync, book section]
---

# C/C++ File Sync
- Linux實現中在核心設有緩衝區快取記憶體或頁面快取記憶體，大多數磁碟I/O都通過緩衝區進行。
- 當我們向檔案寫資料時，核心通常先將資料複製到一個緩衝區中，如果該緩衝區尚未寫滿，則並不將其排入輸出佇列，而是等待寫滿或者核心需要重用該緩衝區以便存放其他資料時，才會將該緩衝區排入輸出佇列，然後等它到達隊首時，才進行實際的I/O操作。
<!--more-->
- 這就是被稱為 延遲寫的輸出方式。  
     - 延遲寫減少了磁碟讀次數，但是卻減低了檔案內容跟新的速度。
     - 當系統發生故障時，延遲寫的方式可能造成檔案跟新丟失。
     - 為了應對此種情況，linux下提供了 sysnc, fsync, fdatasync 三個函式來保證實際檔案系統與緩衝區中內容的一致。
> - **#include <unistd.h>**


## sync  
- 該函式只是將所有修改過的塊緩衝區排入寫佇列，然後就返回，他並不等待實際寫磁碟操作結束  
## fsync  
- `int fsync(int fd);`
- 只對由檔案描述符fd指定的一個檔案起作用，並且等待寫磁碟操作結束才返回。 
- return
    - On success, these system calls return zero.
    - On error, -1 is returned, and errno is set to indicate the error.
## fdatasync
- `int fdatasync(int fd);`
- 類似於fsync，但是只影響檔案的資料部分。而除資料外，fsync還會同步更新檔案的屬性。  
- return
    - On success, these system calls return zero.
    - On error, -1 is returned, and errno is set to indicate the error.
- The aim of fdatasync() is to reduce disk activity for applications that do not require all metadata to be synchronized with the disk.
## C庫的 fflush  
- 標準的I/O函式（如 fread, fwrite）會在記憶體建立緩衝，該函式重新整理記憶體緩衝，將內容寫入核心緩衝，要想將其寫入磁碟，還需要呼叫fsync（先呼叫 fflush 然後再呼叫 fsync，否則不起作用）；

- 關係
     - `c庫緩衝-----fflush---------〉核心緩衝--------fsync-----〉磁碟`

## reference
- [fsync(2) - Linux manual page](https://man7.org/linux/man-pages/man2/fdatasync.2.html)
- [linux 下檔案同步函式（fflush、sync、fsync、fdatasync）之間差異 - IT閱讀](https://www.itread01.com/content/1543722364.html)