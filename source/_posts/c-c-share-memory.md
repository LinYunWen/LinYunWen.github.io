---
title: 共享記憶體函式
date: 2021-12-27 07:47:23
tags: [note, c/c++, shmget, shmat, shmdt, shmctl]
---

# 共享記憶體函式
## shmget
### description
```clike
#include <sys/ipc.h>
#include <sys/shm.h>
```
- 得到一个共享内存标识符或创建一个共享内存对象并返回共享内存标识符
- `int shmget(key_t key, size_t size, int shmflg)`

<!--more-->
### 函数传入值
- key
    * 0(IPC_PRIVATE)：会建立新共享内存对象
    * 大于0的32位整数：视参数shmflg来确定操作。通常要求此值来源于ftok返回的IPC键值
- size
    * 大于0的整数：新建的共享内存大小，以字节为单位
    * 0：只获取共享内存时指定为0
* shmflg
    * 0：取共享内存标识符，若不存在则函数会报错
    * IPC_CREAT：当shmflg&IPC_CREAT为真时，如果内核中不存在键值与key相等的共享内存，则新建一个共享内存；如果存在这样的共享内存，返回此共享内存的标识符
    * IPC_CREAT|IPC_EXCL：如果内核中不存在键值与key相等的共享内存，则新建一个消息队列；如果存在这样的共享内存则报错
### 函数返回值
* 成功：返回共享内存的标识符
    * shmid_ds結構成員變數的值設定如下:
        * shm_lpid、shm_nattach、shm_atime、shm_dtime設定為0。
        * msg_ctime設定為當前時間。
        * shm_segsz設成建立共享記憶體的大小。
        * shmflg的讀寫許可權放在shm_perm.mode中。
        * shm_perm結構的uid和cuid成員被設定成當前程序的有效使用者ID,gid和cuid成員被設定成當前程序的有效組ID。
* 出错：-1，错误原因存于error中
    * 附加说明
        * 上述shmflg参数为模式标志参数，使用时需要与IPC对象存取权限（如0600）进行|运算来确定信号量集的存取权限
* 错误代码
    * EINVAL：参数size小于SHMMIN或大于SHMMAX
    * EEXIST：预建立key所指的共享内存，但已经存在
    * EIDRM：参数key所指的共享内存已经删除
    * ENOSPC：超过了系统允许建立的共享内存的最大值(SHMALL)
    * ENOENT：参数key所指的共享内存不存在，而参数shmflg未设IPC_CREAT位
    * EACCES：没有权限
    * ENOMEM：核心内存不足

## shmat函式原型
```clike
#include <sys/types.h>
#include <sys/shm.h>
```
### 函式說明
- 連線共享記憶體識別符號為shmid的共享記憶體,連線成功後把共享記憶體區物件對映到呼叫程序的地址空間,隨後可像本地空間一樣訪問
- `void *shmat(int shmid, const void *shmaddr, int shmflg)`
### 函式傳入值
* msqid
    * 共享記憶體識別符號
* shmaddr
    * 指定共享記憶體出現在程序記憶體地址的什麼位置,直接指定為NULL讓核心自己決定一個合適的地址位置
* shmflg
    * SHM_RDONLY:為只讀模式,其他為讀寫模式
### 函式返回值
* 成功:附加好的共享記憶體地址
* 出錯:-1,錯誤原因存於error中
    * 附加說明
        * fork後子程序繼承已連線的共享記憶體地址。exec後該子程序與已連線的共享記憶體地址自動脫離(detach)。程序結束後,已連線的共享記憶體地址會自動脫離(detach)
* 錯誤程式碼
* EACCES:無許可權以指定方式連線共享記憶體
* EINVAL:無效的引數shmid或shmaddr
* ENOMEM:核心記憶體不足

## shmdt函式原型
```clike
#include <sys/types.h>
#include <sys/shm.h>
```
### 函式說明
* 與shmat函式相反,是用來斷開與共享記憶體附加點的地址,禁止本程序訪問此片共享記憶體
* `int shmdt(const void *shmaddr)`
### 函式傳入值
* shmaddr:連線的共享記憶體的起始地址
### 函式返回值
* 成功:0
* 出錯:-1,錯誤原因存於error中
    * 附加說明
        * 本函式呼叫並不刪除所指定的共享記憶體區,而只是將先前用shmat函式連線(attach)好的共享記憶體脫離(detach)目前的程序
* 錯誤程式碼
* EINVAL:無效的引數shmaddr

## shmctl函式原型
```clike
#include <sys/types.h>
#include <sys/shm.h>
```
### 函式說明
* 完成對共享記憶體的控制
* `int shmctl(int shmid, int cmd, struct shmid_ds *buf)`
### 函式傳入值
* msqid
    * 共享記憶體識別符號
* cmd
    * IPC_STAT:得到共享記憶體的狀態,把共享記憶體的shmid_ds結構複製到buf中
    * IPC_SET:改變共享記憶體的狀態,把buf所指的shmid_ds結構中的uid、gid、mode複製到共享記憶體的shmid_ds結構內
    * IPC_RMID:刪除這片共享記憶體
* buf
    * 共享記憶體管理結構體。具體說明參見共享記憶體核心結構定義部分
### 函式返回值
* 成功:0
* 出錯:-1,錯誤原因存於error中
* 錯誤程式碼
* EACCESS:引數cmd為IPC_STAT,確無許可權讀取該共享記憶體
* EFAULT:引數buf指向無效的記憶體地址
* EIDRM:識別符號為msqid的共享記憶體已被刪除
* EINVAL:無效的引數cmd或shmid
* EPERM:引數cmd為IPC_SET或IPC_RMID,卻無足夠的許可權執行


## reference
- [共享記憶體函式（shmget、shmat、shmdt、shmctl）及其範例 - IT閱讀](https://www.itread01.com/p/150887.html)
- [共享内存函数（shmget、shmat、shmdt、shmctl）及其范例_guoping16的专栏-CSDN博客_shmdt](https://blog.csdn.net/guoping16/article/details/6584058)