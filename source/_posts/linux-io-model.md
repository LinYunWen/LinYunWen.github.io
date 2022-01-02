---
title: Linux IO model
date: 2022-01-02 18:18:46
tags: [linux, c/c++, io model, book section]
---

# IO model
## introduction
### Kernal Space, User Space
- 作業系統的核心是核心，獨立於普通的應用程式，可以訪問受保護的記憶體空間，也有訪問底層硬體裝置的所有許可權。為了保證使用者程式不能直接操作核心（kernel），保證核心的安全
- CPU 執行程式時，會在 user space 與 kernel space 之間來回切換，user space 的系統函式庫，會轉換為 kernel space 的 system call，並由 kernel 處理，當 system call 完成後，就會回到 user space 繼續下去。
- 32 bits 的 OS，定址空間是 2^32 也就是 4G。kernel space 限制為 1G (虛擬地址0xC0000000到0xFFFFFFFF)，而 user space 為 3G (虛擬地址0x00000000到0xBFFFFFFF)，由各 process 使用。
- 64 bits 的 OS，會將 virtual address 分成一半，第一個 bit 為 0 是 user space，第一個 bit 為 1 是 kernel space，理論上是 8EB+8EB。但目前 processors 只實作了 [48 bits](https://en.wikipedia.org/wiki/X86-64#Canonical_form_addresses)，也就是 128TB+128TB。
<!--more-->
### Buffered I/O
- 大多數文件系統的默認I/O 操作都是 Buffered I/O，在 Linux 會將 IO 資料先暫存在 page cache 中，也就是先複製到 kernel 的 buffer，然後再由 kernel buffer 複製到 user space。
- Buffered I/O 分離了 user space 及實際的儲存設備，可以減少 HD 的讀取次數，提高系統效能。
- 但也因為多次複製，可能會造成 CPU 及 cache buffer 的消耗，有些特殊的應用，會避開 kernel cache buffer，而直接由 user space 儲存到 HD，以獲取更高的效能。
## IO model
- 因為資料會先複製到 kernel buffer 裡面，然後再複製到 user space，當對一個資料進行 read，會經歷兩個階段：
    1.  waiting for data to be ready
    2.  copying the data from the kernel to the process
- 因為兩階段的 IO，linux 產生了五種 IO model
    1.  blocking IO
    2.  nonblocking IO
    3.  IO multiplexing
    4.  signal driven IO (不常用)
    5.  asynchronous IO

### blocking IO
[![](https://3.bp.blogspot.com/-d2Lp3_9RFcY/XTRbOwed2SI/AAAAAAAABGM/_joXdGIUuTYuKIX-mWkJDzM-1vVSiInBwCLcBGAs/s400/LinuxIO_1_blocking.png)](https://3.bp.blogspot.com/-d2Lp3_9RFcY/XTRbOwed2SI/AAAAAAAABGM/_joXdGIUuTYuKIX-mWkJDzM-1vVSiInBwCLcBGAs/s1600/LinuxIO_1_blocking.png)
- linux 預設大部分的 socket 都是使用 blocking IO
- 當 process 呼叫 recv_from，會進入 wait for data 階段，在這個階段的 process 會進入 blocking 狀態，直到 kernel 將資料複製到 user space，該 process 才會解除 blocking 狀態，重新運作。
- blocking IO 就是兩個階段的 IO 都被 block

### nonblocking IO
[![](https://3.bp.blogspot.com/-7cEbiG7qhgE/XTRbO_mMQ6I/AAAAAAAABGI/HdJ8K_w-5PU5zavnpJN6433DN6cwTF5ewCPcBGAYYCw/s400/LinuxIO_2_nonblicking.png)](https://3.bp.blogspot.com/-7cEbiG7qhgE/XTRbO_mMQ6I/AAAAAAAABGI/HdJ8K_w-5PU5zavnpJN6433DN6cwTF5ewCPcBGAYYCw/s1600/LinuxIO_2_nonblicking.png)
- 當 process 呼叫 recv_from 如果 kernel 還沒將資料準備好，他不會 block process，而是產生 error，直到 kernel 將資料準備好，就會複製到 user space，並完成該讀取的工作。
- nonblocking 需要 process 不斷向 kernel 詢問，資料是否 ready。

### IO multiplexing
[![](https://1.bp.blogspot.com/--WxtFM20bnU/XTRbOwCvMLI/AAAAAAAABGQ/IM_7wIXFKiAJqRAOwTMPNZS0edRFCKzPwCPcBGAYYCw/s400/LinuxIO_3_io_multiplexing.png)](https://1.bp.blogspot.com/--WxtFM20bnU/XTRbOwCvMLI/AAAAAAAABGQ/IM_7wIXFKiAJqRAOwTMPNZS0edRFCKzPwCPcBGAYYCw/s1600/LinuxIO_3_io_multiplexing.png)
- 這就是常見的 select, poll, epoll，也稱為 event driven IO。
- 這個方式可讓單一 porcess 就可以處理多個 IO，他會不斷地 polling 多個 socket，當某個 socket 有收到資料，就會主動callback 通知 process。
- 如果是 select，當 process 呼叫了 select，該 process 就會被 block，同時 kernel 會監控所有 select 處理的 sockets，如果有資料，select 就會 return，然後再由 process 呼叫 read，將資料由 kernel 複製到 user space。
- 這個方法類似 blocking IO，但進行了兩個 system call (select 及 recv_from)，但 select 可處理多個 sockets。
- select/epoll 的優點是可以處理多個 sockets，而不是效能。一般在 IO multiplexing 中，socket 都是設定為 non-blocking 的，process 是在 select 被 block 而不是 recv_from。

### signal driven
[![](https://4.bp.blogspot.com/-dGQrUvm0vZY/XTRbPgq5sUI/AAAAAAAABGo/TDtJRra7XsEV53QX4H9hFe165t-Ff4-EQCPcBGAYYCw/s400/LinuxIO_4_signal_driven.png)](https://4.bp.blogspot.com/-dGQrUvm0vZY/XTRbPgq5sUI/AAAAAAAABGo/TDtJRra7XsEV53QX4H9hFe165t-Ff4-EQCPcBGAYYCw/s1600/LinuxIO_4_signal_driven.png)
- 先通知 kernel 如果某個 socket 有資料時，就以 signal 通知 process，process 在第二個步驟，才會被 block。

### asynchronous
[![](https://1.bp.blogspot.com/-8lFJu3825Gk/XTRbP0lg39I/AAAAAAAABGo/Ht--7Qj1C9U0875aUIiW6PjeZ7b5vcxPACPcBGAYYCw/s400/LinuxIO_5_asynchronous.png)](https://1.bp.blogspot.com/-8lFJu3825Gk/XTRbP0lg39I/AAAAAAAABGo/Ht--7Qj1C9U0875aUIiW6PjeZ7b5vcxPACPcBGAYYCw/s1600/LinuxIO_5_asynchronous.png)
- 當 process 進行 read，就可以處理別的事情，當 kernel 收到非同步 read，就會馬上 return，直到將資料複製到 user space，完成後，才會發送 signal 給 process，通知已經完成了 read。

### Comparison

[![](https://2.bp.blogspot.com/-OS9b91VNQgk/XTRbQP8XGBI/AAAAAAAABGs/Yw7YzwAUWBkbRwBYzZpfboDsXDwNwQIFwCPcBGAYYCw/s400/LinuxIO_6_IOModels.png)](https://2.bp.blogspot.com/-OS9b91VNQgk/XTRbQP8XGBI/AAAAAAAABGs/Yw7YzwAUWBkbRwBYzZpfboDsXDwNwQIFwCPcBGAYYCw/s1600/LinuxIO_6_IOModels.png)
-   non-blocking 跟 asynchronous 是不同的
-   synchronous 跟 asynchronous 的差異是 IO operation 會不會 blocking process，因此前面四種 model 都屬於 synchronous IO
-   nonblocking IO 中，在複製資料到 user space 的步驟，還是會有 blocking 的狀態


## reference
- [一文搞懂select、poll和epoll区别 - 知乎](https://zhuanlan.zhihu.com/p/272891398)
- [Maxkit: Linux IO: select, poll, epoll](https://blog.maxkit.com.tw/2019/07/linux-io-select-poll-epoll.html)
- [面試官：select、poll、epoll有何區別？我：阿巴阿巴..._SegmentFault部落格 - MdEditor](https://www.gushiciku.cn/pl/poOl/zh-tw)
- [Linux IO模式及 select、poll、epoll詳解（含部分例項原始碼） | IT人](https://iter01.com/562148.html)