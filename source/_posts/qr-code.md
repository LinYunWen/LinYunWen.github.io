---
title: QR code
date: 2020-12-04 23:27:30
tags: [note, qr code]
---

# QR code

## Introduction
- 二維碼另一個名稱是QR Code(Quick Response Code)
- 與傳統條形碼 (bar code) 相比，可以儲存更多的資訊。二維碼本質上是個密碼演算法，基本知識總結如下。
- 首先，二維碼存在 40 種尺寸，在官方文件中，尺寸又被命名為 Version。尺寸與 Version 存線上性關係：Version 1 是 21×21 的矩陣，Version 2 是 25×25 的矩陣，每增加一個 Version，尺寸都會增加 4，故尺寸 Size 與 Version 的線性關係為：
- $$Size=(Version−1)×4$$
- Version 的最大值是 40，故尺寸最大值是(40-1)*4+21 = 177，即 177 x 177 的矩陣。
- ![](https://i.imgur.com/l81vX7e.png)
- QR Code的4個容錯等級：
    -   L(低)：可修正7%的字碼。
    -   M(中)：可修正15%的字碼。
    -   Q(中高)：可修正25%的字碼。
    -   H(高)：可修正30%的字碼。
    ![](https://i.imgur.com/LZtP4k3.png)
<!-- more -->
- 容錯能力越高，同等級的QR Code能夠容量的資訊量就越少，這是因為將原本能夠儲存資料的地方，拿去做容錯[備份](https://www.cool3c.com/article/141969?tag)，於是一般儲存資料的空間被壓縮，能夠儲存的資料也就變少。由以上訊息可以得知，資訊容量最大的QR Code版本為Version 40、容錯能力為L等級，此版本最多可以容納7089個數字，或是4296個字母，或1800個漢字。一般的一維條碼最多只能輸入20個資訊量。

- ![](https://i.imgur.com/9m2Tjpg.png)

### components on qr code
- ![](https://i.imgur.com/5bONHbk.png)
- 二維碼的各部分都有自己的作用，基本上可被分為定位、功能資料、資料內容三部分。

    -   定點陣圖案：  
        -   Position Detection Pattern, 定點陣圖案：用於標記二維碼矩形的大小；用三個定點陣圖案即可標識並確定一個二維碼矩形的位置和方向了；
        -   Separators for Position Detection Patterns, 定點陣圖案分割器：用白邊框將定點陣圖案與其他區域區分；
        -   Timing Patterns, 時序圖案：用於定位，二維碼如果尺寸過大，掃描時容易畸變，時序圖案的作用就是防止掃描時畸變的產生；
        -   Alignment Patterns, 對齊圖案：只有在 Version 2 及其以上才會需要；
    -   功能資料：  
        -   Format Information, 格式資訊：存在於所有尺寸中，存放格式化資料；
        -   Version Information, 版本資訊：用於 Version 7 以上，需要預留兩塊 3×6 的區域存放部分版本資訊；
    -   資料內容：剩餘部分儲存資料內容  
        -   Data Code, 資料碼；
        -   Error Correction Code, 糾錯碼；

### 資料編碼形式
![](https://i.imgur.com/CVU2nDr.png)
![](https://i.imgur.com/Xxih21U.png)

#### 數字編碼(Numeric Mode)
- 數字編碼的範圍為 0~9。  
- 對於數字編碼，統計需要編碼數字的個數**是否為 3 的倍數**：如果不是 3 的倍數，則剩下的 1 位或 2 位會被轉為 4bits 或 8bits（十進位制轉二進位制），每三位數字都會被編成 10bits, 12bits, 14bits，具體編碼長度仍然需要二維碼尺寸決定。
- e.g.
    - 對於 Version 1 尺寸的二維碼，糾錯級別為 H，編碼為：01234567
        1.  將上述數字分為三組：012, 345, 67；
        2.  查詢圖 2.2 表格內容，**Version 1 二維碼的數字編碼應轉換為 10bits 的二進位制數字**，故將上面三組數字轉為二進位制分別為：012→0000001100, 345→0101011001, 67→1000011；
        3.  將三個二進位制串連線起來：0000001100 0101011001 1000011；
        4.  將數字的個數轉成二進位制：對於數字編碼，數字長度依舊用圖 2.2 表格中查到的 10bits 二進位制數字來表示，數字共有 8 個，故數字個數的二進位制形式為：8→0000001000；
        5.  查詢圖 2.1 表格內容，**數字編碼的標誌為 0001**，將編碼標誌與步驟 4 編碼結果加到步驟 3 結果之前，故最終結果為：0001 0000001000 0000001100 0101011001 1000011


#### 字元編碼(Alphanumeric Mode)
![](https://i.imgur.com/4Dbgbws.png)
- 索引表中共 45 種對應關係，字元編碼的過程，就是**將每兩個字元分為一組，然後轉成上圖 2.3 的 45 進位制，再轉為 11bits 的二進位制結果**。對於落單的一個字元，則轉為 6bits 的二進位制結果。  
- 此外，根據上圖 2.2 的設定，對不同 Version 的二維碼使用 9/11/13 個二進位制表示。
- e.g.
    - 對於 Version 1 尺寸的二維碼，糾錯級別為 H，編碼為：AE-86
        1.  在圖 2.3 的字元索引表中分別找到 AE-86 五個字元的索引分別為：(10, 14, 41, 8, 6)；
2.  將五個字元兩兩分組：(10, 14) (41, 8) (6)；
3.  **字元編碼應將字元組轉換為 11bits 的二進位制**，故上述三組字元首先轉為 45 進位制後再轉為二進位制：  
    -   **(10, 14)**：轉為 45 進位制：10×45+14=464；再轉為 11bits 的二進位制：00111010000；
    -   **(41, 8)**：轉為 45 進位制：41×45+8=1853；再轉為 11bits 的二進位制：11100111101；
    -   **(6)**：轉為 45 進位制：6；再轉為 6bits 的二進位制：000110；
4.  將步驟 3 中得到的三個二進位制結果連線起來：00111010000 11100111101 000110；
5.  查詢圖 2.2 表格內容，**Version 1 二維碼的字元個數應轉換為 9bits 的二進位制數字**，對於 5 個字元，二維碼字元個數轉為 9bits 二進位制為：000000101；
6.  查詢圖 2.1 表格內容，**字元編碼的標誌為 0010**，將編碼標誌與步驟 5 編碼結果加到步驟 4 結果之前，故最終編碼結果為：0010 000000101 00111010000 11100111101 000110；

#### 位元組編碼(Byte Mode)
- 可以是 0-255 的 ISO-8859-1 字元。有些二維碼的掃描器可以自動檢測是否是 UTF-8 的編碼。

#### 日文編碼(Kanji Mode)
- 日文編碼同時也是雙位元組編碼，同樣也可以用於中文編碼。  
- 日文與中文編碼流程基本相似：

    1.  首先減去一個值；
    2.  挑出差值結果的前兩個 16 進位制，乘以 0xC0；
    3.  加上後兩個 16 進位制位；
    4.  轉為 13bits 編碼；
- ![](https://i.imgur.com/HdJXN6u.png)

#### 其他編碼
- 其他型別的編碼本文中不詳細說明。其中包括：

    -   特殊字符集(Extended Channel Interpretation Mode)：主要用於特殊的字符集，並不是所有的掃描器都支援這種編碼；
    -   混合編碼(Structured Append Mode)：說明該二維碼中包含了多種編碼格式；
    -   特殊行業編碼(FNC1 Mode)：主要是給一些特殊的工業或行業用的，如GS1條形碼等；

![](https://i.imgur.com/2yl79ob.png)

### 二維碼的繪製
#### 定點陣圖案 (Position Detection Pattern)
![](https://i.imgur.com/mEs06VR.png)
#### 對齊圖案 (Alignment Pattern)
![](https://i.imgur.com/5JVywZR.png)

![](https://i.imgur.com/LqeABs2.png)
![](https://i.imgur.com/wN0UId8.png)

#### 時序圖案 (Timing Pattern)
![](https://i.imgur.com/zXVU582.png)
#### 格式資訊
![](https://i.imgur.com/bVdU2QC.png)
![](https://i.imgur.com/01kNld9.png)
- 15bits 中資料，按照** 5bits 的資料位 + 10bits 糾錯位**的順序排列：
    -   資料位佔 5bits：其中 2bits 用於表示使用的糾錯等級 (Error Correction Level)，3bits 用於表示使用的蒙版 (Mask) 類別；
    -   糾錯位佔 10bits：主要通過 BCH Code 計算；

#### 版本資訊 (Version Information)
- 對於 Version 7 及其以上的二維碼，需要加入版本資訊。如下圖 6.11 藍色部分所示
![](https://i.imgur.com/NrOzkyO.png)
![](https://i.imgur.com/Ie1Up2i.png)
- 18bits 的版本資訊中，前 6bits 為版本號 (Version Number)，後 12bits 為糾錯碼 (BCH Bits)。示例如下：

- 假設存在一個 Version 為 7 的二維碼（對應 6bits 版本號為 000111），其糾錯碼為 110010010100；  
- 則版本資訊圖案中的應填充的資料為：**000111110010010100**
#### 資料碼與糾錯碼
![](https://i.imgur.com/B0kD4R1.png)
![](https://i.imgur.com/uMovoXP.png)
![](https://i.imgur.com/BFyyGFO.png)
![](https://i.imgur.com/2VA3jYM.png)

#### 蒙版圖案
- 按照上述思路即可將二維碼填充完畢。但是那些點並不均衡，如果出現了大面積的空白或黑塊，掃描識別會十分困難，所以按照在前文 6.4 中格式資訊的處理思路，對整個影象與蒙版進行蒙版操作(Masking)，蒙版操作即為異或 XOR 操作。  
- 二維碼又 8 種蒙版可以使用，如下圖 6.18 所示，公式也在圖中說明。蒙版只會和資料區進行異或操作，不會影響與格式資訊相關的功能區。  
![](https://i.imgur.com/mQxKYDQ.png)
![](https://i.imgur.com/nPtE9RI.png)

### 「二維碼」的視覺意象
- 「Aesthetic QR Code（美學式QR碼）」、「Visual QR Code」或者是「視覺碼」就可以找到與圖片合併的 QR Code
- ![](https://i.imgur.com/q7AUjlS.png)
    - 這些論文所提出的「Aesthetic QR Code Solution（美學式 QR 碼解決方案）」主要是在不超過 QR Code 「**容錯能力**」的情況下，以「**雙重圖像（Binary Image）**」或是「**插入圖像（Input Image）**」的方式製作所謂的 Aesthetic/Visual QR Code（有美感/圖像化的 QR code）。使用技術術語，就是「Embedding a picture」。而從整體圖像上來說，QR Code 的基本形式還在，但加入了視覺化圖像的內容。
#### 以 QR code 作為視覺意象
![](https://i.imgur.com/aTU81UM.png)
![](https://i.imgur.com/vguDS85.png)
![](https://i.imgur.com/hkxQCct.png)


### QR碼的實務用途
- 既然要談QR碼能連結啟動許多數位服務，具備「Call To Action（CTA）」（行動呼籲設計）的關鍵因素，就從使用情境與引導動機這方面去探討
- 將「CTA」目標分為「參與目標」與「執行目標」，且認為缺一不可。分列如下：
    -   **「使參與某事**（Ask someone to participate）**」**：以QR碼提供「快速連結」去達成此「參與目標」。
    -   **「使執行某事**（Get someone to do something）**」**：由QR碼橋接「數位服務」去達成此「執行目標」。
- 而要能讓QR碼功能啟用，執行4個策略：
    -   要有「行動誘因」、「標示清晰」的設計，好讓QR碼提供快速連結去啟用並達成「CTA的參與目標」
    -   也要有「實質承諾」、「計畫策略」，好讓QR碼橋接數位服務去啟用並達成「CTA的執行目標」。

## Reference
- [給 QR Code 來點「給我漂漂拳」：QR Code的原理是什麼？它有辦法更漂亮嗎？](https://pansci.asia/archives/137084)
- [二維碼（QR Code）的生成原理及解析](https://www.itread01.com/content/1544582720.html)
- [QR Code發展與歷史介紹：運作原理、特色、編碼結構分析](https://www.cool3c.com/article/150348)