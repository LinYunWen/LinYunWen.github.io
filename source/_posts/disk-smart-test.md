---
title: Disk SMART Test
date: 2021-10-10 09:44:04
tags: [note, disk, smart, test, book section]
---

# Disk SMART Test
- S.M.A.R.T.，全稱為「Self-Monitoring Analysis and Reporting Technology」，即「自我監測、分析及報告技術」，是一種自動的硬碟狀態檢測與預警系統和規範。
- 通過在硬碟硬體內的檢測指令對硬碟的硬體如磁頭、碟片、馬達、電路的執行情況進行監視、記錄並與廠商所設定的預設安全值進行比較，若監視情況將要或已超出預設安全值的安全範圍，就可以通過主機的監視硬體或軟體自動向使用者作出警告並進行輕微的自動修復，以提前保障硬碟資料的安全。
- 除一些出廠時間極早的硬碟外，現在大部分硬碟均配備該項技術。
<!--more-->
## 功能
- 該技術能使硬碟更穩定的執行。
    -   當硬碟的損壞程度還能在軟體可修復的範圍內（通常由廠商決定），軟體就會自動修理，防止資料的進一步損壞。同時報告異常值，異常程度為**警告**；
    -   當硬碟的損壞程度已經超出軟體的修復承載範圍（通常由廠商決定），軟體則會盡最大能力防止再次寫入資料的遺失（如避開已損壞磁區），同時會報告異常值，異常程度為**危險**；
    -   BIOS自檢時，主機板會檢測硬碟的S.M.A.R.T.資訊，如果硬碟的異常程度為危險時，會提醒使用者及時備份資料（如嗡鳴聲或顯示文字）。
    -   Windows 7或以上的Windows系統，如果檢測到硬碟的S.M.A.R.T.錯誤，也會彈出警告視窗，提示使用者備份資料。
## 原理
- 該技術所需資料被存放在硬碟物理盤面最前面的磁軌中
- 由硬碟製作商將相關管理程式和資料該磁軌中，包括加解密程式，自監視程式，自修復程式等
- 主機的監視軟體可以通過「SMART RETURN STATUS」的命令讀取S.M.A.R.T.資訊，且這些資訊不允許被使用者直接修改。

## mode
* Short
    * Checks the electrical and mechanical performance as well as the read performance of the disk. Electrical tests might include a test of buffer RAM, a read/write circuitry test, or a test of the read/write head elements. Mechanical test includes seeking and servo on data tracks. Scans small parts of the drive's surface (area is vendor-specific and there is a time limit on the test). Checks the list of pending sectors that may have read errors, and it usually takes under two minutes.
* Long/extended
    * A longer and more thorough version of the short self-test, scanning the entire disk surface with no time limit. This test usually takes several hours, depending on the read/write speed of the drive and its size.
* Conveyance
    * Intended as a quick test to identify damage incurred during transporting of the device from the drive manufacturer to the computer manufacturer. Only available on ATA drives, and it usually takes several minutes.
* Selective
    * Some drives allow selective self-tests of just a part of the surface.

## check
- in windows
    - `wmic diskdrive get model,status`
- unix
    ```clike
   # Debian, Ubuntu
   $ sudo aptitude install smartmontools 

   # CentOS, RHEL, Fedora
   $ sudo yum install smartmontools
   ```
- mac
    - On a Mac, open Disk Utility from /Applications/Utilities/, click on the drive, and look at S.M.A.R.T. Status in the bottom left, which will either read Verified or Failing.

## reference
- [S.M.A.R.T. - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/S.M.A.R.T.)
- [S.M.A.R.T. - Wikipedia](https://en.wikipedia.org/wiki/S.M.A.R.T.)
- [檢測硬碟 SMART 健康狀態 · 完全用 GNU/Linux 工作](https://chusiang.gitbooks.io/working-on-gnu-linux/content/29.checking-hd-smart.html)