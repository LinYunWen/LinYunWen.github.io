---
title: 5 Linux Shell Tricks
date: 2021-08-02 21:40:05
tags: [note, linux]
---

# 5 Linux Shell Tricks
> - https://youtu.be/V8EUdia_kOE

- [1:04](https://www.youtube.com/watch?v=V8EUdia_kOE&t=64s) sudo !! - re-run previous command with 'sudo' prepended
- [1:53](https://www.youtube.com/watch?v=V8EUdia_kOE&t=113s) ctrl-k, ctrl-u, ctrl-w, ctrl-y - cutting and pasting text in the command line
    - ctrl+k 刪除後面的文字
    - ctrl+u 刪除前面的文字
    - ctrl+y 貼上剛才刪除的文字
    - ctrl+w 刪除一個字 (word)
- [4:04](https://www.youtube.com/watch?v=V8EUdia_kOE&t=244s) use 'less +F' to view logfiles, instead of 'tail' (ctrl-c, shift-f, q to quit)
    - 在 less +F 的狀況下按下 ctrl+c 可以直接瀏覽檔案，就不用在 vim
    - shift+f 退出 ctrl+c 的環境
    - q 退出 less +F 的環境
- [6:25](https://www.youtube.com/watch?v=V8EUdia_kOE&t=385s) ctrl-x-e - continue editing your current shell line in a text editor (uses $EDITOR)
- [7:54](https://www.youtube.com/watch?v=V8EUdia_kOE&t=474s) alt-. - paste previous command's argument (useful for running multiple commands on the same resource) [9:18](https://www.youtube.com/watch?v=V8EUdia_kOE&t=558s) reset - resets/unborks your terminal

