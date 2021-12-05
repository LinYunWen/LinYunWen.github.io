---
title: 動態主機設定協定（DHCP）
date: 2021-12-05 10:44:06
tags: [note, dhcp, network]
---

# 動態主機設定協定（DHCP）
- Dynamic Host Configuration Protocol
- 是一個用於IP網路的網路協定，位於OSI模型的應用層，使用UDP協定工作，主要有兩個用途：
    * 用於內部網路或網路服務供應商自動分配IP位址給使用者
    * 用於內部網路管理員對所有電腦作中央管理
* 甚至對於那些很少改變位址的伺服器來說，DHCP仍然被建議用來設定它們的位址。如果伺服器需要被重新分配位址（RFC 2071）的時候，就盡可能不去做更改。對於一些裝置，如路由器和防火牆，則不應使用DHCP。

<!--more-->

## 原理
- 動態主機設定協定（DHCP）是一種使網路管理員能夠集中管理和自動分配IP網路位址的通信協定。
    - 在IP網路中，每個連接Internet的裝置都需要分配唯一的IP位址。
    - DHCP使網路管理員能從中心結點監視和分配IP位址。
    - 當某台電腦移到網路中的其它位置時，能自動收到新的IP位址。
- DHCP使用了租約的概念，或稱為電腦IP位址的有效期。
    - 租用時間是不定的，主要取決於使用者在某地連接Internet需要多久，這對於教育行業和其它使用者頻繁改變的環境是很實用的。
    - 透過較短的租期，DHCP能夠在一個電腦比可用IP位址多的環境中動態地重新組態網路。
    - DHCP支援為電腦分配靜態位址，如需要永久性IP位址的Web伺服器。

## structure
<table class="wikitable">
<caption>協定結構
</caption>
<tbody><tr>
<th>8 bits</th>
<th>16 bits</th>
<th>24 bits</th>
<th>32 bits
</th></tr>
<tr>
<td>Op</td>
<td>Htype</td>
<td>Hlen</td>
<td>Hops
</td></tr>
<tr>
<td colspan="4">Xid
</td></tr>
<tr>
<td colspan="2">Secs
</td>
<td colspan="2">Flags
</td></tr>
<tr>
<td colspan="4">Ciaddr
</td></tr>
<tr>
<td colspan="4">Yiaddr
</td></tr>
<tr>
<td colspan="4">Siaddr
</td></tr>
<tr>
<td colspan="4">Giaddr
</td></tr>
<tr>
<td colspan="4">Chaddr (16 bytes)
</td></tr>
<tr>
<td colspan="4">Sname (64 bytes)
</td></tr>
<tr>
<td colspan="4">File (128 bytes)
</td></tr>
<tr>
<td colspan="4">Option (variable)
</td></tr></tbody></table>

-   Op：訊息操作代碼，既可以是引導請求（BOOTREQUEST）也可以是引導答覆（BOOTREPLY）
-   Htype：硬體位址類型
-   Hlen：硬體位址長度
-   Xid：處理ID
-   Secs：從取得到IP位址或者續約過程開始到現在所消耗的時間
-   Flags：標記
-   Ciaddr：客戶機IP位址
-   Yiaddr：「你的」（客戶機）IP位址
-   Siaddr：在bootstrap中使用的下一台伺服器的IP位址
-   Giaddr：用於匯入的接替代理IP位址
-   Chaddr：客戶機硬體
-   Sname：任意伺服器主機名稱，空終止符
-   File：DHCP發現協定中的引導檔名、空終止符、屬名或者空，DHCP供應協定中的受限目錄路徑名
-   Options：可選參數欄位。參考定義選擇列表中的選擇檔案

## protocol
- DHCP統一使用兩個IANA分配的埠作為BOOTP：伺服器端使用67/udp，客戶端使用68/udp。
- DHCP執行分為四個基本過程
    - 請求IP租約
    - 提供IP租約
    - 選擇IP租約
    - 確認IP租約。
- 客戶在獲得了一個IP位址以後，就可以傳送一個ARP請求來避免由於DHCP伺服器位址池重疊而引發的IP衝突。
- ![](https://i.imgur.com/614o52M.png)




## reference
- [動態主機設定協定 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E4%B8%BB%E6%9C%BA%E8%AE%BE%E7%BD%AE%E5%8D%8F%E8%AE%AE)
- [DHCP 伺服器是什麼？如何運用？ - StockFeel 股感](https://www.stockfeel.com.tw/dhcp%E4%BC%BA%E6%9C%8D%E5%99%A8%E6%98%AF%E4%BB%80%E9%BA%BC%EF%BC%9F%E5%A6%82%E4%BD%95%E9%81%8B%E7%94%A8%EF%BC%9F/)
- [DHCP - 網際網路名詞介紹](https://sites.google.com/site/wangjiwanglumingcijieshao/home/dhcp)
- [DHCP (動態主機設定通訊協定) 基本概念 | Microsoft Docs](https://docs.microsoft.com/zh-tw/windows-server/troubleshoot/dynamic-host-configuration-protocol-basics)