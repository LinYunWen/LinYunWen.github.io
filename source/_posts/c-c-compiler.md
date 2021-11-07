---
title: C/C++ Compiler
date: 2021-11-07 08:26:22
tags: [note, c/c++, gcc, g++, compiler, book section]
---

# C/C++ Compiler
- gcc and g++分別是gnu的c & c++編譯器 gcc/g++在執行編譯工作的時候，總共需要4步
	1. 預處理,生成.i的文件 [預處理器cpp] 
	2. 將預處理後的文件不轉換成彙編語言,生成文件.s [編譯器egcs] 
	3. 有彙編變為目標代碼(機器代碼)生成.o的文件 [彙編器as] 
	4. 連接目標代碼,生成可執行程序 [鏈接器ld] 
<!--more-->
## params
* -x language filename 
    * 設定文件所使用的語言,使後綴名無效,對以後的多個有效.也就是根據約定C語言的後綴名稱是.c的
    * 而C++的後綴名是.C或者.cpp,
    * 如果你很個性，決定你的C代碼文件的後綴名是.pig 哈哈，那你就要用這個參數,這個參數對他後面的文件名都起作用，除非到了下一個參數的使用。 
        * 　　可以使用的參數嗎有下面的這些 
            * 　　'c', 'objective-c', 'c-header', 'c++', 'cpp-output', 'assembler', and 'assembler-with-cpp'. 
        * e.g.: 
            * 　　gcc -x c hello.pig 
* -x none filename 
    * 　　關掉上一個選項，也就是讓gcc根據文件名後綴，自動識別文件類型 
    * e.g.: 
        * 　　gcc -x c hello.pig -x none hello2.c 
* -c 
    * 　　只激活預處理,編譯,和彙編,也就是他只把程序做成obj文件 
    * e.g.: 
        * 　　gcc -c hello.c 
        * 　　他將生成.o的obj文件 
* -S 
    * 　　只激活預處理和編譯，就是指把文件編譯成為彙編代碼。 
    * e.g. 
        * 　　gcc -S hello.c 
        * 　　他將生成.s的彙編代碼，你可以用文本編輯器察看 
* -E 
    * 　　只激活預處理,這個不生成文件,你需要把它重定向到一個輸出文件裡面. 
    * e.g.: 
        * 　　gcc -E hello.c >; pianoapan.txt 
        * 　　gcc -E hello.c | more 
        * 　　慢慢看吧,一個hello word 也要與處理成800行的代碼 
* -o 
    * 　　制定目標名稱,缺省的時候,gcc 編譯出來的文件是a.out,很難聽,如果你和我有同感，改掉它,哈哈 
    * e.g. 
        * 　　gcc -o hello.exe hello.c (哦,windows用習慣了) 
        * 　　gcc -o hello.asm -S hello.c 
* -pipe 
    * 　　使用管道代替編譯中臨時文件,在使用非gnu彙編工具的時候,可能有些問題
    * e.g.
        * 　　gcc -pipe -o hello.exe hello.c 
