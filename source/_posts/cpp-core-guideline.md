---
title: cpp core guideline
date: 2021-08-30 20:32:12
tags: [note, cpp]
---

# C++ Core Guidelines
> - http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines
> - SL: The Standard library

### SL.1: Use libraries wherever possible
- Save time. Don’t re-invent the wheel
### SL.2: Prefer the standard library to other libraries
- It is more likely to be stable, well-maintained, and widely available
### SL.3: Do not add non-standard entities to namespace `std`
- Adding to `std` might change the meaning of otherwise standards conforming code. Additions to `std` might clash with future versions of the standard.
    - Possible, but messy and likely to cause problems with platforms.
### SL.4: Use the standard library in a type-safe manner
- Because, obviously, breaking this rule can lead to undefined behavior, memory corruption, and all kinds of other bad errors.
<!--more-->
## SL.con: Containers
### SL.con.1: Prefer using STL `array` or `vector` instead of a C array
- C arrays are less safe, and have no advantages over `array` and `vector`
- For a fixed-length array, use `std::array`, which does not degenerate to a pointer when passed to a function and does know its size. Also, like a built-in array, a stack-allocated `std::array` keeps its elements on the stack.
- For a variable-length array, use `std::vector`, which additionally can change its size and handles memory allocation.
    - Flag declaration of a C array inside a function or class that also declares an STL container (to avoid excessive noisy warnings on legacy non-STL code). To fix: At least change the C array to a `std::array`.

### SL.con.2: Prefer using STL `vector` by default unless you have a reason to use a different container
- `vector` and `array` are the only standard containers that offer the following advantages:
    -   the fastest general-purpose access (random access, including being vectorization-friendly);
    -   the fastest default access pattern (begin-to-end or end-to-begin is prefetcher-friendly);
    -   the lowest space overhead (contiguous layout has zero per-element overhead, which is cache-friendly).
- Even when other containers seem more suited, such as map for O(log N) lookup performance or a list for efficient insertion in the middle, a vector will usually still perform better for containers up to a few KB in size.

### SL.con.3: Avoid bounds errors
- Read or write beyond an allocated range of elements typically leads to bad errors, wrong results, crashes, and security violations.
- The standard-library functions that apply to ranges of elements all have (or could have) bounds-safe overloads that take `span`
    - Also, `std::array<>::fill()` or `std::fill()` or even an empty initializer are better candidates than `memset()`.

### SL.con.4: don’t use memset or memcpy for arguments that are not trivially-copyable
- Doing so messes the semantics of the objects (e.g., by overwriting a vptr).
- Note Similarly for (w)memset, (w)memcpy, (w)memmove, and (w)memcmp

## SL.str: String

### SL.str.1: Use `std::string` to own character sequences
- Reason string correctly handles allocation, ownership, copying, gradual expansion, and offers a variety of useful operations.
- In C++17, we might use `string_view` as the argument, rather than `const string&` to allow more flexibility to callers:
- Note Do not assume that string is slower than lower-level techniques without measurement and remember that not all code is performance critical.

### SL.str.2: Use `std::string_view` or `gsl::span<char>` to refer to character sequences
- Reason std::string_view or gsl::span\<char> provides simple and (potentially) safe access to character sequences independently of how those sequences are allocated and stored.
- Note std::string_view (C++17) is read-only.

### SL.str.3: Use `zstring` or `czstring` to refer to a C-style, zero-terminated, sequence of characters
- Reason Readability. Statement of intent. A plain char* can be a pointer to a single character, a pointer to an array of characters, a pointer to a C-style (zero-terminated) string, or even to a small integer. Distinguishing these alternatives prevents misunderstandings and bugs.
- Note Like any other “plain pointer”, a zstring should not represent ownership.

### SL.str.4: Use `char*` to refer to a single character
- Reason The variety of uses of char* in current code is a major source of errors.

