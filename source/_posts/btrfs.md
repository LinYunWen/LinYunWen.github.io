---
title: btrfs
date: 2021-09-20 14:15:53
tags: [note, fs, btrfs]
---

# Btrfs
- Btrfs（B-tree檔案系統，通常念成Butter FS，Better FS或B-tree FS）

## introduction
- 一種支援寫入時複製（COW）的檔案系統，運行在Linux作業系統，採用GPL授權
    - 但比較精確的說法應該是： 它們都屬於 "ROW (redirect-on-write)" 類型的檔案系統 -- 每當檔案內容更新時， 會把新的內容寫到新的磁區， 而不是覆蓋掉原先的磁區
    - zfs 跟 btrfs 較適合用於 ssd 而較不適合用於機械式的硬碟， 因為 fragmentation 的問題會令後者速度變很慢。
<!--more-->
- 於Linux Kernel 2.6.29時合併入Linux Kernel主線，並在2014年時宣佈它的磁碟格式進入穩定版本。
- 目標是取代Linux目前的ext3檔案系統，改善ext3的限制
    - 特別是單個檔案的大小，總檔案系統大小或檔案檢查
    - 加入ext3未支援的功能
        - 像是可寫快照（writable snapshots）
        - 快照的快照（snapshots of snapshots）
        - 內建磁碟陣列（RAID）
        - 以及子卷（subvolumes）。
- Btrfs也宣稱專注在「容錯、修復及易於管理」。
- 想像整個 btrfs 是一棵樹 (像是很多層的 nested array 或 nested dict)。 每次資料有變動要寫回硬碟上， 都是重新要一塊儲存空間而不是寫回原處。 如果沒有快照 (snapshot) 用到這一小塊資料， 舊的空間就可以回收再利用； 如果有快照用到它， 那麼舊的空間就不可以回收。 更簡單的想像： 目前的檔案系統跟快照所佔用的空間大小， 就像撕開了一小角的貼紙跟底板紙所佔的總面積， 檔案系統的改變越多， 貼紙就撕得越開、 空間用得越兇。

## history
- 目前參與Btrfs開發的主要廠商包括Facebook、SUSE、Fujitsu及Oracle
> Ext4的主要開發者Theodore Ts'o曾表示：「雖然Ext4已經添加了不少新特性，不過那只是之前舊科技的延續，考慮到Btrfs所帶來在擴展性、可靠性、與管理便利性的進步，它將是檔案系統發展的下一步」。

### Silent Data Corruption
- 造成儲存裝置資料錯誤的原因很多
    - 例如硬碟運作時的震動
    - 資料當初就到寫入錯誤的位置（Misdirected Write）
    - 不完全寫入（Torn Write）
    - 儲存單元不斷縮小造成的訊噪比下降、同時又要求高速讀寫，使得越來越難保證資料儲存的正確性。
- 其實儲存裝置的韌體（Firmware）本身就具有一定的容錯能力，例如大多數硬碟都具備將壞軌重新映射到備用磁軌的能力
    - 以現代常見的NAS專用硬碟來說，大約每11TiB的資料讀取，才會發生一次韌體無法修復的讀取錯誤。
    - 不過，使用這類修復機制的前提是，必須依賴儲存裝置能在讀寫時就察覺錯誤。
    - 在某些類型的錯誤中，硬體的讀寫操作其實有順利完成，但部分資料內容悄悄發生變化而損毀，以致於儲存裝置無法套用原本的修復機制，這類型的錯誤就稱為無聲資料損毀（Silent Data Corruption）

