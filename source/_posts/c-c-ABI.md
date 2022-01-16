---
title: Application Binary Interface (ABI)
date: 2022-01-16 16:20:29
tags: [note, ABI, c/c++, book section]
---

# Application Binary Interface (ABI)
- 應用程式二進位制介面，描述了應用程式和作業系統之間，一個應用和它的庫之間，或應用的組成部分之間的底層介面。
- 想要保持二進位制相容相較於`API`相容來說要難上許多，並且影響`ABI`相容的因素也非常多從硬體到作業系統再到編譯器，程式語言等，並且非常難以統一
- ABI 更改是不可避免的。發生這種情況時，除非重新編譯以使用新版本的庫，否則使用該庫的任何程序都將無法運行。如果 ABI 更改但 API 沒有更改，則新舊庫版本有時稱為“源兼容”。這意味著雖然為一個庫版本編譯的程序不能與另一個庫版本一起使用，但如果重新編譯，為一個庫版本編寫的源代碼將適用於另一個庫版本。
<!--more-->
> - 此外，關於您關於 C++ 名稱修飾的註釋：在庫文件中定位函數時，通常按名稱查找該函數。C++ 允許您重載函數名稱，因此僅名稱不足以識別函數。C++ 編譯器有自己的內部處理方式，稱為_名稱修飾_。ABI 可以定義對函數名稱進行編碼的標準方式，以便使用不同語言或編譯器構建的程序可以找到所需的內容。當您[`extern "c"`](https://stackoverflow.com/questions/1041866/what-is-the-effect-of-extern-c-in-c)在 C++ 程序中使用時，您是在指示編譯器使用一種標準化的方式來記錄其他軟件可以理解的名稱。


## API與ABI的區別
- `ABI`從名字上看是二進位制介面，而二進位制檔案再`linux`以`ELF`檔案型別表示，`windows`以`PE-COFF`檔案型別表示。
    * 可重定位檔案 (Relocatable File)
        * 包含了程式碼和資料	如Linux的.o、.a
        * windows的.obj、.lib
    * 可執行檔案（Executable File)
        * 包含了可以直接執行的程式	如/bin/ls 檔案
        * windows的.exe
    * 共享目標檔案 (Shared Object File)
        * 包含了程式碼和資料	Linux 的.so
        * windows的dll
* 二進位制檔案的生成是通過編譯器或者連結器，那麼`API`和`ABI`都是誰需要去遵循這個規則呢，如下面的程式碼假設它將會被編譯成一個`myso`動態庫，你可以將它當成一個`API`。
* e.g.
    -   API：庫的使用者可能需要去遵循這個介面規範，`Add`函式的引數個數以及引數型別等等。
    -   ABI：`main`使用到了`Add`這個`API`，這個`API`包含再一個`myso`動態庫裡面，現在設計到一個符號尋找機制，即編譯器需要去`myso`動態庫裡面尋找`Add`這個符號，那符號的命名規則不一致會導致什麼結果？如`gcc1.0`版本的符號命名規則是再函式前面加一個`_`，即最後`Add`符號名稱`_Add`, `gcc2.0`版本的符號命名規則是再函式後面加一個`_`, 即最後Add符號名稱`Add_`。思考一個問題，`myso`是利用`gcc1.0`版本編譯，`main`使用`gcc2.0`版本編譯，會出現是什麼問題？ 編譯器會提示你`Add_`符號未定義，這裡說的符號匯出規則也就是屬於`ABI`相容問題。

:::danger
- 影響你API不相容的可能是你使用的API**新增了引數**。
- 影響ABI不相容的可能僅僅就是**編譯器版本不同**
    - 當然編譯器僅僅只是導致ABI不相容的一個方面。
- 一個是原始碼層面，一個是編譯器層面（或者說二進位制層面，即編譯器生成的二進位制）
:::

