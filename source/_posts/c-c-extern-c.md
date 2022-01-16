---
title: extern "C"
date: 2022-01-16 16:33:23
tags: [note, c/c++, book section, extern "c"]
---

# extern "C"
## introduction
- extern "C" makes a function-name in C++ have C linkage (compiler does not mangle the name) so that client C code can link to (use) your function using a C compatible header file that contains just the declaration of your function.
<!--more-->
- Your function definition is contained in a binary format (that was compiled by your C++ compiler) that the client C linker will then link to using the C name.
- Since C++ has overloading of function names and C does not, the C++ compiler cannot just use the function name as a unique id to link to, so it mangles the name by adding information about the arguments.
    - A C compiler does not need to mangle the name since you can not overload function names in C.
    - When you state that a function has `extern "C"` linkage in C++, the C++ compiler does not add argument/parameter type information to the name used for linkage.
- Just so you know, you can specify `extern "C"` linkage to each individual declaration/definition explicitly or use a block to group a sequence of declarations/definitions to have a certain linkage:

```csharp
extern "C" void foo(int);
extern "C"
{
   void g(char);
   int i;
}

```

## details
> - If you care about the technicalities, they are listed in section 7.5 of the C++03 standard, here is a brief summary (with emphasis on `extern "C"`):
-   `extern "C"` is a linkage-specification
-   Every compiler is _required_ to provide "C" linkage
-   A linkage specification shall occur only in namespace scope
-   Only function names and variable names with external linkage have a language linkage
-   Two function types with distinct language linkages are distinct types even if otherwise identical
-   Linkage specs nest, inner one determines the final linkage
-   `extern "C"` is ignored for class members
-   At most one function with a particular name can have "C" linkage (regardless of namespace)
-   `static` inside `extern "C"` is valid; an entity so declared has internal linkage, and so does not have a language linkage
-   Linkage from C++ to objects defined in other languages and to objects defined in C++ from other languages is implementation-defined and language-dependent. Only where the object layout strategies of two language implementations are similar enough can such linkage be achieved

## reference
- [What is the effect of extern "C" in C++? - Stack Overflow](https://stackoverflow.com/questions/1041866/what-is-the-effect-of-extern-c-in-c)