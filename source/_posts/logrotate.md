---
title: logrotate
date: 2021-08-11 20:59:23
tags: [note, linux, log]
---

# logrotate
- logrotate - rotates, compresses, and mails system logs

## logrotate 的設定
- Linux系統預設安裝logrotate工具，它預設的配置檔案在：
    - /etc/logrotate.conf
    - /etc/logrotate.d/
- Logrotate 是基於 cron 來執行的
- restart service: `sudo /usr/sbin/logrotate -v /etc/logrotate.conf
## 切割介紹
- 比如以系統日誌/var/log/message做切割來簡單說明下：
    - 第一次執行完rotate(輪轉)之後，原本的messages會變成messages.1，而且會製造一個空的messages給系統來儲存日誌；
    - 第二次執行之後，messages.1會變成messages.2，而messages會變成messages.1，又造成一個空的messages來儲存日誌！
    - 如果僅設定保留三個日誌（即輪轉3次）的話，那麼執行第三次時，則 messages.3這個檔案就會被刪除，並由後面的較新的儲存日誌所取代！也就是會儲存最新的幾個日誌。
- 日誌究竟輪換幾次，這個是根據配置檔案中的dateext 引數來判定的。
```clike
# cat /etc/logrotate.conf
# 底下的設定是 "logrotate 的預設值" ，如果別的檔案設定了其他的值，
# 就會以其它檔案的設定為主
weekly  //預設每一週執行一次rotate輪轉工作
rotate 4 //保留多少個日誌檔案(輪轉幾次).預設保留四個.就是指定日誌檔案刪除之前輪轉的次數，0 指沒有備份
create  //自動建立新的日誌檔案，新的日誌檔案具有和原來的檔案相同的許可權；因為日誌被改名,因此要建立一個新的來繼續儲存之前的日誌
dateext //這個引數很重要！就是切割後的日誌檔案以當前日期為格式結尾，如xxx.log-20131216這樣,如果註釋掉,切割出來是按數字遞增,即前面說的 xxx.log-1這種格式
compress //是否通過gzip壓縮轉儲以後的日誌檔案，如xxx.log-20131216.gz ；如果不需要壓縮，註釋掉就行
include /etc/logrotate.d
# 將 /etc/logrotate.d/ 目錄中的所有檔案都載入進來
/var/log/wtmp {   //僅針對 /var/log/wtmp 所設定的引數
monthly   //每月一次切割,取代預設的一週
minsize 1M  //檔案大小超過 1M 後才會切割
create 0664 root utmp  //指定新建的日誌檔案許可權以及所屬使用者和組
rotate 1   //只保留一個日誌.
}
# 這個 wtmp 可記錄使用者登入系統及系統重啟的時間
# 因為有 minsize 的引數，因此不見得每個月一定會執行一次喔.要看檔案大小。
```

## logrotate config file
```
# sample logrotate configuration file
compress

/var/log/messages {
    rotate 5
    weekly
    postrotate
        /usr/bin/killall -HUP syslogd
    endscript
}
```

## compress tool
### compress
- Old versions of log files are compressed with gzip(1) by default. See also nocompress.
### compresscmd
- Specifies which command to use to compress log files. The default is gzip. See also compress.
### uncompresscmd
- Specifies which command to use to uncompress log files. The default is gunzip.


## reference
- [logrotate(8) - Linux man page](https://linux.die.net/man/8/logrotate
- [[Linux] logrotate 設定 | 阿輝的零碎筆記 - 點部落](https://dotblogs.com.tw/grayyin/2019/05/14/113632)
- [Linux中logrotate日誌輪詢操作總結 | 程式前沿](https://codertw.com/%E4%BC%BA%E6%9C%8D%E5%99%A8/377513/)