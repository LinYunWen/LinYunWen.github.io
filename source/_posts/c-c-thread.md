---
title: C/C++ Thread
date: 2021-10-17 20:10:46
tags: note, c/c++, thread, book section
---

# C/C++ Thread
> - 那就是 [C++11](https://kheresy.wordpress.com/2011/10/12/c11_standard/) 的 STL 新加入的「Thread」
> - 可以考慮使用 [Boost C++ Libraries](https://kheresy.wordpress.com/2010/10/13/boostcpplibraries/) 所提供的 Thread 函式庫（[官方文件](http://www.boost.org/doc/html/thread.html)）
<!--more-->

## usage
```clike
#include <iostream>
#include <thread>

using namespace std;

void test_func()
{
  // do something
  double dSum = 0;
  for( int i = 0; i < 10000; ++ i )
    for( int j = 0; j < 10000; ++ j )
      dSum += i*j;

  cout << "Thread: " << dSum << endl;
}

int main( int argc, char** argv )
{
  // execute thread
  thread mThread( test_func );

  // do somthing
  cout << "main thread" << endl;

  // wait the thread stop
  mThread.join();

  return 0;
}
```

- 如果要執行的 function object 是需要參數的話，也可以直接在建立 std::thread 物件的時候，直接把參數附加在建構子裡
    - 不過要注意的一點是，在把 callable object 傳遞給 STL Thread 開啟一個新的 thread 的時候，他會是採用複製的方法，把傳入的物件複製一份來用；所以如果在裡面有修改道本身的資料的話，就需要使用 std::ref() 來產生物件的參考、然後再傳進去
    ```clike
    #include <iostream>
    #include <thread>

    using namespace std;

    void test_func2( int i )
    {
      cout << i << endl;
    }

    int main( int argc, char** argv )
    {
      thread mThread( test_func2, 10 );
      mThread.join();

      return 0;
    }
    ```
    ```clike
    #include <iostream>
    #include <thread>

    using namespace std;

    class funcObj
    {
    public:
      int iData;

      funcObj()
      {
        iData = 0;
      }

      void operator()()
      {
        ++iData;
      }
    };

    int main( int argc, char** argv )
    {
      funcObj co;

      // copy
      thread mThread1( co );
      mThread1.join();
      cout << co.iData << endl;

      // reference
      thread mThread2( ref( co ) );
      mThread2.join();
      cout << co.iData << endl;

      return 0;
    }
    ```
## others
- 上面基本上就是 STL Thread 最基本的使用了～透過 std::thread 這個物件，基本上是可以相當簡單地開啟一個新的執行序來處理額外的計算，然後在目前的執行序、同時繼續做其他的計算的；而實務上，有需要的話，也是可以開許多個執行序來用的～
- THREAD::HARDWARE_CONCURRENCY()
    - hardware_concurrency() 是 std::thread 的 static member function，可以用來取得在硬體層面上可以同時執行的執行序的數量，基本上可以視為處理器的核心數目；不過實際上這只是估計值，如果無法判斷時，值會是 0。（[參考](http://msdn.microsoft.com/zh-tw/library/hh920607)）
- THIS_THREAD
    - this_thread 是 STL thread 裡的一個特別的 namespace，底下提供 get_id()、yield()、sleep_until()、sleep_for() 四個函式可以呼叫，都是針對目前的執行序進行操作的。
	- 其中，get_id() 可以用來取得目前的執行序的 id（型別是 thread::id）；另一方面，也可以透過 std::thread 的物件的 get_id() 這個 member function 來取得（例如：mThread.get_id()）。這個功能主要是可以用來識別不同的執行序，有的時候是用的到的。
	- 而 sleep_for() 和 sleep_until() 則是用來讓目前的執行序暫時停下來的，前者是停止一段指定的時間、後者則是設定一個絕對時間、讓執行序在指定的時間再繼續執行；而時間的參數，則是要使用 std::chrono（[MSDN](http://msdn.microsoft.com/zh-tw/library/hh874757)）的 duration（[範例](http://www.cplusplus.com/reference/std/chrono/duration/duration/)）和 time_point（[範例](http://www.cplusplus.com/reference/std/chrono/time_point/time_point/)）這兩種型別的時間資料。
    - yield() 是暫時放棄一段 CPU 時間、讓給其他執行序使用的；這個應該算是比較進階的使用了，在這邊暫時跳過，之後有機會再整理。


## reference
- [C++ 的多執行序程式開發 Thread：基本使用 – Heresy's Space](https://kheresy.wordpress.com/2012/07/06/multi-thread-programming-in-c-thread-p1/)
- [std::thread::join - cppreference.com](https://en.cppreference.com/w/cpp/thread/thread/join)