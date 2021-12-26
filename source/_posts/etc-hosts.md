---
title: etc/hosts
date: 2021-12-27 07:45:40
tags: [note, linux, network, hosts]
---

# etc/hosts
> - `C:\Windows\System32\drivers\etc\hosts`
> - `/etc/hosts`

<!--more-->
## introduction
![](https://i.imgur.com/RVpOChf.png)
- `hosts` 設定檔的作用跟 DNS 伺服器相同，這個檔案裡面紀錄了一些網址與 IP 位址的對應表
- 就是要查詢一個主機名稱時，如果這個檔案沒定義的話，就會去查DNS。
- 例如，若該檔案的內容有：
    ```
    1.2.3.4   ithelp.ithome.com.tw
    ```
    * 那麼您要連ithelp.ithome.com.tw時，不會去向 DNS 查真正的 IP 是什麼，而馬上往 1.2.3.4 來送。
    * 過去一些病毒，就是把一堆的防毒軟體的官方網站，都列到這個hosts檔案中，統統都指向到 127.0.0.1 ，也就是電腦本身，導致都無法更新病毒碼，也無法連到防毒軟體的網站；只要把 hosts 這些的內容刪掉，就會往 DNS 去查真正 IP 的位置；這是病毒利用 hosts 的負面作法。
    * 如果有一些常要連的目標，若 DNS 常會有問題，或者很清楚其 IP ，也可以手動去加上 IP 及其對應名稱；或者若 DNS 還沒有設好，而主機上有好幾個虛擬主機的話，且是用 virtual name 來對應的話，也可以利用 hosts 的功能，這樣在這台電腦上 query 該名稱，雖 DNS 還沒有該記錄，但您電腦就可 query 到正確的 IP 所在，而虛擬主機也可以由被 query 的hostname來做出回應；這是 hosts 可以的正向作法。

## setup
- 這個 `hosts` 設定檔的內容預設應該都只有註解（`#` 開頭的就是註解）
- 第一個欄位是 IP 位址，然後使用空白或 Tab 分隔，第二個欄位就放主機的 FQDN（也就是網址）。


## reference
- [手動設定網址與 IP 對應的 hosts 檔教學，適用 Windows、Mac OS X 與 Linux 系統 - G. T. Wang](https://blog.gtwang.org/windows/windows-linux-hosts-file-configuration/)
- [這個路徑內的資料夾hosts是何用處 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/questions/10014713)