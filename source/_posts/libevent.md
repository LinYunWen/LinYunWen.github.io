---
title: libevent
date: 2021-12-28 21:45:18
tags: [note, c/c++, libevent]
---

# libevent
## introduction
- 在課堂上學過 Unix Network Programming 後，我們知道在處理多 User 時會有幾種方法解決：
    * 一個新的 Connection 進來，用 fork() 產生一個 Process 處理。
    * 一個新的 Connection 進來，用 pthread_create() 產生一個 Thread 處理。
    * 一個新的 Connection 進來，丟入 Event-based Array，由 Main Process 以 Nonblocking 的方式處理所有的 I/O。
<!--more-->
* 這三種方法當然也都有各自的缺點：
    * 用 fork() 的問題在於每一個 Connection 進來時的成本太高。
    * 用 Multi-thread 的問題在於 Thread-safe 與 Deadlock 問題難以解決，另外有 Memory-leak 的問題要處理。
    * 用 Event-based 的方式在於實做上不好寫，尤其是要注意到事件產生時必須 Nonblocking，於是會需要實做 Buffering 的問題，而 Multi-thread 所會遇到的 Memory-leak 問題在這邊會更嚴重。而在多 CPU 的系統上沒有辦法使用到所有的 CPU resource。
* 當然，針對前面兩項有各自的解法：
    * 以 Poll 的方式解決：當一個 Process 處理完一個 Connection 後，不直接死掉，而繼續回到 accept() 的狀態繼續處理，但這樣會遇到 Memory-leak 的問題，於是採用這種方式的人通常會再加上「處理過 N 個 Connection 後死掉，由 Parent Process 再 fork() 一隻新的」。最有名的例子是 Apache 1.3。
    * Thread-safe 的問題可以透過自己撰寫，或是尋找其他 Thread-safe Library 直接使用。Memory-leak 的問題可以試著透過 Garbage Collection Library 分析出來。Apache 2.0 的 Thread MPM 就是使用這個模式。
* 目前高效率的 Server 都偏好採用 Event-based，一方面是沒有 Create Process/Thread 所造成的 Overhead，另外一方面是不需要透過 Shared Memory 或是 Mutex 在不同的 Process/Thread 之間交換資料。
    - 然而，Event-based 在實做上的幾個複雜的地方在於：
        * select() 與 poll() 的效率過慢，造成每次要判斷「有哪些 Event 發生」這件事情的成本很高，這在 BSD 支援 kqueue()、Linux 支援 epoll()、Solaris 支援 /dev/poll 後就解決了，但這兩組 Function 都不是 Standard，於是在不同的平台上就必須再改一次。
        * 因為 Nonblocking，所以在 write() 或是 send() 時滿了需要自己 Buffering。
        * 因為 Nonblocking，所以不能使用 fgets() 或是其他類似的 function，於是需要自己刻一個 Nonblocking 的 fgets()。但是使用者所丟過來的資料又不能保證在一次 read() 或 recv() 就有一行，於是要自己做 Buffering。
        * 實際上這三件事情在 libevent 都有 Library 處理掉了。

## feature
- 事件驱动，高性能；
    - libevent預設情況下是單執行緒，每個執行緒有且僅有一個event_base，這對應一個struct event_base結構體（以及附於其上的事件管理器），用來schedule託管給它的一系列event，可以和作業系統的程序管理類
    - 當一個事件發生後，event_base會在合適的時間（不一定是立即）去呼叫繫結在這個事件上的函式（傳入一些預定義的引數，以及在繫結時指定的一個引數），直到這個函式執行完，再返回schedule其他事件。
* 轻量级，专注于网络；
* 跨平台，支持 Windows、Linux、Mac Os等；
* 支持多种 I/O多路复用技术， epoll、poll、dev/poll、select 和kqueue 等；
* 支持 I/O，定时器和信号等事件；
    * 定時器的資料結構使用最小堆（Min Heap），以提高效率。
    * 網路IO和訊號的資料結構採用了雙向連結串列(TAILQ)。
    * 在實現上主要有3種連結串列:EVLIST_INSERTED, EVLIST_ACTIVE, EVLIST_TIMEOUT，一個ev在這3種連結串列之間被插入或刪除，處於EVLIST_ACTIVE連結串列中的ev最後將會被排程執行。
