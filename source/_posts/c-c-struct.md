---
title: C/C++ struct
date: 2021-10-17 20:05:26
tags: note, c/c++, struct, book section
---

# C/C++ struct
- 自訂不同資料型態串在一起
    ```clike
    struct person_t {
        char *name;
        unsigned age;
    };
    // or 
    // typedef struct {
    //     char *name;
    //     unsigned age;
    // } person_t;

    int main(void)
    {
        struct person_t p = { "Michelle", 37 };  
    //     or
    //     struct person_t p = { 
    //         .name = "Michelle", 
    //         .age = 37
    //     };  


        return 0;
    }
    ```
    <!--more-->
    - 在C語言中，定義一個結構體型別要用typedef :
        ```clike
        typedef struct point {
            int x;
            int y;
        }Point;

        // 在宣告變數的時候就可以：Point p1;
        // 如果沒有typedef, 如：
        struct point {
            int x;
            int y;
        };
        // 在宣告變數的時候就必須用：struct point p1;
        // Point是struct point的別名。
        ```
    - 在 C中，struct不能包含函式
    * 在C++中，對struct進行了擴充套件，可以包含函式。

- struct 可以內嵌在結構內的結構
    - 結構內不能嵌入同一個結構，也就是結構不能遞迴宣告
- 儲存結構的陣列
    ```clike
    point_t pts[] = {
        { .x = 0.0, .y = 0.0 },
        { .x = 1.0, .y = 2.0 },
        { .x = 3.0, .y = 4.0 }
    };

    for (size_t i = 0; i < 3; i++) {
        printf("(%.2f, %.2f)\n", pts[i].x, pts[i].y);
    }
    ```
- 存取結構指標的屬性
    - 存取結構指標內的屬性有兩種方式：
        * 解指標 (dereference)
        * 使用 -> (箭號)
    * 第二種方式在語法上比較簡潔，故較受歡迎，可以當做一種語法糖
    ```clike
    point_t *pt = malloc(sizeof(point_t));
    if (!pt)
        return 1;
    
    /* Init x and y with dereference. */
    (*pt).x = 0.0;
    (*pt).y = 0.0;
    
    /* Access fields of pt with dereference. */
    assert((*pt).x == 0.0);
    assert((*pt).y == 0.0);
    ```
    ```clike
    /* Mutate x and y with `->` */
    pt->x = 3.0;
    pt->y = 4.0;
    
    /* Access fields of pt with `->` */
    assert(pt->x == 3.0);
    assert(pt->y == 4.0);
    
    free(pt);
    ```

- Initializing default values in a struct
    - declare a variable bar with the type of foo
    ```clike
    struct foo {
        foo() : a(true), b(true) {}
        bool a;
        bool b;
        bool c;
    } bar;
    ```
    改成
    ```clike
    struct foo {
        bool a = true;
        bool b = true;
        bool c;
    } bar;
    ```
    > - This was added in C++11.
- 可以做繼承、constructor、methods
## reference
- [[C 語言] 程式設計教學：如何使用結構 (Struct) | 開放原始碼技術文件網](https://opensourcedoc.com/c-programming/struct/)
- [C/C++ struct 結構體定義 用法詳解 - IT閱讀](https://www.itread01.com/content/1546383061.html)
- [C++ 結構 struct @ 程式語言教學 :: 痞客邦 ::](https://crmne0707.pixnet.net/blog/post/317076414-c%2B%2B-%E7%B5%90%E6%A7%8B-struct)
- [C 語言：結構（struct）自訂不同資料型態綁一起 - 寫點科普 Kopuchat](https://kopu.chat/2017/05/30/c-%E8%AA%9E%E8%A8%80%EF%BC%9A%E7%B5%90%E6%A7%8B%EF%BC%88struct%EF%BC%89%E8%87%AA%E8%A8%82%E4%B8%8D%E5%90%8C%E8%B3%87%E6%96%99%E5%9E%8B%E6%85%8B%E7%B6%81%E4%B8%80%E8%B5%B7/)
- [c++ - Initializing default values in a struct - Stack Overflow](https://stackoverflow.com/questions/16782103/initializing-default-values-in-a-struct)