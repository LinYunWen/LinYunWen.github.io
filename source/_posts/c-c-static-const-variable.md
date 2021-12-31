---
title: static, const variable
date: 2021-12-31 10:15:17
tags: [note, c/c++, static, const, book section]
---

# static, const variable
- A lot of people gave the basic answer but nobody pointed out that in C++ const defaults to static at namespace level (and some gave wrong information). See the C++98 standard section 3.5.3.
<!--more-->
    - First some background:
        - Translation unit: A source file after the pre-processor (recursively) included all its include files.
        - Static linkage: A symbol is only available within its translation unit.
        - External linkage: A symbol is available from other translation units.

## introduction
### Static
- determines the lifetime and visibility/accessibility of the variable.
- it will remain in the memory the whole time when the program is running, while the normal or auto variables are destroyed when the function (where the variable was defined) is over.
### Const
- is a type qualifier. 
- it will not accept further change in its value.
### static const
- “static const” is basically a combination of static(a storage specifier) and const(a type qualifier).
- So combining static and const, we can say that when a variable is initialized using static const, it will retain its value till the execution of the program and also, it will not accept any change in its value.

## in deiffernt level

### At namespace level
- This includes the global namespace aka global variables.
```clike
static const int sci = 0; // sci is explicitly static
const int ci = 1;         // ci is implicitly static
extern const int eci = 2; // eci is explicitly extern
extern int ei = 3;        // ei is explicitly extern
int i = 4;                // i is implicitly extern
static int si = 5;        // si is explicitly static
```
### At function level
- static means the value is maintained between function calls.
- The semantics of function static variables is similar to global variables in that they reside in the program's data-segment (and not the stack or the heap), see this question for more details about static variables' lifetime.

### At class level
- static means the value is shared between all instances of the class and const means it doesn't change.

## in header file
> - When static variable is declared in a header file is its scope limited to .h file or across all units.
- There is no such thing as a "header file scope". The header file gets _included_ into source files.
- The translation unit is the source file _including_ the text from the header files.
- Whatever you write in a header file gets **_copied_** into each including source file.
- As such, a static variable declared in a header file is like a static variable in each individual source file.
- Since declaring a variable `static` this way means internal linkage, every translation unit `#include`ing your header file gets its **own**, **individual** variable (which is not visible outside your translation unit).
> I would like to know what is the difference between static variables in a header file vs declared in a class.
- In a class declaration, `static` means that all instances of the class _share_ this member variable; i.e., you might have hundreds of objects of this type, but whenever one of these objects refers to the `static` (or "class") variable, it's the same value for all objects. You could think of it as a "class global".
> Also generally static variable is initialized in .cpp file when declared in a class right ?
- Yes, _one_ (and only _one_) translation unit must initialize the class variable.
> So that does mean static variable scope is limited to 2 compilation units ?
-   A header is not a compilation unit,
-   `static` means completely different things depending on context.
- Global `static` limits scope to the translation unit. Class `static` means global to all instances.

**PS:** Check the last paragraph of Chubsdad's answer, about how you shouldn't use `static` in C++ for indicating internal linkage, but anonymous namespaces. (Because he's right. ;-) )


## example
### in header file
```cpp
// 'common.h'
static int zzz;
```
- This variable `'zzz'` has internal linkage (This same variable can not be accessed in other translation units). Each translation unit which includes `'common.h'` has it's own unique object of name `'zzz'`.

### in class
- Static variable in a class is not a part of the subobject of the class. There is only one copy of a static data member shared by all the objects of the class.
> $9.4.2/6 - "Static data members of a class in namespace scope have external linkage (3.5).A local class shall not have static data members."
```cpp
// 'myclass.h
struct myclass{
   static int zzz;        // this is only a declaration
};
```
```cpp
// myclass.cpp
#include "myclass.h"
int myclass::zzz = 0           // this is a definition, 
                               // should be done once and only once
```
```cpp
// hisclass.cpp
#include "myclass.h"
void f(){myclass::zzz = 2;}    // myclass::zzz is always the same in any 
                               // translation unit
```
```cpp
// ourclass.cpp
#include "myclass.h"
void g(){myclass::zzz = 2;}    // myclass::zzz is always the same in any 
                               // translation unit
```
- So, class static members are not limited to only 2 translation units. They need to be defined only once in any one of the translation units.
> Note: usage of 'static' to declare file scope variable is deprecated and unnamed namespace is a superior alternate



## reference
- [Static variables in C++ - Stack Overflow](https://stackoverflow.com/questions/3698043/static-variables-in-c/3698179#3698179)
- [“static const” vs “#define” vs “enum” - GeeksforGeeks](https://www.geeksforgeeks.org/static-const-vs-define-vs-enum/)
- [What does 'const static' mean in C and C++? - Stack Overflow](https://stackoverflow.com/questions/177437/what-does-const-static-mean-in-c-and-c/53883715)

