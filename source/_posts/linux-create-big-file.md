---
title: Create a big file in Linux
date: 2021-09-16 21:49:45
tags: [note, linux, big file, book section]
---

# Create a big file in Linux

## fallocate
- Preallocate space to a file.
```clike
fallocate [-c|-p|-z] [-o offset] -l length [-n] filename
fallocate -d [-o offset] [-l length] filename
fallocate -x [-o offset] -l length filename
```
<!--more-->
- e.g.
    - `fallocate -l 1G test.img`
    - `fallocate -l 100M file.out`
### 參數
- The -l option specifies the length of the allocation, in bytes.
    - Suffixes of k, m, g, t, p, e may be specified to denote KiB, MiB, GiB, etc.
* -n, --keep-size     don't modify the length of the file
* -p, --punch-hole    punch holes in the file
* -o, --offset \<num>  offset of the allocation, in bytes
* -l, --length \<num>  length of the allocation, in bytes


### reference
- [fallocate(1) - Linux manual page](https://man7.org/linux/man-pages/man1/fallocate.1.html)
- [[Linux] 使用 fallocate 指令快速建立指定大小的檔案 | EPH 的程式日記](https://ephrain.net/linux-%E4%BD%BF%E7%94%A8-fallocate-%E6%8C%87%E4%BB%A4%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%8B%E6%8C%87%E5%AE%9A%E5%A4%A7%E5%B0%8F%E7%9A%84%E6%AA%94%E6%A1%88/)

## dd
> - **Note**: 
>     * dd only exists for older version of Linux and/or when fallocate command is not available.
>     * If possible use fallocate command only for creating binary images.
>     * dd command based method is considered as **old and not recommended**,
- Convert and copy a file i.e. clone/create/overwrite images
    ```clike
    dd if=/path/to/input of=/path/to/output [options]
    dd if=/dev/zero of=/path/to/output.img [options]
    dd if=/dev/zero of=YOUR-IMAGE-FILE-NAME-HERE bs=1 count=0 seek=Size-HERE
    ```
    - file of size count*bs bytes
- e.g.
    - `dd if=/dev/zero of=test.img bs=1024 count=0 seek=1024`
        - create 1MB file (1024kb), enter:
        - You will get an empty files (also known as “sparse file”) of arbitrary size
    - `dd if=/dev/zero of=1g.img bs=1 count=0 seek=1G`
### 參數
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

### reference
- [dd 指令教學與實用範例，備份與回復資料的小工具 - G. T. Wang](https://blog.gtwang.org/linux/dd-command-examples/)

## truncate
- shrink or extend the size of a file to the specified size
    - 如果指定檔案不存在則建立。
    - 如果指定檔案超出指定大小則超出的資料將丟失。
    - 如果指定檔案小於指定大小則用 0 補足。
- is likely the fastest
- it creates a "sparse file".
    - Essentially, a sparse file is a section of disk that has a lot of the same data, and the underlying filesystem "cheats" by not really storing all of the data, but just "pretending" that it's all there.
- e.g.
    - `truncate -s 10G gentoo_root.img`
### 參數
* -c, --no-create
    * do not create any files
* -o, --io-blocks
    * treat SIZE as number of IO blocks instead of bytes
* -r, --reference=RFILE
    * base size on RFILE
* -s, --size=SIZE
    * set or adjust the file size by SIZE bytes
### reference
- [【Linux之truncate 命令用法】 | IT人](https://iter01.com/106223.html)
- [truncate(1) - Linux manual page](https://man7.org/linux/man-pages/man1/truncate.1.html)


## dd vs fallocate
- dd is slow for this purpose
- `fallocate`, which uses the desired space without having to actually writing to it
- dd is essentially a copy and that forces you to write every block of data (thus, initializing the file contents)


## reference
- [Linux / UNIX: Create Large 1GB Binary Image File With dd Command - nixCraft](https://www.cyberciti.biz/faq/howto-create-lage-files-with-dd-command/)
- [Quickly create a large file on a Linux system - Stack Overflow](https://stackoverflow.com/questions/257844/quickly-create-a-large-file-on-a-linux-system)
- [How To Quickly Generate A Large File On The Command Line (With Linux) - Skorks](https://skorks.com/2010/03/how-to-quickly-generate-a-large-file-on-the-command-line-with-linux/)