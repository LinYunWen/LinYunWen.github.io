---
title: Linux 檔案系統基本架構
date: 2020-10-01 20:53:50
tags: [linux, note]
---

# Linux 檔案系統基本架構
> - 理論上所有的 Linux 發佈版本應該都要遵守檔案系統的標準（Filesystem Hierarchy Standard, FHS）
> - 以目錄的資訊可分為 shareable, unshareable 和 static, variable

<!--more-->

## Introduction
- `/` (root)
    - 所有目錄都會在其之下
- `/bin`, `/sbin`
    - `/bin` 主要放置**一般使用者** (users) 可以執行 (executable) 的指令
    - `/sbin` 放置**系統管理員** (super user) 可以操作的指令
- `/boot`
    - 主要放置開機相關檔案 (boot)
- `/dev` (devices)
    - device 的相關檔案，包話滑鼠鍵盤等
- `/etc`
    - 主要放置系統檔案
    - 系統在開機過程需要讀取的檔案
- `/home`, `/root`
    - `/home` 主要是**一般使用者**的家目錄
    - `/root` 為**系統管理員**的家目錄
- `/lib`, `/lib64`
    - 主要為系統函式庫和核心函式庫
    - 若是 64 位元則放在 `/lib64`
- `/proc`
    - 將記憶體內的資料做成檔案類型
    - 虛擬檔案系統，不佔任何硬碟空間
- `/sys` 
    - 與 `/proc` 類似，但主要針對硬體相關參數
- `/usr` (unix software resource)
    - 存放系統相關軟體、服務
    - **不是 user 的縮寫**
- `/var` (variable)
    - 存放一些變數或記錄檔
- `/tmp` (temporary)
    - 存放暫存檔案
- `/media`, `/mnt`
    - 存放抽取式的裝置慣用目錄
    - `/mnt` 為管理員/使用者手動掛上（mount）的目錄
    - 例如需要 mount 一些光碟、硬碟都可以掛載在這
- `/local`
    - 升級或額外安裝的程式擺放的目錄
    - 用以區分原始系統安裝的程式。
- `/run` 
    - 系統進行服務軟體運作管理處

## Tips
- /etc, /bin, /dev, /lib, /sbin 這五個次目錄都要與根目錄一起，不可為獨立的 partition (不可被分割)



## Reference
- [Linux I/O 輸入與輸出重新導向，基礎概念教學](https://blog.gtwang.org/linux/linux-io-input-output-redirection-operators/)
- [Linux Command 命令列指令與基本操作入門教學](https://blog.techbridge.cc/2017/12/23/linux-commnd-line-tutorial/)
- [Linux 目錄配置](https://dywang.csie.cyut.edu.tw/moodle23/dywang/linuxSystem/node29.html)