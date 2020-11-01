---
title: Git Command
date: 2020-11-01 08:54:12
tags: [note, git]
---

# Git Command

## steps


### push 
1. gti init 
    (new a .git file)
2. git status
    (see what current state of our project)
3. git add [file]
    (add files to to the staging area by using git add)
4. git commit -m [commit name] 
    (put commit into ready status)
5. git log
    (can log like a journal that remember all the changes we have committed so far)
6. git remote add origin [repository URL]
    (before pushing, we need to add a remote repository)
7. git push -u origin master
    (push commit)
<!--more-->
### pull
1. git pull origin master
    (pull down the git)
2. git diff HEAD
    (compare difference of most recent commit)
3. git diff --stage
    (compare the stage)
4. git reset [file]
    (resetting the stage)
5. git checkout -- [file name]
    (file will changed back to how they were a the last commit)

### branch
1. git branch [branch name]
    (new a branch)
2. git checkout [branch name]
    (switch branch)
3. git rm [file name]
    (remove file)
4. git merge [branch name]
    (merge branch)
5. git branch -d [branch name]
    (delete branch)
    
    
    
### commit介紹
一個 commit 在 git repo 中會記錄目錄下所有文件的快照。感覺像是大量的複製和貼上，但 git 的速度更快！

git 希望 commit 儘可能地不占空間，所以每次進行 commit 的時候，它不會單純地複製整個目錄。實際上它把每次 commit 視為從目前的版本到下一個版本的變化量，或者說一個 "（delta）"

### branch介紹
git 的 branch 非常不佔空間。它們只是一個指向某個 commit 的 reference，就這麼簡單。所以許多 git 的愛好者會建議：

**早點建立 branch！經常建立 branch！**

因為建立 branch 不怎麼會佔用到硬碟空間或者是記憶體，所以你可以把你目前的工作分成好幾個 branch，這比只用一個 branch 要來的好。

### merge介紹
**git merge** 是我們要學習 merge 的第一個方法。該 merge 會產生一個特殊的 commit，它包含兩個唯一 parent commit。一個 commit 如果有兩個 parent commit 的話，那就表示：「我想把這兩個 parent commit 本身及它們的 所有的 parent commit 都包含進來。」

### git rebase
rebasing 是 merge branch 的第二種方法。rebasing 就是取出一連串的 commit，"複製"它們，然後把它們接在別的地方。

雖然聽起來難以理解，rebasing 的優點是可以建立更線性的 commit history。假如只允許使用 rebasing 的話，則我們的 repo 中的 commit log 或者是 commit history 會更加簡潔好看。
![](https://i.imgur.com/OK7XeWs.png)


### HEAD
一個指向自己的commit


### ^
向上移動一個parent

### ~數字
向上移動"數字"個parents

### git reset [branch]
git reset 把分支的參考點退回到上一個 commit 來取消修改。你可以認為這是在"重寫歷史"。git reset 往回移動 branch，原來的 branch 所指向的 commit 好像從來沒有存在過一樣。

### git revert [branch]
雖然在你的 local branch 中使用 git reset 很方便，但是這種「改寫歷史」的方法對別人的 remote branch 是無效的哦！所以要使用git revert


### git cherry-pick
當你想要複製幾個 commit 並且接在你目前的位置（HEAD）下面的時候，這會是一個非常直接的方式。我個人非常喜歡用 cherry-pick，因為它並不複雜，很容易就可以了解。


### Reference
- [learn git branch](http://learngitbranching.js.org/)
- [try git](https://try.github.io/levels/1/challenges/1)
- [剛才的 Commit 後悔了，想要拆掉重做…](https://gitbook.tw/chapters/using-git/reset-commit.html)
- [Reset、Revert 跟 Rebase 指令有什麼差別？](https://gitbook.tw/chapters/rewrite-history/reset-revert-and-rebase.html)
- [【狀況題】想要刪除某幾個 Commit 或是調整 Commit 的順序](https://gitbook.tw/chapters/rewrite-history/remove-and-reorder-commit.html)