-　Libevent是基于 Reactor 模式的网络库，在 Reactor 模式中，通常都有一个事件循环(Event Loop)，在 Libevent 中，这个事件循环就是event_base结构体：
-　默认情况下，当一个事件变得活跃时，Libevent 会执行这个事件的回调函数，但同时也会将这个事件从事件循环中移除
## usage
- 首先建立一個event_base物件
    ```clike
    struct event_base *event_base_new(void);           // 创建事件循环
    void event_base_free(struct event_base *base);     // 销毁事件循环
    int event_base_dispatch(struct event_base *base);  // 运行事件循环

    //建立一個event_base
    struct event_base *base = event_base_new();
    assert(base != NULL);
    ```
    - struct event_base *base = event_base_new()用以建立一個事件處理的全域性變數，可以理解為這是一個負責集中處理各種出入IO事件的總管家，它負責接收和派發所有輸入輸出IO事件的資訊，這裡呼叫的是函式event_base_new(), 很多程式裡這裡用的是event_init()，區別就是前者是執行緒安全的、而後者是非執行緒安全的，後者在其官方說明中已經被標誌為過時的函式、且建議用前者代替，libevent中還有很多類似的函式，比如建議用event_base_dispatch代替event_dispatch，用event_assign代替event_set和event_base_set等，關於libevent介面的詳細說明見其官方說明libevent_doc。

    - event_base內部有一個迴圈，迴圈阻塞在epoll/kqueue等系統呼叫上，直到有一個或者一些事件發生，然後去處理這些事件。當然，這些事件要被繫結在這個event_base上。每個事件對應一個struct event，可以是監聽一個fd或者POSIX訊號量之類。struct event使用event_new來建立和繫結，使用event_add來啟用：
- 建立一個event物件，並且將其監聽的socket託管給event_base,指定要監聽的事件型別，並綁上相應的回撥函式
    ```clike
    struct event *event_new(struct event_base *base, // 事件循环
                            evutil_socket_t fd,      // 文件描述符
                            short what,              // 事件类型
                            event_callback_fn cb,    // 回调函数
                            void *arg);              // 传递给回调函数的参数

    //建立並繫結一個event
    struct event *listen_event;
    //引數：event_base, 監聽的fd，事件型別及屬性，繫結的回撥函式，給回撥函式的引數
    listen_event = event_new(base, listener, EV_READ|EV_PERSIST, callback_func, (void*)base);
    ```
    - 將該socket託管給event_base，指定要監聽的事件型別，並繫結上相應的回撥函式(及需要給它的引數)。對於listener socket來說，只需要監聽EV_READ|EV_PERSIST
        * (a) EV_TIMEOUT: 超時
        * (b) EV_READ: 只要網路緩衝中還有資料，回撥函式就會被觸發
        * (c) EV_WRITE: 只要塞給網路緩衝的資料被寫完，回撥函式就會被觸發
        * (d) EV_SIGNAL: POSIX訊號量，參考manual吧
        * (e) EV_PERSIST: 不指定這個屬性的話，回撥函式被觸發後事件會被刪除
        * (f) EV_ET: Edge-Trigger邊緣觸發，參考EPOLL_ET
- 通過event_add方法啟動監聽事件
    ```clike
    int event_add(struct event *ev,             // 事件
                  const struct timeval *tv);    // 超时时间

    //引數：event，超時時間(struct timeval *型別的，NULL表示無超時設定)
    event_add(listen_event, NULL);
    ```
- 進入事件迴圈
    ```clike
    //啟動事件迴圈
    event_base_dispatch(base);
    ```
    - 需要啟動event_base的迴圈，這樣才能開始處理髮生的事件。迴圈的啟動使用event_base_dispatch，迴圈將一直持續，直到不再有需要關注的事件，或者是遇到event_loopbreak()/event_loopexit()函式。


## reference
- [Libevent深入浅出 · libevent深入浅出](https://aceld.gitbooks.io/libevent/content/)
- [Gea-Suan Lin's BLOG for ACG & Others...: Network Programming Using Libevent - (I)](https://blog.gslin.info/2005/11/network-programming-using-libevent-i.html)
- [Gea-Suan Lin's BLOG for ACG & Others...: Network Programming Using Libevent - (II)](https://blog.gslin.info/2005/11/network-programming-using-libevent-ii.html)
- [Gea-Suan Lin's BLOG for ACG & Others...: Network Programming Using Libevent - (III)](https://blog.gslin.info/2005/11/network-programming-using-libevent-iii.html)
- [linux下libevent的安裝和使用例子：資料回顯 - IT閱讀](https://www.itread01.com/content/1546368317.html)
- [libevent: Main Page](http://www.wangafu.net/~nickm/libevent-2.1/doxygen/html/)
- [libevent](https://libevent.org/)
- [Libevent 编程指南 | Senlin's Blog](http://senlinzhan.github.io/2017/08/12/libevent/)
- [Libevent學習——Echo Server based on libevent | 程式前沿](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/88763/)