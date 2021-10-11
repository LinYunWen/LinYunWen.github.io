---
title: C/C++ new and declare
date: 2021-10-11 14:44:23
tags: note, c/c++, new, declare
---

# C/C++ new and declare

> -   new int 的用法
> -   new int 一維陣列
> -   new int 二維陣列
> -   new struct 範例
> -   new struct 一維陣列範例
<!--more-->
## new
- 以下是動態記憶體配置一個 int 的範例
```clike
int *p = new int;
int *p = new int();
int *p = new int(5);
```
- 使用 new 就要配合 delete
    - `delete p;`

## declare v.s. definition
### 宣告(Declaration)
- 說明變數的存在和其型態。 
- 特性:
    * 一個變量可能有一次以上的宣告。
* 範例 :
    * 包含extern，且未進行初始化的變量。
    * 非函式主體的函式宣告。
    * 類別宣告內的static成員，無法在類別宣告內定義及初始化，而需在類別外。
```clike
#include <string>

int f(int i); // forward declaration

int main()
{
    const double pi = 3.14; //OK
    int i = f(2); //OK. f is forward-declared
    std::string str; // OK std::string is declared in <string> header
    C obj; // error! C not yet declared.
    j = 0; // error! No type specified.
    auto k = 0; // OK. type inferred as int by compiler.
}

int f(int i)
{
    return i + 42;
}

namespace N {
   class C{/*...*/};
}
```
### 定義(Definition)
- 分配Memory。
- 特性:
    - 定義同時也會進行宣告。
    - 一個變量只能有一次定義。
- 範例 :
    * 不包含extern的變量。
    * 初始化的變量。
    * 函式主體。
```clike
int i;
extern int j = 3; 
void dosomething() {
    cout << "hello world" << endl;
}
```

## with braces
```clike
int main() {
  int a = 20;
  cout << "The value of variable a is "<< a << endl;
}
```
- The code above shows how curly braces can be used to declare various types of variables and assign values to them.
```clike
int a{20};
cout << "The value of variable a is: "<< a << endl;

string b{"This is a string"};
cout << "The value of variable b is: "<< b << endl;

std::vector<int> c{10, 5};
cout<< "The values of variable c are: " << endl;
````
- Using curly braces to initialize a variable also prevents narrowing.
    - **Narrowing**, or more precisely narrowing conversion, is the implicit conversion of arithmetic values that includes​ a loss of accuracy.
    ```clike
    int myint(3.14); 
    // output: 3
    std::cout << "myint: " << myint << std::endl;

    // complile error
    int myint1{3.14}; 
    std::cout << "myint: " << myint1 << std::endl;
    ```

## reference
- [C++ new 動態記憶體配置用法與範例 | ShengYu Talk](https://shengyu7697.github.io/cpp-new-delete/)
- [C + +) (的宣告和定義 | Microsoft Docs](https://docs.microsoft.com/zh-tw/cpp/cpp/declarations-and-definitions-cpp?view=msvc-160)
- [C++ - Declaration,Definition (C++軟體開發 - 宣告與定義 概念與實例)](https://wucodingroad.blogspot.com/2017/06/Cplusplus-declaration-definition.html)
- [Declaring a variable with braces in C++](https://www.educative.io/edpresso/declaring-a-variable-with-braces-in-cpp)