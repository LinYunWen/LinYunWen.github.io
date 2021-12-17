---
title: linux-cut
date: 2021-12-17 22:53:26
tags: [note, linux, book section, cut]
---

# cut
- 可以將每一行文字的部份字元或欄位擷取出來

## param
* -b: 輸出指定的範圍, 以 bytes 作為單位.
* -c: 輸出指定的範圍, 以字元數量作為單位.
* -d: 指定分隔字元, 預設是用 tab 作為分隔.
* -f: 輸出指定的範圍, 這個是每行資料的第幾個欄位作為區分.
* -s: 如果該行沒有分隔字元, 不會顯示該行資料.
<!--more-->
## 擷取字元
```clike
# 擷取第 2 個字元至第 10 個字元
ls -l | tail -n 5 | cut -c 2-10
# 擷取第 2-3 個、第 5-6 個與第 8-9 個字元
ls -l | tail -n 5 | cut -c 2-3,5-6,8-9
# 排除第 2 個字元至第 10 個字元
ls -l | tail -n 5 | cut -c 2-10 --complement
```

## 擷取欄位
- 若要擷取這個 csv 檔的特定欄位，可以使用 cut 指令加上 -d 參數指定欄位分隔字元，並以 -f 參數指定欲擷取的欄位，例如擷取出第 2 個欄位：
```clike
# 擷取 CSV 檔的第二個欄位
cut -d , -f 2 data.csv
```

## 輸出分隔字元
```clike
# 指定輸出欄位分隔字元
head -n 5 /etc/passwd | cut -d : -f 1,7 --output-delimiter="^_^"
root^_^/bin/bash
daemon^_^/usr/sbin/nologin
bin^_^/usr/sbin/nologin
sys^_^/usr/sbin/nologin
sync^_^/bin/sync
```

## reference
- [Linux 的 cut 擷取部份字元、欄位指令教學與常用範例整理 - G. T. Wang](https://blog.gtwang.org/linux/linux-cut-command-tutorial-and-examples/)
- [cut 指令: 擷取檔案每行指定範圍資料 - Linux 技術手札](https://www.ltsplus.com/linux/cut-command)