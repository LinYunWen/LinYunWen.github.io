---
title: C/C++ Time
date: 2021-10-11 14:50:41
tags: note, c/c++, time
---

# C/C++ Time

## c
> - <time.h>
### clock
- clock 會在程式開始執行時計時，直接呼叫就能知道已經執行多久
- `clock_t clock(void)`
    - 這個函數返回程序啟動以來經過的時鐘滴答數。失敗時，函數返回值-1。
    ```clike
    cout << (double)clock() / CLOCKS_PER_SEC << " S";
    ```
    - 由於 clock 回傳的數值是以毫秒為單位，所以會在除上一個 CLOCKS\_PER\_SEC，這個 CLOCKS\_PER\_SEC 通常都是 1000
<!--more-->
#### e.g.
```clike
double timeStart, timeEnd;
// or clock_t start_t, end_t;
timeStart = clock();
// do something...
timeEnd = clock();
cout << "total time (clock) = " << (timeEnd– timeStart) / CLOCKS_PER_SEC << " s" << endl;
```
### clock_gettime
- `int clock_gettime(clockid_t clk_id, struct timespect *tp);`
- clk_id
    - `CLOCK_REALTIME`, a system-wide realtime clock.
    * `CLOCK_PROCESS_CPUTIME_ID`, high-resolution timer provided by the CPU for each process.
    * `CLOCK_THREAD_CPUTIME_ID`, high-resolution timer provided by the CPU for each of the threads.
* tp
    ```clike
    struct timespec {
        time_t tv_sec; /* seconds */
        long tv_nsec; /* nanoseconds */
    };
    ```
#### e.g.
```clike
timespec start, end;
clock_gettime(CLOCK_PROCESS_CPUTIME_ID, & start);
// do something...
clock_gettime(CLOCK_PROCESS_CPUTIME_ID, & end);
cout << "total time (clock_gettime) = " << end.tv_sec - start.tv_sec << endl;
cout << "total time (clock_gettime) = " << end.tv_nsec - start.tv_nsec << endl;
```
1.  使用 clock() 精確度只到 ms
2.  使用 clock_gettime()，精確度可達 ns


## c++
### clock
> - 參考上方

### ctime
> - \<ctime>

- `char* ctime(const time_t* time_ptr);`
- 主要用於日期和時間
- return
    - ctime()函數采用一個指向time_t對象作為其參數，並返回以下形式的文本表示形式：
    - `Www Mmm dd hh:mm:ss yyyy`
        |類型|描述|值|
        |--- |--- |--- |
        |Www|一周中的3個字母|周一至周日|
        |Mmm|3個字母的月份名稱|一月至十二月|
        |dd|每月的2位數天|00至31|
        |hh|2位數小時|00至23|
        |mm|2位數分鍾|00至59|
        |ss|2位數秒|00至59|
        |yyyy|4位數的年份|4位數的年份|

#### e.g.
```clike
time_t curr_time;
curr_time = time(NULL);

char *tm = ctime(&curr_time);
cout << "Today is : " << tm;
```
### chrono
> - 參考 [chrono](https://hackmd.io/jqwUCp_8TdCQoNWvcIyfuw#chrono)

#### e.g.
```clike
std::chrono::time_point<std::chrono::system_clock> start, end;

start = std::chrono::system_clock::now();
std::cout << "f(42) = " << fibonacci(42) << '\n';
end = std::chrono::system_clock::now();

std::chrono::duration<double> elapsed_seconds = end - start;
std::time_t end_time = std::chrono::system_clock::to_time_t(end);

std::cout << "finished computation at " << std::ctime(&end_time)
          << "elapsed time: " << elapsed_seconds.count() << "s\n";
```
## reference
- [[C/C++] 計算程式執行時間 - 傑瑞窩在這](https://jerrynest.io/calculate-running-time/)
- [【C++】C++中幾種測試程式執行時間的方法 - IT閱讀](https://www.itread01.com/content/1548646212.html)
- [clock() - C語言庫函數 - C語言標準庫](http://tw.gitbook.net/c_standard_library/c_function_clock.html)
- [C++ ctime用法及代碼示例 - 純淨天空](https://vimsky.com/zh-tw/examples/usage/cpp-programming_library-function_ctime_ctime.html)
- [Chrono in C++ - GeeksforGeeks](https://www.geeksforgeeks.org/chrono-in-c/)