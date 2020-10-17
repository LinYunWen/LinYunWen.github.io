---
title: Set Github SSH
date: 2020-10-14 23:01:01
tags: [git, ssh]
---

# Set Github SSH

## gen ssh key
```
$ ssh-keygen -t rsa -C "email@example.com"
Generating public/private rsa key pair.  
Enter file in which to save the key (/home/linyunwen/.ssh/id_rsa):  
Enter passphrase (empty for no passphrase):  
Enter same passphrase again:  
Your identification has been saved in /home/linyunwen/.ssh/id_rsa  
Your public key has been saved in /home/linyunwen/.ssh/id_rsa.pub  
The key fingerprint is:  
SHA256:2JmjfMInqjqXcEzoacXw7k9E0mH6SloJ4oDwnHqGu3U [email@gmail.com](mailto:email@gmail.com)  
The key's randomart image is:  
+---\[RSA 3072\]----+  
|. o                |  
|o+ .+ .            |  
...
|o+ooE.* o          |  
|.ooo.. =           |  
|o+..o.             |  
+----\[SHA256\]-----+  

$ ssh-add ~/.ssh/id_rsa  
Identity added: /home/linyunwen/.ssh/id_rsa ([email@gmail.com](mailto:email@gmail.com))  

$ cat ~/.ssh/id_rsa.pub  
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCoOPC42DxzQaFjuRD4cZd5dzhRHzqnFBEVqCKKVpNfw8wLa2EncAewptfKdr56vObVtMAfntkzVlMFBLGf...PK3zYpKkXQS2ga4SgzM+HNQUQJKnv+Y7s9NegHd27KJFkkOm6fxzv3rruWNZi4fJPbXqtZZYqAVtK9ObrNoG9cAqOLSBEg2Nx5Ihyf+cHB2MC8t0QWNiP6PVfFCpft0AT5Gdn0LuierAxjCOWqCSK5HtH8= [email@gmail.com](mailto:email@gmail.com)
```
<!--more-->

## set ssh on github or gitlab
### github
- go to github setting
- click `SSH and GPG keys` on the left bar
- click new ssh key
- paste the output of `~/.ssh/id_rsa.pub` on it
- ![](https://i.imgur.com/RaIH7nv.png)

### gitlab
- go to gitlab setting
- click `SSH keys` on the left bar
- click new ssh key
- paste the output of `~/.ssh/id_rsa.pub` on it
- ![](https://i.imgur.com/Pfa1mam.png)


## Test on computer
```
$ ssh -T git@github.com
Hi LinYunWen! You've successfully authenticated, but GitHub does not provide shell access.

$ ssh -T git@gitlab.com
The authenticity of host '[gitlab.com](http://gitlab.com/) (172.65.251.78)' can't be established.  
ECDSA key fingerprint is SHA256:HbW3g8zUjNSksFbqTiUWPWg2Bq1x8xdGUrliXFzSnUw.  
Are you sure you want to continue connecting (yes/no/\[fingerprint\])?  yes
Warning: Permanently added 'gitlab.com,172.65.251.78' (ECDSA) to the list of known hosts.  
Welcome to GitLab, @LinYunWen!

```

## Reference
- [GitHub 設定指引](http://wiki.csie.ncku.edu.tw/github)