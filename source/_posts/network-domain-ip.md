---
title: Domain/IP 介紹
date: 2022-01-23 21:58:53
tags: [note, network, ip]
---

# Domain/IP 介紹


## domain introduction
> - 網域 ＝ 網域名稱 ＝ 域名
- 方便人們記憶
- DNS（Domain Name System）就被發展出來，做為將網域名稱與 IP 位址互相對映的分散式資料庫
- 網域通常都是是由右至左解讀：
    - 從網址最末端的 “.” (dot = zoot zone) 開始，但通常都不會顯示
    - 再來是「頂級網域」，通常是 “.com” , “.net”, “gov” 結尾
    - 接著是你註冊的「根網域」，在上圖的例子中 websiteurl.com 就是根網域
- 在根網域之前，全部都可以稱為 「子網域」，可以隨意的命名，各階層上限是 63 個字元，總長度不超過 253 個字元即可

![](https://i.imgur.com/iJ8uuOa.png)

<!--more-->

### 頂級網域（Top-Level Domains, TLDs / Zone）
- 而我們也依照「型態」將域名分成以下三種：分別是「通用頂級網域」、「國家頂級域名」和「新頂級域名」。
#### 通用頂級網域 (gTLD, Generic Top-Level Domain) 
- 一般常見的 .com / .net / .org / .edu 等結尾，都是屬於通用頂級網名，這類的域名由網際網路名稱與數字地址分配機構 (IANA) 管理。

## 國家頂級域名 (ccTLD, Country-Code Top-Level Domain) 
- 由 ISO-3166 的二位字母代碼所組成的國家或地區名稱縮寫，主要目的是讓搜尋引擎知道你的服務是提供給哪國人民。
- ccTLD 多由各國域名管理機構管理
- 要注意的是許多 ccTLD 都有一些限制，比如會要求公司的總部需要設在當地，或遵循當地的數位與網路條例才能註冊使用
:::info
- .ME 被經常用來做個人網站使用，但其實這是來自東歐蒙特內哥羅共和國 (Montenegro)
- 而企業新創愛用的 .IO 域名，則是來自南美洲哥倫比亞 (Columbia) 的 ccTLD。這些國家頂級域名之所以能被自由地註冊使用，是因為這些國家政府並沒有特別限制規定。
:::

#### 新頂級域名 (New gTLD, New Generic Top-Level Domain) 
- 「新頂級域名」能讓企業註冊與產業相符的域名，目的是希望能讓客戶一眼明白網址所代表的含義，例如：.book、.shoes、.net、.online 等
- 由於網域名稱是採先註冊先取得原則，如果想取得的名稱已被註冊走，除了可以和對方接洽購回網域外，還可以利用域名爭議仲裁取得網域。

### 次級網域（Second-Level Domain, SLD）

### 主網域（Domain）
- 每一個虛擬主機帳號都需要有一個網域名稱才能進行瀏覽、收發信件或是上傳檔案的動作。通常我們向 GoDaddy 或是 PChome 購買的網址 (domain)，就是買這種「第一層 (頂級) ＋第二層 (次級) 的網域名稱」，如「bettywutalk.com」、「bettywutalk.org」、「bettywutalk.com.tw」。
- 根網域 (root domain) 又稱為「裸域」

## 子網域（Sub-Domain）
- 「子網域」是第三級以下的域網名稱，被加在「根網域」的左方



## IP introduction
- 所有連線至互聯網的網站和裝置都有獨特的 IP 位址，作為通訊的識別碼

### 特殊 IP
| 位址網段 ([CIDR](https://zh.wikipedia.org/wiki/%E6%97%A0%E7%B1%BB%E5%88%AB%E5%9F%9F%E9%97%B4%E8%B7%AF%E7%94%B1 "無類別域間路由")) | 範圍 | 位址數 | 效用域 | 用途 |
| --- | --- | --- | --- | --- |
| 0.0.0.0/8 | 0.0.0.0 – 0.255.255.255 | 16,777,216 | 軟體 | 用於廣播資訊到當前主機。[\[1\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-1) |
| 10.0.0.0/8 | 10.0.0.0 – 10.255.255.255 | 16,777,216 | 專用網路 | 用於[專用網路](https://zh.wikipedia.org/wiki/%E4%B8%93%E7%94%A8%E7%BD%91%E7%BB%9C "專用網路")中的本地通信。[\[2\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc1918-2) |
| 100.64.0.0/10 | 100.64.0.0 – 100.127.255.255 | 4,194,304 | 專用網路 | 用於在[電信級NAT](https://zh.wikipedia.org/wiki/%E7%94%B5%E4%BF%A1%E7%BA%A7NAT "電信級NAT")環境中服務提供商與其使用者通信。[\[3\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-3) |
| 127.0.0.0/8 | 127.0.0.0 – 127.255.255.255 | 16,777,216 | 主機 | 用於到本地主機的[環回位址](https://zh.wikipedia.org/wiki/IPv4#%E7%8E%AF%E5%9B%9E%E5%9C%B0%E5%9D%80(Loopback_Address) "IPv4")。[\[4\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-4) |
| 169.254.0.0/16 | 169.254.0.0 – 169.254.255.255 | 65,536 | 鏈路 | 用於單鏈路的兩個主機之間的[鏈路本地位址](https://zh.wikipedia.org/wiki/%E9%93%BE%E8%B7%AF%E6%9C%AC%E5%9C%B0%E5%9C%B0%E5%9D%80 "鏈路本地位址")，而沒有另外指定IP位址，例如通常從[DHCP](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E4%B8%BB%E6%9C%BA%E8%AE%BE%E7%BD%AE%E5%8D%8F%E8%AE%AE "動態主機設定協定")伺服器所檢索到的IP位址。[\[5\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-5) |
| 172.16.0.0/12 | 172.16.0.0 – 172.31.255.255 | 1,048,576 | 專用網路 | 用於[專用網路](https://zh.wikipedia.org/wiki/%E4%B8%93%E7%94%A8%E7%BD%91%E7%BB%9C "專用網路")中的本地通信。[\[2\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc1918-2) |
| 192.0.0.0/24 | 192.0.0.0 – 192.0.0.255 | 256 | 專用網路 | 用於IANA的IPv4特殊用途位址表。[\[6\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc5736-6) |
| 192.0.2.0/24 | 192.0.2.0 – 192.0.2.255 | 256 | 文件 | 分配為用於文件和範例中的「TEST-NET」（測試網），它不應該被公開使用。[\[7\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc5737-7) |
| 192.88.99.0/24 | 192.88.99.0 – 192.88.99.255 | 256 | 網際網路 | 用於[6to4](https://zh.wikipedia.org/wiki/6to4 "6to4")[任播](https://zh.wikipedia.org/wiki/%E4%BB%BB%E6%92%AD "任播")中繼。[\[8\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-8)（已廢棄[\[9\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc7526-9)） |
| 192.168.0.0/16 | 192.168.0.0 – 192.168.255.255 | 65,536 | 專用網路 | 用於[專用網路](https://zh.wikipedia.org/wiki/%E4%B8%93%E7%94%A8%E7%BD%91%E7%BB%9C "專用網路")中的本地通信。[\[2\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc1918-2) |
| 198.18.0.0/15 | 198.18.0.0 – 198.19.255.255 | 131,072 | 專用網路 | 用於測試兩個不同的子網路的網間通信。[\[10\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-10) |
| 198.51.100.0/24 | 198.51.100.0 – 198.51.100.255 | 256 | 文件 | 分配為用於文件和範例中的「TEST-NET-2」（測試-網-2），它不應該被公開使用。[\[7\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc5737-7) |
| 203.0.113.0/24 | 203.0.113.0 – 203.0.113.255 | 256 | 文件 | 分配為用於文件和範例中的「TEST-NET-3」（測試-網-3），它不應該被公開使用。[\[7\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc5737-7) |
| 224.0.0.0/4 | 224.0.0.0 – 239.255.255.255 | 268,435,456 | 網際網路 | 用於多播。[\[11\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc1112-11) |
| 233.252.0.0/24 | 233.252.0.0 - 233.252.0.255 | 256 | 文件 | 分配為用於文件和範例中的「MCAST-TEST-NET」，它不應該被公開使用 |
| 240.0.0.0/4 | 240.0.0.0 – 255.255.255.254 | 268,435,455 | 網際網路 | 用於將來使用。[\[12\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc6890-12) |
| 255.255.255.255/32 | 255.255.255.255 | 1 | 子網路 | 用於受限廣播位址。[\[12\]](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80#cite_note-rfc6890-12) |


## reference
- [保留IP位址 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E4%BF%9D%E7%95%99IP%E5%9C%B0%E5%9D%80)
- [主網域、子網域、網域寄放和附加網域是什麼？對SEO有何影響？ - 矽谷獨角獸學院](https://bettywutalk.com/blog/domains/)
- [專用網路 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E4%B8%93%E7%94%A8%E7%BD%91%E7%BB%9C)