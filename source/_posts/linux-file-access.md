---
title: linux-file-access
date: 2020-10-01 22:09:04
tags: [note, linux, permission]
---

# Linux File Access Permission

## Introduction
- 在 linux 中，每個檔案都會有自己的檔案權限，可以利用 `ls -l` 或是 `ll` 來查看

```c
$ ls -l
drwxrwxr-x+ 46 root  admin   1.4K 10  1 11:33 Applications/
drwxr-xr-x  67 root  wheel   2.1K  8 30 09:18 Library/
drwxr-xr-x@  8 root  wheel   256B  8 11 02:18 System/
...
```
- 第一個值
    - \- 為檔案，d 表示目錄，l 表示連結檔案 (link)


- 去除掉最一開頭的 d，分為三組值
    > - r: readable
    > - w: writable
    > - x: executable
    > - \-: 表示無權限
    - 其實它是二進制的三個值
        - 無權限即為 000

- 而分三組為
   > - owner 的權限
   > - member in group 的權限
   > - others 的權限
   - 每組將其二進制轉為十進制
        | Number | Description |
        | --- | --- |
        | `7` (111) | read, write, and execute |
        | `6` (110) | read and write |
        | `5` (101) | read and execute |
        | `4` (100) | read only |
        | `3` (011) | write and execute |
        | `2` (010) | write only |
        | `1` (001) | execute only |
        | `0` (000) | no permission |


> - in nodejs
>     ```javascript
>     fs.chmodSync('my_file.txt', 0o765);
>     ```
>     - For example, the octal value `0o765` means:
>         - The owner may read, write and execute the file.
>         - The group may read and write the file.
>         - Others may read and execute the file.

## Command
- chmod
    - 修改權限
    - 用法
        - `\[ugoa...\]\[\[+-=\]\[rwxX\]...\]\[,...\]`
            - u 表示該檔案的擁有者 (user)
            - g 表示該 group 
            - o 表示其他以外的人 (others)
            - a 表示這三者皆是 (all)
            - \+ 表示增加權限
            - \- 表示取消權限
            - = 表示唯一設定權限
            - `-R` 目錄下所有檔案皆做相同權限操作
    ```c
    $ chmod ugo+r file1.txt
    $ chmod a+w file1.txt
    // 將檔案 file1.txt 與 file2.txt 設為該檔案擁有者，與其所屬同一個群體者可寫入，但其他以外的人則不可寫入
    $ chmod ug+w,o-w file1.txt file2.txt
    $ chmod 777 file.txt
    ```

- chown
    - 修改擁有者或是群組
    ```c
    // 將 temp.txt 的 owner 改為 user2
    $ chown user2 temp.txt
    // 將 temp.txt 的 group 改為 group2
    $ chown :group2 temp.txt
    // 將 temp.txt 的 owner 改為 user2 並 group 改為 group2
    $ chown user2:group2 temp.txt
    ```

## Reference
- [Linux Command 命令列指令與基本操作入門教學](https://blog.techbridge.cc/2017/12/23/linux-commnd-line-tutorial/)
- [\[Linux\] chmod的用法](https://charleslin74.pixnet.net/blog/post/419874889)
