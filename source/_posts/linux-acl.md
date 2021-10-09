---
title: linux acl
date: 2021-10-09 16:45:26
tags: [note, ACL, linux, book section]
---

# Access Control List (ACL)
- ACL 是 Access Control List 的縮寫，主要的目的是在提供傳統的 owner,group,others 的 read,write,execute 權限之外的細部權限設定。
- ACL 可以針對單一使用者，單一檔案或目錄來進行 r,w,x 的權限規範，對於需要特殊權限的使用狀況非常有幫助。
<!--more-->
## introduction
- 每一個（檔案系統內的）物件對應一個串列主體。存取控制串列由存取控制條目（access control entries，ACE）組成。存取控制串列描述使用者或系統行程對每個物件的存取控制權限。
- 存取控制串列的主要缺點是不可以有效迅速地枚舉一個物件的存取權限。因此，要確定一個物件的所有存取權限需要搜尋整個存取控制串列來找出相對應的存取權限。
- 由於Linux POSIX ACL 預設是關閉，因此需要透過檔案系統的啟用才能用此功能
    ```clike
    ubuntu@ubuntu:~$ vim /etc/fstab                                  #編輯/etc/fstab
    LABEL=cloudimg-rootfs   /home        ext4   defaults,acl  0 0    #於defaults後加入acl 
    ubuntu@ubuntu:~$ sudo mount -o remount /home                     #重新掛載
    ubuntu@ubuntu:~$ cat /etc/mtab                                   #查看ACL是否已啟用
    /dev/sda1 / ext4 rw,acl 0 0                                      #ACL已啟用
    ```
### 基本權限
- 三種 owner, group, others 對應 read, write, execute
> - 如果有一個目錄底下有一堆人要使用，每個人或群組所需要的權限每個都不一樣，而基本的權限管理只有檔案擁有者、群組、其他人，沒辦法針對 aming 這個單一用戶設定權限，因此就有以下的 ACL 概念。

### ACL
- ACL 的控制權
    -   使用者(user):針對使用者設定權限
    -   群組(group):針對群組設定權限
    -   預設屬性(mask):該目錄新建檔案/目錄時，規範新資料的預設權限。

- 檢查 ACL
    ```clike
    dmesg | grep -i acl
    ```
- 設定 ACL
    - setfacl
        - 選項與參數：
            * -m ：設定後續的 acl 參數給檔案使用，不可與 -x 合用；
            * -x ：刪除後續的 acl 參數，不可與 -m 合用；
            * -b ：移除『所有的』 ACL 設定參數；
            * -k ：移除『預設的』 ACL 參數，關於所謂的『預設』參數於後續範例中介紹；
            * -R ：遞迴設定 acl ，亦即包括次目錄都會被設定起來；
            * -d ：設定『預設 acl 參數』的意思！只對目錄有效，在該目錄新建的資料會引用此預設值
            * 
        - 我們來針對特定使用者 aming 來設定權限 r,x，一開始先建一個檔案並檢視其一般權限。
            ```clike
            root$> touch test
            root$> ll test
            -rw-r--r-- 1 root root 0 八 07 08:07 test
            ```
        - 接下來使用 ACL 權限設定:
            ```clike
            setfacl -m u:aming:rx test
            ll test
            ```
        - 接下來檔案權限會變成這樣:
            ```clike
            -rwxr-xr--+ 1 root root 0 八 07 08:07 test
            ```
        - 我們來比較一下兩個檔案權限，會發現差了一個 \+ 號還有 owner 的 x、group 的 x。
        - 移除所有ACL權限：`setfacl -b 檔案／目錄`
    - getfacl
        - 這樣就會列出詳細資訊，其中最重要的
            ```clike
            getfacl test
            # file: test     #檔案名稱
            # owner: ubuntu  #檔案擁有者
            # group: ubuntu  #檔案擁有群組
            user::rw-        #擁有者權限
            group::rw-       #擁有群組權限
            other::r--       #其他使用者權限
            ```
        - 凸顯了透過 AC　使 aming 和其他使用者權限的產生差異。
    - 針對特定群組
        ```clike
        root$> setfacl -m g:groooop:wx test
        getfacl test
        ```
        - 一樣我們看群組的欄位：
        ```clike
        group::r--
        group:groooop:wx
        ```

## reference
- [[筆記]Linux-Access Control List(ACL) @ David Liao's Blog :: 痞客邦 ::](https://david50.pixnet.net/blog/post/45269868-%5B%E7%AD%86%E8%A8%98%5Dlinux-access-control-list(acl))
- [[Day 10] Linux 細部權限 ACL - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10221185)
- [鳥哥的 Linux 私房菜 -- 第十三章、Linux 帳號管理與 ACL 權限設定](http://linux.vbird.org/linux_basic/0410accountmanager.php#acl_talk_what)
- [存取控制串列 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%AD%98%E5%8F%96%E6%8E%A7%E5%88%B6%E4%B8%B2%E5%88%97)