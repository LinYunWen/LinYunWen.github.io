---
title: js-string-search
date: 2020-10-20 19:15:20
tags: [note, js-string]
---

# Javascript String Search
- 在 javascript 中 string 的 substring 有三個 `search`、`includes`、`match`
- 看起來功能相似，參數和回傳函數還是有差

## search
- str.search(regexp)
    - 參數是 regular expression
        - 如果不是，則會自動生成 RegExp 物件
    - 回傳搜尋到的 index，如果沒有搜尋到則回傳 -1
    ```javascript
    let str = "hey JudE"
    let re = /[A-Z]/g
    let reDot = /[.]/g
    console.log(str.search(re))    // returns 4, which is the index of the first capital letter "J"
    console.log(str.search(reDot)) // returns -1 cannot find '.' dot punctuation
    ```

## includes
- str.includes(searchString[, position])
    - 參數是字串，以及從第幾個開始
    - 只回傳 true 或 false
    ```javascript
    'Blue Whale'.includes('blue')  // returns false
    ```
    > This method has been added to the ECMAScript 2015 specification and may not be available in all JavaScript implementations yet.
## match
- str.match(regexp)
    - 參數是 regular expression
        - 如果不是，則會自動生成 RegExp 物件
    - 回傳的是一組 array，每一個元素都是符合的字串，如果沒有符合的結果，則是回傳 null

    ```javascript
    var str = "Nothing will come of nothing.";
    str.match();   // returns [""]

    var str = 'For more information, see Chapter 3.4.5.1';
    var re = /see (chapter \d+(\.\d)*)/i;
    var found = str.match(re);

    console.log(found);

    // logs [ 'see Chapter 3.4.5.1',
    //        'Chapter 3.4.5.1',
    //        '.1',
    //        index: 22,
    //        input: 'For more information, see Chapter 3.4.5.1' ]

    // 'see Chapter 3.4.5.1' is the whole match.
    // 'Chapter 3.4.5.1' was captured by '(chapter \d+(\.\d)*)'.
    // '.1' was the last value captured by '(\.\d)'.
    // The 'index' property (22) is the zero-based index of the whole match.
    // The 'input' property is the original string that was parsed.
    ```


## Others
- str.indexOf(searchValue [, fromIndex])
    - 參數是字串，以及從第幾個開始
    - 回傳搜尋到的 index，如果沒有搜尋到則回傳 -1
    ```javascript
    'Blue Whale'.indexOf('Blue')      // returns  0
    'Blue Whale'.indexOf('Blute')     // returns -1
    'Blue Whale'.indexOf('Whale', 0)  // returns  5
    'Blue Whale'.indexOf('Whale', 5)  // returns  5
    'Blue Whale'.indexOf('Whale', 7)  // returns -1
    ```

## Reference
- [String.prototype.search() - MND](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search)
- [String.prototype.includes() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
- [String.prototype.match() - MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [String.prototype.indexOf() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)