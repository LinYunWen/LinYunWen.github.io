---
title: c-c++-limit
date: 2021-09-26 19:57:44
tags: [note, c/c++, book section, limits]
---

# C/C++ limits
> - 在 c 中是 \<limits.h>
> - 在 c++ 中是 \<climits>
:::info
1、32位编译系统中:
long 占4字节 int 占4字节 long int 占4字节
2、64位编译系统中:
long 占8字节 int 占4字节 long int 占8字节
3、32位和64位编译系统中
long long int 在32位和64位编译系统中，都占8字节
:::
<!--more-->
## LONG_MAX
```clike
/* Minimum and maximum values a `signed long int' can hold.
   (Same as `int').  */
#ifndef __LONG_MAX__
#define __LONG_MAX__ 2147483647L
#endif
#undef LONG_MIN
#define LONG_MIN (-LONG_MAX-1)
#undef LONG_MAX
#define LONG_MAX __LONG_MAX__
```
|name|expresses|possible value*|
|--- |--- |--- |
|CHAR_BIT|Number of bits in a char object (byte)|8 or greater*|
|SCHAR_MIN|Minimum value for an object of type signed char|-127 (-27+1) or less*|
|SCHAR_MAX|Maximum value for an object of type signed char|127 (27-1) or greater*|
|UCHAR_MAX|Maximum value for an object of type unsigned char|255 (28-1) or greater*|
|CHAR_MIN|Minimum value for an object of type char|either SCHAR_MIN or 0|
|CHAR_MAX|Maximum value for an object of type char|either SCHAR_MAX or UCHAR_MAX|
|MB_LEN_MAX|Maximum number of bytes in a multibyte character, for any locale|1 or greater*|
|SHRT_MIN|Minimum value for an object of type short int|-32767 (-215+1) or less*|
|SHRT_MAX|Maximum value for an object of type short int|32767 (215-1) or greater*|
|USHRT_MAX|Maximum value for an object of type unsigned short int|65535 (216-1) or greater*|
|INT_MIN|Minimum value for an object of type int|-32767 (-215+1) or less*|
|INT_MAX|Maximum value for an object of type int|32767 (215-1) or greater*|
|UINT_MAX|Maximum value for an object of type unsigned int|65535 (216-1) or greater*|
|LONG_MIN|Minimum value for an object of type long int|-2147483647 (-231+1) or less*|
|LONG_MAX|Maximum value for an object of type long int|2147483647 (231-1) or greater*|
|ULONG_MAX|Maximum value for an object of type unsigned long int|4294967295 (232-1) or greater*|
|LLONG_MIN|Minimum value for an object of type long long int|-9223372036854775807 (-263+1) or less*|
|LLONG_MAX|Maximum value for an object of type long long int|9223372036854775807 (263-1) or greater*|
|ULLONG_MAX|Maximum value for an object of type unsigned long long int|18446744073709551615 (264-1) or greater*|


## reference
- [linux c 宏 LONG_MAX LLONG_MAX_whatday的专栏-CSDN博客](https://blog.csdn.net/whatday/article/details/104084503)
- [C++各类size极值基础定义 · Zablog](http://zablog.me/2015/11/05/C++_size/)
- [limits.h](https://opensource.apple.com/source/xnu/xnu-201/EXTERNAL_HEADERS/machine/limits.h.auto.html)
- [\<climits> (limits.h) - C++ Reference](https://www.cplusplus.com/reference/climits/)
- [<limits.h> - C語言標準庫 - C語言標準庫](http://tw.gitbook.net/c_standard_library/limits_h.html)