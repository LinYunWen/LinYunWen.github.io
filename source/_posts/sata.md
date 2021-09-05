---
title: SATA
date: 2021-09-05 10:50:13
tags: [note, sata]
---

# SATA
- SATA是Serial ATA（Serial Advanced Technology Attachment）的縮寫，亦稱串行ATA。它是一種電腦總線，主要功能是用作主機板和大量儲存裝置（如硬碟及光盤驅動器）之間的數據傳輸之用。
- 序列ATA與序列SCSI（SAS: Serial Attached SCSI）的兩者排線相容，SATA硬碟可接上SAS介面。
![](https://i.imgur.com/svoB4VT.png)
![](https://i.imgur.com/0Lhlx9j.png)
<!--more-->
## introduction
- SATA是一種可足以完全取代舊式PATA（Parallel ATA）的新型硬盤接口，因採用串行方式傳輸數據而得名。
- 在數據傳輸上這一方面，SATA的速度比以往更加快捷，並支持熱插拔，使電腦運作時可以插上或拔除硬件。
- 另一方面，SATA總線使用了嵌入式時脈訊號，具備了比以往更強的糾錯能力，能對傳輸指令（不僅是數據）進行檢查，如果發現錯誤會自動矯正，提高了數據傳輸的可靠性。
- 不過，SATA和以往最明顯的分別，是用上了較幼的排線，有利機箱內部的空氣流通，某程度上增加了整個平台的穩定性。

## sata vs pata
- 傳統的 Parallel ATA 使用單模信號放大系統「single-end-signal-amplified-system」。
    - 在這種系統中，雜訊會隨著正常信號一起傳輸、放大，不易被抑制；
    - 在高速時尤其嚴重，為了有效的減少雜訊的干擾，我們只好使用高達5V的電壓來傳送正-常訊號，使大電壓的正常訊號蓋過小電壓的雜訊信號。
    - 雖然大的電壓可以有效的抑制雜訊，但是大的電壓同時也表示驅動電路的生產成本將因此上升，大電壓更不利於高速傳輸系統的設計和製造，高達5V的傳輸電壓限制了追求高速和低成本的可能性。
- 新的SATA 使用了差動信號系統「differential-signal-amplified-system」。
    - 這種系統能有效的將雜訊從正常訊號中濾除，良好的雜訊濾除能力使得SATA只要使用低電壓操作即可，和 Parallel ATA 高達5V的傳輸電壓相比，SATA 只要0.5V(500mv) 的峰對峰值電壓即可操作於更高的速度之上。「比較正確的說法是：峰對峰值『差模電壓』」。
- 和 Parallel ATA 的 5V 驅動電壓相比，0.5V的SATA系統節省電力，其驅動IC的生產成本也較為便宜。


## 頻寬
| 版本 | 頻寬 | 理論速度 | 編碼 |
| --- | --- | --- | --- |
| SATA Express | 16Gb/s | 1969MB/s | 128b/130b |
| SATA 3.0 | 6Gb/s | 600MB/s | 8b/10b |
| SATA 2.0 | 3Gb/s | 300MB/s | 8b/10b |
| SATA 1.0 | 1.5Gb/s | 150MB/s | 8b/10b |
## pin
| Pin # | 功能 |
| --- | --- |
| 1 | Ground |
| 2 | A+（發送） |
| 3 | A−（發送） |
| 4 | Ground |
| 5 | B−（接收） |
| 6 | B+（接收） |
| 7 | Ground |

## reference
- [什麼是SATA, SATA介面簡介 @ Kingsman的部落格 :: 痞客邦 ::](https://myfamily12345.pixnet.net/blog/post/404543587-sata)
- [SATA - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/SATA)
- [SATA相關技術文摘 @ 香醇咖啡 :: 痞客邦 ::](https://peso.pixnet.net/blog/post/28193711)