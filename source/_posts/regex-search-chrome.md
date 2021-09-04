---
title: Regex search on webpage in Chrome
date: 2021-09-04 09:25:30
tags: [note, chrome search, regex]
---

# Regex search on webpage in Chrome

## Using Javascript to match regular expressions
- in console log
- `var p=/.*(regu).+?\ /gi; console.log( document.body.innerText.match(p) );`
<!--more-->
## use element text
- in console log
- 在 element 的頁面直接搜尋

## use extension
- [Chrome Regex Search](https://chrome.google.com/webstore/detail/chrome-regex-search/bpelaihoicobbkgmhcbikncnpacdbknn)
    - Keyboard Shortcuts:
        - ENTER: select next regex match
        - SHIFT+ENTER: select previous regex match
    > - To setup a Keyboard Shortcut to open the Popup:
    >     - In your browser, go to chrome://extensions/
    >     * Find 'Chrome Regex Search' and click the box
    >     * Type your custom command (ie CTRL+SHIFT+F) 
    >     * Now whenever, you want to open the popup simply enter your custom command.
- [Regex Search](https://chrome.google.com/webstore/detail/regex-search/bcdabfmndggphffkchfdcekcokmbnkjl)

## reference
- [regex - How can I search for regular expressions within webpages using Google Chrome or IE? - Super User](https://superuser.com/questions/417875/how-can-i-search-for-regular-expressions-within-webpages-using-google-chrome-or/1330795)