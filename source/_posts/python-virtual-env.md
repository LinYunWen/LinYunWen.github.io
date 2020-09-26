---
title: Python Virtual Environment
date: 2020-09-26 21:20:36
tags: note, python, conda
---

# Python Virtual Environment
> - 各個專案可以控制自己的套件
>     - 不同版本的環境，不互相影響
>     - 有獨立的環境
> - 套件版本升級不會影響到其他專案
> - 在沒有權限的情況下安裝新套件
>     - 像是在 server 上安裝環境，沒有 root 權限

<!--more-->

## Python Virtenv
### Installation
- `pip3 install virtualenv`

### Common Commands
```c
// 建立虛擬環境
virtualenv -p {PATH_TO_PYTHON} {ENV_NAME}

// 啟動虛擬環境
source plusoneEnv/bin/activate

// 退出虛擬環境
deactivate
```

### Reference
- [[Day 02] 用Virtual Environment吧！](https://ithelp.ithome.com.tw/articles/10202335?sc=iThelpR)


## Pipenv
> - 只需要 pipenv，不需要再分別使用 pip 跟virtualenv 。
> - 自動產生與更新Pipfile and Pipfile.lock 解決了維護 requirements.txt 的問題。
> - 透過套件的 Hash 安全性檢查確認 （當安裝套件 hash 值不同時，跳出錯誤，防止惡意套件侵入）
>     - 但是這個也是最常出錯的部分，並且會增加安裝時間
> - 可以透過.env 自動載入不同環境變數。
> - [[Pipenv 更簡單、更快速的 Python 套件管理工具](https://medium.com/@chihsuan/pipenv-%E6%9B%B4%E7%B0%A1%E5%96%AE-%E6%9B%B4%E5%BF%AB%E9%80%9F%E7%9A%84-python-%E5%A5%97%E4%BB%B6%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7-135a47e504f4)]


### Installation
- `pip3 install pipenv`

### Common Commands
- basic
```c
// 檢視版本
pipenv --version
```
- env
```c
// 產生 Python 3 虛擬環境
pipenv --three
// 產生 Python 2 虛擬環境
pipenv --two
pipenv --python={VERSION}

// 進入虛擬環境中
pipenv shell
// 刪除此虛擬環境
pipenv --rm
```
- package
```c
pipenv install {PACKAGENAME}
pipenv install {PACKAGENAME} --dev  // development 環境
pipenv uninstall request
```
- others
```c
// 根據 virtualenv 執行相關 python 指令 （不進入虛擬環境中）
pipenv run python test.py
```

### Reference
- [Pipenv - Github](https://github.com/pypa/pipenv)
- [Pipenv 更簡單、更快速的 Python 套件管理工具](https://medium.com/@chihsuan/pipenv-%E6%9B%B4%E7%B0%A1%E5%96%AE-%E6%9B%B4%E5%BF%AB%E9%80%9F%E7%9A%84-python-%E5%A5%97%E4%BB%B6%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7-135a47e504f4)
- [Pipenv指令大全](https://medium.com/@johnnyellisjohnny/pipenv%E6%8C%87%E4%BB%A4%E5%A4%A7%E5%85%A8-6e4415cc8a15)


## Anaconda
> - 可以建立不僅 python 套件的環境
>     - 其他像是 cuda 等等
>     - 但是環境需要的空間會很大

### Installation
- [Installation - Anaconda Docs](https://docs.anaconda.com/anaconda/install/)
### Common Commands
- basic
```c
conda --version
// 清理環境中 unused packages and zip/tar files
conda clean --all
```
- env
```c
// 建立新的工作環境且指定 Python 版本
conda create --name {ENVIRONMENT} python={MAIN.MINOR.PATCH}

// clone a one env
conda create --name new_name --clone old_name

// create the env by yml
conda env create -f {FILE}

// update the env by yml
conda env update --file env.yml

// 檢視電腦中的虛擬環境
conda env list

// 啟動虛擬環境
conda activate {ENVIRONMENT}

// 回到 base 工作環境
conda deactivate

// 將虛擬環境的設定匯出為 .yml 檔
conda env export --name {ENVIRONMENT} --file {ENVIRONMENT}.yml

// 移除虛擬環境
conda env remove --name {ENVIRONMENT}
```
- package
```c
// 更新指定套件
conda update {PACKAGE_NAME}

// 檢視虛擬環境安裝的套件清單
conda list --{ENVIRONMENT}

// 在目前的虛擬環境安裝指定套件
conda install {PACAKGE_NAME}={MAJOR.MINOR.PATCH}

// 在目前的虛擬環境移除指定套件
conda remove {PACKAGE_NAME}
```
### Reference
- [Anaconda Offical Website](https://www.anaconda.com/)
- [Anaconda Documents](https://docs.anaconda.com/)
- [輕鬆學習 Python：conda 的核心功能](https://medium.com/datainpoint/python-essentials-conda-quickstart-1f1e9ecd1025)