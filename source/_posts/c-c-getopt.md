---
title: C/C++ optind, getopt
date: 2021-11-06 13:32:04
tags: [note, c/c++, book section, optind, getopt]
---

# C/C++ optind, getopt
> - getopt, getopt_long, getopt_long_only, optarg, optind, opterr, optopt
> - `#include <getopt.h>`
- Parse command-line options
- An element of argv that starts with '-' (and is not exactly "-" or "--") is an option element
<!--more-->
## getopt
- 函式用於解析選項並從程式中檢索給定引數，並根據輸入執行相應的程式碼路徑。
### 參數
- 其中前兩個引數是傳遞給 main 函式的 argc 和 argv。
- 第三個引數是 optstring-指向表示合法選項字元的字串的指標。
    - 需要連續呼叫 getopt，直到檢索到每個選項為止。
    - `optstring` 以冒號開頭，當遇到缺少的引數時，該值指示 `getopt` 呼叫需要返回的值。
    - 另外，在字元（例如 `p`）之後指定的冒號表示該選項需要該引數；兩個冒號表示該引數是可選的。
    - 可以在命令列上多次傳遞相同的選項字元。
    - `getopt` 函式返回選項字元（如果成功的話）
    - return 字元 `?` 如果遇到的選項字元不在 `optstring` 中。

### return
- If an option was successfully found
    - returns the option character.
- If all command-line options have been parsed
    - returns -1.
- If getopt() encounters an option character that was not in optstring
    - '?' is returned.
- If getopt() encounters an option with a missing argument
    - return value depends on the first character in optstring
        - if it is ':', then ':' is returned; otherwise '?' is returned.

### e.g.
```clike
#include <stdio.h>
#include <stdlib.h>
#include <getopt.h>

int main(int argc, char *argv[]) {
    int opt, xnum = 0;
    char *pstr = NULL;

    while ((opt = getopt(argc, argv, ":p:x")) != -1) {
        printf("opt = %3d (%c); optind = %d\n", opt, opt, optind);

        switch (opt) {
            case 'p': pstr = optarg;        break;
            case 'x': xnum++;               break;
            case ':': fprintf(stderr, "Missing argument!\n"
                                      "Usage: %s [-p arg] [-x]\n", argv[0]); exit(EXIT_FAILURE);
            case '?': fprintf(stderr, "Unrecognized option!\n"
                                      "Usage: %s [-p arg] [-x]\n", argv[0]); exit(EXIT_FAILURE);
            default:  fprintf(stderr, "Unexpected case in switch()"); exit(EXIT_FAILURE);
        }
    }

    exit(EXIT_SUCCESS);
}
```

## optind
- 表示 argv 中下一個元素的 index，並且在第一次呼叫 getopt 之前將其初始化為 1。
- The caller can reset it to 1 to restart scanning of the same _argv_, or when scanning a new argument vector.
- optarg 是一個外部變數
    - 它指向當前選項字元後面的引數。
    - 如果該選項不包含引數，則將 optarg 設定為零。
    - 下一個程式碼示例顯示如何儲存 optarg 變數指向的引數，然後根據需要對其進行操作。
    - 請注意，引數可以在選項之後而不使用空格分隔符。

### e.g.
```clike
#include <stdio.h>
#include <stdlib.h>
#include <getopt.h>

int main(int argc, char *argv[]) {
    int opt, xnum = 0;
    char *pstr = NULL;

    while ((opt = getopt(argc, argv, ":p:x")) != -1) {
        printf("opt = %3d (%c); optind = %d\n", opt, opt, optind);

        switch (opt) {
            case 'p': pstr = optarg;        break;
            case 'x': xnum++;               break;
            case ':': fprintf(stderr, "Missing argument!\n"
                                      "Usage: %s [-p arg] [-x]\n", argv[0]); exit(EXIT_FAILURE);
            case '?': fprintf(stderr, "Unrecognized option!\n"
                                      "Usage: %s [-p arg] [-x]\n", argv[0]); exit(EXIT_FAILURE);
            default:  fprintf(stderr, "Unexpected case in switch()"); exit(EXIT_FAILURE);
        }
    }

    if (xnum != 0)
        printf("-x was specified (count=%d)\n", xnum);
    if (pstr != NULL)
        printf("-p was specified with the value \"%s\"\n", pstr);
    if (optind < argc)
        printf("First non-option argument is \"%s\" at argv[%d]\n",
               argv[optind], optind);

    exit(EXIT_SUCCESS);
}
```
## reference
- [optind 變數在 C 語言中是如何分配的 | D棧 - Delft Stack](https://www.delftstack.com/zh-tw/howto/c/optind-in-c/)
- [optind(3): Parse options - Linux man page](https://linux.die.net/man/3/optind)
