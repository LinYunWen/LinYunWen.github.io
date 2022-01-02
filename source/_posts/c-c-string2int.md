---
title: string to int
date: 2022-01-02 14:06:32
tags: [note, c/c++, string to int, book section]
---

# string to int
## c++
### std::stoi (C++11)
- Convert string to unsigned integer
```clike
unsigned long stoul (const string&  str, size_t* idx = 0, int base = 10);
unsigned long stoul (const wstring& str, size_t* idx = 0, int base = 10);
```
<!--more-->
- param
    - str
        - String object with the representation of an integral number.
    - idx
        - Pointer to an object of type size_t, whose value is set by the function to position of the next character in str after the numerical value.
        - This parameter can also be a null pointer, in which case it is not used.
    - base
        - Numerical base (radix) that determines the valid characters and their interpretation.
        - If this is 0, the base used is determined by the format in the sequence (see strtol for details). Notice that by default this argument is 10, not 0.
### std::from_chars (c++17)
### strtoul
- Interprets an unsigned integer value in a byte string pointed to by str.
```clike
unsigned long      strtoul( const char *str, char **str_end, int base );
```
- params
    - str
        - pointer to the null-terminated byte string to be interpreted
    - str_end
        - pointer to a pointer to character.
    - base
        - base of the interpreted integer value
## c
### atoi()
> - <stdlib.h>

## reference
- [如何在 C++ 中把字串轉換為 Int | D棧 - Delft Stack](https://www.delftstack.com/zh-tw/howto/cpp/how-to-convert-string-to-int-in-cpp/)
- [std::strtoul, std::strtoull - cppreference.com](https://en.cppreference.com/w/cpp/string/byte/strtoul)
- [stoul - C++ Reference](https://www.cplusplus.com/reference/string/stoul/)
- [C/C++ 字串轉數字的3種方法 | ShengYu Talk](https://shengyu7697.github.io/cpp-string-to-integer/)

