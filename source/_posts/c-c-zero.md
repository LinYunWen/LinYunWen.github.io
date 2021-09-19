---
title: c-c++-zero
date: 2021-09-19 21:24:42
tags: [note, c/c++, book section, zero]
---

# C/C++ zero 系列

## bzero
> - `#include <strings.h>`
- void bzero(void *s, size_t n);
- The bzero() function erases the data in the n bytes of the memory
- starting at the location pointed to by s, by writing zeros (bytes containing '\0') to that area.
- return
    - None.
<!--more-->
## explicit_bzero
> - `#include <strings.h>`
- void explicit_bzero(void *s, size_t n);
- The explicit_bzero() function performs the same task as bzero().
- It differs from bzero() in that it guarantees that compiler optimizations will not remove the erase operation if the compiler deduces that the operation is "unnecessary".
- return
    - None.

## reference
- [bzero(3) - Linux manual page](https://man7.org/linux/man-pages/man3/bzero.3.html)