---
title: 可變參數
date: 2021-09-09 21:04:26
tags: [note, c/c++, va_arg, va_start, va_end]
---

# C/C++ 可變參數
- va在這裏是`variable-argument(可變參數)`的意思
> - `#include stdarg.h`
> - va_list 用来定义一个变量列表的指针类型.

## introduction
- 除了有一個參數format固定以外，後面跟的參數的個數和類型是可變的
    ```
    int printf( const char* format，...);
    ```
<!--more-->
- 有下面幾個 function
    - `void va_start( va_list arg_ptr, prev_param );`
        - 的意思是将 listPointer 这个指针绑定到有 n 个变量的传入参数列表上.
    - `void va_copy (va_list dest, va_list src)` 
        - 複製變量參數列表，初始化dest作為...的副本src(處於當前狀態)。
        - 調用的函數va_copy，還應調用va_end在dest在它返回之前。
    - `type va_arg( va_list arg_ptr, type );`  
        - 檢索下一個參數
        - 類型的對象va_list攜帶有關當前檢索狀態的信息可變參數列表。該對象應已通過對的初始調用進行了初始化。va_start或者va_copy並沒有與釋放va_end。
        - 要注意va_arg既不能確定檢索到的參數是否是傳遞給函數的最後一個參數(即使它是該列表末尾的元素)。該函數的設計方式應使得可以通過命名參數或已讀取的其他自變量的值以某種方式推斷參數的數量。
    - `void va_end( va_list arg_ptr );`
        - 当函数调用结束的时候, 要记得使用 va_end 来清除 listPointer 指向的空间, 否则会发生内存泄漏问题.

- simple example
```c
void simple_va_fun(int i, ...) 
{ 
	va_list arg_ptr; 
	int j=0; 
	
	va_start(arg_ptr, i); 
	j=va_arg(arg_ptr, int); 
	va_end(arg_ptr); 
	
	printf("%d %d\n", i, j); 
	return; 
}
```

## 實作
1. 首先在函數裏定義一個va_list型的變量，這裏是arg_ptr，這個變量是指向參數的指針。
2. 然後用va_start宏初始化變量arg_ptr，這個宏的第二個參數是第一個可變參數的前一個參數，是一個固定的參數。
3. 然後用va_arg返回可變的參數，並賦值給整數j。 va_arg的第二個參數是你要返回的參數的類型，這裏是int型。
4. 最後用va_end宏結束可變參數的獲取。然後你就可以在函數裏使用第二個參數了。如果函數有多個可變參數的，依次調用va_arg獲取各個參數。

## reference
- [C語言中可變參數的用法——va_list、va_start、va_arg、va_end - 台部落](https://www.twblogs.net/a/5c291504bd9eee01611455f1)
- [理解可变参数va_list、va_start、va_arg、va_end原理及使用方法 - 摩斯电码 - 博客园](https://www.cnblogs.com/pengdonglin137/p/3345911.html)
- [C語言 va_arg用法及代碼示例 - 純淨天空](https://vimsky.com/zh-tw/examples/usage/c_stdarg_va_arg.html)
- [C語言 va_copy用法及代碼示例 - 純淨天空](https://vimsky.com/zh-tw/examples/usage/c_stdarg_va_copy.html)