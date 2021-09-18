---
title: timedatectl
date: 2021-09-18 14:27:59
tags: [note, linux, time, date]
---
# timedatectl
- 控制系統的時間與日期，可用於查詢與修改 系統時鐘的各項設置。
- 是 systemd unit
```clike
# 顯示目前狀態
$ timedatectl
                      Local time: Mon 2020-04-06 18:11:32 CST
                  Universal time: Mon 2020-04-06 10:11:32 UTC
                        RTC time: Mon 2020-04-06 10:11:33
                       Time zone: Asia/Taipei (CST, +0800)
       System clock synchronized: yes
systemd-timesyncd.service active: yes
                 RTC in local TZ: no
```
<!--moe-->
## options
```
--no-ask-password
           在執行特權操作時不向用戶索要密碼。

status
   顯示系統時鐘與RTC的當前狀態， 包括時區設置與網絡時間同步服務的狀態。
   注意，所謂"網絡時間同步服務的狀態"實際上只是 systemd-timesyncd.service 服務的狀態，
   並不檢查是否存在其他時間同步服務。 這是默認命令。

set-time [TIME]
   將系統時鐘設爲指定的時間， 並同時更新RTC時間。 [TIME] 是一個形如 "2012-10-30
   18:17:16"的時間字符串。

set-timezone [TIMEZONE]
   設置系統時區，也就是更新 /etc/localtime 軟連接的指向。 可以用下面的 list-timezones
   命令列出所有可用時區。 如果RTC被設爲本地時間， 此命令還會同時更新RTC時間。 詳見
   localtime(5) 手冊。

list-timezones
   列出所有可用時區，每行一個。 列出的值可以用作前述 set-timezone 命令的參數。

set-local-rtc [BOOL]
   設爲 "no" 表示在RTC中存儲UTC時間； 設爲 "yes" 表示在RTC中存儲本地時間。
   應該盡一切可能在RTC中存儲UTC時間。 儘量不要在RTC中存儲本地時間，
   因爲這會造成一系列麻煩， 尤其是在切換時區以及調整夏令時或冬令時的時候。
   注意，除非明確使用了 --adjust-system-clock 選項，
   否則此命令還會同時用系統時鐘更新RTC時間。 此命令還會改變 /etc/adjtime
   文件第三行的內容，詳見 hwclock(8) 手冊。

set-ntp [BOOL]
   是否開啓網絡時間同步。 設爲 "yes" 則啓用並啓動 systemd-timesyncd.service 服務， 設爲
   "no" 則停止並停用它。 該命令除了控制 systemd-timesyncd.service
   服務的狀態，不做任何其他操作。 也就是說，設爲 "yes" 相當於執行 systemctl enable --now
   systemd-timesyncd.service 命令； 而設爲 "no" 則相當於執行 systemctl disable --now
   systemd-timesyncd.service 命令；

   注意，即使使用此命令關閉了 systemd-timesyncd.service 服務，
   仍然有可能存在其他時間同步服務。 另外，嚴格來說， systemd-timesyncd.service
   除了同步時間之外，還同時兼有其他功能，
   例如在無網絡且無RTC的系統上維持系統的"單調時鐘"。 詳見 systemd-timesyncd.service(8)
   手冊。
```
- e.g.
```clike
// timedatectl 也可以用來設定系統時間，設定方式為：
sudo timedatectl set-time "2016-11-12"
// 設定日期與時間的方式：
sudo timedatectl set-time "2016-11-12 18:10:40"
// 也可以只更改時間：
sudo timedatectl set-time "18:10:40"
```
## ntp 自動校時
- 如果系統有設定以 ntp 自動校時，在手動更改日期與時間時，就出現這樣的錯誤訊息：`Failed to set time: Automatic time synchronization is enabled`
    - 若要手動校時就要先將 ntp 關閉：
        - `sudo timedatectl set-ntp no`
    - 若要恢復 ntp 自動校時，則執行：
        - `sudo timedatectl set-ntp yes`
- `timedatectl` 的網路校時功能是透過 `systemd-timesyncd` 服務來處理的
    - `systemctl status systemd-timesyncd`
## 設定時區
- `timedatectl` 亦可用來設定時區（time zone）
```
// 檢視所有可用的時區
timedatectl list-timezones
// 設定本地時區
timedatectl set-timezone "Asia/Taipei"
```
- 不過通常一般若要設定時區，使用這種選單選取的方式會比較方便：
    - `sudo dpkg-reconfigure tzdata`
    - ![](https://i.imgur.com/baSUGIm.png)

- 硬體時鐘設定為本地時區
    - `timedatectl set-local-rtc 1`
- 將你的硬體時鐘設定為協調世界時（UTC）
    - `timedatectl set-local-rtc 0`


## reference
- [Ubuntu Manpage: timedatectl - 控制系統的時間與日期](http://manpages.ubuntu.com/manpages/bionic/zh_TW/man1/timedatectl.1.html)
- [Linux 手動更改系統時間：date、hwclock 與 timedatectl 指令用法教學 - G. T. Wang](https://blog.gtwang.org/linux/howto-set-date-time-from-linux-command-prompt/)
- [timedatectl(1) - Linux manual page](https://man7.org/linux/man-pages/man1/timedatectl.1.html)
- [Ubuntu Linux 使用 timedatectl 校正時間教學與範例 - Office 指南](https://officeguide.cc/ubuntu-linux-timedatectl-time-synchronization-tutorial/)
- [Linux下使用timedatectl命令時間時區操作詳解_osc_02985929 - MdEditor](https://www.gushiciku.cn/pl/gxVn/zh-tw)