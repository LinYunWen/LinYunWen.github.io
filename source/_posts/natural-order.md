---
title: Natural Order
date: 2022-04-05 11:07:09
tags: [note, natural order, sort]
---

# Natural Order
> - it is also called version sorting
## intro
- 通常將字母和數字方開來處理，而數字的部分會以數字組的方式處理
- 以避免下列狀況
```clike
// 按字母顺序排序：
1.  1111
2.  22

// 自然排序：
1.  22
2.  1111
```
## code example
```sql
SELECT 
    CONCAT(prefix, suffix)
FROM
    items
ORDER BY 
    prefix , suffix;
```
```sql
SELECT 
    item_no
FROM
    items
ORDER BY CAST(item_no AS UNSIGNED) , item_no;
```
```sql
SELECT 
    item_no
FROM
    items
ORDER BY LENGTH(item_no) , item_no;
```

## reference
- [SQLite Order By - Sorting Result Set in Various Orders](https://www.sqlitetutorial.net/sqlite-order-by/)
- [SQLite Forum: Natural sort order](https://sqlite.org/forum/forumpost/cff93834d2)
- [MySQL Natural Sorting with ORDER BY clause](https://www.mysqltutorial.org/mysql-natural-sorting/)
- [Natural sorting of alphanumeric values in sqlite using android - Stack Overflow](https://stackoverflow.com/questions/36618910/natural-sorting-of-alphanumeric-values-in-sqlite-using-android)
- [自然排序顺序-维基百科](https://wikichi.icu/wiki/Natural_sort_order)
- [sorting - SQLite 3 Version Sort String - Stack Overflow](https://stackoverflow.com/questions/28281501/sqlite-3-version-sort-string)
- [自然排序](https://seven332.github.io/algorithm/2017/09/25/natural-sorting.html)
- [Sorting for Humans : Natural Sort Order](https://blog.codinghorror.com/sorting-for-humans-natural-sort-order/)
- [Windows Confidential: The Evolution of Sorting | Microsoft Docs](https://docs.microsoft.com/en-us/previous-versions/technet-magazine/hh475812(v=msdn.10)?redirectedfrom=MSDN)
- [sql - Natural Sort in MySQL - Stack Overflow](https://stackoverflow.com/questions/153633/natural-sort-in-mysql)