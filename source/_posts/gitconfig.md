---
title: .gitconfig
date: 2021-07-10 13:47:21
tags: note
---

# .gitconfig
> `~/.gitconfig`
> `git config --list`
## user, email
```
git config --global user.name "Lin Yun Wen"
git config --global user.email l40303k@gmail.com
```
## ssh key

<!--more-->

## difftool
- command
    - `git difftool [<options>] [<commit> [<commit>]] [--] [<path>…​]`
    - `git difftool --tool=vimdiff --no-prompt`

- set diff tool with vim
    ```
    git config --global diff.tool vimdiff
    git config --global difftool.prompt false
    git config --global alias.d difftool
    ```
> ```
> Git accepts kdiff3, tkdiff, meld, xxdiff, emerge, vimdiff, gvimdiff, ecmerge, and opendiff as valid diff tools. You can also set up a custom tool. 
>
> git config --global diff.tool vimdiff>
> git config --global diff.tool kdiff3>
> git config --global diff.tool meld>
> git config --global diff.tool xxdiff>
> git config --global diff.tool emerge>
> git config --global diff.tool gvimdiff>
> git config --global diff.tool ecmerge
> ```

### vimdiff
```
dp - diffput: puts changes under the cursor into the other file making them identical (thus removing the diff).
do - diffget: (o => obtain). The change under the cursor is replaced by the content of the other file making them identical.

]c - Jump to the next change.
[c - Jump to the previous change.
Ctrl W + Ctrl W - Switch to the other split window.
:diffupdate – diff update
:syntax off – syntax off
zo – open folded text
zc – close folded text
```

## alias
`git config alias.lg 'log --all --decorate --oneline --graph'`
```
[alias]
 st = status
 co = checkout
 br = branch
 cm = commit
 au = add --update
 cmi = commit -m "init"
 cmu = commit -m "update"
 cmf = commit -m "fixup"
 cmt = commit -m "temp"
 cmam = commit --amend
 ls = ls-files
 glog = log --oneline --graph --decorate
```
```
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```
- remove
    - `git config --global --unset alias.co`

## Reference
- [使用 vimdiff 來呈現 Git diff 差異](https://blog.longwin.com.tw/2009/11/vimdiff-vs-git-diff-2009/)
- [Viewing all \`git diffs\` with vimdiff](https://stackoverflow.com/questions/3713765/viewing-all-git-diffs-with-vimdiff)
- [git difftool - git](https://git-scm.com/docs/git-difftool)
- [Git config 推薦設定方式](https://shengyu7697.github.io/git-config/)
- [git 的縮寫 alias](https://sean22492249.medium.com/git-%E5%B8%B8%E7%94%A8%E7%9A%84%E7%B8%AE%E5%AF%AB-git-al-585560c64a9)