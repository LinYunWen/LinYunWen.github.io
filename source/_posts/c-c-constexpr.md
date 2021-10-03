---
title: C/C++ constexpr
date: 2021-10-03 11:04:49
tags: [note, c/c++, constexpr, book section]
---

# C/C++ constexpr
## introduction
- 是 C++11 對於我們已經熟到透的 `const` 修飾子的一個加強
    > - const 代表的是被修飾的變數數值編譯期 (compile-time) 已定，也無法再通過語法修改

    - 但是這種狀況就沒辦法
        ```clike
        int sq(int N) {
          return N * N;
        }
        const int N = 123;
        const int SQ_N = sq(N);
        printf("%d %d\n", N, SQ_N);
        ```
        - 他能算出個值初始化 SQ_N，但是卻是發生在運行期而不是編譯期
<!--more-->
- 這也就是 constexpr 所想滿足的語意：常數表達式 (constant expression)。
    - 一堆常數可以在編譯時期經過固定確定運算得到確切值的表達式。除了可以在變數掛上 constexpr ，甚至可以在函式的返回值宣告也可以加上 constexpr 來修飾這個函式變成 constexpr function，讓編譯器在編譯時期就能依照 C++ 標準把能算的都算好
    ```clike
    constexpr int sq(int n)
    {
      return n * n;
    }
    int main()
    {
      constexpr int N = 123;
      constexpr int N_SQ = sq(N);
      printf("%d %d\n", N, N_SQ);
    }
    ```
- 因此一開始 constexpr function 裡面是不能出現如 if for 這樣的流程控制的，必須一步到位計算結果，函式體中間也不得出現 n++ 這類的表達式，也不能宣告變數
    - 到了 C++14 之後就解禁大開放， if 可以寫。反正 if 內的關於參數的邏輯陳述只要也是 constexpr statement，他就會幫你編譯期計算。也可以在函式體裡頭宣告你輔助用的變數。也可以寫超過一個 return 敘述。
        ```clike
        constexpr int calc(int n)
        {
          if (n % 2 == 0) { // C++11 compile error
            return n * n;
          }
          int a = 10; // C++11 compile error
          return n * n + a; // C++11 compile error
        }
        int main()
        {
          constexpr int N = 123;
          constexpr int N_SQ = sq(N);
          constexpr int N_CALC = calc(N);
          printf("%d %d %d\n", N, N_SQ, N_CALC); // 123 15129 15139
          printf("%d\n", sq(4)); // 編譯期不會計算 sq(4)
        }
        ```
- 在 enum, switch 的應用
```clike
constexpr int fib(int n)
{
  if (n <= 0) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}
enum FIB_ENUM {
  a = fib(5),
  b = fib(10),
  c = fib(20),
  dummy = fib(0)
};
int main()
{
  FIB_ENUM my_fib = a;
  printf("%d %d %d\n", my_fib, FIB_ENUM::b, FIB_ENUM::c);
  // 8 89 10946
}
```
> - `g++ a.cpp -S` 我們查看 assembly
### props
- constexpr function 可以用 macro 函式來想像，但是避掉了非常多使用 macro 的困擾，比如定義的展開結尾分號爆炸，忘記對參數加上括號導致不同優先級的運算子攪和在一起…。

## advance
### constexpr constructor, constexpr operator overloading
```clike
class CClass
{
public:
  constexpr explicit CClass(int n) : n_(n) {}
  constexpr CClass operator*(const CClass &rhs) const { 
    return CClass(n_ * rhs.n_); 
  }
  int n_;
};
```
- CClass 的 constructor 完全沒有操作，也初始化了所有，也是唯一的成員變數 n_，因此自然就符合了 constexpr 的限制。(可以試試看把 n_ 寫在 constructor 函式體裡面賦值，就會吃 compile error 了)
- operator*() 就是個成員函式，做了一個 constexpr 物件回來，也很乖巧。
### constexpr if 編譯期就知道結果的 if!?
- 主要的語法和用法非常直觀
    ```clike
    if constexpr (condition) {
      // ...
    }
    // 或是加上 else
    if constexpr (condition) {
      // ...
    } else {
      // ...
    }
    ```
    - 如果在編譯期 (compile-time) 就能算出 true 或 false。或是通過轉型得出 true 或 false。
    - 也就是文件上所說的 contextually converted constant expression of type bool。中文解釋大致上是說他是情境上可轉換為 bool (這是個專有概念)，並且轉換為 bool 的結果是 constant expression。可以參考這篇的編譯期自訂型別轉換得到更實際的代碼範例。
    - 兩條件其一成立，編譯器便會依照出值 true 或 false 編譯 (而不是傳統的執行) if constexpr 內的區塊內容或是 else 的區塊內容。沒有編譯到的區塊內容可以粗略理解為被編譯器丟棄。
### props
- 第一點是開發樣版過程中避開 C++11 出現的各種繁複的 type traits 型別特徵，不用再為了不同型別條件去寫各式各樣的樣版特化，利用 SFINAE 加上 std::enable_if 寫得天花亂墜。
- 第二是，語法上完美地融入了原有習慣的 if 思考邏輯，使用直述式的直觀語法就能做到以前要寫得滿目瘡痍才能做到的事的代碼。
### std::enable_if
- 他是 C++ 標準在 C++11 新引入的一個 STL 內建樣版類別。他不是用來創建物件的，而是通過樣板參數去特化不同的成員 typedef。
    ```clike
    template<bool B, typename T>
    class enable_if<bool B, T=void>;
    ```
    - 顯然是一個非型別的類別樣版 (non-type template class)。當第一個樣版參數B 為 true 時， enable_if\<true> 會有一個成員 typedef 叫 type 定義為 T，預設為 void；如果具現化樣版時 B 給的是 false，那就不會有成員 typedef。
#### e.g.
```clike
template<typename T>
void func(T t) { puts("General"); } // (1)
template<>
void func<double>(double) { puts("Hello"); } // (2)
template<>
void func<int>(int) { puts("Hello"); } // (3)
```
- ![](https://i.imgur.com/zgiHshD.png)

## reference
- [潮．C++11 | constexpr, constexpr function | by TJSW | Medium](https://tjsw.medium.com/%E6%BD%AE-c-constexpr-ac1bb2bdc5e2)
- [潮．C++: constexpr constructor, constexpr operator overloading | by TJSW | Medium](https://tjsw.medium.com/%E6%BD%AE-c-constexpr-constructor-constexpr-operator-overloading-3a11062900ff)
- [潮．C++17 | constexpr if (1) 編譯期就知道結果的 if!? | by TJSW | Medium](https://tjsw.medium.com/%E6%BD%AE-c-17-constexpr-if-%E7%B7%A8%E8%AD%AF%E6%9C%9F%E5%B0%B1%E7%9F%A5%E9%81%93%E7%B5%90%E6%9E%9C%E7%9A%84-if-fc6b6db7864b)
- [潮．C++17 | constexpr if (2) 再會了 enable_if !? 再也不用樣版特化了 | by TJSW | Medium](https://tjsw.medium.com/%E6%BD%AE-c-17-constexpr-if-part-2-%E5%86%8D%E6%9C%83%E4%BA%86-std-enable-if-%E5%86%8D%E4%B9%9F%E4%B8%8D%E7%94%A8%E6%A8%A3%E7%89%88%E7%89%B9%E5%8C%96%E4%BA%86-86f06ac768da)