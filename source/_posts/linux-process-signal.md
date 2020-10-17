---
title: Linux Process Signal
date: 2020-10-16 22:20:19
tags: [note, linux, process kill]
---

# Linux Process Signal

## Introduction
### Session和process group

- process是OS邏輯排程執行的基本單位。為了管理process，OS會將process分組管理，**session和process group (PG)**就是process群組的單位。一個session可包含多個process group，一個process group可以包含多個process。session/PG有以下性質：
    - 每個session/PG都會有一個leader，通常是該群集中第一個process
    - 每個session/PG都會有一個id，由該群集中第一個process的PID決定
    - 每個session可以配給一個terminal
    - 一個session中，terminal會被attach到其中一個process group
    - 被attach terminal的process group給名詞叫foreground process group
    - 其他的對應為background process group
<!--more-->
### Shell如何配置session和process group
- 在shell中，每次登入都會由shell process開一個session。每行指令都會是一個process group。
- 在shell中，foreground/backend process group可以用bg/fg/jobs指令管理切換。
- ![](https://miro.medium.com/max/700/1*JPz2Eo8FqsjUdUnziPiqPQ.png)

### Signal
> - 訊號/信號是Unix、類Unix以及其他POSIX相容的作業系統中行程間通訊的一種有限制的方式
> - 它是一種異步的通知機制，用來提醒行程一個事件已經發生
> - 當一個訊號傳送給一個行程，作業系統中斷了行程正常的控制流程，此時，任何非原子操作都將被中斷。


#### `SIGTERM`
- a generic signal used to cause program termination.
- Unlike `SIGKILL`, this signal can be blocked, handled, and ignored.
- It is the normal way to politely ask a program to terminate.

> - The shell command `kill` generates `SIGTERM` by default. 

#### `SIGINT` (“program interrupt”)
- is sent when the user types the INTR character (normally C-c).

#### `SIGQUIT`
- similar to `SIGINT`, except that it’s controlled by a different key—`the QUIT character, usually C-\`
- produces a core dump when it terminates the process, just like a program error signal.
- You can think of this as a program error condition “detected” by the user.
> - Certain kinds of cleanups are best omitted in handling `SIGQUIT`.
>     - For example, if the program creates temporary files, it should handle the other termination requests by deleting the temporary files.
>     - But it is better for `SIGQUIT` not to delete them, so that the user can examine them in conjunction with the core dump.


#### `SIGKILL`
- cause immediate program termination.
- It cannot be handled or ignored, and is therefore always fatal.
- It is also not possible to block this signal.
- This signal is usually generated only by explicit request. Since it cannot be handled, you should generate it only as a last resort, after first trying a less drastic method such as C-c or `SIGTERM`. If a process does not respond to any other termination signals, sending it a `SIGKILL` signal will almost always cause it to go away.

> - In fact, if `SIGKILL` fails to terminate a process, that by itself constitutes an operating system bug which you should report.
> - The system will generate `SIGKILL` for a process itself under some unusual conditions where the program cannot possibly continue to run (even to run a signal handler).
  

#### `SIGHUP` (“hang-up”)
- is used to report that the user’s terminal is disconnected, perhaps because a network or telephone connection was broken.
> - This signal is also used to report the termination of the controlling process on a terminal to jobs associated with that session
> - this termination effectively disconnects all processes in the session from the controlling terminal. For more information

### e.g.
- 應用程序可能是multiprocessing架構，要終止此應用需kill這個應用程序所有的process。在這個例子，我們需要發送一個終止訊號給此應用程序所有process所屬的process group以終止應用
- 在Linux實際上就是這樣運作的，當用戶按下ctrl+C，SIGINT會送給foreground process group，也就是其中每個process，包含parent和childern都會收到此訊號。
- 另一個例子是user logout。當用戶登出系統，shell會發送SIGHUP給此shell發起的session中的所有process，在預設狀況下這些process就會終止。

## Reference
- [[筆記]Linux的process和signal](https://medium.com/@petertc/session-process-group-and-signal-in-linux-7fbe85c0b0c5)
- [24.2.2 Termination Signals](https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html)
