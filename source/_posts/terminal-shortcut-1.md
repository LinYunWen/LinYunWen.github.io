---
title: Terminal Shortcut
date: 2021-08-29 10:02:43
tags: [note, terminal, cli, shortcut]
---

# Terminal shortcut


## CLI shortcut

### move

|Keyboard sequence|Action|
|--- |--- |
|Ctrl+b|Move the cursor back one character.|
|Esc+b or Alt+b|Move the cursor back one word.|
|Ctrl+f|Move the cursor forward one character.|
|Esc+f or Alt+f|Move the cursor forward one word.|
|Ctrl+a|Move the cursor to the beginning of the command line.|
|Ctrl+e|Move the cursor to the end of the command line.|

<!--more-->
### delete
|Keyboard sequence|Action|
|--- |--- |
|Ctrl+h, Delete, or Backspace|Delete the character before the cursor.|
|Ctrl+d|Delete the character at the cursor.|
|Ctrl+k|Delete the all characters from the cursor to the end of the command line, and save it in the cut buffer.|
|Ctrl+u or Ctrl+x|Delete the all characters from the command line, and save it in the cut buffer.|
|Ctrl+w, Esc+Backspace, or Alt+Backspace|Delete the word before the cursor.|
|Esc+d or Alt+d|Delete the word after the cursor.|


### insert
|Keyboard sequence|Action|
|--- |--- |
|Ctrl+y|Insert the most recently deleted text at the cursor.|

### history
|Keyboard sequence|Action|
|--- |--- |
|Ctrl+l|Redraw the current line.|
|Ctrl+p, Esc-P, Up arrow|Scroll backward through the list of recently executed commands.|
|Ctrl+n, Esc-N, Down arrow|Scroll forward through the list of recently executed commands.|
|Ctrl+r|Search the CLI history incrementally in reverse order for lines matching the search string.|
|Esc+/ or Alt+/|Search the CLI history for words for which the current word is a prefix.|
|Esc+. or Alt+|Scroll backward through the list of recently entered words in a command line.|
|Esc+number sequence  or Alt+number sequence|Specify the number of times to execute a keyboard sequence.|



### reference
- [CLI Keyboard Shortcuts - TechLibrary - Juniper Networks](https://www.juniper.net/documentation/en_US/junos/topics/reference/general/junos-cli-keyboard-shortcuts.html)