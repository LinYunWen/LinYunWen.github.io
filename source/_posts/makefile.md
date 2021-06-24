---
title: makefile
date: 2021-06-24 22:03:39
tags: [note]
---

# Makefile

## Introduction
- 編譯小型程式可用簡單的命令編譯或 shell script 編譯，但當程式很大且包含大量標頭檔和函式庫時，就需要使用 makefile。makefile 會將程式分成好幾個模組，根據裡面的目標 (target)、規則 (rule) 和檔案的修改時間進行判斷哪些需要重新編譯，可以省去大量重複編譯的時間，這在大型程式中尤為有用。

- 另外，在閱讀大型程式碼時除了 Readme 檔案，Makefile 也能對整體架構有不錯的詮釋，先閱讀 makefile 是掌握程式碼架構一個良好的策略。
<!--more-->

## Flow
1.  make 會在當前目錄下按順序找尋文件名為 GNUmakefile、makefile 或 Makefile 的文件。
    > - 當然，你可以使用別的文件名來書寫Makefile，比如：“Make.Linux”，“Make.Solaris”，“Make.AIX”等，如果要指定特定的Makefile，你可以使用make的“-f”和“--file”參數，如：make -f Make.Linux或make --file Make.AIX。
2.  在 makefile 文件中的找到**第一個目標文件（target）**，並把這個文件作為最終的目標文件。
3.  如果沒找到或目標文件所依賴的文件，或修改時間要比目標文件新，則 make 將執行後面所定義的命令來生成這個文件，如此遞迴下去找到文件彼此的依賴關係，直到最終編譯出第一個目標文件。

## Rules
- **顯式規則：** 顯式規則表示如何生成一個或多個目標文件。
    - 最重要的是 Makefile 規則，其基本結構如下：
        - 目標 (Target) : 一個目標檔，可以是 Object 檔，也可以是執行檔，還可以是一個標籤。
        - 依賴 (Dependency, Prerequisites) : 要產生目標檔 (target) 所依賴哪些檔。
        - 命令 (Command) : 建立專案時需要執行的 shell 命令。命令部分的每行的縮進必須要使用 Tab 鍵而不能使用多個空格。
    - 像 clean 這種沒有被第一個目標文件直接或間接關聯，那麼它後面所定義的命令將不會被自動執行，不過我們可以顯式要求 make 執行。即 make clean。
    - Make 預設的假工作目標有 all, install, clean, distclean, TAGS, info 和 check。
    ```
    target ... : prerequisites ...
       command
   ```
   > - prerequisites中如果有一個以上的文件比target文件要新的話，command所定義的命令就會被執行。這就是Makefile的規則。也就是Makefile中最核心的內容
- **隱式規則：** 比較簡略地書寫 Makefile 規則，例如規則中有 .o 文件，make 會自動的把 .c 文件也加入依賴關係中。
    - 每個Makefile中都應該寫一個清空目標文件（.o和執行文件）的規則，這不僅便於重編譯，也很利於保持文件的清潔。這是一個“修養”（呵呵，還記得我的《編程修養》嗎）。一般的風格都是：
        ```
        clean:
            rm edit $(objects)
        ```
    - 更為穩健的做法是：
        ```
        .PHONY : clean
        clean :
                -rm edit $(objects)
        ```
    - 前面說過，.PHONY意思表示clean是一個“偽目標”。**而在rm命令前面加了一個小減號的意思就是，也許某些文件出現問題，但不要管，繼續做后面的事**。當然，clean的規則不要放在文件的開頭，不然，這就會變成make的默認目標，相信誰也不願意這樣。不成文的規矩是——“clean從來都是放在文件的最后”。

- **變數定義：** 類似 C 語言中的 define，定義的變數都會置換到引用位置上。
    - 變數宣告時要使用 = 或 := 給予初始值 (注意兩者在代換時稍有不同)，如 obj = hello.o foo.o，取用時寫成 (obj) 或 {obj} 。如果我們想定義一些比較類似的文件，可以使用 Unix-like 的 * ， ? 和 ~ 。
    - 在一些 make 中常使用自動化變數來簡寫規則（讓 makefile 難讀的兇手之一QQ）：
        * $@：目前的目標項目名稱。
        * $<：代表目前的相依性項目。
        * $*：代表目前的相依性項目，但不含副檔名。
        * $?：代表需要重建（被修改）的相依性項目。

        - 另外在 makefile 規則中所用的萬用配對字元是% ，因此一個使用各種變數代換技巧的 makefile 可能如下例所示：
        
- **文件指示：** 
    - 類似 C 語言中的 include，一個 Makefile 中引用另一個 Makefile，如 include makefile.inc。
    - 類似 C 語言中的 預編譯 #if，根據某些情況指定 Makefile 中的有效部分。
    - 在include前面可以有一些空字符，但是絕不能是[Tab]鍵開始。include和 可以用一個或多個空格隔開。
    - make會在當前目錄下首先尋找，如果當前目錄下沒有找到，那麼，make還會在下面的幾個目錄下找：
    - 如果make執行時，有“-I”或“--include-dir”參數，那麼make就會在這個參數所指定的目錄下去尋找。
    - 如果目錄 /include（一般是：/usr/local/bin或/usr/include）存在的話，make也會去找。
- **註釋與換行：** Makefile 中只有行註釋，用 # 符號；換行則是使用 \ 符號 。
- 條件判斷
    - ifeq：（檢查 value1, value2 是否相等）
        ```
        ifeq (value1, value2)
            ...
        else
            ...
        endif
        ```
    * ifneq：（提供和 ifeq 相反的功能）
        ```
        ifneq (value1, value2)
            ...
        else
            ...
        endif
        ```
    * ifdef：（檢查 variable 變數是否為空的）
        ```
        ifdef variable
            ...
        else
            ...
        endif
        ```

    - ifndef：（提供和 ifdef 相反的功能）
        ```
        ifdef variable
            ...
        else
            ....
        endif
        ```


## Reference
- [簡單學 makefile：makefile 介紹與範例程式](https://mropengate.blogspot.com/2018/01/makefile.html)
- [Makefile學習教程: 跟我一起寫 Makefile](https://blog.xuite.net/tzeng015/twblog/113272267-Makefile%E5%AD%B8%E7%BF%92%E6%95%99%E7%A8%8B%3A+%E8%B7%9F%E6%88%91%E4%B8%80%E8%B5%B7%E5%AF%AB+Makefile)
- [Makefile 語法簡介](https://sites.google.com/site/mymakefile/makefile-yu-fa-jian-jie)
- [[GNU Make] Makefile 教學](https://opensourcedoc.com/gnu-make/)
- [makefile中的自動化變數$@,$%,$](https://www.itread01.com/p/202718.html)

![](https://i.imgur.com/i037CZ3.png)
