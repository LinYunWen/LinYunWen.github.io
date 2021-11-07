---
title: Vim Plugin
date: 2021-10-23 13:34:09
tags: [note, vim, plugin]
---

# Vim Plugin

## management
### [vim-plug](https://github.com/junegunn/vim-plug)
- Download plug.vim and put it in the "autoload" directory.
    - `curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim`
- .vimrc
    ```clike
    call plug#begin('~/.vim/plugged')
    Plug 'plugin'
    call plug#end()
    ```
- install
    ```clike
    // 先退出 vim 再進去執行 :PluginInstall
    // or
    vim +PluginInstall +qall
    ```
<!--more-->
### NeoBundle

- install
    ```clike
    // 先退出 vim 再進去執行 :PluginInstall
    // or
    vim +PluginInstall +qall
    ```
### [Vundle](https://github.com/VundleVim/Vundle.vim)
- `git clone https://github.com/gmarik/vundle.git ~/.vim/bundle/vundle`

- .vimrc
    ```clike
    filetype off " required

    " set the runtime path to include Vundle and initialize
    set rtp+=~/.vim/bundle/Vundle.vim
    call vundle#begin()
    " alternatively, pass a path where Vundle should install plugins
    "call vundle#begin('~/some/path/here')

    " let Vundle manage Vundle, required
    Plugin 'VundleVim/Vundle.vim'

    " The following are examples of different formats supported.
    " Keep Plugin commands between vundle#begin/end.
    " plugin on GitHub repo
    Plugin 'tpope/vim-fugitive'
    " plugin from http://vim-scripts.org/vim/scripts.html
    " Plugin 'L9'
    " Git plugin not hosted on GitHub
    Plugin 'git://git.wincent.com/command-t.git'
    " git repos on your local machine (i.e. when working on your own plugin)
    Plugin 'file:///home/gmarik/path/to/plugin'
    " The sparkup vim script is in a subdirectory of this repo called vim.
    " Pass the path to set the runtimepath properly.
    Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
    " Install L9 and avoid a Naming conflict if you've already installed a
    " different version somewhere else.
    " Plugin 'ascenator/L9', {'name': 'newL9'}

    " All of your Plugins must be added before the following line
    call vundle#end() " required
    filetype plugin indent on " required

    ```
- install
    ```clike
    // 先退出 vim 再進去執行 :PluginInstall
    // or
    vim +PluginInstall +qall
    ```
#### reference
- [Vundle：Vim Plugin 自動下載、安裝、更新與管理工具（Vim Bundle） - G. T. Wang](https://blog.gtwang.org/linux/vundle-vim-bundle-plugin-manager/)

## other commands
```clike
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
```

## spelling
### [Spelunker.vim](https://github.com/kamykn/spelunker.vim)
- `Plug 'kamykn/spelunker.vim'`
#### setting
- `set nospell`
#### options
```clike
" Enable spelunker.vim. (default: 1)
" 1: enable
" 0: disable
let g:enable_spelunker_vim = 1

" Enable spelunker.vim on readonly files or buffer. (default: 0)
" 1: enable
" 0: disable
let g:enable_spelunker_vim_on_readonly = 0

" Check spelling for words longer than set characters. (default: 4)
let g:spelunker_target_min_char_len = 4

" Max amount of word suggestions. (default: 15)
let g:spelunker_max_suggest_words = 15

" Max amount of highlighted words in buffer. (default: 100)
let g:spelunker_max_hi_words_each_buf = 100

" Spellcheck type: (default: 1)
" 1: File is checked for spelling mistakes when opening and saving. This
" may take a bit of time on large files.
" 2: Spellcheck displayed words in buffer. Fast and dynamic. The waiting time
" depends on the setting of CursorHold `set updatetime=1000`.
let g:spelunker_check_type = 1

" Highlight type: (default: 1)
" 1: Highlight all types (SpellBad, SpellCap, SpellRare, SpellLocal).
" 2: Highlight only SpellBad.
" FYI: https://vim-jp.org/vimdoc-en/spell.html#spell-quickstart
let g:spelunker_highlight_type = 1

" Option to disable word checking.
" Disable URI checking. (default: 0)
let g:spelunker_disable_uri_checking = 1

" Disable email-like words checking. (default: 0)
let g:spelunker_disable_email_checking = 1

" Disable account name checking, e.g. @foobar, foobar@. (default: 0)
" NOTE: Spell checking is also disabled for JAVA annotations.
let g:spelunker_disable_account_name_checking = 1

" Disable acronym checking. (default: 0)
let g:spelunker_disable_acronym_checking = 1

" Disable checking words in backtick/backquote. (default: 0)
let g:spelunker_disable_backquoted_checking = 1

" Disable default autogroup. (default: 0)
let g:spelunker_disable_auto_group = 1

" Create own custom autogroup to enable spelunker.vim for specific filetypes.
augroup spelunker
  autocmd!
  " Setting for g:spelunker_check_type = 1:
  autocmd BufWinEnter,BufWritePost *.vim,*.js,*.jsx,*.json,*.md call spelunker#check()

  " Setting for g:spelunker_check_type = 2:
  autocmd CursorHold *.vim,*.js,*.jsx,*.json,*.md call spelunker#check_displayed_words()
augroup END

" Override highlight group name of incorrectly spelled words. (default:
" 'SpelunkerSpellBad')
let g:spelunker_spell_bad_group = 'SpelunkerSpellBad'

" Override highlight group name of complex or compound words. (default:
" 'SpelunkerComplexOrCompoundWord')
let g:spelunker_complex_or_compound_word_group = 'SpelunkerComplexOrCompoundWord'

" Override highlight setting.
highlight SpelunkerSpellBad cterm=underline ctermfg=247 gui=underline guifg=#9e9e9e
highlight SpelunkerComplexOrCompoundWord cterm=underline ctermfg=NONE gui=underline guifg=NONE
```

#### others
- Add words to spellfile
```clike
" Add selected word to spellfile
" zg =>
Zg

" zw =>
Zw

" zug =>
Zug

" zuw =>
Zuw

" Add selected word to the internal word list
" zG =>
ZG

" zW =>
ZW

" zuG =>
ZUG

" zuW =>
ZUW
```
- Jump cursor to misspelled words.
```clike
" Jump cursor to next misspelled words.
ZN
" Jump cursor to previous misspelled words.
ZP
```

#### reference
- [kamykn/spelunker.vim: Improved vim spelling plugin (with camel case support)!](https://github.com/kamykn/spelunker.vim)
## reference
- 