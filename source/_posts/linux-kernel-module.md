---
title: Linux Kernel Modules
date: 2021-10-31 09:04:42
tags: [note, linux, kernel, module, book section]
---

# Linux Kernel Modules
- 系統啟動後,正常工作的模組都在/proc/modules檔案中列出。使用lsmod命令也可顯示相同內容。
- Linux 會將所有核心模組放在 `/lib/modules/uname -r/kernel/drivers/` 目錄下
<!--more-->
## lsmod
- 列出核心已載入模組的狀態
- lsmod 顯示當前載入的所有模組，相當於cat /proc/modules
- output
    - 模組名稱(Module)；
    * 模組的大小(size)；
    * 此模組是否被其他模組所使用 (Used by)。

### e.g.
```clike
Module(模組名)    Size(模組大小)   Used by(被…使用)
eg. ne2k_pci           8928               0
8390                 9472              1 ne2k_pci
```

## modinfo
- 顯示核心模組的資訊

### 參數：
* -V –version 版本
* -F –field 僅在一行上顯示field值，這對於指令碼較為有用。常用的field有：author, description, licence, param, depends, alias, filename。
* -0 –NULL 使用’/0′字元分隔field值，而不是一個新行。對指令碼比較有用。
* -a -d -l -p -n 這些分別是author, description, license, param ,filename的簡短形式。

### e.g.
```clike
$ modinfo sg
filename:    /lib/modules/2.6.9-42.ELsmp/kernel/drivers/scsi/sg.ko
author:     Douglas Gilbert
description:  SCSI generic (sg) driver
license:    GPL
version:    3.5.31 B0B0CB1BB59F0669A1F0D6B
parm:      def_reserved_size:size of buffer reserved for each fd
parm:      allow_dio:allow direct I/O (default: 0 (disallow))
alias:     char-major-21-*
vermagic:    2.6.9-42.ELsmp SMP 686 REGPARM 4KSTACKS gcc-3.4
depends:    scsi_mod
...
```
## insmod
> - `insmod [filename] [modue options …]`
- 向Linux核心中插入一個模組
- insmod 則完全由使用者自行載入一個完整檔名的模組， 並不會主動的分析模組相依性啊

## modprobe
- insmod 與 modprobe 都是載入 kernel module，不過一般差別於 modprobe 能夠處理 module 載入的相依問題。
    - 比方你要載入 a module，但是 a module 要求系統先載入 b module 時，直接用 insmod 掛入通常都會出現錯誤訊息，不過 modprobe 倒是能夠知道先載入 b module  後才載入 a module，如此相依性就會滿足。
    - 不過 modprobe 並不是大神，不會厲害到知道 module 之間的相依性為何，該程式是讀取 /lib/modules/2.6.xx/modules.dep 檔案得知相依性的。而該檔案是透過 depmod 程式所建立。
    - /lib/modules/`uname -r`/modules.dep
### 參 數:
*   -a或--all  載入全部的模組。 
*   -c或--show-conf  顯示所有模組的設定資訊。 
*   -d或--debug  使用排錯模式。 
*   -l或--list  顯示可用的模組。 
*   -r或--remove  模組閒置不用時,即自動解除安裝模組。 
*   -t或--type  指定模組型別。 
*   -v或--verbose  執行時顯示詳細的資訊。 
*   -V或--version  顯示版本資訊。 
*   -help  顯示幫助。

### e.g.
- 刪除模組的命令是
    - `modprobe -r filename`
- 列出核心中所有已經或者未掛載的所有模組:
    - `modprobe -l`
- 掛載 vfat 模組
    - modprobe vfat
        - 這裡,使用格式 "modprobe 模組名" 來掛載一個模組。
        - 掛載之後,用lsmod可以檢視已經掛載的模組。
        - 模組名是不能帶有後綴的,我們通過modprobe -l 所看到的模組,都是帶有.ko 或.o字尾。
- 查看modules的配置文件：
    - `modprobe -c`
- modprobe 另一個用處是顯示核心模組的相依性
    - `modprobe –show-depends ip_tables`

## rmmod
> - `rmmod [-fw] module_name`
### 參數：
* -v –verbose  顯示程式正在做些什麼，一般只顯示執行時的錯誤資訊。
* -f –force  該選項是非常危險：除非編譯核心時，CONFIG_MODULE_FORCE_UNLOAD被設定該命令才有效果，否則沒效果。用該選項可以刪除正在被使用的模組，設計為不能刪除的模組，或者標記為unsafe的模組。
* -w –wait 通常，rmmod拒絕刪除正在被使用的模組。使用該選項後，指定的模組會被孤立起來，直到不被使用。
* -s  –syslog  將錯誤資訊寫入syslog，而不是標準錯誤(stderr)。
* -V  –version 版本資訊

### e.g.
- smbfs 模組移除
    - rmmod smbfs

## depmod
> - `depmod(选项)`
- depmod命令可产生模块依赖的映射文件，在构建嵌入式系统时，需要由这个命令来生成相应的文件，由modprobe使用
### 參數
* -a或--all：分析所有可用的模块；
* -d或debug：执行排错模式；
* -e：输出无法参照的符号；
* -i：不检查符号表的版本；
* -m<文件>或system-map<文件>：使用指定的符号表文件；
* -s或--system-log：在系统记录中记录错误；
* -v或--verbose：执行时显示详细的信息；
* -V或--version：显示版本信息；
* --help：显示帮助。

### e.g.
- `depmod -b /home/windsome/EMMA3PF-KernelSource-20080626/install_pos -e -F ./boot/System.map -v 2.6.18_pro500-bcm91250-mips2_fp_be -A -a`
    - /home/windsome/EMMA3PF-KernelSource-20080626/install_pos是我make mod_install后，所有模块的存放路径。
    - ./boot/System.map是make linux后生成，我拷贝到此目录的。
    - 2.6.18_pro500-bcm91250-mips2_fp_be是我build的linux的版本。
### reference
- [modprobe vs. insmod vs. rmmod @ R & D LAB :: 隨意窩 Xuite日誌](https://blog.xuite.net/lidj37/twblog/179517568-modprobe+vs.+insmod+vs.+rmmod)
- [linux modprobe命令引數及用法詳解--linux載入模組命令 - IT閱讀](https://www.itread01.com/p/1389731.html)
- [modprobe命令_Linux modprobe 命令用法详解：自动处理可载入模块](https://man.linuxde.net/modprobe)
- [depmod命令_Linux depmod 命令用法详解：分析可载入模块的相依性](https://man.linuxde.net/depmod)
- [千變萬化Linux: 核心模組的觀察： lsmod, modinfo](http://mingyi-ulinux.blogspot.com/2009/01/lsmod-modinfo.html)
- [Linux 核心模組管理](https://www.opencli.com/linux/linux-kernel-module-management)
- [Linux modinfo命令 | 菜鸟教程](https://www.runoob.com/linux/linux-comm-modinfo.html)