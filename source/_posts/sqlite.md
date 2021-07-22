---
title: sqlite
date: 2021-07-22 21:30:20
tags: [note, sqlite]
---

# sqlite
## type
* NULL：標識一個NULL值
* INTERGER：整數類型
* REAL：浮點數
* TEXT：字符串
* BLOB：二進制數
## command
### basic
- open a db
    - `sqlite3 ${database.sqlite}`
- in sqlite mode
    -   `.tables` will list tables
    -   `.schema [tablename]` will show the CREATE statement(s) for a table or tables
        -   `.schema` 查看所有表的創建語句
    - `.dump`, `.dump table_name` view the entire contents
    - `select * from some_table;`
<!--more-->

- comment
    - 兩個減號（--）則代表註解

### sql
- select
    - 如果資料太多了，我們或許會想限制筆數：
        - `select * from film limit 10;`
        - 或是年份比較早的電影先列出來（預設為 ascended）：
        - `select * from film order by year limit 10;`
        - 或是年份比較晚的電影先列出來：
        - `select * from film order by year desc limit 10;`
    - 或是我們只想看電影名稱跟年份：
        - `select title, year from film order by year desc limit 10;`
    - 資料庫一共有多少筆資料：
        - `select count(*) from film;`
        - 只想知道1985年以後的電影有幾部：
        - `select count(*) from film where year >= 1985;`
        - select * from table_name where field in ('val1', 'val2', 'val3');
        - select * from table_name where field between val1 and val2;
### others
- 設置顯示模式：
    - `sqlite>.mode mode_name` 
        - Example:默認為list，設置為column，其他模式可通過.help查看mode相關內容 
        - `sqlite>.mode column` 
  
- 輸出幫助信息：
    - `sqlite>.help`
- 設置每一列的顯示寬度：
    - `sqlite>.width width_value`
        - Example:設置寬度為2
        - `sqlite>.width 2`

- 列出當前顯示格式的配置：
    - `sqlite>.show`
- 退出sqlite終端命令：
    - `sqlite>.quit` or `sqlite>.exit`
- sqlite可以在shell底下直接執行命令：
    - `sqlite3 film.db "select * from film;"`
## reference
- [How can one see the structure of a table in SQLite? \[duplicate\]](https://stackoverflow.com/questions/4654762/how-can-one-see-the-structure-of-a-table-in-sqlite)
- [How to open .SQLite files](https://stackoverflow.com/questions/26015686/how-to-open-sqlite-files)
- [Linux sqlite3 基本命令](http://www.aspphp.online/shujuku/sqlitesjk/gysqlite/201701/76871.html)
- [SQLite使用教學](https://moneyd.pixnet.net/blog/post/25646227)

