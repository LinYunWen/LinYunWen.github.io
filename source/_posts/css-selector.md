---
title: CSS Selector
date: 2021-11-20 11:29:42
tags: [note, css, selector, book section]
---

# CSS Selector

## 相連、space、, 的差別
```
.one .two{}    /*兩個 class 中有空格*/
.one.two{}     /*兩個 class 中沒有空格*/
.one, .two{}   /*兩個 class 中出現逗號*/
```
<!--more-->
* 第一個的 one 和 two 中間沒有包含空格
    * 某個區塊必須同時具有 one 和 two 的 class 時，才能被 CSS 所選擇到。
* 第二個的 one 和 two 中間包含空格
    * 我必須要是在 one 裡面的 two，才會被選擇到。
    * 反之 .two .one，中間同樣有空格的話，指的是 two 裡面又包含 one
* 第三個的 one 和 two 中間包含逗號
    *  class 中有 one 或 two，都會被編輯器所選擇到。
## >
- 目標必須是直系後代，親生子女才可以，也就是說，必須剛好就在下一層，才會獲選。
## ~
- ~ 與 + 這兩個符號都是目標都在選取同一個層級的HTML標籤
## +
- + 這個符號，也是選取同階層的目標，只是目標更限縮了，不是弟弟妹妹都行，而是排行剛好就在其後的大弟或大妹才擁有套用樣式的資格。

## reference
- [[技術分享] CSS中的多重選擇器（Multiple Selectors）包含空白或逗號 ~ PJCHENder 那些沒告訴你的小細節](https://pjchender.blogspot.com/2015/03/cssmultiple-selectorsspace.html)
- [CSS組合選擇器中的符號：5個選擇器符號功用介紹](https://selflearningsuccess.com/css-combinators/)