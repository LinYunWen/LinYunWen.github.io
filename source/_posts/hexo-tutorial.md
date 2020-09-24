---
title: Hexo Tutorial
date: 2020-09-24 09:04:27
tags: note, hexo, blog
---

# Hexo Tutorial

## blog
> - ref
>     - [個人技術站一把罩！部落格建置大全（一）- 使用 Hexo 搭配 Github Page 建置自己的部落格](https://medium.com/@moojing/%E5%80%8B%E4%BA%BA%E6%8A%80%E8%A1%93%E7%AB%99%E4%B8%80%E6%8A%8A%E7%BD%A9-%E9%83%A8%E8%90%BD%E6%A0%BC%E5%BB%BA%E7%BD%AE%E5%A4%A7%E5%85%A8-%E4%B8%80-%E4%BD%BF%E7%94%A8-hexo-%E6%90%AD%E9%85%8D-github-page-%E5%BB%BA%E7%BD%AE%E8%87%AA%E5%B7%B1%E7%9A%84%E9%83%A8%E8%90%BD%E6%A0%BC-4fe5d02dbbf8)
>     - [建立自己Blog系列(三) Hexo next theme 介紹](https://isdaniel.github.io/hexo-blog-theme/)
>     - [The Top 87 Hexo Theme Open Source Projects](https://awesomeopensource.com/projects/hexo-theme)

<!--more-->

## Basic
- 建立
    ```c
    hexo init name  //初始化新的 Hexo，會在當前路徑建立一個叫 name 的資料夾，資料夾名稱可以隨意取，例如「myblog」，那麼指令就是 hexo init myblog
    cd name  //進入您剛剛建立的 name 資料夾當中，cd 是 change directory 的意思
    npm install  //安裝 Hexo
    npm install hexo-deployer-git --save  //安裝 git 部署套件
    ```
- setting
    ```c
    title: 我的部落格  //輸入部落格標題
    subtitle: 一個抒發本人心情的地方  //輸入副標題
    description:  //輸入網站描述 
    keywords:  //輸入網站關鍵字(以逗號隔開)，方便 SEO 
    author: 王小明  //輸入姓名或暱稱
    language: zh-TW  //輸入您所使用的語言
    timezone:  //留空以使用系統時間
    ```
    
- new post
    ```c
    hexo new [layout] title
    [layout]: post, page, draft
    ```

- deploy
    ```c
    deploy:
      type: git
      repo: https://github.com/username/username.github.io.git
      branch: master
    ```
    ```c
    hexo cl  //清除之前建立的靜態檔案，也可以輸入 hexo clean
    hexo g  //建立靜態檔案，也可以輸入 hexo generate
    hexo d  //部署至 Github Pages，也可以輸入 hexo deploy
    ```

### others
- read more function
    > - [请问如何设置read more?](https://github.com/iissnan/hexo-theme-next/issues/62)
    - native in next theme
        ```yaml
        auto_excerpt:  
            enable: true  
            length: 150
        ```
        - it dose not work
            > - [hexo next auto_excerpt无法使用](https://blog.csdn.net/qq_43011509/article/details/107453071)
    - hexo-excerpt
        > - [hexo-excerpt - github](https://github.com/chekun/hexo-excerpt)
        ```
        excerpt:
          depth: 10
          excerpt_excludes: \[\]
          more_excludes: \[\]
          hideWholePostExcerpts: true
        ```
    - manually add in md
        ```
        <!--more-->
        ```
        
- change Favicon in next
    > - [Customize Favicon for Hexo Blog in Theme NexT](https://jdhao.github.io/2018/02/08/favicon-theme-next-setup/)
    > - [Add Favicon to Hexo Blog](https://stackoverflow.com/questions/30291588/add-favicon-to-hexo-blog)
    - Go the blog root, under the `source` folder, create a folder named `images`. Copy the extracted files to this folder. Then edit the theme NexT configuration file (i.e., `theme/next-new/_config.yml`). Find the part about favicon and use the following settings,
    ```
    favicon:
      small: images/favicon-16x16.png
      medium: images/favicon-32x32.png
      apple_touch_icon: images/apple-icon-180x180.png
      safari_pinned_tab:
      android_manifest: images/manifest.json
      ms_browserconfig: images/browserconfig.xml
    ```
    
### Plugin
- hexo count time
    > - [hexo-symbols-count-time - github](https://github.com/theme-next/hexo-symbols-count-time)
    ```yaml
    symbols_count_time:
      symbols: true
      time: true
      total_symbols: true
      total_time: true
      exclude_codeblock: false
      awl: 4
      wpm: 275
      suffix: "mins."
    ```

- hexo sitemap
    > - [hexo-generator-sitemap - github](https://github.com/hexojs/hexo-generator-sitemap)
    - You can configure this plugin in `_config.yml`.
    ```yaml
    sitemap:
      path: sitemap.xml
      template: ./sitemap_template.xml
      rel: false
      tags: true
      categories: true
    ```

    -   **path** \- Sitemap path. (Default: sitemap.xml)
    -   **template** \- Custom template path. This file will be used to generate sitemap.xml (See [default template](https://github.com/hexojs/hexo-generator-sitemap/blob/master/sitemap.xml))
    -   **rel** \- Add [`rel-sitemap`](http://microformats.org/wiki/rel-sitemap) to the site's header. (Default: `false`)
    -   **tags** \- Add site's tags
    -   **categories** \- Add site's categories

### Trouble shoot


### Reference
- [[教學] Hexo 部落格升級、Next 主題升級、客製功能及樣板編輯全記錄](https://ed521.github.io/2020/05/hexo-next-upgrade/)