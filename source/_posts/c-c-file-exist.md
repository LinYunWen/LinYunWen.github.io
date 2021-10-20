---
title: C/C++ Check File Exists
date: 2021-10-20 21:26:37
tags: note, c/c++, file exists
---

# C/C++ Check File Exists
- 主要有幾種方式
    -   ifstream (C++)
    -   FILE (C\)
    -   access()
    -   std::filesystem::exists() (C++17)
    -   boost::filesystem::exists() (Boost)
<!--more-->
## fstream
### is_open
- 未必真的是不存在，有可能只是打不開
```clike
fstream fs(path.c_str(),ios::out);
//fs.open(path.c_str(),ios::out); 使用open開檔

if(fs.is_open()){
```
### good()
- 不過goodbit如果為false有三種可能
1. eofbit 讀到檔案結尾
2. failbit 可以讀取，但是有些內部的邏輯上錯誤，如今天我讀檔時，我預計讀到文字，他卻給我數字
3. badbit 檔案可能損毀導致無法讀取檔案中串流



## fopen
```clike
FILE *fp;
if (fp = fopen(path.c_str(), "r")) {
    fclose(fp);
    return true;
}
return false;
```

## access
> - #inclue <unistd.h>

```clike
if((access(path.c_str(), F_OK)) != 0) {
    return false;
}
return true;
```

## stat
> - #include <sys/stat.h>

```clike
struct stat info;
if (stat(path.c_str(), &info) == 0) {
    return true;
}
return false;
```

## std::filesystem::exists() (C++17)
> - #include \<filesystem>

```clike
if (std::filesystem::exists(path.c_str())) {
    return true;
}
return false;
```
## boost::filesystem::exists() (Boost)
> - #include <boost/filesystem.hpp>
```clike
if (boost::filesystem::exists(path.c_str())) {
    return true;
}
return false;
```

## speed
- Results for total time to run the 100,000 calls averaged over 5 runs,
| Method | Time |
| --- | --- |
| `exists_test0` (ifstream) | **0.485s** |
| `exists_test1` (FILE fopen) | **0.302s** |
| `exists_test2` (posix access()) | **0.202s** |
| `exists_test3` (posix stat()) | **0.134s** |


## reference
- [[C++] 如何確認開檔讀檔時，檔案是否存在(file exist) －五種不同方式 | 郭董<3小花園 - 點部落](https://dotblogs.com.tw/v6610688/2013/11/11/cplusplus_check_file_exist)
- [C/C++ 判斷檔案是否存在 | ShengYu Talk](https://shengyu7697.github.io/cpp-check-if-file-exists/)
- [Fastest way to check if a file exist using standard C++/C++11,14,17/C? - Stack Overflow](https://stackoverflow.com/questions/12774207/fastest-way-to-check-if-a-file-exist-using-standard-c-c11-14-17-c)