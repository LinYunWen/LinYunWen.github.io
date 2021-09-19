---
title: c-curl
date: 2021-09-19 20:22:35
tags: [note, c/c++, book section, curl]
---

# Curl in C/C++

## 編譯與安裝
- 編譯需要的原始檔可以在[官網](https://curl.haxx.se/download.html)下載。
    - 依照[官網](https://curl.haxx.se/docs/install.html)指示
    ```clike
    ./configure
    make
    sudo make install
    ```
<!--more-->
## 使用
> - #include <curl/curl.h>
- 使用流程大致是這樣：  
    - `初始化>設定>執行>關閉  `
- 以 easy handle 來說，每個階段對應到的函式是  
    - (调用 curl_global_init() 初始化 libcurl)
    * 初始化：`curl_easy_init()`  
    * 設定：`curl_easy_setopt()`  
    * 執行：`curl_easy_perform()`  
    * 關閉：`curl_easy_cleanup()` (handler可以重複利用，全部使用完再清掉 handler 即可)
- 在設定中，有 3 個選項比較重要：  
    * CURLOPT_URL：要取得的 url 位址  
    * CURLOPT_WRITEFUNCTION：將接收資料的程式(的函式指標)  
    * CURLOPT_WRITEDATA：資料將存入的空間指標(也可以說是將傳入 write function 的最後一個參數的指標)
        * 當程式執行完 `curl_easy_perform()` 後，我們就可以從 CURLOPT_WRITEDATA 所設定的指標中取得我們要從網路上取得的資料了。

### e.g.
```c
curl = curl_easy_init();
if (curl) {
    fp = fopen(outfilename,"wb");
    curl_easy_setopt(curl, CURLOPT_URL, url); //設定網址
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, fp);
    //如果有錯誤的話會將錯誤寫在這邊的error buffer
    curl_easy_setopt(curl, CURLOPT_ERRORBUFFER, error);
    res = curl_easy_perform(curl);
    curl_easy_cleanup(curl);
    fclose(fp);
}
```

### CURLcode curl_global_init(long flags)
- 这个函数只能用一次。(其实在调用curl_global_cleanup() 函数后仍然可再用)，如果这个函数在curl_easy_init函数调用时还没调用，它讲由libcurl库自动完成。
- 參數
    *  CURL_GLOBAL_ALL                  //初始化所有的可能的调用。
    *  CURL_GLOBAL_SSL                 //初始化支持 安全套接字层。
    *  CURL_GLOBAL_WIN32             //初始化win32套接字库。
    *  CURL_GLOBAL_NOTHING       //没有额外的初始化。

### CURL *curl_easy_init( )
- 用来初始化一个CURL的指针(有些像返回FILE类型的指针一样). 相应的在调用结束时要用curl_easy_cleanup 函数清理。一般curl_easy_init意味着一个会话的开始. 它的返回值一般都用在easy系列的函数中.


### curl_easy_perform
`CURLcode curl_easy_perform(CURL *easy_handle);`
- return
    - [CURLE_OK](https://curl.se/libcurl/c/libcurl-errors.html#CURLEOK) (0) means everything was ok, non-zero means an error occurred as <curl/curl.h> defines - see [libcurl-errors](https://curl.se/libcurl/c/libcurl-errors.html).
    - If the [CURLOPT_ERRORBUFFER](https://curl.se/libcurl/c/CURLOPT_ERRORBUFFER.html) was set with [curl\_easy\_setopt](https://curl.se/libcurl/c/curl_easy_setopt.html) there will be a readable error message in the error buffer when non-zero is returned.
    - CURLE_OK ： 任务完成一切都好；
    * CURLE_UNSUPPORTED_PROTOCOL：不支持的协议，由URL的头部指定；
    * CURLE_COULDNT_CONNECT：不能连接到remote 主机或者代理；
    * CURLE_REMOTE_ACCESS_DENIED：访问被拒绝；
    * CURLE_HTTP_RETURNED_ERROR：Http返回错误；
    * CURLE_READ_ERROR：读本地文件错误；2
- curl_easy_perform以阻塞方式执行整个请求。有关非阻塞行为，请参阅curl_multi_perform。
#### reference
- [libcurl - curl_easy_perform()](https://curl.se/libcurl/c/curl_easy_perform.html)

### void curl_easy_cleanup(CURL *handle)
- 用来结束一个会话.与curl_easy_init配合着用. 
- 参数： CURL类型的指针.

## reference
- [在Linux用C/C++編寫使用libcurl的程式 | 鰭狀漏斗](https://vrabe.tw/blog/using-libcurl-in-c-or-cpp-in-linux/)
- [curl_easy_perform(3): Perform file transfer - Linux man page](https://linux.die.net/man/3/curl_easy_perform)
- [Curl（C++）使用教程_蓬莱道人的博客-CSDN博客](https://blog.csdn.net/MOU_IT/article/details/96457666)