---
title: net to type
date: 2021-12-26 10:47:04
tags: [linux, ntohl, ntohs, htonl, htons, file system, c/c++]
---
# net to type
ntohs = net to host short int 16位
htons = host to net short int 16位
ntohl = net to host long int 32位
htonl = host to net long int 32位

<!--more-->
## introduction
- 網路位元組順序NBO（Network Byte Order）
    * 按從高到低的順序儲存，在網路上使用同一的網路位元組順序，可避免相容性問題；
* 主機位元組順序HBO(Host Byte Order)
    * 不同的機器HBO不相同，與CPU的設計有關，資料的順序是由CPU決定的，而與作業系統無關；
    * 如Intel x86結構下，short型數0x1234表示為34 12，int型數0x12345678表示為78 56 34 12；
    * 如IBM power PC結構下，short型數0x1234表示為 12 34，int型數0x12345678表示為 12 34 56 78.
* 由於這個原因，不同體系結構的機器之間不能直接通訊，所以要轉換成一種約定的順序，也就是網路位元組順序，其實就是如同power pc那樣的順序。在PC開發中有ntohl和htonl函式可以用來進行網路位元組和主機位元組的轉換

## ntohs()
- 將一個無符號短整形數從網路位元組順序轉換為主機位元組順序。
```clike
#include <winsock.h>
u_short PASCAL FAR ntohs( u_short netshort);
// netshort：一個以網路位元組順序表達的16位數。
```
- 註釋：本函式將一個16位數由網路位元組順序轉換為主機位元組順序。
- 返回值：ntohs()返回一個以主機位元組順序表達的數。

## htons()
- 簡述：將主機的無符號短整形數轉換成網路位元組順序。
```clike
#include <winsock.h>
u_short PASCAL FAR htons( u_short hostshort);
// hostshort：主機位元組順序表達的16位數。
```
- 註釋：本函式將一個16位數從主機位元組順序轉換成網路位元組順序。
- 返回值：htons()返回一個網路位元組順序的值。
* 這2個函式提供了主機位元組順序與網路位元組順序的轉換
    * 比如網路位元組 為 00 01
    * u_short    a;
    * 如何直接對應的話    a=0100; 為什麼呢？因為主機是從高位元組到低位元組的，所以應該轉化後a=ntohs(0001); 這樣 a=0001;

## inet_ntoa()
- 將網路地址轉換成“.”點隔的字串格式。
* #include　<winsock.h>
* `char FAR* PASCAL FAR inet_ntoa( struct in_addr in);`
    * in：一個表示Internet主機地址的結構。
* 註釋：
    * 本函式將一個用in引數所表示的Internet地址結構轉換成以“.” 間隔的諸如“a.b.c.d”的字串形式。請注意inet_ntoa()返回的字串存放在WINDOWS套介面實現所分配的記憶體中。應用程式不應假設該記憶體是如何分配的。在同一個執行緒的下一個WINDOWS套介面呼叫前，資料將保證是有效。
* 返回值：
    * 若無錯誤發生，inet_ntoa()返回一個字元指標。否則的話，返回NVLL。其中的資料應在下一個WINDOWS套介面呼叫前複製出來。

  
## reference
- [到底 ntohl() 與 htonl() 做了什麼? @ 邱小新の工作筆記 :: 痞客邦 ::](https://jyhshin.pixnet.net/blog/post/26587993)
- [ntohs, ntohl, htons,htonl的比較和詳解 | 程式前沿](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/624590/)
- [socket程式設計為什麼需要htons(), ntohl(), ntohs()，htons() 函式 - IT閱讀](https://www.itread01.com/content/1544971156.html)
- [ntohs, ntohl, htons,htonl的比較和詳解 - IT閱讀](https://www.itread01.com/content/1549505556.html)