---
title: c/c++-map
date: 2021-12-31 09:37:37
tags: [note, c/c++, map]
---

# C++ map

## map iterator
### const auto : 
```clike
// c++11
for (const auto &item : tempMap) {
    cout << "[" << item.first << "," << item.second << "]\n";
}

// c++17
for (const auto& [key, value] : tempMap) {
    cout << "[" << key << "," << value << "]\n";
}
```
<!--more-->
### iterator
```clike
for (auto iter = tempMap.begin(); iter != tempMap.end(); ++iter){
    cout << "[" << iter->first << ","
                << iter->second << "]\n";
}
```

## reference
- [如何在 C++ 中對 Map 進行迭代 | D棧 - Delft Stack](https://www.delftstack.com/zh-tw/howto/cpp/how-to-iterate-over-map-in-cpp/)
- [dictionary - C++ Loop through Map - Stack Overflow](https://stackoverflow.com/questions/26281979/c-loop-through-map)