---
title: C/C++ localtime
date: 2021-10-18 20:37:45
tags: [note, c/c++, localtime]
---

# C/C++ localtime
- `#include <time.h>`

## 參數
- timer	-	pointer to a time_t object to convert
- buf	-	pointer to a struct tm object to store the result
    ```clike
    struct tm {
        int tm_sec;         /* seconds */
        int tm_min;         /* minutes */
        int tm_hour;        /* hours */
        int tm_mday;        /* day of the month */
        int tm_mon;         /* month */
        int tm_year;        /* year */
        int tm_wday;        /* day of the week */
        int tm_yday;        /* day in the year */
        int tm_isdst;       /* daylight saving time */
    };
    ```
## Return value
- 1)
    - pointer to a static internal tm object on success
    - or null pointer otherwise. The structure may be shared between gmtime, localtime, and ctime and may be overwritten on each invocation.
- 2-3)
    - copy of the buf pointer
    - or null pointer on error (which may be a runtime constraint violation or a failure to convert the specified time to local calendar time)
<!--more-->
## usage
1) Converts given time since epoch (a [time_t](https://en.cppreference.com/w/c/chrono/time_t "c/chrono/time t") value pointed to by `timer`) into calendar time, expressed in local time, in the [`struct tm`](https://en.cppreference.com/w/c/chrono/tm "c/chrono/tm") format. The result is stored in static storage and a pointer to that static storage is returned.
2) Same as (1), except that the function uses user-provided storage `buf` for the result.
3) Same as (1), except that the function uses user-provided storage `buf` for the result and that the following errors are detected at runtime and call the currently installed [constraint handler](https://en.cppreference.com/w/c/error/set_constraint_handler_s "c/error/set constraint handler s") function:
    -   `timer` or `buf` is a null pointer


## localtime
- `struct tm *localtime  ( const time_t *timer );`
- localtime用来获取系统时间，精度为秒

## localtime_r
- `struct tm *localtime_r(const time_t *timep, struct tm *result);`
- localtime_r也是用来获取系统时间，运行于linux平台下

### reference
- [localtime_r(3) - Linux man page](https://linux.die.net/man/3/localtime_r)

## localtime_s
- `struct tm *localtime_s( const time_t *restrict timer, struct tm *restrict buf );`
- localtime_s也是用来获取系统时间，运行于windows平台下，与localtime_r只有参数顺序不一样

## e.g.
```clike
time_t t = time(NULL);
printf("UTC:       %s", asctime(gmtime(&t)));
printf("local:     %s", asctime(localtime(&t)));
// POSIX-specific
putenv("TZ=Asia/Singapore");
printf("Singapore: %s", asctime(localtime(&t)));

// UTC:       Fri Sep 15 14:22:05 2017
// local:     Fri Sep 15 14:22:05 2017
// Singapore: Fri Sep 15 22:22:05 2017

```

## reference
- [localtime、localtime_s、localtime_r的使用_开源的才是世界的-CSDN博客_localtime_r](https://blog.csdn.net/u010087712/article/details/50731222)
- [localtime, localtime_r, localtime_s - cppreference.com](https://en.cppreference.com/w/c/chrono/localtime)