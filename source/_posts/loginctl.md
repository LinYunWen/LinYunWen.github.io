---
title: loginctl
date: 2021-11-14 09:39:28
tags: [note, systemd, loginctl]
---

# loginctl
> -  loginctl [OPTIONS...] {COMMAND} [NAME...]

- 控制 systemd 登錄管理器
- 可用於內省與控制 systemd(1) 登錄管理服務 systemd-logind.service(8)

## return
- 返回值爲 0 表示成功， 非零返回值表示失敗代碼。
<!--more-->
## options
* --no-ask-password
    * 在執行特權操作時不向用戶索要密碼。
* -p, --property=
    * 在顯示 session/user/seat 屬性時， 僅顯示此處指定的屬性。 若未指定，則顯示全部屬性。參數必須是屬性名(例如"Sessions")。 可以多次使用此選項以指定多個屬性。
* --value
    * 在使用 show 顯示屬性時， 僅顯示屬性值，而不顯示屬性名及等號。
* -a, --all
    * 在顯示 session/user/seat 屬性時， 顯示全部屬性，無論這些屬性是否已經被設置。
* -l, --full
    * 在顯示進程樹的時候，不對超長行進行截斷。
* --kill-who=
    * 與 kill-session 連用，指定殺死哪個進程。 leader 表示僅殺死會話的領導進程； all 表示殺死會話的所有進程。 默認值爲 all
* -s, --signal=
    * 與 kill-session 或 kill-user 連用， 指定向選中的進程發送什麼信號。必須設爲衆所周知的信號名稱，例如 SIGTERM(默認值), SIGINT, SIGSTOP 之類
* -n, --lines=
    * 與 user-status 或 session-status 連用， 控制顯示多少行日誌(從最新的一條日誌開始計算)。必須設爲一個正整數，默認值是"10"。
* -o, --output=
    * 與 user-status 或 session-status 連用， 控制日誌的輸出格式。 可用值參見 journalctl(1) 手冊。 默認爲 "short"
* -H, --host=
    * 操作指定的遠程主機。可以僅指定一個主機名(hostname)， 也可以使用 "username@hostname" 格式。 hostname 後面還可以加上容器名(以冒號分隔)， 也就是形如 "hostname:container" 的格式， 以表示直接連接到指定主機的指定容器內。 操作將通過SSH協議進行，以確保安全。可以通過 machinectl -H HOST 命令列出遠程主機上的所有容器名稱。
* -M, --machine=
    * 在本地容器內執行操作。 必須明確指定容器的名稱。
* --no-pager
    * 不將程序的輸出內容管道(pipe)給分頁程序。
* --no-legend
    * 不輸出列標題， 也就是不在輸出列表的頭部和尾部顯示字段的名稱。

## command
### 會話命令
* list-sessions
    * 列出當前所有的會話。這是默認命令。
* session-status [ID...]
    * 顯示簡潔的會話狀態信息，後跟最近的日誌。 如果指定了會話ID，那麼僅顯示指定的會話，否則顯示當前調用者的會話。 此命令主要用於輸出人類易讀的信息，如果你想輸出易於程序分析的信息， 那麼應該使用 show-session 命令
* show-session [ID...]
    * 如果指定了會話ID，那麼顯示指定會話的各項屬性值， 否則顯示登陸管理器自身的各項屬性值。除非使用了 --all 選項， 否則空屬性將被忽略。 還可以使用 --property= 選項指定僅顯示個別屬性。 此命令主要用於輸出易於程序分析的信息，如果你想輸出人類易讀的信息， 那麼應該使用 session-status 命令。
* activate [ID]
    * 激活會話。 也就是將處於後臺的會話切換到前臺(如果同席位的另一個會話正處於前臺)。如果指定了會話ID， 那麼將激活指定的會話， 否則將激活當前調用者的會話。
* lock-session [ID...], unlock-session [ID...]
    * 鎖定/解鎖會話(如果會話支持屏幕鎖)。 如果指定了會話ID，那麼將鎖定/解鎖指定的會話，否則將鎖定/解鎖當前調用者的會話。
