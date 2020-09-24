---
title: 環境變數
date: 2020-09-24 09:07:45
tags: note, path, book section
---

# 環境變數
> - 可在 terminal 中下 `env`, `printenv` 即可看到所有的環境變數
>     ```
>     CLICOLOR=1
>     COLORFGBG=7;0
>     COLORTERM=truecolor
>     COMMAND_MODE=unix2003
>     HOME=/Users/linyunwen
>     ITERM_PROFILE=Default
>     ITERM_SESSION_ID=w0t1p0:1172DE09-396F-42C6-985B-2948288751AE
>     LANG=zh_TW.UTF-8
>     LC_TERMINAL=iTerm2
>     LC_TERMINAL_VERSION=3.3.12
>     LOGNAME=linyunwen
>     LSCOLORS=ExFxCxDxBxegedabagacad
>     LaunchInstanceID=93D5B2B3-94C0-4872-8DB7-03E7048549FD
>     PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin
>     PWD=/Users/linyunwen/.sideex
>     SECURITYSESSIONID=186a6
>     SHELL=/bin/bash
>     SHLVL=2
>     SSH_AUTH_SOCK=/private/tmp/com.apple.launchd.CQkqScaF2A/Listeners
>     TERM=xterm-color
>     TERM_PROGRAM=iTerm.app
>     TERM_PROGRAM_VERSION=3.3.12
>     TERM_SESSION_ID=w0t1p0:1172DE09-396F-42C6-985B-2948288751AE
>     TMPDIR=/var/folders/q8/zjmdq9y90bdbs8v65256_w5m0000gn/T/
>     USER=linyunwen
>     XPC_FLAGS=0x0
>     XPC_SERVICE_NAME=0
>     __CF_USER_TEXT_ENCODING=0x1F5:0x2:0x35
>     ```

<!--more-->

## $PATH
- $PATH 為環境變數中的其中一個，大多用來進行執行檔的快速連結，指的是該執行檔的位址
- 在 MAC 中，預設值為
```
$ echo $PATH
$ /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```
- 他們是有順序性的，會先查看該執行檔是否在此資料夾下，如果不在，再往下一個路徑中尋找，反之如果找到了就不往後尋找

### PATH 環境變數存放的地方
- 全域環境變數
    - 無論哪個使用者都能夠訪問，不建議直接在這裡進行修改
    - 系統啟動就會載入
    - `/etc/profile`
    - `/etc/paths`
- 系統級別環境變數
    - 通常會在這裡面加內容
    - `/etc/bashrc`
- 用戶級別環境變數
    - 通常會在這裡面加內容
    - 不過這也得看你使用的 shell 是哪個
    - 它是bash shell開啟的時候載入的
    - 使用 bash 為 `~/.bashrc`, `~/.bash_profile`
    > - Linux 裡面是 .bashrc, 而 Mac 是 .bash_profile

:::warning
- 載入順序
```
/etc/profile
/etc/paths
~/.bash_profile
~/.bash_login
~/.profile
~/.bashrc
```
:::

### 修改內容
- add path
    - use `export`
        ```
        export PATH=$PATH:執行命令路徑
        ```
    - manual add
        1.建立一個檔案：
            - `sudo touch /etc/paths.d/mysql`
        2.用 vim 開啟這個檔案（如果是以 open -t 的方式開啟，則不允許編輯）：
            - `sudo vim /etc/paths.d/mysql`
        3.編輯該檔案，輸入路徑並儲存（關閉該 Terminal 視窗並重新開啟一個，就能使用 mysql 命令了）
            - `/usr/local/mysql/bin`
    :::warning
    - 修改完畢後，要記得 `source` 一下
    - 使用 `:` 冒號做分隔
    :::
    

## Reference
- [MAC 設定環境變數path的幾種方法](https://www.itread01.com/content/1546161306.html)
- [Remove redundant paths from $PATH variable](https://stackoverflow.com/questions/11650840/remove-redundant-paths-from-path-variable)
- [Python常見問題，如何查看或修改Mac中的PATH 環境變數](https://aronhack.com/python%E5%B8%B8%E8%A6%8B%E5%95%8F%E9%A1%8C-%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E6%88%96%E4%BF%AE%E6%94%B9mac%E4%B8%AD%E7%9A%84path%E7%92%B0%E5%A2%83%E8%AE%8A%E6%95%B8/)
- [Mac $PATH 環境變量設置及查詢](https://adon988.logdown.com/posts/7809799-mac-path-environment-variables)
- [MAC 設定環境變數path的幾種方法](https://www.itread01.com/content/1546161306.html)