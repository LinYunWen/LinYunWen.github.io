---
title: Unix input and output
date: 2020-10-02 16:06:47
tags: [note, pipe, input, output]
---
# Unix input and output

## Introduction
- standard input/output/error
    > - 標準輸入　　(stdin) ：代號為 0
    > - 標準輸出　　(stdout)：代號為 1
    > - 標準錯誤輸出(stderr)：代號為 2
    - 一般來說指令的輸入輸出是鍵盤和螢幕
    - 而可以利用控制指令將資料流 (data stream) 引導到 file 中
- ![](https://i.imgur.com/fKyiQgU.png)

<!--more-->

## >, >>
- `>` 可以將其標準輸出引導到指定檔案，因此螢幕上就沒有顯示
- `>>` 可以將其標準輸出引導到指定檔案，同時螢幕上顯示
```c
$ ll ~
total 16
drwx------@  4 linyunwen  staff   128B  8 27 16:36 Applications/
drwx------@  5 linyunwen  staff   160B  8 27 20:00 Desktop/
drwx------@ 10 linyunwen  staff   320B  9  5 10:29 Documents/
drwx------@ 28 linyunwen  staff   896B 10  1 22:21 Downloads/
drwx------@ 75 linyunwen  staff   2.3K  9 22 11:52 Library/
drwx------+  8 linyunwen  staff   256B  9  1 23:44 Movies/
drwx------+  4 linyunwen  staff   128B  8 30 22:41 Music/
drwx------+  5 linyunwen  staff   160B  8 31 11:08 Pictures/
drwxr-xr-x   3 linyunwen  staff    96B  8 31 11:43 Postman/
drwxr-xr-x+  4 linyunwen  staff   128B  8 27 16:30 Public/
drwxr-xr-x@ 32 linyunwen  staff   1.0K  9  3 13:20 system/
-rw-r--r--@  1 linyunwen  staff   129B  9 29 23:20 temp.txt

$ ll ~ > temp.txt

$ ll ~ >> temp.txt
total 16
drwx------@  4 linyunwen  staff   128B  8 27 16:36 Applications/
drwx------@  5 linyunwen  staff   160B  8 27 20:00 Desktop/
drwx------@ 10 linyunwen  staff   320B  9  5 10:29 Documents/
drwx------@ 28 linyunwen  staff   896B 10  1 22:21 Downloads/
drwx------@ 75 linyunwen  staff   2.3K  9 22 11:52 Library/
drwx------+  8 linyunwen  staff   256B  9  1 23:44 Movies/
drwx------+  4 linyunwen  staff   128B  8 30 22:41 Music/
drwx------+  5 linyunwen  staff   160B  8 31 11:08 Pictures/
drwxr-xr-x   3 linyunwen  staff    96B  8 31 11:43 Postman/
drwxr-xr-x+  4 linyunwen  staff   128B  8 27 16:30 Public/
drwxr-xr-x@ 32 linyunwen  staff   1.0K  9  3 13:20 system/
-rw-r--r--@  1 linyunwen  staff   129B  9 29 23:20 temp.txt

$ ll ~ > temp.txt 2> error.txt
```
- 亦可以將 2> 轉到 file 中
```c
$ ${command} > temp.txt 2> error.txt
// 會有錯誤，因為 stdout, stderr 同時對同一個檔案輸入
$ ${command} > temp.txt 2> temp.txt
// 正確寫法，將 stdout, stderr 到同一個檔案
$ ${command} > temp.txt 2>&1
$ ${command} 2> temp.txt 1>&2
$ ${command} &> temp.txt
$ ${command} >& temp.txt
```
## <, <<
- `<` 可以將其標準輸入引導到指定檔案，表示執行某個 file 裡面的文字
    - 但是要先做檔案的輸入
- `<<` 可以將其標準輸入引導到指定檔案，表示執行某個 file 裡面的文字
    - 吃到 `eof` 就結束輸入

## |, &
- `|` pipe 指令
    - 將指令輸出導向到下一個指令的輸入
    - 僅會處理 stdout，會忽略 stderr
    - 下個指令的 stdin 必須要能夠接受來自前一個指令的 stdout

- `&` 背景執行指令
```c
$ ${command1} | ${command2} | ${command3}
$ ${command} &
```
- ![](https://i.imgur.com/VR1cjoM.png)

## ||, &&
- `||` or command, `&&` and command
```c
// 若 condition1 成功, condition2 就不執行
$ condition1 || condition2
// 若 condition1 失敗, condition2 就不執行
$ condition1 && condition2
```

## Reference
- [第十章、認識與學習BASH](http://linux.vbird.org/linux_basic/0320bash.php#redirect_redirect)
- [Linux I/O 輸入與輸出重新導向，基礎概念教學](https://blog.gtwang.org/linux/linux-io-input-output-redirection-operators/)