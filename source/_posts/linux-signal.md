---
title: Linux Signal
date: 2021-08-29 10:16:12
tags: [note, signal, linux]
---

# Linux Signals
- 信號機制是進程之間相互傳遞消息的一種方法，信號全稱為軟中斷信號，也有人稱作軟中斷。
- 從它的命名可以看出，它的實質和使用很象中斷。所以，信號可以說是進程控制的一部分。
<!--more-->
## introduction
- 用來通知進程發生了非同步事件。
- 進程之間可以互相通過系統調用kill發送軟中斷信號。
- 內核也可以因為內部事件而給進程發送信號，通知進程發生了某個事件。
> - 注意，信號只是用來通知某進程發生了什麼事件，並不給該進程傳遞任何資料。 

- 收到信號的進程對各種信號有不同的處理方法。
    - 第一種是類似中斷的處理常式，對於需要處理的信號，進程可以指定處理函數，由該函數來處理。
    - 第二種方法是，忽略某個信號，對該信號不做任何處理，就象未發生過一樣。
    - 第三種方法是，對該信號的處理保留系統的預設值，這種缺省操作，對大部分的信號的缺省操作是使得進程終止。
        - 進程通過系統調用signal來指定進程對某個信號的處理行為。 

- 在進程表的表項中有一個軟中斷信號域，該域中每一位元對應一個信號，當有信號發送給進程時，對應位置位元。
    - 由此可以看出，進程對不同的信號可以同時保留，但對於同一個信號，進程並不知道在處理之前來過多少個。

## type
- 發出信號的原因很多，這裡按發出信號的原因簡單分類，以瞭解各種信號： 
	- 與進程終止相關的信號。
	    - 當進程退出，或者子進程終止時，發出這類信號。  
	- 與進程例外事件相關的信號。
	    - 如進程越界，或企圖寫一個唯讀的記憶體區域（如程式正文區），或執行一個特權指令及其他各種硬體錯誤。  
	- 與在系統調用期間遇到不可恢復條件相關的信號。
	    - 如執行系統調用exec時，原有資源已經釋放，而目前系統資源又已經耗盡。  
	- 與執行系統調用時遇到非預測錯誤條件相關的信號。
	    - 如執行一個並不存在的系統調用。  
	- 在使用者態下的進程發出的信號。
	    - 如進程調用系統調用kill向其他進程發送信號。  
	- 與終端交互相關的信號。
	    - 如使用者關閉一個終端，或按下break鍵等情況。  
	- 跟蹤進程執行的信號。

> - 注意 信號SIGKILL和SIGSTOP既不能被捕捉，也不能被忽略。信號SIGIOT與SIGABRT是一個信號。可以看出，同一個信號在不同的系統中值可能不一樣，所以建議最好使用為信號定義的名字，而不要直接使用信號的值。


|值|名 字|說明|
|--- |--- |--- |
|01|SIGHUP|掛起（hangup）|
|02|SIGINT|中斷，當使用者從鍵盤按ctrl+c鍵|
|03|SIGQUIT|退出，當使用者從鍵盤按quit鍵時|
|04|SIGILL|非法指令|
|05|SIGTRAP|跟蹤陷阱（trace trap），啟動進程，跟蹤代碼的執行|
|06|SIGIOT|IOT指令|
|07|SIGEMT|EMT指令|
|08|SIGFPE|浮點運算溢出|
|09|SIGKILL|殺死、終止進程|
|10|SIGBUS|匯流排錯誤|
|11|SIGSEGV|段違例（segmentation invalidation），進程試圖去訪問其虛位址空間以外的位置|
|12|SIGSYS|系統調用中參數錯，如系統調用號非法|
|13|SIGPIPE|向某個非讀管道中寫入資料|
|14|SIGALRM|鬧鐘。當某進程希望在某時間後接收信號時發此信號|
|15|SIGTERM|軟體終止（Termination）|
|16|SIGUSR1|使用者自訂信號1|
|17|SIGUSR2|使用者自訂信號2|
|18|SIGCLD|某個子進程死|
|19|SIGPWR|電源故障|
|20|SIGTSTP|按 \<Ctrl>-Z 發送一個暫停訊號|


### common
- SIGINT(中斷)
    - INT 是 Interrupt 的意思，這個 Signal 通常會用來終止 Process，而且 **允許 Process 在死掉之前完成他的遺願XD**，就像 Word 在你按叉叉時會問你要不要儲存變更，而不是馬上結束
    
- SIGKILL(立即中止)
	- KILL 就是直接殺掉的意思，可以把他當成是 SIGINT 的加強版，他會 **直接、立刻、馬上** 把 Process 殺掉且 **不給他任何辯解的機會**，就像是 Windows 的立即中止，想當然編輯到一半的資料也會直接不見，所以一般不建議使用這個 Signal
- SIGTSTP(暫停)
	- TSTP 是 Terminal Stop 的意思，如上面的範例所說，他的功能就是 **暫停** 一個 Process
- SIGCONT(繼續)
	- CONT 是 Continue 的意思，這應該很明顯了就是讓 Process 繼續跑XD
- SIGTERM
    1.  程序立刻停止
    2.  当程序释放相应资源后再停止
    3.  程序可能仍然继续运行
    - 大部分程序接收到SIGTERM信号后，会先释放自己的资源，然后在停止。但是也有程序可以在接受到信号量后，做一些其他的事情，并且这些事情是可以配置的。如果程序正在等待IO，可能就不会立马做出相应。
    - 也就是说，SIGTERM多半是会被阻塞的、忽略。


## kill
> - `kill ${option} ${pid}`
> - If no signal is specified, the TERM signal is sent

- 發送 SIGINT(中斷訊號) 給 3448 號 Process，這樣他就會被終止，效果跟在 Term1 按 \<Ctrl>-C 一模一樣
    - `kill -INT 3448`
- 發送 SIGKILL(中斷訊號) 給 3448 號 Process，這樣他就會被終止
    ```clike
    kill -9 1234
    kill -KILL 1234
    kill -SIGKILL 1234
    ```
## Reference
- [signal(7) - Linux manual page](https://man7.org/linux/man-pages/man7/signal.7.html)
- [Day23-Signal 訊號（一） - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10226301)
- [老陳獨白: Linux 信號signal處理機制](http://myblog-maurice.blogspot.com/2011/12/linux-signal.html)
- [bash - What is the purpose of the -9 option in the kill command? - Ask Ubuntu](https://askubuntu.com/questions/184071/what-is-the-purpose-of-the-9-option-in-the-kill-command)
- [Linux kill -9 和 kill -15 的区别 - 妖老山黑 - 博客园](https://www.cnblogs.com/liuhouhou/p/5400540.html)