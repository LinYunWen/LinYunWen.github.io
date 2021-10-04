---
title: C/C++ define
date: 2021-10-04 22:03:25
tags: [note, c/c++, define, book section]
---

# C/C++ define

## define concatenate string
> - in the C language, separating two strings with space as in "s" "1" is exactly equivalent to having a single string "s1".
> Remember, only literal strings will do this. This does not work for variables.
<!--more-->
- String literals can be concatenated by the compiler i.e. if you write "abc" "123" then the compiler will treat this as "abc123". And when you do this in the macro, the preprocessor means that this is exactly what is sent to the compiler
- e.g.
    ```clike
    #define STR3 STR1 STR2
    // become
    #define STR3 "s" "1"
    // then
    STR3 "s1"
    ```
### reference
- [c - concatenating strings in a printf statement - Stack Overflow](https://stackoverflow.com/questions/14035769/concatenating-strings-in-a-printf-statement)
- [C/C++ macro string concatenation - Stack Overflow](https://stackoverflow.com/questions/5256313/c-c-macro-string-concatenation)
## double hash tag
- `##` is the preprocessor operator for concatenation.
- 雙數位記號或 標記 貼上運算子 (##) （有時稱為「 合併 」或「 結合 運算子」）
- e.g.
    ```clike
    #define paster( n ) printf_s( "token" #n " = %d", token##n )

    paster( 9 );
    // become
    printf_s( "token" "9" " = %d", token9 );
    // then
    printf_s( "token9 = %d", token9 );
    ```

### reference
- [語彙基元帶入運算子 (##) | Microsoft Docs](https://docs.microsoft.com/zh-tw/cpp/preprocessor/token-pasting-operator-hash-hash?view=msvc-160)
- [c++ - What does ## (double hash) do in a preprocessor directive? - Stack Overflow](https://stackoverflow.com/questions/22975073/what-does-double-hash-do-in-a-preprocessor-directive)