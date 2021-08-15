---
title: pam
date: 2021-08-15 13:44:05
tags: [note, linux, pam]
---

# PAM (Pluggable Authentication Modules)
- 它通過提供一些動態鏈接庫和一套統一的API，將系統提供的服務 和該服務的認證方式分開，使得系統管理員可以靈活地根據需要給不同的服務配置不同的認證方式而無需更改服務程序，同時也便於向系 統中添加新的認證手段。
- 在以前 Unix-like 系統每個程式都有屬於自己一套的驗證方式.現在將這些驗證集中起來管理就叫做 PAM(Pluggable Authentication Modules)，而 PAM 是一種認證(authentication)和授權(authorization)的架構.任正式證實你的身份過程,而授權是依據使用者身份來決定是否有權限存取系統的過程
<!--more-->
## introduction
![](https://i.imgur.com/a5dOpWo.png)
> - PAM服務模塊（service module）的開發者則利用PAM SPI（Service Module API）來編寫認證模塊（主 要是引出一些函數pam\_sm\_xxxx( )供libpam調用），將不同的認證機制（比如傳統的UNIX認證方法、Kerberos等）加入到系統中；PAM核 心庫（libpam）則讀取配置文件，以此為根據將服務程序和相應的認證方法聯繫起來。

### PAM的文件：
* /usr/lib/libpam.so.* PAM核心庫
* /etc/pam.conf或者/etc/pam.d/ PAM配置文件
* /usr/lib/security/pam_*.so 可動態加載的PAM service module
* 對於RedHat，其目錄不是/usr/lib，而是/lib。

### PAM的配置：
- PAM的配置是通過單個配置文件/etc/pam.conf。
- RedHat還支持另外一種配置方式，即通過配置目錄/etc/pam.d/，且這種的優先級要高於單個配置文件的方式。
#### 使用配置文件/etc/pam.conf
> - 該文件是由如下的行所組成的：`service-name module-type control-flag module-path arguments`
- service-name
    - 服務的名字，比如telnet、login、ftp等，服務名字「OTHER」代表所有沒有在該文件中明確配置的其它服務。
- module-type
    - 模塊類型有四種：auth、account、session、password，即對應PAM所支持的四種管理方式。同一個服務可以調用多個 PAM模塊進行認證，這些模塊構成一個stack。
- control-flag
    - 用來告訴PAM庫該如何處理與該服務相關的PAM模塊的成功或失敗情況。
    - 它有四種可能的 值：required，requisite，sufficient，optional。
- module-path
    - 用來指明本模塊對應的程序文件的路徑名，一般採用絕對路徑，如果沒有給出絕對路徑，默認該文件在目錄/usr/lib/security下 面。
- arguments
    - 是用來傳遞給該模塊的參數。一般來說每個模塊的參數都不相同，可以由該模塊的開發者自己定義，但是也有以下幾個共同 的參數：
        - debug 該模塊應當用syslog( )將調試信息寫入到系統日誌文件中。
        - no_warn 表明該模塊不應把警告信息發送給應用程序。
        - use_first_pass 表明該模塊不能提示用戶輸入密碼，而應使用前一個模塊從用戶那裡得到的密碼。
        - try_first_pass 表明該模塊首先應當使用前一個模塊從用戶那裡得到的密碼，如果該密碼驗證不通過，再提示用戶輸入新的密碼。
        - use_mapped_pass 該模塊不能提示用戶輸入密碼，而是使用映射過的密碼。
        - expose_account 允許該模塊顯示用戶的帳號名等信息，一般只能在安全的環境下使用，因為洩漏用戶名會對安全造成一定程度的威 脅。

#### 使用配置目錄/etc/pam.d/（只適用於RedHat Linux）
> - 對於同一個設定寫在前面的優先
- 該目錄下的每個文件的名字對應服務名，例如ftp服務對應文件/etc/pam.d/ftp。
    - 如果名為xxxx的服務所對應的配置文件/etc/pam.d/xxxx不存 在，則該服務將使用默認的配置文件/etc/pam.d/other。
    - 每個文件由如下格式的文本行所構成：`module-type control-flag module-path arguments` 每個字段的含義和/etc/pam.conf中的相同。

### 密碼映射（password-mapping）
- 密碼映射允許用戶在不同的認證機制下使用不同的密碼，其中有一個主密碼（primary password），其它密碼為次密碼（secondary passwords，可能有多個）。主密碼用來對次密碼進行加密。在主密碼認證通過後，認證模塊利用主密碼將加密過的次密碼（也稱為 mapped password）解密，並對次密碼進行認證。
> - 如果使用了一次性密碼的機制，就不使用密碼映射。
- 所有服務模塊必須支持如下4個映射選項（在第四部分已經簡單解釋過）：
    1. use_first_pass
        - 這個選項指示本模塊不能提示用戶輸入密碼，而是使用已有的密碼，即從第一個向用戶提示輸入密碼的模塊那裡取得密碼，並對該密碼進 行認證。
    2. try_first_pass
        - 這個選項指示本模塊首先嘗試使用已有的密碼，即從第一個向用戶提示輸入密碼的模塊那裡取得密碼，並對該密碼進行認證。如果密碼認 證失敗，則再提示用戶輸入密碼。
    3. use_mapped_pass
        - 這個選項指示本模塊不能向用戶提示輸入密碼，而應使用映射過的密碼，即利用主密碼將加密過的次密碼解密出來並進行認證。
    4. try_mapped_pass
        - 這個選項指示本模塊首先嘗試使用映射過的密碼，即利用主密碼將加密過的次密碼解密出來並進行認證。如果密碼認證失敗，則再提示用 戶輸入密碼。

- **PAM 優點如下:**
    -   **為多種程式提共單一的驗證機制(Authentication scheme)**
    -   **提供給管理者以及程式設計者單一彈性的管理方式**
    -   **讓程式設計者不需再對身份密碼再做額外的處理**
- **PAM 其主要有三項功能**
    -   **可動態載入函數庫( libraries )**
    -   **安全機制集中管理**
    -   **配置檔在載入時才生效**
- **PAM 相關的設定檔**  
    - **所有的函數庫( libraries )存在 /lib/sercurity 目錄下 .說明檔 /usr/share/doc/pam-xxx/html/index.html**
    > - note:其中的 xxx 是目前你使用的 PAM 版本.
- **log 存在 /var/log/security or /var/log/message  

> - 而設定檔存放在 /etc/pam.d 目錄下,函數庫 libraries 也有相對應的參考檔存放在 /etc/security 目錄下**.

## config
> - vi /etc/pam.d/login
- 每一行的格式為 `module-type    Control flags    module-path   arguments`
    - modules-type:
        -   **auth:表示驗證類模組**  
            - 主要是依據使用者密碼或特殊方式來做驗證機制,如群組成員身分(group memberships)和獲得 kerberos 的證明書.
        -   **account:表示帳戶類模組**  
            - 限制或禁止使用者的存取機制(可依據使用者的登入使用時間,來源等…),亦可對使用者的密碼檢查是否過期.
        -   **password:表示密碼類模組**  
            - 可以讓使用者去更改,設定,驗證密碼
        -   **session:表示類模組**  
            - 執行環境的設定,如 /dev/fd0 的 owner 是依據誰掛載時決定.
    - Control flags
        > - [required、Requisite、sufficient 或 optional]
            -   **required**  
                - 所有的 required libraries 回傳值要為 pass ,最後的結果才會為 pass ,但 required libraries 的結果並不會影響到下一個  libraries 是否執行. 因為 PAM 並不立刻將錯誤消息返回給應用程式,而是在所有模組都作完畢後才將錯誤消息返回它的程式。
            -   **Requisite**  
                - 它與 required 相仿,只有帶此標記的模組返回成功後,用戶才能通過鑒別,不同之處在於其一旦失敗就不再執行堆中後面的其他模組,並且鑒別過程到此結束.
            -   **sufficient**  
                - 如果一個 sufficient library 回傳值為 pass .那麽PAM便立即向應用程式返回成功而不必嘗試接下來的其他模組.如果一個 sufficient library 回傳值為 faile 那接下來的 subsequent libraries 就需再做了,但這個 fail 不會影響到整體的 pass / faile (也就是說當標記爲 sufficient 的模組 Faile 時,sufficient模組當做 optional 對待.
            -   **optional**  
                - 在PAM體系中,帶有該標記的模組失敗後將繼續處理下一模組.(也就是 option libraries 的 pass /fail 皆不會影響到最後的結果.)
    - module-path
        - 也就是 module 所在的路徑位址.
    - **arguments**  
        - 在這裡可以將參數傳送給前面指定的 module.可以看到我們都是使用相同的一個模組 pam_unix.so ,至於 pam_unix.so 會做哪些事情,請參考說明檔 /usr/share/doc/pam-xxx/html/index.html 的說明(其中的 xxx 是目前你使用的 PAM 版本).
### example
```clike
[root@benjr ~]# cat  /etc/pam.d/login
auth        sufficient    /lib/security/$ISA/pam_unix.so likeauth nullok
password    sufficient    /lib/security/$ISA/pam_unix.so nullok use_authtok md5 shadow
account     required      /lib/security/$ISA/pam_unix.so
session     required      /lib/security/$ISA/pam_unix.so
```
> - pam_unix.so 是一個比較複雜的模組,它可以同時應用在 PAM 的 4 個驗證方式:
- **auth        sufficient    /lib/security/$ISA/pam_unix.so likeauth nullok**  
    - pam_unix.so 的 auth 主要會依據 /etc/nsswitch.conf 來決定身分驗證的方式,有可能為 files(本機 /etc/passwd 檔案) ldap(透過 LDAP server) winbind(透過 Windows AD server) 等不同方式來認證(suthentication).
    - **參數 likeauth nullok**
        -   **likeauth**  
            The likeauth argument makes the module return the same value when called as a credential setting module and an authentication module. This will help libpam take a sane path through the auth component of your configuration file.(這邊我還是看不太懂他的意思)
        -   **nullok**  
            系統預設不能將登入時密碼設定為空白,當使用參數 nullok 時就允許登入時密碼為空白.
- **password    sufficient    /lib/security/$ISA/pam\_unix.so nullok use\_authtok md5 shadow**  
    - pam_unix.so 的 password 主要的工作是讓可以更新使用者的密碼.如果沒有了這一行使用者將無法更改密碼.
    - **參數nullok use_authtok md5 shadow**
        -   **nullok**  
            系統預設不能將密碼修改為空白,當使用參數 nullok 時就密碼修改成空白.
        -   **use_authtok**  
            use the authentication token previously obtained by another that did the conversation with the application. If this token can not be obtained then the module will try to converse again. This option can be used for stacking different modules that need to deal with the authentication tokens.(這邊我還是看不太懂他的意思)
        -   **md5**  
            密碼將採用 md5 的方式加密.關於 md5 請參考 [PKI(Public Key Infrastructure)](http://benjr.tw/310)中的 md5 說明
        -   **shadow**  
            密碼將跟使用者資料分開存放至 /etc/shadow 除了可以在這邊設定 md5 , shadow 外,還可以使用 Rehat 提供的工具 authconfig 可設定這兩個選項(1.Use Shadow Passwords, 2.Use MD5 Passwords)來決定是否使用 ms5 以及 shadow.
- **account     required      /lib/security/$ISA/pam_unix.so**  
    - 系統會依據 /etc/shadow 的參數 : expire; last\_change; max\_change; min\_change; warn\_change,來確定使用者的帳號以及密碼是否有效並且尚未到期.
- **session     required      /lib/security/$ISA/pam_unix.so**
    - 會讓系統在建立完連線(session) 後會用 syslog 來記錄登入的使用者期間所做的事件.你每次登入時就可以看到 /var/log/message 中會多出類似下面這一項紀錄  
    ```
    Aug 29 00:50:51 dexter sshd(pam_unix)\[6321\]: session opened for user root by (uid=0)  
    所以如果你移除這一項系統就不會與使用者來建立連線了,你此時就無法登入系統,並且會得到如下的訊息在 /var/log/message.  
    Aug 29 00:50:46 dexter sshd(pam_unix)\[6321\]: authentication failure; logname= uid=0 euid=0 tty=NODEVssh ruser= rhost=192.168.0.5  user=root
    ```

## PAM API
### 框架API：
- 任何一個支持PAM的服務程序在進行認證時必須以pam_start( )開始進行初始化，最後以pam_end( )結束以便進行清理工作。

### 認證管理API：
- pam_authenticate( )對用戶名/密碼進行認證。
- pam_setcred( )用來修改用戶的秘密信息。

### 帳戶管理API：
- pam_acct_mgmt( )檢查帳戶本身是否有權限登錄系統、帳戶是否過期、帳戶是否有登錄時間限制等。

### 密碼管理API：
- pam_chauthtok( )修改用戶的密碼。

### 會話管理API：
- 一個會話以pam_open_session( )開始，最後以pam_close_session( )結束。

### 其它：
- pam_get_item( )、pam_set_item( )用來讀寫PAM事務(transaction)的狀態信息。
- pam_get_data( )、pam_set_data( )用來取得和設置PAM模塊及會話的相關信息。
- pam_putenv( )、pam_getenv( )、pam_getenvlist( )用來讀寫環境變量。
- pam_strerror( )返回相關的錯誤信息。

## PAM SPI
- 當服務程序（ftpd、telnetd等）調用PAM API函數pam_xxx( )時，由PAM 框架（libpam）根據該服務在/etc/pam.conf文件中的配置調用指定的PAM模塊中對應的SPI函數pam_sm_xxx()。
- API函數的名字為pam_xxx( )，對應的SPI函數的名字為pam_sm_xxx( )，即每個服務模塊需要引出相應的函數以供libpam調用。為方便對照，再列一下。

### API 對應的 SPI
- 帳號管理 pam_acct_mgmt( )、 pam_sm_acct_mgmt( )
- 認證管理 pam_authenticate( )、 pam_sm_authenticate( )
- 密碼管理 pam_chauthtok( )、 pam_ sm_chauthtok( )
- 會話管理 pam_open_session( )、 pam_sm_open_session( )
- 會話管理 pam_close_session( )、 pam_sm_close_session( )
- 認證管理 pam_setcred( )、 pam_sm_setcred( )

## 常用的PAM服務模塊

| **PAM 模組** | **用途說明** |
| ----- | ----- |
| pam_access | 利用 /etc/security/access.conf檔案並依據帳號、IP位址、網域名稱、網路卡號或終端機等方式來限制使用者或群組登入 |
| pam_cracklib | 可用來規範及檢查密碼的字元組成與長度，做為密碼檢查器以避免使用者選擇簡單、容易猜測的密碼 |
| pam_deny | pam_deny模組用來拒絕所有存取，主要是用來定義系統存取的預設原則(Default Policy) |
| pam_env | 用以建立使用者登入的預設環境，例如可定義使用者系統環境變數PATH需包含那個目錄，pam\_env模組使用 /etc/security/pam\_env.conf 建立變數。 |
| pam_limits | 模組透過組態檔  /etc/security/limits.conf to來限制使用者所使用的資源，包括限制允許的最大檔案大小、最大允許開啟的檔案、CPU時間、處理程序數量、最大允許登入次數。 |
| pam_mail | 檢查使用者的郵件目錄是否有新郵件，通常用於使用者登入系統 |
| pam_mkhomedir | 當使用者第一次登入系統時，若沒有家目錄存在可利用pam_mkhomedir模組來自動建立家目錄，本模組也可以確保/etc/skel目錄下的檔案被拷貝到家目錄，這個模組在使用者經由NIS或LDAP的網路環境下驗證時特別有用，可集中使用者家目錄於NFS目錄下。 |
| pam_nologin | 當/etc/nologin檔案存在時，除了root之外，沒有任何人可以登入，適用於管理員維護系統時使用。 |
| pam_permit | 這是最不安全的PAM模組，不論誰登入，它永遠允許存取，通常只使用在測試用途上。 |
| pam_pwcheck | 當使用者變更密碼時，此模組會執行額外的檢查工作，包括密碼最短長度，不能使最近用過的數次密碼，也經常與pam_cracklib搭配使用。 |
| pam_rootok | pam_rootok模組授予使用者無需輸入密碼就可以存取。例如su程式利用此模組來讓root可以su到任何使用者帳戶，而無需輸入使用者密碼。 |
| pam_securetty | pam_securetty模組利用 /etc/securetty檔案來控制root可以登入的TTY，這主要是應用於較早的UNIX時期，root經常利用不加密的telnet登入而造成安全性問題所設計的模組，如此可避免oot帳戶經由特定主控台或網路登入。 |
| pam_tally | 用以維護企圖存取系統的次數，所以可以讓管理員拒絶過多次企圖存取失敗者。 |
| pam_time | pam_time模組利用/etc/security/time.conf檔案來限制使用者登入系統的時間，您也可以限制使用者登入時可以存取的服務或特定的TTY。 |
| pam_unix | 這是一個相當重要的PAM模組，用來轉送經由/etc/passwd和 /etc/shadow檔案的驗證請求。使用nullok和try\_first\_pass參數可允許使用空白密碼以及當密碼請求再度出現時可以嘗試使用先前用過的密碼來加以驗證。 |
| pam_warn | 用以記錄有用的錯誤訊息，可記錄有關於驗證和密碼修改的訊息，通常與pam_deny模組搭配以記錄使用者企圖連到系統的資訊。 |
| pam_wheel | 此模組利用 /etc/pam.d/su 檔案設定只允許 wheel 群組的成員，可以執行 su 指令來切換成其他使用者的身份。 |



## reference
- [簡介PAM驗證模組(Introduction to Pluggable ... - 傲笑紅塵路](https://www.lijyyh.com/2012/06/pam.html)
- [Linux – PAM 初解 – Benjr.tw](http://benjr.tw/291)
- [PAM入門介紹 @ Amin's Note :: 痞客邦 ::](https://lagunawang.pixnet.net/blog/post/5206841-pam%E5%85%A5%E9%96%80%E4%BB%8B%E7%B4%B9)
- [Linux – PAM 初解 – Benjr.tw](http://benjr.tw/291)
