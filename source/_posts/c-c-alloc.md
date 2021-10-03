---
title: C/C++ malloc, calloc, realloc
date: 2021-10-03 12:03:08
tags: note, c/c++, alloc, book section
---

# C/C++ malloc, calloc, realloc
> - `stdlib.h`
- 變數建立後會配置記憶體空間，這類資源是配置在記憶體的堆疊區（Stack），生命週期侷限於函式執行期間，也就是函式執行過後，配置的空間就會自動清除。
- 資源之間的互用關係錯綜複雜，有些資源「無法預期」被使用的生命週期，因為無法預期，也就有賴於開發者自行管理記憶體資源，也就是開發者得自行在需要的時候配置記憶體，這些記憶體會被配置在堆積區（Heap），不會自動清除，開發者得在不使用資源時自行釋放記憶體。
<!--more-->

## malloc
- `void *malloc(size_t size);`
### 輸入
- 字節數  
> - 如果 size = 0 ，也會回傳一個合法的指標。

### 回傳
- 已分配空間的地址，失敗返回 NULL 。

### reference
- [malloc(3) - Linux manual page](https://man7.org/linux/man-pages/man3/malloc.3.html)

## calloc
- `void *calloc(size_t nitems, size_t size);`
- **同時把所有空間的數值初始化為 0 。**
### 輸入
- 要分配的元素數目
- 每一格元素的字節數
### 回傳
- 已分配空間的地址，失敗返回 NULL 。
### reference
- [calloc(3p) - Linux manual page](https://man7.org/linux/man-pages/man3/calloc.3p.html)


## realloc
- `void *realloc(void *ptr, size_t size);`
- 改變已經分配的空間大小
### 輸入
- 曾經分配過空間的地址
- 新的字節數

### 回傳
- 新已分配空間的地址，失敗返回 NULL

> - 如果 ptr = NULL ， 等價呼叫 malloc(size) 。
> - 如果 size = 0 ，等價呼叫 free(ptr) 。 

:::info
* 如果原空間其後的連續記憶體足夠，
    * 會擴大原本的空間，回傳 原空間的地址。
* 如果其後的連續記憶體不足，
    * 會尋找新的、足夠長的記憶體空間
    * 把原本空間的數據複製至新空間，
    * 釋放原空間，回傳 新空間的地址。
:::
:::danger
- 使用 realloc 時不應該：
```clike
ptr = realloc(ptr, new_size);
```
- 如果分配失敗，會造成內存洩漏。
- 所以應該找一個暫存指標：
```clike
new_ptr = realloc(ptr, new_size);
if(new_ptr == null){  //用 !new_ptr 檢查也可以
    // 錯誤處理
}
ptr = new_ptr
```
:::
### reference
- [realloc(3p) - Linux manual page](https://man7.org/linux/man-pages/man3/realloc.3p.html)

## malloc v.s. calloc v.s. realloc
- 可以在程式中以動態方式配置一個 int 型態大小的記憶體，例如：
    - `int *p = malloc(sizeof(int));`
        - 就 C11 規範來說，`malloc` 只配置空間但不初始空間的值，若要在配置完成後預設為型態的零值，可以使用 `calloc`：
- 如果想配置連續個指定型態的空間，可以如下：
    - `int *p = malloc(sizeof(int) * 1000);`
        - 這段程式碼動態配置了 1000 個 int 大小的空間，並傳回空間的第一個位址，配置後的空間資料是未知的，，可以使用 calloc 來宣告空間配置，每個 int 空間會被始為 0，例如：
- 若要動態配置連續空間，並當成二維陣列來操作，就記得二維（或多維）陣列，就是以陣列的陣列來實作，二維陣列就是多段一維陣列，如果你的二維陣列有兩段一維陣列，那就是如下：
    - `int **arr = calloc(2, sizeof(int*));`
        - 現在 `arr[0]`、`arr[1]` 可以分別儲存動態配置 `int*` 空間的位址，若每段要模擬的一維陣列的長度是 3，可以如下動態配置，並將模擬的一維陣列每個元素初始設為 0 ：
        ```clike
        for(int i = 0; i < 2; i++) {
            arr[i] = calloc(3, sizeof(int));
        }
        ```
- 要注意的是，上例中，重新配置後的位址並不保證相同，`realloc` 會複製資料來改變記憶體的大小
    - 若原位址有足夠的空間，使用原位址調整記憶體的大小，若空間不足，會重新尋找足夠的空間來進行配置


## reference
- [malloc、free、calloc 與 realloc](https://openhome.cc/Gossip/CGossip/MallocFree.html)
- [Days 9: 動態記憶體分配：malloc()、calloc()、realloc()、free()，內存洩露 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10204463)