---
title: Linux dd Command
date: 2022-01-12 22:52:29
tags: [note, linux, dd, disk, book section]
---

# Linux dd Command
## introduction
- convert and copy a file (Copy a file, converting and formatting according to the operands.)
- 該名稱來自數據複製器 (data duplicator)，但幽默地說它也意味著磁盤破壞者或數據破壞者 (data destroyer)，因為它是一個非常強大的工具
- 用途
    - 硬碟讀寫效能測試
    - 備份與回復整顆硬碟的資料。
    * 備份與回復原始設備檔案，例如 MBR（master boot record）。
    * 轉換資料格式，例如 ASCII 轉換為 EBCDIC，大小寫轉換等。
    * 建立固定大小的檔案。
<!--more-->
## param
* bs=BYTES
    * read and write BYTES bytes at a time (also see ibs=,obs=)
* cbs=BYTES
    * convert BYTES bytes at a time
* conv=CONVS
    * convert the file as per the comma separated symbol list
* count=BLOCKS
    * copy only BLOCKS input blocks
* ibs=BYTES
    * read BYTES bytes at a time (default: 512)
* if=FILE
    * read from FILE instead of stdin
* iflag=FLAGS
    * read as per the comma separated symbol list
* obs=BYTES
    * write BYTES bytes at a time (default: 512)
* of=FILE
    * write to FILE instead of stdout
* oflag=FLAGS
    * write as per the comma separated symbol list
* seek=BLOCKS
    * skip BLOCKS obs-sized blocks at start of output
* skip=BLOCKS
    * skip BLOCKS ibs-sized blocks at start of input
* status=noxfer
    * suppress transfer statistics
* count_bytes
    * treat 'count=N' as a byte count (iflag only)
* skip_bytes
    * treat 'skip=N' as a byte count (iflag only)
* seek_bytes
    * treat 'seek=N' as a byte count (oflag only)

### 常用說明
-   `if=FILE`：指定輸入檔案名稱（input file）為 `FILE`。
-   `of=FILE`：指定輸出檔案名稱（output file）為 `FILE`。
-   `ibs=BYTES`：指定輸入區塊大小（input block size），一次讀取 `BYTES` 位元組的資料，預設為 512 位元組。
-   `obs=BYTES`：指定輸出區塊大小（output block size），一次寫入 `BYTES` 位元組的資料，預設為 512 位元組。
-   `bs=BYTES`：指定 block size，一次讀取與寫入 `BYTES` 位元組的資料，此選項會覆蓋 `ibs` 與 `obs` 的設定。
-   `cbs=BYTES`：一次轉換 `BYTES` 位元組的資料。
-   `count=N`：只處理 `N` 個輸入區塊，每個區塊的大小為 `ibs`。
-   `seek=N`：在輸出時跳過輸出檔案的前 `N` 個區塊，每個區塊的大小為 `obs`。
-   `skip=N`：在輸入時跳過輸入檔案的前 `N` 個區塊，每個區塊的大小為 `ibs`。
-   `conv=CONVS`：指定資料的轉換選項，如果一次要指定多種轉換，則以逗點分隔。

## e.g.
### 備份整顆硬碟
- 將 `/dev/sda` 所有的資料寫入 `/dev/sdb`：
    ```clike
    sudo dd if=/dev/sda of=/dev/sdb
    // 讀取錯誤時還是繼續拷貝資料的話，就要加上 `conv=noerror` 參數，這個選項通常在備份資料時會使用到，另外加上 `sync` 可以讓 `dd` 以 synchronized I/O 的方式備份資料：
    sudo dd if=/dev/sda of=/dev/sdb conv=noerror,sync
    ```
### 建立固定大小的檔案
- 建立一個 10MB 大小的檔案：
    ```clike
    dd if=/dev/zero of=file1 bs=10485760 count=1
    // 這裏的 block size 的計算方式為 10*1024*1024 = 10MB。
    ```
### 修改檔案內容
- 將檔案開頭的 512 bytes 改為 null：
    ```clike
    dd if=/dev/zero of=file1 bs=512 count=1 conv=notrunc
    # 這裡的 notrunc 參數代表不要將輸出檔案截短，只取代開頭的前 512 bytes，其餘內容不變。假設 file1 不存在，那麼這行指令就會建立一個 512 bytes 的 file1 檔案。
    ```



## reference
- [dd 指令教學與實用範例，備份與回復資料的小工具 - G. T. Wang](https://blog.gtwang.org/linux/dd-command-examples/)
- [[Linux] 使用dd指令 – 硬碟讀寫效能測試 – YIDAS Code](https://code.yidas.com/linux-dd-command-test-io/)
- [DD的完整和詳細指南（帶有示例）| 從Linux](https://blog.desdelinux.net/zh-TW/guia-completa-y-detallada-con-ejemplos-de-dd/)
- [dd(1) - Linux manual page](https://man7.org/linux/man-pages/man1/dd.1.html)
- [dd(1): convert/copy file - Linux man page](https://linux.die.net/man/1/dd)