* lock-sessions, unlock-sessions
    * 鎖定/解鎖所有支持屏幕鎖的會話。
* terminate-session ID...
    * 結束指定的會話。 也就是殺死指定會話的所有進程、釋放所有與此會話相關的資源。
* kill-session ID...
    * 向指定的會話進程發送信號。 使用 --kill-who= 指定目標進程， 使用 --signal= 指定要發送的信號。

### 用戶命令
* list-users
    * 列出當前登錄的用戶
* user-status [USER...]
    * 顯示簡潔的已登錄用戶信息，後跟最近的日誌。 如果指定了用戶名或UID，那麼僅顯示指定的用戶， 否則顯示當前調用者的用戶。 此命令主要用於輸出人類易讀的信息，如果你想輸出易於程序分析的信息， 那麼應該使用 show-user 命令。
* show-user [USER...]
    * 如果指定了用戶名或UID，那麼顯示指定用戶的各項屬性值，否則顯示登陸管理器自身的各項屬性值。 除非使用了 --all 選項， 否則空屬性將被忽略。還可以使用 --property= 選項來顯示指定的屬性。 此命令主要用於輸出易於程序分析的信息，如果你想輸出人類易讀的信息， 那麼應該使用 user-status 命令。
* enable-linger [USER...], disable-linger [USER...]
    * 啓用/禁止用戶逗留(相當於保持登錄狀態)。 如果指定了用戶名或UID，那麼系統將會在啓動時自動爲這些用戶派生出用戶管理器， 並且在用戶登出後繼續保持運行。這樣就可以允許未登錄的用戶在後臺運行持續時間很長的服務。 如果沒有指定任何參數，那麼將作用於當前調用者的用戶。
    * 參見 logind.conf(5) 中的 KillUserProcesses= 指令。
* terminate-user USER...
    * 結束指定用戶的所有會話。 這將殺死該用戶的所有會話中的所有進程，同時釋放與此用戶有關的所有資源。
* kill-user USER...
    * 向指定用戶的所有進程發送 --signal= 選項指定的信號。

### 席位命令
* list-seats
    * 列出當前本機上的所有可用席位
* seat-status [NAME...]
    * 顯示簡潔的席位信息，後跟最近的日誌。 如果指定了席位名，那麼僅顯示指定的席位，否則顯示當前調用者會話所屬的席位。 此命令主要用於輸出人類易讀的信息，如果你想輸出易於程序分析的信息， 那麼應該使用 show-seat 命令。
* show-seat [NAME...]
    * 如果指定了席位名，那麼顯示指定席位的各項屬性值， 否則顯示登陸管理器自身的各項屬性值。除非使用了 --all 選項， 否則空屬性將被忽略。 還可以使用 --property=選項來顯示指定的屬性。 此命令主要用於輸出易於程序分析的信息，如果你想輸出人類易讀的信息， 那麼應該使用 seat-status 命令。
* attach NAME DEVICE...
    * 將指定的設備(DEVICE)持久的連接到指定的席位(NAME)上。 設備可以用相對於 /sys文件系統的設備路徑表示。 要創建一個新席位，至少需要連接一個顯卡。席位名稱必須以 "seat" 開頭， 後跟 a–z, A–Z, 0–9, "-", "_" 字符。 要想從席位上刪除一個設備，可以將此設備連接到另一個席位， 或者使用 flush-devices 命令。
* flush-devices
    * 刪除所有先前用 attach 命令連接的設備(同時也刪除了所有先前用 attach 命令創建的席位)。調用此命令之後，所有自動生成的席位將會被保留，同時所有席位設備將會連接到自動生成的席位上。
* terminate-seat NAME...
    * 結束指定席位上的所有會話。 這將殺死指定席位上的所有會話進程，同時釋放與之關聯的所有資源。

## reference
- [Ubuntu Manpage: loginctl - 控制 systemd 登錄管理器](http://manpages.ubuntu.com/manpages/bionic/zh_TW/man1/loginctl.1.html)
- [loginctl](https://www.freedesktop.org/software/systemd/man/loginctl.html)