## ABI 不相容的可能面向
### 硬體 - 如處理器
- 最近`Apple`釋出了最新款`Mac`筆記本，號稱可以直接使用`iPhone`和`ipad`的應用，怎麼做到的？這個就是一個二進位制相容問題，`Apple`再最新的`Mac`筆記本上放棄了之前一直使用的`intel`晶片，從而採用自研的`M1`晶片，這個`M1`的自研晶片架構就是`ARM`架構和蘋果`A`系列晶片架構一樣，從而才有可能實現二進位制級別的相容。
> 二進位制裡面包含了指令和資料，而`CPU`有一個核心作用就是處理指令，不同架構的`CPU`指令集都不同，從而產生的二進位制也會不同，例如你在程式碼中呼叫了`print`函式，最終在`X86`生成的二進位制檔案的一條指令是`call 0x1234`, 但是在`ARM`處理器下它可能沒有`call`指令，它的跳轉指令可能是`jar`。

### 作業系統
- 二進位制檔案型別
    - 一個可執行的二進位制檔案包含的不僅僅是機制指令，還包括各種資料、程式執行資源。
        - 如上面提到的二進位制檔案型別:
            * windows - PE-COFF
            * linux - ELF
            * macos - MACH-O
    * 它們的二進位制檔案格式各不相同，導致windows無法解析linux下的ELF檔案格式，從而無法完成可執行檔案在執行之前的一系列初始化操作
* 程式庫不同（API）
    - 檔案操作、輸入輸出、記憶體申請釋放、任務排程等都需要用到特定作業系統的特定庫。

### 編譯器
- 如C++函式簽名
    - 函式簽名的目的就是讓編譯器能夠根據對應的簽名規則生成一個符號，編譯器根據這個符號來識別和處理函式，函式簽名包含了一個函式的資訊，其中包括
        * 函式名
        * 引數型別
        * 引數個數
        * 類名
        * 名稱空間
    * e.g.
        * `int Function(int i);`
            * 上面的程式碼在gcc和vc編譯器生成之後的符號：
            * gcc : `_Z8Functioni`
            * vc++: `?Function@@YAHH@Z`
    * 就算是相同版本的gcc也一樣可能出現二進位制不相容
        * 如gcc4.9版本C++ string,list符號命名和gcc5.1之後的符號命名都是不同的gcc5.1上會增加__cxx11，所以一樣會產生在gcc4.9編譯的庫，再gcc5.1上使用不了（符號未定義，如果使用了string，list）

### 語言層面 - C++
-   內建型別的大小以及對齊方式（如大端、小端）。
-   `struct`、`union`、陣列等的儲存方式和記憶體分佈。
-   函式呼叫方式，比如引數入棧順序、返回值如何保持等。
-   堆疊的分佈方式，比如引數和區域性變數在堆疊裡的位置，引數傳遞方法等。
-   繼承類體系的記憶體分佈，如基類、虛基類再繼承類中的位置等。
-   指向成員函式的指標的記憶體分佈，如何傳遞this指標
-   如何呼叫虛擬函式，`vtable`的內容和分佈形式，`vtable`指標在`object`中的位置等。
-   `templte` 如何例項化
-   外部符號的修飾
-   全域性物件的構造和析構
-   異常的產生和捕獲機制
-   `RTTI`如何實現
...



## reference
- [細談ABI (Application Binary interface)_spider集控團隊 - MdEditor](https://www.gushiciku.cn/pl/pSTt/zh-tw)
- [應用二進位介面 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%BA%94%E7%94%A8%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%8E%A5%E5%8F%A3)
- [What exactly is an Application Binary Interface (ABI)? Who defines it (the operating system, a programming language)? - Quora](https://www.quora.com/What-exactly-is-an-Application-Binary-Interface-ABI-Who-defines-it-the-operating-system-a-programming-language)
- [compiler construction - What is an application binary interface (ABI)? - Stack Overflow](https://stackoverflow.com/questions/2171177/what-is-an-application-binary-interface-abi)
