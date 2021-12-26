---
title: std::string to C string
date: 2021-12-26 08:18:01
tags: [note, c/c++, book section, string, cstring]
---

# std::string to C string
- 使用 std::basic_string::c_str 方法將字串轉換為 char 陣列
* 使用 std::vector 容器將字串轉換為 Char 陣列
* 使用指標操作操作將字串轉換為字元陣列

<!--more-->

## c_str()
- return `const char*`
```cpp
string tmp_string = "This will be converted to char*";
auto c_string = tmp_string.c_str();
```

## string.data()
- A pointer to the c-string representation of the string object's value.
- The pointer returned may be invalidated by further calls to other member functions that modify the object.
- Returns a pointer to an array that contains a null-terminated sequence of characters (i.e., a C-string) representing the current value of the string object.
    * This array includes the same sequence of characters that make up the value of the string object plus an additional terminating null-character ('\0') at the end.
```clike
string str = "some string" ;
char *cstr = str.data();
```

## 由 const char* 轉成 char*
1) 直接修改函式參數的型態定義，但原本函式庫裡的宣告根本不能改。
2) 用 const_cast<char*>(cptr)，這個雖然可以強制轉換，但若透過轉換後的指標更改常數的值，將會是 undefined behavior。
3) 使用上一篇提到的 strcpy()，但小心緩衝區覆蓋，或是使用到不知道指到什麼的指標。
4) Declare C a const, i.e. const char *C = ...
    - `const char *C = R.c_str();`
5) Copy the content into space that you have allocated.
    ```clike
    char *C = new char[R.size()+1];
    std::strcpy(C, R.c_str());
    // The second problem is a memory leak: your code assigns C a result of new, but never deletes it. If you use strcpy approach, you need to add

    delete[] C;
    ```

## strncpy
> - cstring
- `char* strncpy(char* destination, const char* source, size_t num);`
- Copies the first num characters of source to destination.
    - If the end of the source C string (which is signaled by a null-character) is found before num characters have been copied, destination is padded with zeros until a total of num characters have been written to it.
    * No null-character is implicitly appended at the end of destination if source is longer than num.
        * Thus, in this case, destination shall not be considered a null terminated C string (reading it as such would overflow).
    ```clike
    char str1[]= "To be or not to be";
    char str2[40];
    char str3[40];

    /* copy to sized buffer (overflow safe): */
    strncpy ( str2, str1, sizeof(str2) );

    /* partial copy (only 5 chars): */
    strncpy ( str3, str2, 5 );
    str3[5] = '\0';   /* null character manually added */
    ```
    
## vector
- `std::vector<char> cstr(str.c_str(), str.c_str() + str.size() + 1);`
## reference
- [如何在 C++ 中把字串轉換為 Char 陣列 | D棧 - Delft Stack](https://www.delftstack.com/zh-tw/howto/cpp/how-to-convert-string-to-char-array-in-cpp/)
- [[C] 每天來點字串用法 (3) － from const char* to char*](https://skylinelimit.blogspot.com/2018/02/c-3.html)
- [c++ - error: invalid conversion from 'const char*' to 'char*' [-fpermissive] - Stack Overflow](https://stackoverflow.com/questions/42195978/error-invalid-conversion-from-const-char-to-char-fpermissive)
- [strncpy - C++ Reference](https://www.cplusplus.com/reference/cstring/strncpy/)
- [c++ - std::string to char* - Stack Overflow](https://stackoverflow.com/questions/7352099/stdstring-to-char/7352131)
- [string::data - C++ Reference](https://www.cplusplus.com/reference/string/string/data/)