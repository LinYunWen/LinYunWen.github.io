---
title: RTII
date: 2021-09-07 21:54:41
tags: note, rtti, c/c++, book section
---

# RTTI
- Run-Time Type Information，也有人寫作 Run-Time Type Identification
- 代表著執行時期取得物件的型態資訊
- 在 C++ 中，可以使用定義於 `type_info` 的 `typeid` 來實作。
- 最單純的RTTI包括﹕
- ●類別識別(class identification)──包括類別名稱或ID。
* ●繼承關係(inheritance relationship)──支持執行時期的「往下變換型態」(downward casting)﹐亦即動態轉型態(dynamic casting) 。
* 在對象數據庫存取上﹐還需要下述RTTI﹕
* ●對象結構(object layout) ──包括屬性的型態、名稱及其位置（position或offset）。
* ●成員函數表(table of functions)──包括函數的型態、名稱、及其參數型態等。
* 其目的是協助對象的I/O 和永存(persistence) ﹐也提供偵錯訊息等。
## introduction
- typeid用於在執行時辨識型態訊息
- dynamic_cast具有執行時型態辨識和型態轉換匹配2個功能
- 實現方法為每個型態對應一個const type_info型態物件，儲存了這個確切型態訊息。
- 在C++標準標頭檔\<typeinfo>中，type_info類多載了operator=()、operator!=()、name()等成員函式。
<!--more-->
### dynamic_cast
```cpp
dynamic_cast<dest>(src);
```
- dest和src都必須為指標或者參照
- 執行時src和dest所參照的物件，是相同型態，或者存在is-a關係（public繼承），則轉換成功，失敗返回NULL
    - dynamic_cast的「執行時型態的轉換匹配」，是通過維護一棵由type_info型態物件作為節點的型態繼承關係的樹，遍歷這棵繼承樹來確定一個待轉換的物件的型態和目標型態之間是否存在is-a關係。


### typeid
- `typeid` 接受物件，傳回 [`type_info`](https://en.cppreference.com/w/cpp/types/type_info) 實例，具有以下的方法可以操作：
    -   `before`：以 C++ 實作品定義的順序進行兩個型態的順序比較（這個順序與繼承順序無關）。
        -   如果你需要基於型態來排序，type_info 的 before 方法，是唯一提供順序的方式，可用來定義比較器（comparator）
    -   `hash_code`：型態的雜湊值，相同型態會有相同的雜湊值。
    -   `name`：傳回 C++ 實作品定義的名稱。


## disadvantage
- 程序員可能會利用RTTI來支持其「複選」(multiple-selection)方法﹐而不使用虛擬函數(virtual function)方法。
- 雖然這兩種方法皆能達到多型化(polymorphism) ﹐但使用複選方法﹐常導致違反著名的「開放╱封閉原則」(open/closed principle) 〔注2 〕。反之﹐使用虛擬函數方法則可合乎這個原則，
    - e.g.
        - Circle和Square皆是由Figure所衍生出來的子類別﹐它們各有自己的draw()函數。當C++ 提供了RTTI﹐就可寫個函數如下﹕
        ```cpp
        void drawing( Figure *p )
        {
            if( typeid(*p).name() == "Circle" )
                ((Circle*)p)->draw();
            if( typeid(*p).name() == "Rectangle" )
                ((Rectangle*)p)->draw();
        }
        ```
        - 雖然drawing() 函數也具有多型性﹐但它與Figure類別體系的結構具有緊密的相關性。當Figure類別體系再衍生出子類別時﹐drawing() 函數的內容必須多加個if指令。因而違反了「開放╱封閉原則」
        - 程序員將draw()宣告爲虛擬函數﹐並寫drawing() 如下
        ```cpp
        void drawing(Figure *p) {
            p->draw();
        }
        ```
        - 如此﹐Figure類別體系能隨時衍生類別﹐而不必修正drawing() 函數。
        - 亦即﹐Figure體系有個穩定的接口(interface) ﹐drawing() 使用這接口﹐使得drawing() 函數也穩定﹐不會隨Figure類別體系的擴充而變動，這是封閉的一面
        - 而這穩定的接口並未限制Figure體系的成長﹐這是開放的一面。因而合乎「開放╱封閉」原則﹐軟件的結構會更具彈性﹐更易於隨環境而不斷成長。

## RTTI的常見的使用場合
- 一般而言﹐RTTI的常見使用場合有四﹕例外處理(exceptions handling)、動態轉型態(dynamic casting) 、模塊整合、以及對象I/O 。
### 例外處理
- 大家所熟悉的C++ 新功能﹕例外處理﹐其需要RTTI﹐如類別名稱等。

### 動態轉型態
- 在類別體系(class hierarchy) 中﹐往下的型態轉換需要類別繼承的RTTI。

### 模塊整合
- 當某個程序模塊裏的對象欲跟另一程序模塊的對象溝通時﹐應如何得知對方的身分呢﹖知道其身分資料﹐才能呼叫其函數。
- 一般的C++ 程序﹐常見的解決方法是──在原始程序中把對方對象之類別定義（即存在標頭檔裏）包含進來﹐在編譯時進行連結工作。
- 然而﹐像目前流行的主從(Client-Server) 架構中﹐客戶端(client)的模塊對象﹐常需與主機端(server)的現成模塊對象溝通﹐它們必須在執行時溝通﹐但又常無法一再重新編譯。於是靠標頭文件來提供的類別定義資料﹐無助於執行時的溝通工作﹐只得依賴RTTI了。

### 對象I/O 
- C++ 程序常將其對象存入數據庫﹐未來可再讀取之。對象常內含其它小對象﹐因之在存入數據庫時﹐除了必須知道對象所屬的類別名稱﹐也必須知道各內含小對象之所屬類別﹐才能完整地將對象存進去。儲存時﹐也將這些RTTI資料連同對象內容一起存入數據庫中。未來﹐讀取對象時﹐可依據這些RTTI資料來分配內存空間給對象。

## RTTI從那裏來﹖
- 上述談到RTTI的用途﹐以及其副作用。這衆多爭論﹐使得RTTI的標準遲遲未呈現出來。也導致各C++ 開發環境提供者﹐依其環境所需而以各種方式來支持RTTI﹐且其支持RTTI的範圍也所不同。  目前常見的支持方式包括﹕
    - 由類別庫提供RTTI──例如﹐Microsoft 公司的Visual C++環境。
    - 由C++ 編譯器(compiler)提供──例如﹐Borland C++ 4.5 版本。
    * 由原始程序產生器(code generator)提供──例如Bellvobr系統。
    * 由OO數據庫的特殊前置處理器(preprocessor)提供──例如Poet系統。
    * 由程序員自己加上去。


## reference
- [RTTI](https://openhome.cc/Gossip/CppGossip/RTTI.html)
- [c++中RTTI的觀念和使用 - IT閱讀](https://www.itread01.com/content/1547704114.html)
- [執行期型態訊息 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%9F%B7%E8%A1%8C%E6%9C%9F%E5%9E%8B%E6%85%8B%E8%A8%8A%E6%81%AF)
- [C++ 的 RTTI 觀念和用途 - 台部落](https://www.twblogs.net/a/5b820b532b71772165af5cce)