* -ansi 
    * 　　關閉gnu c中與ansi c不兼容的特性,激活ansi c的專有特性(包括禁止一些asm inline typeof關鍵字,以及UNIX,vax等預處理宏, 
* -fno-asm 
    * 　　此選項實現ansi選項的功能的一部分，它禁止將asm,inline和typeof用作關鍵字。 　　　　 
* -fno-strict-prototype 
    * 　　只對g++起作用,使用這個選項,g++將對不帶參數的函數,都認為是沒有顯式的對參數的個數和類型說明,而不是沒有參數. 
    * 　　而gcc無論是否使用這個參數,都將對沒有帶參數的函數,認為城沒有顯式說明的類型 
* -fthis-is-varialble 
    * 　　就是向傳統c++看齊,可以使用this當一般變量使用. 
* -fcond-mismatch 
    * 　　允許條件表達式的第二和第三參數類型不匹配,表達式的值將為void類型 
* -funsigned-char 
* -fno-signed-char 
* -fsigned-char 
* -fno-unsigned-char 
    * 　　這四個參數是對char類型進行設置,決定將char類型設置成unsigned char(前兩個參數)或者 signed char(後兩個參數) 
* -include file 
    * 　　包含某個代碼,簡單來說,就是便以某個文件,需要另一個文件的時候,就可以用它設定,功能就相當於在代碼中使用#include\<filename>; 
    * e.g.: 
        * 　　gcc hello.c -include /root/pianopan.h 
* -imacros file 
    * 　　將file文件的 header,擴展到gcc/g++的輸入文件,宏定義本身並不出現在輸入文件中 
* -Dmacro 
    * 　　相當於C語言中的#define macro 
* 　　 
* -Dmacro=defn 
    * 　　相當於C語言中的#define macro=defn 
* -Umacro 
    * 　　相當於C語言中的#undef macro 
* -undef 
    * 　　取消對任何非標準 header 的定義 
* -Idir 
    * 　　在你是用#include"file"的時候,gcc/g++會先在當前目錄查找你所制定的頭文件,如果沒有找到,他回到缺省的頭文件目錄找,如果使用-I制定了目錄,他 
    * 　　回先在你所制定的目錄查找,然後再按常規的順序去找. 
    * 　　對於#include\<file>;,gcc/g++會到-I制定的目錄查找,查找不到,然後將到系統的缺省的頭文件目錄查找 
* -I- 
    * 　　就是取消前一個參數的功能,所以一般在-Idir之後使用 
* -idirafter dir 
    * 　　在-I的目錄裡面查找失敗,講到這個目錄裡面查找. 
* -iprefix prefix 
* -iwithprefix dir 
    * 　　一般一起使用,當-I的目錄查找失敗,會到prefix+dir下查找 
* -nostdinc 
    * 　　使編譯器不再系統缺省的頭文件目錄裡面找頭文件,一般和-I聯合使用,明確限定頭文件的位置 
* -nostdin C++ 
    * 　　規定不在g++指定的標準路經中搜索,但仍在其他路徑中搜索,.此選項在創libg++庫使用 
* -C 
    * 　　在預處理的時候,不刪除註釋信息,一般和-E使用,有時候分析程序，用這個很方便的 
* -M 
    * 　　生成文件關聯的信息。包含目標文件所依賴的所有源代碼你可以用gcc -M hello.c來測試一下，很簡單。 
* -MM 
    * 　　和上面的那個一樣，但是它將忽略由#include\<file>;造成的依賴關係。 
* -MD 
    * 　　和-M相同，但是輸出將導入到.d的文件裡面 
* -MMD 
    * 　　和-MM相同，但是輸出將導入到.d的文件裡面 
* -Wa,option 
    * 　　此選項傳遞option給彙編程序;如果option中間有逗號,就將option分成多個選項,然後傳遞給會彙編程序 
* -Wl.option 
    * 　　此選項傳遞option給連接程序;如果option中間有逗號,就將option分成多個選項,然後傳遞給會連接程序. 
* -llibrary 
    * 　　制定編譯的時候使用的庫 
    * e.g. 
        * 　　gcc -lcurses hello.c 
        * 　　使用ncurses庫編譯程序 
* -Ldir 
    * 　　制定編譯的時候，搜索庫的路徑。比如你自己的庫，可以用它制定目錄，不然 
    * 　　編譯器將只在標準庫的目錄找。這個dir就是目錄的名稱。 
* -O0 
    * 不作最佳化；然而若是之前有指定其它 LEVEL 的參數，將不會受到本參數的影響。
* -O1 
    * 初步最佳化，作最佳化的編譯當然會花費更多的時間和記憶體；未使用本參數前 GCC編譯的原則是減少編譯成本，而且各個階段的編連是各自獨立的--可以在任一階段停下來，重新指定變數內容，且各階段的結果和一般的狀況相同，完全符合正常的程序，然而本參數會以整體四個階段一起考慮，且本參數包含許多其它參數，目的就是要減少程式大小及執行時間；使用本參數同時會將-fthread-jumps和-fdelayed-branch開啟。
* -O2 
    * 更進一步最佳化，本參數可直接使用不需配合上一個參數，在本參數下除了「大小--速度」需犧牲一方的演算法外其於都會用來作最佳化處理，也就是除了 frame pointer elimination 和 loop unrolling 外其餘將會利用上；和上一個參數比起來本參數在編連時間和執行碼效能都更優越。
* -O3 
    * 　　編譯器的優化選項的4個級別，-O0表示沒有優化,-O1為缺省值，-O3優化級別最高　　
    * turns on all optimizations specified by '-O2' and also turns on the '-finline-functions', '-funswitch-loops' and '-fgcse-after-reload' options.  　　 
* -g 
    * 　　只是編譯器，在編譯的時候，產生調試信息。 
* -gstabs 
    * 　　此選項以stabs格式聲稱調試信息,但是不包括gdb調試信息. 
* -gstabs+ 
    * 　　此選項以stabs格式聲稱調試信息,並且包含僅供gdb使用的額外調試信息. 
* -ggdb 
    * 　　此選項將盡可能的生成gdb的可以使用的調試信息. 
* -static 
    * 　　此選項將禁止使用動態庫，所以，編譯出來的東西，一般都很大，也不需要什麼動態連接庫，就可以運行. 
* -share 
    * 　　此選項將盡量使用動態庫，所以生成文件比較小，但是需要系統由動態庫. 
* -traditional 
    * 　　試圖讓編譯器支持傳統的C語言特性 

### 警告參數
- 警告是在編譯的過程中所發出的建議訊息，警告並非是錯誤，編譯後的程式仍可執行
- 不過警告的目的為指出某段可能會出錯的宣告方式語法，因此不可因不影響程式執行而掉以輕心
- 警告參數的目的為對某種語法提出(或抑制)警告訊息，以方便除錯或是順利執行，通常是以 -W 為開頭，這些參數的相反詞為加 no- 所形成，而不管是那種類型，都不是 GCC 的內定值。
#### 類型
* -fsyntax-only
    * 只檢查程式之語法有無錯誤而不作編譯。
* -w
    * 抑制所有警告訊息。
* -Wno-import
    * 抑制所有和使用 #import 有關之警告訊息。
* -pedantic
    * 依嚴格的 ANSI C 的標準發出警告訊息，並駁回任使用不允許擴充函數的程式。
* -pedantic-errors
    * 作用如同 -pedantic，但除了警告外還會產生錯誤訊息。
* -W
    * 對下列情況提出警告：
        * 一個 nonvolatile自動變數將被改成 longjmp  時，這種情況唯有作最佳化時才會發生。
        * 當一個函數可能有傳回值，也可能不傳回任何值時，例子如下：
            ```clike
            foo (a)
            { if (a > 0) return a; }
            ```
        * 沒任何作用的 expression 敘述。
        * 一個 unsigned 數值和零比較大小時。
            * 如 'x<=y<=z'的表示式，此表示式 GCC會將其處理成 '(x<=y?1:0)<=z'以便程式能順利執行，當然這樣和原來想表現的意思差蠻多的。
        * 當 storage-class specifiers 如 'static' 並不是所有宣告中最先執行之時。
* -Wimplicit
    * 當某函數或某參數 implicitly 宣告時提出警告。
* -Wreturn-type
    * 當一函數內定傳回值為 int 時卻作別種型態的宣告便提出警告，或是當一函數無傳回值 (void)，然而其中的 return 接一傳回值時便發出對 return 的警告。
* -Wunused
    * 對某一 local 變數自宣告後便沒再使用、declare 一 static 函數後但未先 define、還有一段敘述算出一個結果，這個結果接下來卻未再使用等以上三種情況提出警告。
* -Wswitch
    * 使用一列舉 (enum) 形態的變數為 switch 的 index 時，接下來卻缺少一個或以上的case作配合，或者是 case 的 label 超出了enum 中的選項時，便發出警告訊息，若是沒有必要列出每個 case 時可用default 代替。
* -Wcomment
    * 當 '/* '符號 "又" 出現在註解中時。
* -Wformat
    * 檢查 printf、scanf... 等函數其中第二個以後的參數型態是否和第一個字串中所寫有符合。
* -Wchar-subscripts
    * 當陣列的註標 (subscript) 之型態為 char 時便發出警告，因為在某些主機上 char 為 signed。
* -Wuninitialized
    * 當一自動變數未給予初值便使用時；如下的例子
        ```clike
        {
          int x;
          switch (y)
            {
            case 1: x = 1;
              break;
            case 2: x = 4;
              break;
            case 3: x = 5;
            }
          foo (x);
        }
        ```
        * 這個例子看起來沒錯，因為只要 y為 1、 2或 3則 x都會有初值，但 GCC 對於這樣的寫法並不夠聰明到能看出 x 會有初值這件事，因此對 foo(x) 而言其中的 x 就出問題了，然而當未使用最佳化編譯時並不會有本警告出現。
* -Wparentheses
    * 當 parentheses 在以下這些敘述中省略時：當預期將為 true value 卻有 assignment 時，或是有令人頭昏眼花的 nest operators 時。
* -Wenum-clash
    * 當兩個不同的 enum 型態作轉換時。(C++ only)
* -Wtemplate-debugging
    * 若是在程式中使用了模版 (template) 但除錯功能未完全支援時。(C++ only)
* -Wall
    * 本參數為以上所有 -W 參數的總集，且本參數為最推薦使用者，因為以上的情況便包含了一般情況下該警告的事項。

>  * 接下來的這些參數並不包含於 -Wall之中，這些參數所要警告的為一些結構上的問題。
* -Wtraditional
    * 對傳統和 ANSI C 的一些結構上的差異提出警告：
        *  switch 的 operand 型態為 long。
        * 函數在 block 中宣告為外部(external)而後在 block 結束後使用。
        * 巨集的參數是位於巨集本體的字串內容中，這種情況對傳統 C 是允許的，但對 ANSI C 會有不相容發生。
* -Wshadow
    * 當一區域變數 shadow 另一區域變數時。
* -Wid-clash-LEN
    * 當兩個以上的辨別字 (identifier) 在開頭和 LEN 相同時。
* -Wpointer-arith
    * 當使用 size of 在函數時。
* -Werror
    * Make all warnings into errors.
    * 將所有警告轉換成錯誤，這會讓編連停止。


## reference
- [g++參數介紹-软件开发平台及语言笔记大全(超详细)](https://www.cntofu.com/book/46/gcc/gcan_shu_jie_shao.md)
- [GCC常用編譯參數 @ R & D LAB :: 隨意窩 Xuite日誌](https://blog.xuite.net/lidj37/twblog/179517556)
- [[轉貼] 編織出個好程式--GCC參數篇(一) @ 傑克! 真是太神奇了! :: 痞客邦 ::](https://magicjackting.pixnet.net/blog/post/72822288)
- [gcc 優化選項 -O1 -O2 -O3 -Os 優先順序 | 程式前沿](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/569900/)
- [Optimize Options (Using the GNU Compiler Collection (GCC))](https://gcc.gnu.org/onlinedocs/gcc/Optimize-Options.html)
- [gcc -O0 -O1 -O2 -O3 四級優化選項及每級分別做什麼優化 - IT閱讀](https://www.itread01.com/content/1544816905.html)