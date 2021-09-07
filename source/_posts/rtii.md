---
title: RTII
date: 2021-09-07 21:54:41
tags: note, rtti, c/c++, book section
---

# RTTI
- Run-Time Type Information，也有人寫作 Run-Time Type Identification
- 代表著執行時期取得物件的型態資訊
- 在 C++ 中，可以使用定義於 `type_info` 的 `typeid` 來實作。
<!--more-->
## introduction
- typeid用於在執行時辨識型態訊息
- dynamic_cast具有執行時型態辨識和型態轉換匹配2個功能
- 實現方法為每個型態對應一個const type_info型態物件，儲存了這個確切型態訊息。
- 在C++標準標頭檔\<typeinfo>中，type_info類多載了operator=()、operator!=()、name()等成員函式。

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


## reference
- [RTTI](https://openhome.cc/Gossip/CppGossip/RTTI.html)
- [c++中RTTI的觀念和使用 - IT閱讀](https://www.itread01.com/content/1547704114.html)
- [執行期型態訊息 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%9F%B7%E8%A1%8C%E6%9C%9F%E5%9E%8B%E6%85%8B%E8%A8%8A%E6%81%AF)