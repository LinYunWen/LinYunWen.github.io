---
title: Data Deduplication
date: 2021-10-11 15:00:03
tags: note, data dedup
---

# Data Deduplication
- 重複數據刪除（英語：data deduplication）是一種節約數據存儲空間的技術
- 在計算機中存儲了很多重複數據，這些數據占用了大量硬碟空間，利用重複數據刪除技術，可以只存儲一份數據。另外一項節約存儲空間的技術是數據壓縮
    - 數據壓縮技術在比較小的範圍內以比較小的粒度查找重複數據，粒度一般為幾個比特到幾個字節。
    - 重複數據刪除是在比較大的範圍內查找大塊的重複數據，一般重複數據塊尺寸在1KB以上。
- 重複數據刪除技術被廣泛應用於網絡硬碟、電子郵件、磁碟備份介質設備等。
    - 用戶文件共享可能有許多相同或相似文件的副本。
    * 從 VM 到 VM，虛擬化來賓可能幾乎相同。
    * 備份快照可能每天都有細微的差異。
<!--more-->
## 分類
### 按數據處理時間重複數據刪除
- 在線重刪
    - 在線重刪（Inline Deduplication）指的是在數據存儲到存儲設備上的同時進行重複數據刪除流程，在數據存儲到硬碟之前，重複數據已經被去除掉了。
- 後重刪
    - 後重刪（Post Deduplication）指的是在寫到存儲設備的同時不進行重刪處理，先把原始數據寫到硬碟上，隨後啟動後台進程對這些原始數據進行重刪處理。
    - 與在線重刪相比較，後重刪需要更高的硬碟性能，需要更多的硬碟數量。

### 按照數據處理粒度
- 文件級重刪
- 塊級別重刪

### 按照數據塊分塊方法
- 變長分塊重刪
- 定長分塊重刪

### 按照數據處理位置
- 源端重刪
- 目的端重刪

## pros
- 節約硬碟空間
    - 由於不必存儲重複數據，因此大大節約的磁碟空間。
* 提升寫入性能
    * 數據寫入存儲設備的主要性能瓶頸在於硬碟，由於硬碟是機械設備，一般單塊硬碟只能提供100MB/s左右的連續寫性能。
    * 在線重複數據刪除在數據存入硬碟之前就把重複的數據刪除掉了，因此存入硬碟的數據量變小了，數據的寫入性能也就提高了。
    * 例如：DataDomain重刪備份介質設備就採用在線重刪技術，因此數據寫入性能較好。
* 節約網絡帶寬
    * 對於使用了源端重刪技術的應用來說，數據上傳到存儲設備之前，已經去掉了重複的數據塊，因此重複的數據塊不需要經過網絡傳輸到存儲介質，從而節約了網絡帶寬。
    * 例如：Dropbox就採用了源端重刪技術，因此占用網絡帶寬很小，還有開源的數據同步工具rsync也採用了源端重刪技術節約網絡帶寬。
## reference
- [重複數據刪除 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E9%87%8D%E5%A4%8D%E6%95%B0%E6%8D%AE%E5%88%A0%E9%99%A4)
- [Data Deduplication Overview | Microsoft Docs](https://docs.microsoft.com/en-us/windows-server/storage/data-deduplication/overview)
- [Understanding Data Deduplication | Microsoft Docs](https://docs.microsoft.com/en-us/windows-server/storage/data-deduplication/understand#how-does-dedup-work)