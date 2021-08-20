---
title: terminal-color
date: 2021-08-20 20:17:07
tags: [color, terminal, linux]
---

# Terminal Color
![](https://i.imgur.com/n1tXG8c.png)
## 
而 ESC 是一個 Escape character，一般 bash 中有三種方式可以編碼

-   Shell: `\e`
    
-   ASCII Hex: `\0x1B`
    
-   ASCII Oct: `\033`
而 ESC 輸出通常會表示為 `^[` 或 `<ESC>`
<!--more-->

## Control Sequence Introducer
這是 Escape Sequences 的第一個部分，由 ESC character 和一個 \[ 組成
## Color codes
這是 Escape Sequences 的第二個部分

前面控制顏色，後面控制格式
這是 Escape Sequences 的第二個部分

前面控制顏色，後面控制格式

**Color**

| code | color |
| --- | --- |
| 30 | Black |
| 31 | Red |
| 32 | Green |
| 33 | Yellow |
| 34 | Blue |
| 35 | Magenta |
| 36 | Cyan |
| 37 | White |

**Format**

| code | format |
| --- | --- |
| 1 | **bold** |
| 2 | dim |
| 3 | _italics_ |
| 4 | _underline_ |
| 7 | Background |

## Finishing symbol

這是 Escape Sequences 的第三個部分

m character 表示這個 Escape Sequences 至此結束

## reset
需要注意的是當設了Escape Sequences，後面的文字皆會受其影響

若要只對特定文字設置，在文字後需要再以 `\x1b[0m` 將配置清空


## reference
- [[*nix] Colors in Terminal [資訊人筆記]](https://www.kshuang.xyz/doku.php/operating_system:nix_colors_in_terminal)