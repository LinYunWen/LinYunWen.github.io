---
title: c-c++-printf
date: 2021-09-19 21:13:42
tags: [note, c/c++, book section, printf]
---

# C/C++ printf 系列

## sprintf
> - `#include <stdio.h>`, `#include <cstdio>`
- `int sprintf ( char * str, const char * format, ... );`
- Write formatted data to string
- A terminating null character is automatically appended after the content.
<!--more-->
### 參數
- str
    - Pointer to a buffer where the resulting C-string is stored.
    - The buffer should be large enough to contain the resulting string.
- format
    - C string that contains a format string that follows the same specifications as format in printf (see printf for details).
- ... (additional arguments)
    - Depending on the format string, the function may expect a sequence of additional arguments, each containing a value to be used to replace a format specifier in the format string (or a pointer to a storage location, for n).
### return
- On success, the total number of characters written is returned.
    - This count does not include the additional null-character automatically appended at the end of the string.
- On failure, a negative number is returned.

### reference
- [sprintf - C++ Reference](http://www.cplusplus.com/reference/cstdio/sprintf/)

## snprintf
> - `#include <stdio.h>`, `#include <cstdio>`
- `int snprintf ( char * s, size_t n, const char * format, ... );`
- Write formatted output to sized buffer
- If the resulting string would be longer than _n-1_ characters, the remaining characters are discarded and not stored, but counted for the value returned by the function.
- A terminating null character is automatically appended after the content written.

### 參數
* s
    * Pointer to a buffer where the resulting C-string is stored.
    * The buffer should have a size of at least n characters.
* n
    * Maximum number of bytes to be used in the buffer.
    * The generated string has a length of at most n-1, leaving space for the additional terminating null character.
    * size_t is an unsigned integral type.
* format
    * C string that contains a format string that follows the same specifications as format in printf (see printf for details).
* ... (additional arguments)
    * Depending on the format string, the function may expect a sequence of additional arguments, each containing a value to be used to replace a format specifier in the format string (or a pointer to a storage location, for n).


### reference
- [snprintf - C++ Reference](https://www.cplusplus.com/reference/cstdio/snprintf/)
- [snprintf 妙無窮 | 菜鳥的三年成長史](https://wirelessr.gitbooks.io/working-life/content/snprintf_miao_wu_qiong.html)

## asprintf
```clike
char* cstr;
int c = asprintf( &cstr, "%d * %d = %d", tmp, tmp, tmp*tmp );
```
- 不過 asprintf() 這個函式應該不在 C 語言的標準內，而是 GNU 的 extension（可能要加上「#define     _GNU_SOURCE」才能使用）
- 還是可以透過執行兩次 snprintf() 來做到同樣的功能～實作的方法
```clike
char* cstr;
int c = snprintf( NULL, 0, "%d * %d = %d", tmp, tmp, tmp*tmp );
cstr = new char[ c + 1 ];
snprintf( cstr, c + 1, "%d * %d = %d", tmp, tmp, tmp*tmp );
```

## snprintf vs sprintf
- 在 C 語言裡，要建立一個字元陣列的字串，常常會使用 sprintf() 這個函數來做格式化的處理。
- 但是實際上，這個函式卻不是那麼「安全」
- 也就是在使用前，必須要先建立好一個字元陣列的空間，再用這個函式把內容填入
    - e.g.
    ```clike
    int tmp = 10;
    char cstr[20];
    sprintf( cstr, "%d * %d = %d", tmp, tmp, tmp * tmp );
    ```
    - buffer overflow
- 像如果是以 Visual C++ 2005 來編譯的話，如果程式裡有用到 sprintf()，他在編譯時就會顯示一個警告訊息：
    ```clike
    warning C4996: 'sprintf': This function or variable may be unsafe. Consider 
    using sprintf_s instead.
    ```
- 微軟建議的 sprintf_s() 外，實際上在 C99 裡， 也多了一個 snprintf() 是用來取代現有的 sprintf()
### reference
- [用 snprintf / asprintf 取代不安全的 sprintf – Heresy's Space](https://kheresy.wordpress.com/2010/01/28/%E7%94%A8-snprintf-asprintf-%E5%8F%96%E4%BB%A3%E4%B8%8D%E5%AE%89%E5%85%A8%E7%9A%84-sprintf/)
- 