### 傳統RAID架構的限制
- 當Disk A出現壞軌或是硬碟故障，即可用Disk B、C、D將資料復原，此架構已證實對一般明確的壞軌或是硬碟故障所造成的資料損毀非常有用
- 但對於硬體沒有回報錯誤的無聲資料損毀，這種傳統的RAID架構往往力不從心，主要的問題來自偵錯代價大、難以定位錯誤兩個方面。
    - 在偵錯代價方面，以剛剛RAID-5的例子而言，如圖3所示，若要在每次讀取Disk A時都驗證資料的正確性，就必須同時將Disk B、C、D相對應的區塊也都讀起來，才有辦法做RAID-5同位元（Parity）的檢查。
        - ![](https://i.imgur.com/HJbNFLx.png)
    - 假設不辭辛勞真的把每顆硬碟的資料都讀起來比對（即RAID Data Scrubbing），當發現Parity不一致時，也無法確認到底誰是對的，誰是錯的。如圖4所描述，因為Disk B、C、D中任何一顆硬碟的資料跑掉都會造成Parity改變，如果在發現不一致時，總是假設Parity正確並去修復資料，越修越壞的可能性其實蠻大。
        - ![](https://i.imgur.com/UW5vEJd.png)
### Btrfs利用Checksum抵抗無聲資料損毀
- 傳統RAID架構的Parity適合在錯誤已知的情況下修復錯誤，但不適用於主動偵測及定位錯誤
    - 為了補足這個部分，通常會使用Checksum來驗證資料的正確性。因為Checksum本身相較於原始資料，長度相當短，又不必平均分散在所有硬碟中，所以在驗證Checksum時不容易有Parity碰到的I/O放大的問題。
- 在Linux系統中廣受歡迎的Ext4和XFS檔案系統，已經在後期的版本中將Metadata Checksum列為可選的功能
- 一些新一代的檔案系統例如ZFS與ReFS，則全面為Metadata和Data提供Checksum的能力。
- Btrfs即為Linux Kernel主線提供的檔案系統中，目前唯一同時提供Metadata及Data Checksum的檔案系統。
    - Btrfs檔案系統修復的範例，在每次讀檔或執行Btrfs Data Scrubbing時，除了讀取資料外，也會讀取相對應的Checksum來做比對
    - 由於Btrfs本身即內建RAID管理多硬碟的能力，一旦比對發現資料與Checksum不一致，就會利用Btrfs RAID的Parity或Mirror，取得另一個版本的資料，並重新比對Checksum。
    - 只有當資料與Checksum比對一致，才會視為正確的資料版本，並在背景自動修復錯誤的地方。
        - ![](https://i.imgur.com/P7WYtCz.png)
    - 若不幸無聲資料損毀發生在Checksum本身（雖然機率極低），只要資料與Checksum比對不一致，一樣會觸發Btrfs RAID使用Parity或Mirror取得另一個版本的資料與Checksum，只有當資料和Checksum比對完全一致時才會真正做修復，不會有傳統RAID架構下，資料可能越修越壞的疑慮

## 特性
> - Btrfs，2007年前，已實現
* 連線碎片整理
* 連線卷生長和收縮
* 連線塊裝置增加和刪除
* 連線負載均衡（塊裝置間的物件移動以達到平衡）
* 檔案系統級的鏡像（類RAID-1）、條帶（類RAID-0）
* 子卷（一個或多個單獨可掛載基於每個物流分割區）
* 透明壓縮（目前支援zlib、LZO和ZSTD (從 4.14 開始支援)）
* 快照（唯讀和可寫，寫複製，子卷複製）
* 檔案克隆
* 資料和元資料的校驗和（目前是CRC-32C）
* 就地轉換（帶回滾）ext3/4
* 檔案系統種子
* 使用者定義的事務
* 塊丟棄支援
## reference
- [Btrfs - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/Btrfs)
- [「無聲資料損毀」難防　Btrfs檔案系統來保護 | 網管人](https://www.netadmin.com.tw/netadmin/zh-tw/technology/BFF6D67A985545F78A1FB8F2A12BE9ED)
- [Btrfs 有 Bug 令儲存空間損毀？NAS用家需注意！勤備份以防存檔死清光 - XFastest Hong Kong](https://hk.xfastest.com/126805/synology-btrfs-filesystem-bug-crash-metadata/)
- [玩具烏托邦: 從觀念到實作的 btrfs 入門教學](https://newtoypia.blogspot.com/2020/09/btrfs.html)
- [Btrfs vs ZFS 實現 snapshot 的差異 - Farseerfc的小窩](https://farseerfc.me/btrfs-vs-zfs-difference-in-implementing-snapshots.html)
- [Introduction to Btrfs Filesystem](https://linuxhint.com/btrfs-filesystem-beginner-guide/)
- [redirect on write – Technoscoop](https://technoscooop.wordpress.com/tag/redirect-on-write/)