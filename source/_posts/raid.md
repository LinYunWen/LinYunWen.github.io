---
title: RAID
date: 2021-07-26 20:29:38
tags: [note, raid]
---

# RAID
> - Redundant Array of Independent Disks

## introduction
- 透過多台硬碟堆疊成一台高容量使用的『虛擬磁碟』，而 RAID 核心技術就是『虛擬架構』

- RAID 有一基本概念稱為EDAP (Extended Data Availability and Protection)，其強調擴充性及容錯機制
    * 自動偵測故障硬碟 (RAID Auto Error Detection)
    * 重建故障硬碟的資料 (RAID Rebuild and Recovery)
    * 支援不需關機的硬碟備援 (RAID Hot Spare)
    * 支援不需關機的硬碟替換 (RAID Hot Swap)
    * 擴充硬碟容量等 (Raid Hot Expanding)

- RAID 磁碟陣列的儲存原理是用 **“Bit Striping“**及目前主流 **“Block Striping“**的分割方式，將資料分散儲存至各硬碟中，當硬碟受損時則經由 XOR 運算，再將存在其他各硬碟內的 Parity Blocks 及 Data Stripe 磁區的 Data Blocks，進行計算而重建資料 Rebuild。

- RAID把多個硬碟組合成為一個邏輯磁區，因此，作業系統只會把它當作一個硬碟。RAID常被用在伺服器電腦上，並且常使用完全相同的硬碟作為組合。由於硬碟價格的不斷下降與RAID功能更加有效地與主機板整合，它也成為玩家的一個選擇，特別是需要大容量儲存空間的工作，如：視訊與音訊製作。
<!--more-->
## 類型
- RAID 是將多台硬碟堆疊起來構成一個高容量『虛擬磁碟 Virtual Disk』，建構技術分為硬體磁碟陣列（Hardware Controller Array）和軟體磁碟陣列（Software Controller Array）兩種
### 硬體磁碟陣列 Hardware Controller Array
- ![](https://i.imgur.com/D1cm7Xc.png)
    - 如上圖照片所示，是一片 RAID Controller Card 或主機板內建 Array 晶片，主要控制元件就是 Array Controller Chip ，知名廠牌有 IBM、HP、Dell、LSI、Intel.......
    - RAID 控制晶片功能可將多台硬碟『堆疊成一台高容量的虛擬磁碟』，並控制所有磁頭組同步讀寫。

- Hardware Controller 的特性：
    - 以『硬碟』為單位，多台『實體硬碟』組合，這層是實體非虛擬。(後註)
    - 運作穩定，讀寫快速。
    - 擁有獨立讀寫通道、晶片獨立運算，獨立記憶體、擴充性高。
    - 因為是由 RAID 介面卡控制，不受作業系統影響。
    - 需另購RAID Card，操作有一點難度。

### 軟體磁碟陣列 Software Controller Array
- ![](https://i.imgur.com/riwQhcc.png)
    - 如上圖所見，Software Controller Array是經由 Windows Server、Linux、MacOS...作業系統內提供 Array console 將多台硬碟內多個分割區 Partition，是以 Partition 為單位，『堆疊成一台高容量的虛擬磁碟』並控制所有磁頭組同步讀寫。
    - 實作上在 Windows Server 的「磁碟管理工具」中，就有提供先把現有多台硬碟內數個分割區 Partition 改成「動態磁碟 Dynamic Disks」，再建構成各種等級 Array 。
- 時下流行的 NAS 系統，就是由 Linux 系統建立而成的。

- RAID Software Controller 的特性
    - 因屬作業系統內建 RAID 工具，免費易操作。因是作業系統內建，所以運算時會加重作業系統負擔，存取速度慢。
    - 基層底部是硬碟分割區 Partition (已是虛擬)，非實體硬碟。
    - 當作業系統受損當機時，控制 RAID 的組態設定 (Array Configuration) 也同時遭破壞，導致資料無法讀取。
    - 虛擬架構一層又一層，當其中任何一層虛擬架構遭破壞，Array 即無法讀寫。受損風險較高。

## RAID 磁碟陣列的優點
### 高容量、讀取速度快、容錯機制
- 【資料方便存取】
    - 雖然是多台硬碟，但已整合成一台高容量的『虛擬儲存空間』使用，不必在各硬碟間 C: D: ...來回切換。
- 【高容量】
    - RAID 是將多台硬碟堆疊組合成一台高容量『虛擬磁碟』，RAID 的總容量計算公式是 N=1+1+1+....，例如串接共 4 台 1TB 硬碟建構成 RAID 5 後，使用者在Windows、Mac、Linux 看到的是一個 3TB 的高容量儲存設備。
- 【讀寫快速】
    - 多台硬碟內的多組讀寫磁頭同步動作，檔案的讀寫時間能夠更快速。
- 【容錯功能 Fault Tolerant】
    - RAID 的『容錯』機制，是指容許內部硬碟故障1-2台還可讀取資料，用意是事先預警，讓使用者還有時間備份資料 or 更換硬碟，但只限 RAID 1、RAID 5、RAID 6、RAID 10 等級。

## 種類
![](https://i.imgur.com/bl1Lp3v.png)
### RAID 0
![](https://i.imgur.com/wW9u1MT.png)
- RAID 0亦稱為帶區集。它將兩個以上的磁碟並聯起來，成為一個大容量的磁碟。
- 在存放資料時，分段後分散儲存在這些磁碟中，因為讀寫時都可以並列處理，所以在所有的級別中，RAID 0的速度是最快的。
- 但是RAID 0既沒有冗餘功能，也不具備容錯能力，如果一個磁碟（物理）損壞，所有資料都會遺失，危險程度與JBOD相當。

### RAID 1
![](https://i.imgur.com/pO5BkAq.png)
- 兩組以上的N個磁碟相互作鏡像，在一些多執行緒作業系統中能有很好的讀取速度，理論上讀取速度等於硬碟數量的倍數，與RAID 0相同。
- 另外寫入速度有微小的降低。只要一個磁碟正常即可維持運作，可靠性最高。其原理為在主硬碟上存放資料的同時也在鏡像硬碟上寫一樣的資料。
- 當主硬碟（物理）損壞時，鏡像硬碟則代替主硬碟的工作。因為有鏡像硬碟做資料備份，所以RAID 1的資料安全性在所有的RAID級別上來說是最好的。
- 但無論用多少磁碟做RAID 1，僅算一個磁碟的容量，是所有RAID中磁碟利用率最低的一個級別。
- 如果用兩個不同大小的磁碟建RAID 1，可用空間為較小的那個磁碟，較大的磁碟多出來的空間也可以分割成一個區來使用，不會造成浪費。
- ​       Size = min (S1, S2, S3, ... )

### RAID 2
![](https://i.imgur.com/cm2xzfw.png)

- 這是RAID 0的改良版，以漢明碼（Hamming Code）的方式將資料進行編碼後分割為獨立的位元，並將資料分別寫入硬碟中。
- 因為在資料中加入了錯誤修正碼（ECC，Error Correction Code），所以資料整體的容量會比原始資料大一些，RAID2最少要三台磁碟機方能運作。

### RAID 3
![](https://i.imgur.com/9oWe2pq.png)
- 採用Bit－interleaving（資料交錯儲存）技術，它需要通過編碼再將資料位元分割後分別存在硬碟中，而將同位元檢查後單獨存在一個硬碟中，但由於資料內的位元分散在不同的硬碟上，因此就算要讀取一小段資料資料都可能需要所有的硬碟進行工作，所以這種規格比較適於讀取大量資料時使用。

### RAID 4
![](https://i.imgur.com/ip3ElYc.png)
- 它與RAID 3不同的是它在分割時是以區段為單位分別存在硬碟中，但每次的資料存取都必須從同位元檢查的那個硬碟中取出對應的同位元資料進行核對，由於過於頻繁的使用，所以對硬碟的損耗可能會提高。（塊交織技術，Block interleaving）

### RAID 5
![](https://i.imgur.com/78AVAvt.png)
- RAID  5是一種儲存效能、資料安全和儲存成本兼顧的儲存解決方案。它使用的是Disk Striping（硬碟分割）技術。RAID 5至少需要三塊硬碟，RAID 5不是對儲存的資料進行備份，而是把資料和相對應的奇偶校驗資訊儲存到組成RAID5的各個磁碟上，並且奇偶校驗資訊和相對應的資料分別儲存於不同的磁碟上。
- 當RAID5的一個磁碟資料發生損壞後，可以利用剩下的資料和相應的奇偶校驗資訊去取消復原被損壞的資料。
- RAID 5可以理解為是RAID 0和RAID 1的折衷方案。RAID 5可以為系統提供資料安全保障，但保障程度要比鏡像低而磁碟空間利用率要比鏡像高。
- RAID 5具有和RAID 0相近似的資料讀取速度，只是因為多了一個奇偶校驗資訊，寫入資料的速度相對單獨寫入一塊硬碟的速度略慢，若使用「回寫快取」可以讓效能改善不少。同時由於多個資料對應一個奇偶校驗資訊，RAID 5的磁碟空間利用率要比RAID 1高，儲存成本相對較便宜。
       Size = (n-1) x min (S1, S2, ..., Sn)

### RAID 6
![](https://i.imgur.com/c1abDLc.png)
- 與RAID 5相比，RAID 6增加第二個獨立的奇偶校驗資訊塊。兩個獨立的奇偶系統使用不同的演算法，資料的可靠性非常高，任意兩塊磁碟同時失效時不會影響資料完整性。RAID 6需要分配給奇偶校驗資訊更大的磁碟空間和額外的校驗計算，相對於RAID 5有更大的IO操作量和計算量，其「寫效能」強烈取決於具體的實現方案，因此RAID6通常不會通過軟體方式來實現，而更可能通過硬體/韌體方式實現。
- 同一陣列中最多容許兩個磁碟損壞。更換新磁碟後，資料將會重新算出並寫入新的磁碟中。依照設計理論，RAID 6必須具備四個以上的磁碟才能生效。
- 可使用的容量為硬碟總數減去2的差，乘以最小容量，公式為：
       Size = (n-2) x min (S1, S2, S3, ..., Sn)
- 同理，資料保護區域容量則為最小容量乘以2。
- RAID 6在硬體磁碟陣列卡的功能中，也是最常見的磁碟陣列等級。

### JBOD（Just a Bunch Of Disks）
![](https://i.imgur.com/mCOonxZ.png)
- JBOD在分類上，JBOD並不是RAID的等級。由於並沒有規範，市場上有兩類主流的做法
- 使用單獨的連結埠如SATA、USB或1394同時控制多個各別獨立的硬碟，使用這種模式通常是較高階的裝置，還具備有RAID的功能，不需要依靠JBOD達到合併邏輯磁區的目的。
- 只是將多個硬碟空間合併成一個大的邏輯硬碟，沒有錯誤備援機制。
- 資料的存放機制是由第一顆硬碟開始依序往後存放，即作業系統看到的是一個大硬碟（由許多小硬碟組成的）。但如果硬碟損毀，則該顆硬碟上的所有資料將無法救回。若第一顆硬碟損壞，通常無法作救援（因為大部分檔案系統將磁碟分割表（partition table）存在磁碟前端，即第一顆），失去磁碟分割表即失去一切資料，若遭遇磁碟陣列資料或硬碟出錯的狀況，危險程度較RAID 0更劇。
- 它的好處是不會像RAID，每次存取都要讀寫全部硬碟。但在部分的JBOD資料恢復實踐中，可以恢復未損毀之硬碟上的資料。同時，因為每次讀寫操作只作用於單一硬碟，JBOD的傳輸速率與I/O表現均與單顆硬碟無異。
       Size = sum of all discs

### RAID 7
- RAID 7並非公開的RAID標準，而是Storage Computer Corporation的專利硬體產品名稱，RAID 7是以RAID 3及RAID 4為基礎所發展，但是經過強化以解決原來的一些限制。另外，在實作中使用大量的快取記憶體以及用以實現非同步陣列管理的專用即時處理器，使得RAID 7可以同時處理大量的IO要求，所以效能甚至超越了許多其他RAID標準的實做產品。但也因為如此，在價格方面非常的高昂。

### RAID 10/01
![](https://i.imgur.com/ggdCL1b.png)
![](https://i.imgur.com/gqsbF61.png)
- RAID 10是先鏡射再分割資料，再將所有硬碟分為兩組，視為是RAID 0的最低組合，然後將這兩組各自視為RAID 1運作。
- RAID 01則是跟RAID 10的程式相反，是先分割再將資料鏡射到兩組硬碟。它將所有的硬碟分為兩組，變成RAID 1的最低組合，而將兩組硬碟各自視為RAID 0運作。
- 當RAID 10有一個硬碟受損，其餘硬碟會繼續運作。RAID 01只要有一個硬碟受損，同組RAID 0的所有硬碟都會停止運作，只剩下其他組的硬碟運作，可靠性較低。如果以六個硬碟建RAID 01，鏡射再用三個建RAID 0，那麼壞一個硬碟便會有三個硬碟離線。因此，RAID 10遠較RAID 01常用，零售主機板絕大部份支援RAID 0/1/5/10，但不支援RAID 01。

### RAID 50
![](https://i.imgur.com/0f1MlRe.png)
- RAID 5與RAID 0的組合，先作RAID 5，再作RAID 0，也就是對多組RAID 5彼此構成Stripe存取。由於RAID 50是以RAID 5為基礎，而RAID 5至少需要3顆硬碟，因此要以多組RAID 5構成RAID 50，至少需要6顆硬碟。以RAID 50最小的6顆硬碟組態為例，先把6顆硬碟分為2組，每組3顆構成RAID 5，如此就得到兩組RAID 5，然後再把兩組RAID 5構成RAID 0。
- RAID 50在底層的任一組或多組RAID 5中出現1顆硬碟損壞時，仍能維持運作，不過如果任一組RAID 5中出現2顆或2顆以上硬碟損毀，整組RAID 50就會失效。
- RAID 50由於在上層把多組RAID 5構成Stripe，效能比起單純的RAID 5高，容量利用率比RAID5要低。比如同樣使用9顆硬碟，由各3顆RAID 5再組成RAID 0的RAID 50，每組RAID 5浪費一顆硬碟，利用率為(1-3/9)，RAID 5則為(1-1/9)。

### RAID 53
- 它擁有一個鏡射條帶陣列，硬碟裡其中一個條帶就是一個是由3組以上的RAID 5組成RAID 3硬碟陣列。

### RAID 60
![](https://i.imgur.com/eB5DvBf.png)
- RAID 6與RAID 0的組合：先作RAID 6，再作RAID 0。換句話說，就是對兩組以上的RAID 6作Stripe存取。RAID 6至少需具備4顆硬碟，所以RAID 60的最小需求是8顆硬碟。
- 由於底層是以RAID 6組成，所以RAID 60可以容許任一組RAID 6中損毀最多2顆硬碟，而系統仍能維持運作；不過只要底層任一組RAID 6中損毀3顆硬碟，整組RAID 60就會失效，當然這種情況的機率相當低。
- 比起單純的RAID 6，RAID 60的上層透過結合多組RAID 6構成Stripe存取，因此效能較高。不過使用門檻高，而且容量利用率低是較大的問題。

## Reference
- [RAID 磁碟陣列是什麼？一篇文章就理解（2021年最新）](https://www.linwei.com.tw/forum-detail/45/)
- [What's RAID / 什麼是RAID 磁碟陣列?](https://www.solkenix.com/whatsraid.html)