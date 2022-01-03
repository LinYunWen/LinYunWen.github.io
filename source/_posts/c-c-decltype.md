---
title: c/c++-decltype
date: 2022-01-03 21:08:37
tags: [note, c/c++, type, decltype, book section]
---

# decltype
## introduction
- C++11 引入的 decltype
- 傳入一個型別、值或運算式（expression）給 decltype 即可獲得該傳入的東西其型別為何
- decltype 最管用的地方大概是 function templates，利用給定的函數參數推導出回傳型別
<!--more-->
- e.g.
    ```cpp
    decltype(1.0 + 1) the_double = 0.0;
    ```
    ```cpp
    void main() {
        int a = 10;
        decltype(a) b;

        b = 123;

        std::cout << b << std::endl;
    }
    ```
    - 透過decltype來定義一個和a一樣的type，因為a的type為int所以b的type也是int
- C++14 進一步定義了 decltype(auto)，可用於函數的回傳型別定義，如此一來，便可確定函數定義與實際回傳型別吻合：
    ```cpp
    // in c++11
    template <typename Container, typename Index> // works, but requires refinement
    auto authAndAccess(Container &c, Index i) -> decltype(c[i]) {
      return c[i];
    }
    // in c++14
    template <typename Container, typename Index>
    decltype(auto)
    DoSomething(Container& c, Index i)
    {
        return c[i];
    }
    ```
## advanced
- `decltype(entity)` : 如果entity是一個不被括號包圍的識別符號、類訪問表示式，那麼`decltype(entity)`與entity型別一致。
- `decltype(expression)`: 如果expression是一個表示式，計算結果為型別T，那麼：
    -   如果expression為xvalue，那麼decltype的結果是T&&.
    -   如果expression為lvalue，那麼decltype的結果是T&.
    -   如果expression為prvalue，那麼decltype的結果是T.

## reference
- [decltype in C++11 | 打字猴](https://coherence0815.wordpress.com/2015/08/25/decltype-in-c11/)
- [DAY 8：Modern C++ 要角，老語言回春的關鍵，談 auto/decltype，卷二 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10214680)
- [【C++】auto 與 decltype](https://jonny.vip/2020/07/04/%E3%80%90cplusplus%E3%80%91auto-%E8%88%87-decltype/)
- [c++11-17 模板核心知識（九）—— 理解decltype與decltype(auto) | IT人](https://iter01.com/562124.html)
