---
title: coverity
date: 2021-06-25 15:39:33
tags: [note]
---

# Coverity

## Introduction
Coverity公司是由一流的斯坦福大学的科学家于2002年成立的，产品核心技术是1998年至2002年在斯坦福大学计算机系统实验室开发的，用于解决一个计算机科学领域最困难的问题，在2003年发布了第一个能够帮助Linux、FreeBSD等开源项目检测大量关键缺陷的系统。Coverity公司推出的综合开发测试平台，基于新一代的不做代码规则检查、只专注检测代码中的Bug静态分析技术，可以更好地帮助开发人员在写代码的时候就能发现并修复安全缺陷，缩短产品上市时间和降低风险。Coverity是唯一位列IDC前10名软件质量工具供应商的静态分析工具厂商，被VDC评为静态源代码分析领域的领导者。
<!--more-->
## Features
1.  列出不會被執行到的程式碼
2.  列出沒被初始化的類成員變數
3.  列出沒有被捕獲的異常
4.  列出沒有給出返回值的return語句
5.  某個函式雖然有返回值，但呼叫該函式的地方沒有用到它的返回值，這也會被列出來
6.  列出沒有被回收的new出來的物件
7.  列出沒有被關閉的控制代碼
8.  精確定位到程式碼行，並提供逐層展開函式的功能
9.  列出可能的數值型別溢位。例如，無符號int數做 ++ 操作，可能導致int溢位，都會被檢測到。
10.  什麼地方該用&位運算，而不應該用|位運算，都能定位出來並作出建議
11.  ostream在一個函式中被修改了格式，但退出該函式之後沒有將ostream恢復成先前的格式，也會被檢測到

### most threats in code
SCAN项目中的出现频率      风险程度

空指针引用            27.60%   中

资源泄露                23.19%   高

错误的表达式         9.76%     中

未初始化变量         8.41%     高

释放后使用             5.91%     高

缓冲区溢出             5.52%     高

### Coverity典型缺陷说明


## Reference
- [Coverity程式碼靜態檢測工具介紹](https://www.itread01.com/content/1546712855.html)
- [Coverity談“開發中測試”與程式設計師最常犯的編碼錯誤](https://iter01.com/34538.html)
- [Coverity介绍以及典型缺陷说明](https://blog.csdn.net/yourenshuo/article/details/84896031)
- [CWE-252: 未檢查的返回值（Unchecked Return Value）](https://www.twblogs.net/a/5b7d4c8c2b71770a43de933e)
- [CWE-252: Unchecked Return Value](https://cwe.mitre.org/data/definitions/252.html)
- [STR32-C. Do not pass a non-null-terminated character sequence to a library function that expects a string](https://wiki.sei.cmu.edu/confluence/display/c/STR32-C.+Do+not+pass+a+non-null-terminated+character+sequence+to+a+library+function+that+expects+a+string)