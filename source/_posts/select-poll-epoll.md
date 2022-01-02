---
title: select-poll-epoll
date: 2022-01-02 18:20:30
tags: [note, c/c++, epoll, poll, select, book section]
---

# epoll, poll, select


## select - 時間複雜度O(n)
- `int select (int n, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout);`
    - select 可監視 writefd, readfd, 及 exceptfd。呼叫 select 後，該 process 會被 blocked，直到某個 fd ready 或是 timeout。當 select return 後，必須要 traverse 所有 fdset，來找到 ready 的 fd。
- select 在所有平台都支援，缺點是監視的 fd 有數量上限，通常是 1024，但可修改 macro 或是重新編譯 kernel 增加這個上限。
- 32位機預設是1024個。64位機預設是2048.
![](https://i.imgur.com/Cky3Tmr.png)

<!--more-->

### 缺点
* 内核需要将消息传递到用户空间，都需要内核拷贝动作。需要维护一个用来存放大量fd的数据结构，使得用户空间和内核空间在传递该结构时复制开销大。
* 每次调用select，都需把fd集合从用户态拷贝到内核态，fd很多时开销就很大
* 同时每次调用select都需在内核遍历传递进来的所有fd，fd很多时开销就很大
* select支持的文件描述符数量太小了，默认最大支持1024个
* 主动轮询效率很低

## poll - 時間複雜度O(n)
```clike
int poll (struct pollfd *fds, unsigned int nfds, int timeout);

struct pollfd {
    int fd; /* file descriptor */
    short events; /* requested events to watch */
    short revents; /* returned events witnessed */
};
```
- poll 使用一個 pollfd pointer 表示 fd，該 pollfd 包含要監視的 event及發生的 event，pollfd 沒有數量上限。poll return 後，必須 traverse pollfd，找到 ready 的 fd。
- poll本質上和select沒有區別
- poll還有一個特點是“水平觸發”，如果報告了fd後，沒有被處理，那麼下次poll時會再次報告該fd。


## epoll - 時間複雜度O(1)
```clike
// size 為監視的 fd 數量
int epoll_create(int size)；
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event)；
int epoll_wait(int epfd, struct epoll_event * events, int maxevents, int timeout);
```
- `int epoll_create(int size)；`
    - 當產生了 epoll 後，會佔用一個 fd value，不同於 select 必須提供最大監視 fd 數量 +1，size 並不是該 epoll 能監視的 fd 數量上限，而是配置 kernel 內部資料的建議參數。
    - 在linux下如果檢視/proc/程式id/fd/，是能夠看到這個fd的，所以在使用完epoll後，必須呼叫close()關閉，否則可能導致fd被耗盡。
- `int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event)；`
    -   epfd: 是 epoll_create 的 return value
    -   op: 有三個 macro 表示 operation: EPOLL_CTL_ADD, EPOLL_CTL_DEL, EPOLL_CTL_MOD，分別是新增、刪除、修改 fd 監視的 events
    -   fd: 需要監視的 fd
    -   epoll_event: 告訴 kernel 要監視什麼 event
    ```clike
    struct epoll_event {
      __uint32_t events;  /* Epoll events */
      epoll_data_t data;  /* User data variable */
    };
    
    //events 是以下幾個 macro 的集合：
    EPOLLIN：表示對應的文件描述符可以讀（包括對端SOCKET正常關閉）
    EPOLLOUT：表示對應的文件描述符可以寫
    EPOLLPRI：表示對應的文件描述符有緊急的資料可讀（這裡應該表示有外部資料到來）
    EPOLLERR：表示對應的文件描述符發生錯誤
    EPOLLHUP：表示對應的文件描述符被掛斷
    EPOLLET： 將EPOLL設為 Edge Triggered 模式，這是相對於水平觸發(Level Triggered)來說的
    EPOLLONESHOT：只監聽一次事件，當監聽完這次事件之後，如果還需要繼續監聽這個socket的話，需要再次把這個socket加入到EPOLL隊列
    ```
- `int epoll_wait(int epfd, struct epoll_event * events, int maxevents, int timeout);`
    - 等待 epfd 的 IO event
    - 最多回傳 maxevents 個 events
    - events 是事件的集合，maxevents 不能超過 epoll_create 的 size
    - timeout 為 0 表示要馬上 return，如果回傳的事件數量為 0 表示發生了 timeout
- epoll 對 fd 的操作有兩種模式:LT (Level Trigger) 及 ET (Edge Trigger)
    -   LT:
        -   當 epoll_wait 偵測到 fd 事件發生，將該事件通知 process，該 process 可不立刻處理該 event，當下次呼叫 epoll_wait 時，會再次通知 process 這個事件
        - 同時支援 blocking 與 non-blocking socket，可對該 ready 的 fd 進行 IO，如果不做，kernel 會持續通知 ready
        - 如果你不作任何操作，核心還是會繼續通知你的
    -   ET:
        -   當 epoll_wait 偵測到 fd 事件發生，將該事件通知 process，該 process 必須立刻處理該 event，如果沒有處理，當下次呼叫 epoll_wait 時，不會再次通知 process 這個事件
        - 這是高速運作方式，只支援 non-blocking socket
        - ET模式在很大程度上減少了epoll事件被重複觸發的次數，因此效率要比LT模式高



## summary
- 在 select/poll 中，process 必須呼叫某些 function，kernel 才會對該 fd 進行監視，而 epoll 事先利用 epoll_ctl 註冊 fd，當某個 fd ready 後，會透過 callback 機制，啟動這個 fd，當 process 呼叫 epoll_wait 就可得到通知。
- 如果沒有大量的 idle/dead connection，epoll 的效率不會比 select/poll 高很多。
### 支援一個程序所能開啟的最大連線數
- select
    * 單個程序所能開啟的最大連線數有FD_SETSIZE巨集定義，其大小是32個整數的大小（在32位的機器上，大小就是32_32，同理64位機器上FD_SETSIZE為32_64），當然我們可以對進行修改，然後重新編譯核心，但是效能可能會受到影響，這需要進一步的測試。
* poll
    * poll本質上和select沒有區別，但是它沒有最大連線數的限制，原因是它是基於連結串列來儲存的
* epoll
    * 雖然連線數有上限，但是很大，1G記憶體的機器上可以開啟10萬左右的連線，2G記憶體的機器可以開啟20萬左右的連線
### FD劇增後帶來的IO效率問題
* select
    * 因為每次呼叫時都會對連線進行線性遍歷，所以隨著FD的增加會造成遍歷速度慢的“線性下降效能問題”。
* poll
    * 同上
* epoll
    * 因為epoll核心中實現是根據每個fd上的callback函式來實現的，只有活躍的socket才會主動呼叫callback，所以在活躍socket較少的情況下，使用epoll沒有前面兩者的線性下降的效能問題，但是所有socket都很活躍的情況下，可能會有效能問題。
### 訊息傳遞方式
* select
    * 核心需要將訊息傳遞到使用者空間，都需要核心拷貝動作
* poll
    * 同上
* epoll
    * epoll通過核心和使用者空間共享一塊記憶體來實現的。



## reference
- [一文搞懂select、poll和epoll区别 - 知乎](https://zhuanlan.zhihu.com/p/272891398)
- [Maxkit: Linux IO: select, poll, epoll](https://blog.maxkit.com.tw/2019/07/linux-io-select-poll-epoll.html)
- [面試官：select、poll、epoll有何區別？我：阿巴阿巴..._SegmentFault部落格 - MdEditor](https://www.gushiciku.cn/pl/poOl/zh-tw)
- [Linux IO模式及 select、poll、epoll詳解（含部分例項原始碼） | IT人](https://iter01.com/562148.html)