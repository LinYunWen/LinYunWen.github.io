---
title: C/C++ Lambda Function
date: 2021-10-04 07:51:26
tags: note, c/c++, lambda function, book section
---

# C/C++ Lambda Function
> - since C++11

## syntax
- `[ captures ] ( params ) lambda-specifiers requires(optional) { body }`
- ![](https://i.imgur.com/vC2eLst.png)
    - capture 子句 (也稱為 c + + 規格中的 lambda introducer 。 )
    * 參數清單 (選)。 (也稱為 lambda 宣告子)
    * 可變規格 (選)。
    * 例外狀況規格 (選)。
    * 尾端-傳回類型 (選)。
    * lambda 主體。
<!--more-->
* 直接呼叫 Lambda Expression
    ```cpp
    #include <iostream>
    int main() {
      using namespace std;
      int n = [] (int x, int y) { return x + y; }(5, 4);
      cout << n << endl;
    }
    ```
- e.g.
    ```cpp
    #include <algorithm>
    #include <cmath>

    void abssort(float* x, unsigned n) {
        std::sort(x, x + n,
            // Lambda expression begins
            [](float a, float b) {
                return (std::abs(a) < std::abs(b));
            } // end of lambda expression
        );
    }
    ```
## capture closure
- `[=]`：lambda-introducer，也稱為 capture clause。
- 所有的 lambda expression 都是以它來作為開頭，不可以省略，它除了用來作為 lambda expression 開頭的關鍵字之外，也有抓取（capture）變數的功能，指定該如何將目前 scope 範圍之變數抓取至 lambda expression 中使用，而抓取變數的方式則分為傳值（by value）與傳參考（by reference）兩種，跟一般函數參數的傳入方式類似，不過其語法有些不同，以下我們以範例解釋：
    -   `[]`：只有兩個中括號，完全不抓取外部的變數。
    -   `[=]`：所有的變數都以傳值（by value）的方式抓取。
    -   `[&]`：所有的變數都以傳參考（by reference）的方式抓取。
    -   `[x, &y]`：`x` 變數使用傳值、`y` 變數使用傳參考。
    -   `[=, &y]`：除了 `y` 變數使用傳參考之外，其餘的變數皆使用傳值的方式。
-   `[&, x]`：除了 `x` 變數使用傳值之外，其餘的變數皆使用傳參考的方式。
- 這裡要注意一點，預設的抓取選項（capture-default，亦即 `=` 或是 `&`）要放在所有的項目之前，也就是放在第一個位置。

## parameter list
- 定義此匿名函數的傳入參數列表，基本的用法跟一般函數的傳入參數列表一樣，不過多了一些限制條件：
    -   不可指定參數的預設值。
    -   不可使用可變長度的參數列表。
    -   參數列表不可以包含沒有命名的參數。
- 參數清單在 lambda expression 中並不是一個必要的項目，如果不需要傳入任何參數的話，可以連同小括號都一起省略。

## return type
- 指定 lambda expression 傳回值的型別，這個範例是指定傳回值型別為整數（`int`），其他的型別則以此類推。如果 lambda expression 所定義的函數很單純，只有包含一個傳回陳述式（statement）或是根本沒有傳回值的話，這部分就可以直接省略，讓編譯器自行判斷傳回值的型別。


## reference
- [C++ 中的 Lambda 運算式 | Microsoft Docs](https://docs.microsoft.com/zh-tw/cpp/cpp/lambda-expressions-in-cpp?view=msvc-160)
- [Lambda expressions (since C++11) - cppreference.com](https://en.cppreference.com/w/cpp/language/lambda)
- [C++11 Lambda Expression 語法教學與範例 - G. T. Wang](https://blog.gtwang.org/programming/lambda-expression-in-c11/)