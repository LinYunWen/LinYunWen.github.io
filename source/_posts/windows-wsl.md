---
title: windows-wsl
date: 2021-09-22 21:37:21
tags: [note, windows, wsl]
---

# Windows WSL (Windows Subsystem for Linux)

## install
- `wsl --install`
- [在 Windows 10 上安裝 WSL | Microsoft Docs](https://docs.microsoft.com/zh-tw/windows/wsl/install-win10)
<!--more-->
## root path
- In the latest versions [2020], the file system is accessed from:
    ```bash
    # \\wsl$\<Distribution>:

    \\wsl$\Ubuntu
    ```
- For Ubuntu installed from the Windows store:
    > - Each distribution you install through the store is installed to that application's appdata directory.
    > - For example: `C:\Users\<username>\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState`
- In earlier iterations of Windows Subsystem for Linux, the Ubuntu file system
    - `%localappdata%\Lxss` (e.g., `C:\Users\Username\AppData\Local\Lxss` \- replace the **Username** with your Username on Windows). See [the WSL blog post on File System Support](https://blogs.msdn.microsoft.com/wsl/2016/06/15/wsl-file-system-support/):


:::danger
- Creating/modifying any files within the Linux subsystem using Windows apps & tools can cause Data corruption and data loss in Ubuntu subsystem!
:::

### reference
- [bash - What is the home directory on Windows Subsystem for Linux? - Super User](https://superuser.com/questions/1185033/what-is-the-home-directory-on-windows-subsystem-for-linux)
- [Where is the Ubuntu file system root directory in Windows Subsystem for Linux and vice versa? - Ask Ubuntu](https://askubuntu.com/questions/759880/where-is-the-ubuntu-file-system-root-directory-in-windows-subsystem-for-linux-an)