---
title: C/C++ volatile
date: 2021-11-20 14:13:51
tags: note, c/c++, volatile, book section
---

# C/C++ volatile
> - C/C++才會有這個保留字

## introduction
- 用它宣告的型別變量表示可以被某些編譯器未知的因素更改，比如：作業系統、硬體或者其它執行緒等。
- 遇到這個關鍵字宣告的變數，編譯器對訪問該變數的程式碼就不再進行優化，從而可以提供對特殊地址的穩定訪問。
- 宣告時語法：volatile int vInt;
- 當要求使用 volatile 宣告的變數的值的時候，系統總是重新從它所在的記憶體讀取資料，即使它前面的指令剛剛從該處讀取過資料。而且讀取的資料立刻被儲存。
    - e.g.
        ```clike
        volatile int i=10;
        int a = i;
        （ 其他程式碼，並未明確告訴編譯器，對 i 進行過操作）
        int b = i;
        ```
        - volatile 指出 i 是隨時可能發生變化的，每次使用它的時候必須從 i的地址中讀取，因而編譯器生成的彙編程式碼會重新從i的地址讀取資料放在 b 中

## usage
- 有2兩個場合(I/O & multithread program) 會使用到

### e.g.
- I/O, 假設有一程式片斷如下
    ```clike
    U8   *pPort;
    U8   i, j, k;

    pPort = (U8 *)0x800000;

    i = *pPort;     
    j = *pPort;     
    k = *pPort;     
    ```
    - 以上的i, j, k很有可能被compiler最佳化而導致產生 `i = j = k = *pPort;` 的code, 也就是說只從pPort讀取一次, 而產生 i = j = k 的結果
    - 但是原本的程式的目的是要從同一個I/O port讀取3次的值給不同的變數, i, j, k的值很可能不同(例如從此 I/O port 讀取溫度), 因此i = j = k 的結果不是我們所要的
    - 改為 `volatile U8   *pPort;` 告訴compiler, pPort變數具有揮發性的特性, 所以與它有關的程式碼請不要作最佳化動作. 因而  
- Global variables in Multithread program
    - 
## reference
- [C++ volatile用法 - IT閱讀](https://www.itread01.com/content/1541748543.html)
- [C/C++中的volatile使用時機? @ Everything Will Flow :: 痞客邦 ::](https://freestyler.pixnet.net/blog/post/23872864)
