---
title: Mac problems
date: 2021-09-04 10:15:05
tags: [note, mac, problem]
---

# Mac Problems

## WindowServer
- 進程名稱“WindowS永遠“會讓我們想起”Windows 服務器“但他與這無關 Windows 由微軟。
- 該 WindowServer屬於操作系統 macOS （系統進程）並處理一切 視覺方面 從 桌面, Dock Bar si 菜單欄。 這個過程使得管理在視覺方面（用戶看到的）和硬件方面。 所有 文件夾 si 檔 誰在 桌面, 透明度的影響 麥酒 碼頭 si 菜單欄 由...管理 WindowServer。
### 降低方式
- 1. **盡量減少桌面上文件夾和文件的數量**.
2. **關閉您不使用的Finder窗口** 或者使用帶有多個選項卡的單個打開窗口。
3. **禁用的透明效果 macOS**.
4. **禁用任務控制中的自動重排**.
5. **關閉您不使用的應用程序**.
<!--more-->
### reference
- [是什麼 WindowS錯誤以及為什麼它消耗大量的CPU和RAM資源 macOS - 如何](https://zh-tw.ihowto.tips/osx-apps-download-tutorials-tips-hacks-news/ce-este-windowserver-si-de-ce-consuma-multe-resurse-cpu-si-ram-pe-macos.html)
## kernel_task 
- ernel task 程序的功能之一，是讓 [CPU 用量較高的程序](https://support.apple.com/zh-tw/HT203184)減少使用 CPU，藉此控制電腦溫度。換句話說，即使您並不覺得 Mac 過熱，kernel\_task 仍會自動處理導致 CPU 過熱的情況。它本身不是造成這些情況的原因。CPU 溫度降低後，kernel\_task 就會自動減少其活動。
### reference
- [如果 kernel_task 對 Mac CPU 的用量百分比過高 - Apple 支援 (台灣)](https://support.apple.com/zh-tw/HT207359)
## MRT use too many cpu/memory
- Three systems that work together to protect your Mac from malware are:
    * gatekeeper
    * XProtect
    * **MRT (probably stands for malware removal tool)**
* 通常過一下，他掃完之後就會結束了
* So, these are Apple processes and if they are busy, the likely cause is you are infected or compromised. It could be a false positive, but you might consider enabling gatekeeper and sip if you disabled them and see if you can clean your system. If not, you might need a clean install that’s patched and then carefully get data back but not any programs or malware.
- As a developer, I would use the gear icon in the window you show and while MRT is selected, run System Diagnostics... and file a bug report / radar / escalate a support case to Apple Engineering so they can investigate if MRT has a memory leak - that's also very likely scenario if you are sure you're not needing malware removal every moment your Mac is running.
### reference
- [macos - MRT Process using large unbounded amount of memory - Ask Different](https://apple.stackexchange.com/questions/296339/mrt-process-using-large-unbounded-amount-of-memory)
- 