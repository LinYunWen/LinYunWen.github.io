---
title: lsof
date: 2020-09-25 22:26:17
tags: note, lsof, tip, book section
---

# lsof (List Open Files)

> - 在 Linux 系統之下，幾乎所有的系統資源都是以檔案的形式呈現，所以對於管理者或使用者來說，若要查詢一個程式使用了哪些系統資源，就可以透過它開啟的檔案來得知。
> 


## 基本使用
- 直接加上查詢開啟的檔案名稱和路徑
    - 查看 `temp.txt` 的狀況
    ```c
    # 列出所有行程所開啟的檔案
    lsof temp.txt
    
    COMMAND    PID      USER   FD    TYPE             DEVICE SIZE/OFF                NODE NAME 
    temp.txt 91546 linyunwen  cwd     DIR                1,7      704                   2 /
    ```
    <!--more-->

    - lsof 的項標
        - COMMAND
        - PID
        - USER
        - FD
            - cwd：應用程序的當前工作目錄，這是該應用程序啟動的目錄，除非它本身對這個目錄進行更改
            - txt ：該類型的文件是程式碼，如應用程序二進製文件本身或共享庫，如上列表中顯示的 /sbin/init 程序
            - lnn：library references (AIX);
            - er：FD information error (see NAME column);
            - jld：jail directory (FreeBSD);
            - ltx：shared library text (code and data);
            - mxx ：hex memory-mapped type number xx.
            - m86：DOS Merge mapped file;
            - mem：memory-mapped file;
            - mmap：memory-mapped device;
            - pd：parent directory;
            - rtd：root directory;
            - tr：kernel trace file (OpenBSD);
            - v86 VP/ix mapped file;
            - 0：表示標準輸入 stdin
            - 1：表示標準輸出 stdout
            - 2：表示標準錯誤 stderr
            > - 一般在標準輸出、標準錯誤、標準輸入後還跟著文件狀態模式：r、w、u等
                >     - u：表示該文件被打開並處於讀取/寫入模式
                >     - r：表示該文件被打開並處於唯讀模式
                >     - w：表示該文件被打開並處於寫入模式
                >     - 空格：表示該文件的狀態模式為unknow，且沒有 locked
                >     - -：表示該文件的狀態模式為unknow，且被 locked
        - 同時在文件狀態模式後面，還跟著相關的鎖
            - N：for a Solaris NFS lock of unknown type;
            - r：for read lock on part of the file;
            - R：for a read lock on the entire file;
            - w：for a write lock on part of the file
            - W：for a write lock on the entire file
            - u：for a read and write lock of any length;
            - U：for a lock of unknown type;
            - x：for an SCO OpenServer Xenix lock on part of the file;
            - X：for an SCO OpenServer Xenix lock on the entire file;
            - space：if there is no lock.
        - TYPE
            - 目錄：表示目錄
            - CHR：表示字元類型
            - BLK
            - UNIX
            - FIFO：先進先出
            - IPv4：網際協議
        - DEVICE：指定硬碟的名稱
        - SIZE/OFF：文件的大小
        - NODE：索引節點（文件在磁盤上的標識）
        - NAME：打開文件的確切名稱


### 列出指定使用者
- 若要讓 `lsof` 列出指定用者所開啟的所有檔案，可以使用 `-u` 參數指定使用者名稱：
- 若要一次列出多位使用者所開啟的檔案，以逗號分隔，或是使用多個 `-u` 參數來指定：

```
# linyunwen 使用者所開啟的檔案
lsof -u linyunwen

# 列出多位使用者所開啟的檔案
lsof -u user1,user2,user3

# 列出多位使用者所開啟的檔案
lsof -u user1 -u user2 -u user3
```

### 列出指定程式所開啟的檔案
- 如果想要列出指定程式所開啟的檔案，可以使用 `-c` 參數指定程式的名稱
- 若要列出多個程式所開啟的檔案，可以使用多個 `-c` 參數來指定：

```
# synergys 所開啟的檔案
lsof -c synergys

# 列出多個程式所開啟的檔案
lsof -c java -c synergys
```

### 根據 PID 列出所開啟的檔案
- 若要列出指定 PID 的行程所開啟的檔案，可以使用 `-p` 參數來指定 PID
- 若要同時根據多個 PID 列出開啟的檔案，一樣可以用逗號分隔多個 PID
```c
# PID 為 14662 的行程，所開啟的檔案
lsof -p 3333

# 根據多個 PID 列出開啟的檔案
lsof -p 3333,1234,4567
```

### 多個篩選條件
- 預設的狀況下多個條件之間會以 OR 運算來結合
```
# 多個條件（OR 運算）
lsof -u linyunwen -c java
```
- 而如果我們想要以 AND 運算來結合多個條件，可加上 `-a` 參數
```
# 多個條件（AND 運算）
lsof -a -u linyunwen -c java
```
- 如果想要排除特定的條件，可以使用 NOT `^` 符號：
```
# 非 linyunwen 使用者所開啟的檔案
lsof -u ^linyunwen
```

### 網路連線
- `lsof` 的 `-i` 參數可以用來查詢所有的網路連線：
- 若想只想要TCP 或 UDP 的網路連線，可以在 `-i` 參數之後指定 `tcp` 或 `udp`：
- 亦可指定port，例如列出網頁伺服器的網路連線：
```
lsof -i tcp
lsof -i udp

# 80 port
lsof -i :80

# SMTP 的網路連線
lsof -i :smtp

# 1234 port的 TCP 連線
lsof -i tcp:1234

# 1 到 1024 port
lsof -i :1-1024

# 『4』為IPv4，『6』為IPv6
lsof -i  [46]

```
- 若要列出所有處於 `LISTEN` 狀態的 `TCP` 網路連線，可以執行：
```
# 列出所有處於 LISTEN 狀態的 TCP 網路連線
lsof -i TCP -s TCP:LISTEN

查詢目前使用中的 port 及 process id
lsof -n -i | grep LISTEN

查詢特定 port 的服務，以 80 port 為例
lsof -n -i:80 | grep LISTEN
```
- 列出已建立的 TCP 網路連線：
```
# 已建立的 TCP 網路連線
lsof -i TCP -s TCP:ESTABLISHED
```

## Reference
- [Linux 列出行程開啟的檔案，lsof 指令用法教學與範例](https://blog.gtwang.org/linux/linux-lsof-command-list-open-files-tutorial-examples/)
- [lsof 一切皆文件](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/lsof.html)

