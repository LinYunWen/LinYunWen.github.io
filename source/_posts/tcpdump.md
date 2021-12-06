---
title: tcpdump
date: 2021-12-06 21:53:38
tags: [note, network, linux, tcpdump]
---

# tcpdump
- 錄製網路封包的利器
<!--more-->
## para
| 參數 or 過濾條件 | 說明 | 範例 |
| --- | --- | --- |
| **-i** interface | 指定網卡名稱 | -i ens33 |
| **-c** count | 指定欲監聽的封包數，到達指定數目後即會停止 | -c 100 |
| **-C** file_size | 與**-w**做搭配，指定錄製的每個檔案的大小，單位是採用1MB (1,000,000 bytes)，到達指定的檔案大小後，會自動再產生新檔，新檔名則會加上數字來疊加，例如：test.pcap、test.pcap1、test.pcap2…以此類推 | -C 1 |
| **-Q** in|out|inout | 選擇要擷取封包的傳輸方向，支援in(接收)、out(發送)、inout(雙向)等方向，注意，並非所有的平台都支援此參數 | -Q inout |
| **-w** file | 將擷取的封包存成檔案 | -w demo.pcap |
| **-W** filecount | 與**-C**做搭配，來限制由**-c**所產出的檔案數(請注意大小寫)，當錄製的檔案數超過指定的數目時，則會以輪替的方式覆蓋舊檔，可參考下面之範例7 | -W 3 |
| **-r** file | 從指定的檔案讀取封包檔，該封包檔為-w參數所產生 | -r demo.pcap |
| **-G** rotate_seconds | 類似於**-C**參數，-C是按檔案大小來限制，而-G則是依擷取的秒數來控制檔案。  
註：在封包數不多的情況下，會發生-G的秒數到達時，不會自動停止的情況，不要太依靠此參數 | -G 10 (10秒一個檔案) |
| **-nn** | 用IP及Port來顯示主機名稱 | tcpdump -i ens33 -nn |
| **-q** | 列出精簡的封包訊息 | tcpdump -i ens33 -q |
| **-v or -vv** | 輸出更多的詳細訊息 | tcpdump -i ens33 -vv |
| **host** ip | 指定主機名稱或IP | host www.google.com 或 host 172.16.66.200，若沒有指定** src **或** dst **，則預設為「來源」或「目的」二者皆可 |
| **port** number | 指定連結埠 | port 1234，若沒有指定** src **或** dst **，則預設為「來源」或「目的」二者皆可 |
| **src** | 指定來源 | src host 172.16.66.200 |
| **dst** | 指定目的 | dst host 172.16.66.200 |
| **and / or / not** | 邏輯運算：and (&&)、or (||)、not (!) | host 172.16.66.200 or 172.16.66.188 |
| **tcp / udp / icmp / ip6** 等協定 | 抓取 X 協定的流量封包，請參考範例4 | tcp and host 172.16.66.200 |
| **portrange** range | 指定連接埠範圍 | portrange 21-23 |
| **ether** address | 指定主機的MAC Address | ether host 16:69:44:e3:01:57 |
| **net** network | 指定特定網段 | net 192.16.66.100 或 net 192.16.66.0/24 |
| **(** 或 **)** | 支援小括號，可以搭配跳脫符號 \ 或使用單引號使用，可參考下方範例10。(可多利用單引號) | \\(dst port 443 or 22\\) 或 ‘(dst port 443 or 22)’ |


## reference
- [[Linux] Tcpdump 擷取封包指令範例教學 - 靖技場](https://www.jinnsblog.com/2020/09/linux-tcpdump-network-traffic-tutorial.html)