### SL.str.5: Use `std::byte` to refer to byte values that do not necessarily represent characters
- Reason Use of char* to represent a pointer to something that is not necessarily a character causes confusion and disables valuable optimizations.
    - No, there is no type called "byte" in C++. What you want instead is unsigned char (or, if you need exactly 8 bits, uint8_t from \<cstdint>, since C++11). Note that char is not necessarily an accurate alternative, as it means signed char on some compilers and unsigned char on others.
    - [Is there 'byte' data type in C++? - Stack Overflow](https://stackoverflow.com/questions/20024690/is-there-byte-data-type-in-c)

### SL.str.10: Use `std::string` when you need to perform locale-sensitive string operations
- Reason std::string supports standard-library locale facilities

### SL.str.11: Use `gsl::span<char>` rather than `std::string_view` when you need to mutate a string
- Reason std::string_view is read-only.

### SL.str.12: Use the `s` suffix for string literals meant to be standard-library `string`s
- Reason Direct expression of an idea minimizes mistakes.

## SL.io: Iostream
- `iostream`s is a type safe, extensible, formatted and unformatted I/O library for streaming I/O.
- It supports multiple (and user extensible) buffering strategies and multiple locales.

### SL.io.1: Use character-level input only when you have to
- Reason Unless you genuinely just deal with individual characters, using character-level input leads to the user code performing potentially error-prone and potentially inefficient composition of tokens out of characters.

### SL.io.2: When reading, always consider ill-formed input
- Reason Errors are typically best handled as soon as possible. If input isn’t validated, every function must be written to cope with bad data (and that is not practical).

### SL.io.3: Prefer `iostream`s for I/O
- Reason iostreams are safe, flexible, and extensible.
- Discussion: iostreams vs. the printf() family
    - It is often (and often correctly) pointed out that the printf() family has two advantages compared to iostreams:
        - flexibility of formatting and performance. This has to be weighed against iostreams advantages of extensibility to handle user-defined types, resilience against security violations, implicit memory management, and locale handling.
        - If you need I/O performance, you can almost always do better than printf().

    - gets(), scanf() using %s, and printf() using %s are security hazards (vulnerable to buffer overflow and generally error-prone)
    - C11 defines some “optional extensions” that do extra checking of their arguments. If present in your C library, gets_s(), scanf_s(), and printf_s() might be safer alternatives, but they are still not type safe.

### SL.io.10: Unless you use `printf`-family functions call `ios_base::sync_with_stdio(false)`
- Reason Synchronizing iostreams with printf-style I/O can be costly. cin and cout are by default synchronized with printf.

### SL.io.50: Avoid `endl`
- Reason The endl manipulator is mostly equivalent to '\n' and "\n"; as most commonly used it simply slows down output by doing redundant flush()s. This slowdown can be significant compared to printf-style output.
- Note For cin/cout (and equivalent) interaction, there is no reason to flush; that’s done automatically. For writing to a file, there is rarely a need to flush.
## SL.regex: Regex
- \<regex> is the standard C++ regular expression library. It supports a variety of regular expression pattern conventions.

## SL.chrono: Time

## SL.C: The C Standard Library
- C Standard Library rule summary:

### SL.C.1: Don’t use setjmp/longjmp
- Reason a longjmp ignores destructors, thus invalidating all resource-management strategies relying on RAII

## other
### locale
- An object of class `std::locale` is an immutable indexed set of immutable facets
- locale 是多種 facet對象的容器（實際上在locale類對象中用一個std::vector存儲該locale類支持的所有facet的指針）。
- 一個程序可以有多個locale對象，從而避免了C語言程序只能使用一個global locale的問題
- 這些 facet 的預先定義群組代表在「標準 C 程式庫」中傳統上由 `setlocale` 函式管理的[地區設定分類](https://docs.microsoft.com/zh-tw/cpp/standard-library/locale-class?view=msvc-160#category)。

#### reference
- [std::locale - cppreference.com](https://en.cppreference.com/w/cpp/locale/locale)
- [C++/Locale - 維基教科書，自由的教學讀本](https://zh.wikibooks.org/zh-tw/C%2B%2B/Locale)
- [locale 類別 | Microsoft Docs](https://docs.microsoft.com/zh-tw/cpp/standard-library/locale-class?view=msvc-160)
- [C 中的locale設定 （即系統區域設定） | 程式前沿](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/532152/)
- [Localization library - cppreference.com](https://en.cppreference.com/w/cpp/locale)

### memset, memcpy, memcmp
- memset
    - `void * memset ( void * ptr, int value, size_t num );`
    - Fill block of memory
        - Sets the first _num_ bytes of the block of memory pointed by _ptr_ to the specified _value_ (interpreted as an unsigned char).
    - _ptr_ is returned.
    :::info
    std::memset may be optimized away (under the as-if rules) if the object modified by this function is not accessed again for the rest of its lifetime (e.g. gcc bug 8537). For that reason, this function cannot be used to scrub memory (e.g. to fill an array that stored a password with zeroes). Solutions for that include std::fill with volatile pointers, C11 memset_s, FreeBSD explicit_bzero or Microsoft SecureZeroMemory.
    :::

- memcpy
    - `void * memcpy ( void * destination, const void * source, size_t num );`
    - Copy block of memory
        - Copies the values of num bytes from the location pointed to by source directly to the memory block pointed to by destination.
        - The underlying type of the objects pointed to by both the source and destination pointers are irrelevant for this function; The result is a binary copy of the data.
        - The function does not check for any terminating null character in source - it always copies exactly num bytes.
        - To avoid overflows, the size of the arrays pointed to by both the destination and source parameters, shall be at least num bytes, and should not overlap (for overlapping memory blocks, memmove is a safer approach).
    - destination is returned.
- memcmp
    - `int memcmp ( const void * ptr1, const void * ptr2, size_t num );`
    - Compare two blocks of memory
        - Reinterprets the objects pointed to by lhs and rhs as arrays of unsigned char and compares the first count characters of these arrays. The comparison is done lexicographically.
        - The sign of the result is the sign of the difference between the values of the first pair of bytes (both interpreted as unsigned char) that differ in the objects being compared.
    :::info
    - Notice that, unlike [strcmp](http://www.cplusplus.com/strcmp), the function does not stop comparing after finding a null character.
    - This function reads object representations, not the object values, and is typically only meaningful for trivially-copyable objects with no padding. For example, memcmp() between two objects of type std::string or std::vector will not compare their contents, and memcmp() between two objects of type struct{char c; int n;} will compare the padding bytes whose values may differ when the values of c and n are the same.

| return value | indicates |
| --- | --- |
| `<0` | the first byte that does not match in both memory blocks has a lower value in _ptr1_ than in _ptr2_ (if evaluated as _unsigned char_ values) |
| `0` | the contents of both memory blocks are equal |
| `>0` | the first byte that does not match in both memory blocks has a greater value in _ptr1_ than in _ptr2_ (if evaluated as _unsigned char_ values) |

#### reference
- [memset - C++ Reference](http://www.cplusplus.com/reference/cstring/memset/)
- [memset, memcpy, memcmp, and memmove - Embedded Artistry](https://embeddedartistry.com/blog/2017/03/22/memset-memcpy-memcmp-and-memmove/)

### Guidelines Support Library (GSL)
- The Guidelines Support Library (GSL) contains functions and types that are suggested for use by the [C++ Core Guidelines](https://github.com/isocpp/CppCoreGuidelines) maintained by the [Standard C++ Foundation](https://isocpp.org/). This repo contains Microsoft's implementation of GSL.
- The entire implementation is provided inline in the headers under the [gsl](https://github.com/microsoft/GSL/blob/main/include/gsl) directory. The implementation generally assumes a platform that implements C++14 support.


#### reference
- [CppCoreGuidelines/gsl-intro.md at master · isocpp/CppCoreGuidelines](https://github.com/isocpp/CppCoreGuidelines/blob/master/docs/gsl-intro.md)


### WG21
- ISO/IEC JTC1/SC22/WG21 is **the international standardization working group for the programming language C++**
- The ISO C++ committee is called WG21, officially ISO/IEC [JTC1 (Joint Technical Committee 1)](http://www.iso.org/iso/standards_development/technical_committees/list_of_iso_technical_committees/iso_technical_committee.htm?commid=45020) / [SC22 (Subcommittee 22)](http://www.iso.org/iso/standards_development/technical_committees/list_of_iso_technical_committees/iso_technical_committee.htm?commid=45202) / WG21 (Working Group 21). WG21 was formed in 1990-91, and consists of accredited experts from member nations of ISO/IEC JTC1/SC22 who are interested in C++ work.


#### reference
- [The Committee : Standard C++](https://isocpp.org/std/the-committee)

### gsl::span
- gsl::span is a replacement for (pointer, length) pairs to refer to a sequence of contiguous objects. It can be thought of as a pointer to an array, but that knows its bounds.
- For example, a span<int,7> refers to a sequence of seven contiguous integers.
- A span does not own the elements it points to. It is not a container like an array or a vector, it is a view into the contents of such a container.

#### reference
- [CppCoreGuidelines/gsl-intro.md at master · isocpp/CppCoreGuidelines](https://github.com/isocpp/CppCoreGuidelines/blob/master/docs/gsl-intro.md)

### std:string, c-style string
- C-strings
    - are simply implemented as a `char` array which is terminated by a null character (aka `0`).
    - all C-strings are `char` arrays, but not all `char` arrays are c-strings.
    - String literals are indicated by using the double quote (") and are stored as a constant (const) C-string. The null character is automatically appended at the end for your convenience.
    - You must keep up with size on your own or rely on the linear-time strlen function to determine the size of each string during runtime
    - Functions are required to compare strings, and the output of the strcmp functions is not intuitive either. For functions like strcpy and strcat, the programmer is required to remember the correct argument order for each call.
- std::string
    - Fundamentally, you can consider std::string as a container for handling char arrays, similar to std::vector\<char> with some specialized function additions.
    - storing your strings in a contiguous manner
    - There’s storage overhead involved with using a std::string object
    - When utilizing a std::string, memory must be dynamically allocated and initialized during runtime. You cannot pre-allocate a std::string buffer during compile-time ands you cannot supply a pre-existing buffer for std::string to assume ownership over.
- string_view
    - A std::string_view can refer to both a C++ string or a C-string.
    - All that std::string_view needs to store is a pointer to the character sequence and a length.
    - The only catch with std::string_view is that it is non-owning, so the programmer is responsible for making sure the std::string_view does not outlive the string which it points to
#### reference
- [std::string vs C-strings - Embedded Artistry](https://embeddedartistry.com/blog/2017/07/26/stdstring-vs-c-strings/)

### zstring, czstring
- zstring: An alias to basic_zstring with a char type of char
    - A ZString is a C-style fixed-size array of chars. It has no descriptor so it's faster to pass it as an argument to functions. FreeBASIC avoids any overflow that could occur, by truncating the contents.
- czstring: An alias to basic_zstring with a char type of const char

#### reference
- [microsoft/GSL: Guidelines Support Library](https://github.com/microsoft/gsl)

### type-safer
- Type safety means that the compiler will validate types while compiling, and throw an error if you try to assign the wrong type to a variable.

#### reference
- [language agnostic - What is Type-safe? - Stack Overflow](https://stackoverflow.com/questions/260626/what-is-type-safe)

### non-owning references
- A pointer is owning, if somewhere in the code is a delete (or should have been) on that pointer. For smart pointer the delete is inside the destructor, for raw pointer it’s inside you code. Shared ptr use a count and the last destructed pointer calls the delete.


#### reference
- [What is non-ownership when related to pointers : cpp_questions](https://www.reddit.com/r/cpp_questions/comments/a0oicp/what_is_nonownership_when_related_to_pointers/)
- [Smart Pointer 介紹/用法 | r0yblog](http://blog.roy4801.tw/2020/06/04/c++/smart_pointer/)


### trivially copyable
- non-trivial, copy constructor
    - 在 C++ 中，如果未定義復制構造函數，編譯器將為您完成。如果定義了一個，編譯器就不會
    - The compiler generated copy constructor can be trivial or non-trivial.
        - In a trivial copy constructor it does a member-wise copy.
    - For a default constructor and destructor being "trivial" means literally "do nothing at all"
    - For copy-constructor and copy-assignment operator, being "trivial" means literally "be equivalent to simple raw memory copying" (like copy with memcpy) .
        - If you define a constructor yourself, it is considered non-trivial, even if it doesn't do anything
        - so a trivial constructor must be implicitly defined by the compiler.
    - For example, if class has virtual functions, it will require some extra hidden initializations when objects of this class are being created (initialize virtual method table and such), so the constructor for this class will not qualify as trivial.
    - For another example, if a class has virtual base classes, then each object of this class might contain hidden pointers that point to other parts of the very same object. Such a self-referential object cannot be copied by a simple raw memory copy routine ( like memcpy). Extra manipulations will be necessary to properly re-initialize the hidden pointers in the copy. For this reason the copy constructor and copy-assignment operator for this class will not qualify as trivial.
    - For obvious reasons, this requirement is recursive: all subobjects of the class (bases and non-static members) must also have trivial constructors.
    - The copy constructor for class T is trivial if all of the following are true:
        * it is not user-provided (that is, it is implicitly-defined or defaulted);
        * T has no virtual member functions;
        * T has no virtual base classes;
        * the copy constructor selected for every direct base of T is trivial;
        * the copy constructor selected for every non-static class type (or array of class type) member of T is trivial;
    - A trivial copy constructor for a non-union class effectively copies every scalar subobject (including, recursively, subobject of subobjects and so forth) of the argument and performs no other action. However, padding bytes need not be copied, and even the object representations of the copied subobjects need not be the same as long as their values are identical.

- vptr
    - The vptr is not copied from the source object, but has to be initialized to point to the virtual table of the destination class. Therefore, a straight "memcpy" copy from source to destination is not possible.
    - C++区别的C的一大特性就是C++是面向对象的，面向对象有着三大特性：继承性，封装性和多态性。
    - 其中C++的动态多态性是通过虚函数来实现的。简单的说，通过virtual函数，指向子类的基类指针可以调用子类的函数。
    - 为了实现虚函数，C ++使用一种称为虚拟表的特殊形式的后期绑定。该虚拟表是用于解决在动态/后期绑定方式的函数调用函数的查找表。虚拟表有时会使用其他名称，例如“vtable”，“虚函数表”，“虚方法表”或“调度表”。
    - 虚拟表实际上非常简单，虽然用文字描述有点复杂。首先，**每个使用虚函数的类（或者从使用虚函数的类派生）都有自己的虚拟表**。该表只是编译器在编译时设置的静态数组。虚拟表包含可由类的对象调用的每个虚函数的一个条目。此表中的每个条目只是一个函数指针，指向该类可访问的最派生函数。
    - 其次，编译器还会添加一个隐藏指向基类的指针，我们称之为vptr。vptr在创建类实例时自动设置，以便指向该类的虚拟表。与this指针不同，this指针实际上是编译器用来解析自引用的函数参数，vptr是一个真正的指针
    - ![](https://i.imgur.com/33iDOiG.png)

#### reference
- [What is a non-trivial constructor in C++? - Stack Overflow](https://stackoverflow.com/questions/3899223/what-is-a-non-trivial-constructor-in-c)
- [c++ - What does a non-trivial copy constructor do? - Stack Overflow](https://stackoverflow.com/questions/28260322/what-does-a-non-trivial-copy-constructor-do)
- [C++ named requirements: TriviallyCopyable - cppreference.com](https://en.cppreference.com/w/cpp/named_req/TriviallyCopyable)

## string_view, span
- 一个无所有权、不可变、不需要构造的轻量级的“string”，非常诱人。
- 正如string是vector\<Char>，我们也可以想象一个vector_view，不用想了，这个东西的正式名称叫span[1]。
- span和string_view差不多，甚至优点更多，因为它可以指向mutable的空间。
### reference
- [不省事的模板推导 - 知乎](https://zhuanlan.zhihu.com/p/88516976)
- [c++ - Using gsl::zstring_view with C APIs - Stack Overflow](https://stackoverflow.com/questions/56874532/using-gslzstring-view-with-c-apis)
- [c++ - Using gsl::zstring_view with C APIs - Stack Overflow](https://stackoverflow.com/questions/56874532/using-gslzstring-view-with-c-apis)


### std::ios_base::sync_with_stdio
- Sets whether the standard C++ streams are synchronized to the standard C streams after each input/output operation.
- By default, iostream objects and cstdio streams are synchronized (as if this function was called with true as argument).
- With stdio synchronization turned off, iostream standard stream objects may operate independently of the standard C streams (although they are not required to), and mixing operations may result in unexpectedly interleaved characters.
- 看起來，cin/cout預設必須要跟stdin/stdout同步，所以必須做額外的運算，注意要是關掉了，scanf/printf就不能用了（如果用了，而且跟cin/cout混用，可能會吃到奇怪的東西），那我們試著把他關掉看看。

#### reference
- [std::ios_base::sync_with_stdio - cppreference.com](https://en.cppreference.com/w/cpp/io/ios_base/sync_with_stdio)
- [C++的輸出入cin/cout和scanf/printf誰比較快？ | Chino's](https://chino.taipei/note-2016-0311C-%E7%9A%84%E8%BC%B8%E5%87%BA%E5%85%A5cin-cout%E5%92%8Cscanf-printf%E8%AA%B0%E6%AF%94%E8%BC%83%E5%BF%AB%EF%BC%9F/)

### setjump/longjump
- 當 setjmp 和 longjmp 一起使用時，它們會提供一種方式來執行非本機 goto 。 它們通常會在 C 程式碼中用來將執行控制傳遞至先前所呼叫常式中的錯誤處理或復原程式碼，而不需使用標準呼叫或傳回慣例。
- 但如果從一個函式內跳轉到另一個函式的某處，goto 是不能完成的，那該如何實現呢？
- Loads the execution context env saved by a previous call to setjmp. This function does not return. Control is transferred to the call site of the macro setjmp that set up env. That setjmp then returns the value, passed as the status.
- If the function that called setjmp has exited, the behavior is undefined (in other words, only long jumps up the call stack are allowed)
- No destructors for automatic objects are called. If replacing of std::longjmp with throw and setjmp with catch would execute a non-trivial destructor for any automatic object, the behavior of such std::longjmp is undefined.
- 如果直接呼叫該函式，返回值為 0； 若該函式從 longjmp 呼叫返回，返回值為非零，由 longjmp 函式提供。根據函式的返回值，我們就可以知道 setjmp 函式呼叫是第一次直接呼叫，還是由其它地方跳轉過來的。

#### reference
- [使用 setjmp 和 longjmp | Microsoft Docs](https://docs.microsoft.com/zh-tw/cpp/cpp/using-setjmp-longjmp?view=msvc-160)
- [C語言下的setjmp longjmp(C 語言異常處理) - IT閱讀](https://www.itread01.com/content/1547949796.html)
- [C/C++編程筆記：C 語言中 setjmp 和 longjmp，正確函數內跳轉 - 每日頭條](https://kknews.cc/zh-tw/code/g4vlnom.html)
- [std::longjmp - cppreference.com](https://en.cppreference.com/w/cpp/utility/program/longjmp)
- [linux - C++: Safe to use longjmp and setjmp? - Stack Overflow](https://stackoverflow.com/questions/1376085/c-safe-to-use-longjmp-and-setjmp)