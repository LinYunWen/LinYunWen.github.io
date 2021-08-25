---
title: mv advice
date: 2021-08-25 08:12:39
tags: note, linux, mv, advice
---

# mv advice

- [不好意思 很基礎的問題 請問一下有關 mv 的指令? [論壇 - Ubuntu安裝問題] | Ubuntu 正體中文站](http://www.ubuntu-tw.org/modules/newbb/viewtopic.php?viewmode=compact&topic_id=36216&forum=1)
    - 以檔案為單位，複製成功之後刪除
    - 
    - mv應該不會複製檔案喔  
    * 是直接更改inode，所以速度很快  
    * 也因此不能跨partition

    - 是不跨partition時是只改inode,所以是瞬間完成  
    - 跨partition就是要搬過去了...會比較慢  
    - 不過也是成功後才砍檔案

    - 或是早期版本不能跨partition，造成我有這個印象，所以現在跨partition搬移我都不用mv  
    - 我指的早期版本是slackware 4.0之前的版本mv的運作方式
<!--more-->
- [filesystems - When we use mv command, what changes take place in HDD? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/48086/when-we-use-mv-command-what-changes-take-place-in-hdd)
    - It's up to each filesystem how to handle a move within the filesystem (also known as renaming a file), but filesystems pretty much universally handle it by updating directory entries without moving the inode or file contents.
    - A move between filesystems (it doesn't matter if it's on the same physical medium or not) is handled as a file copy followed by a delete. This is in fact exactly what the `mv` command does. Obviously that means that the destination filesystem has to make a new copy of the file.

    ```
    As the rename(2) call does not work across file systems, mv uses cp(1) and rm(1) to
    accomplish the move.  The effect is equivalent to:

       rm -f destination_path && \
       cp -pRP source_file destination && \
       rm -rf source_file
    ```

- [linux - How to move from one filesystem to another without changing directory structure? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/283998/how-to-move-from-one-filesystem-to-another-without-changing-directory-structure)
    - In most cases, you wouldn't move the files from one filesystem to another. If you're enlarging the disk in a virtual machine or grabbing more space from the same disk, you'd enlarge the partition containing the filesystem then enlarge the filesystem to fill the partition (which commands to use depends on the partition type and filesystem type)

- [mv Command - IBM Documentation](https://www.ibm.com/docs/en/aix/7.2?topic=m-mv-command)
    - When you move a file, all links to other files remain intact, except when you move it to a different file system
    - You can use the **mv** command to move files within the same file system or between file systems. Whether you are working in one file system or across file systems, the **mv** command copies the file to the target and deletes the original file

- [mv(1p) - Linux manual page](https://man7.org/linux/man-pages/man1/mv.1p.html)
    - The _rename_() function is able to move directories within the same
       file system. Some historical versions of _mv_ have been able to
       move directories, but not to a different file system.  The
       standard developers considered that this was an annoying
       inconsistency, so this volume of POSIX.1‐2017 requires
       directories to be able to be moved even across file systems.
       There is no **-R** option to confirm that moving a directory is
       actually intended, since such an option was not required for
       moving directories in historical practice. Requiring the
       application to specify it sometimes, depending on the
       destination, seemed just as inconsistent. The semantics of the
       _rename_() function were preserved as much as possible. For
       example, _mv_ is not permitted to ``rename'' files to or from
       directories, even though they might be empty and removable.

       Historic implementations of _mv_ did not exit with a non-zero exit
       status if they were unable to duplicate any file characteristics
       when moving a file across file systems, nor did they write a
       diagnostic message for the user. The former behavior has been
       preserved to prevent scripts from breaking; a diagnostic message
       is now required, however, so that users are alerted that the file
       characteristics have changed.

       The exact format of the interactive prompts is unspecified. Only
       the general nature of the contents of prompts are specified
       because implementations may desire more descriptive prompts than
       those used on historical implementations. Therefore, an
       application not using the **-f** option or using the **-i** option relies
       on the system to provide the most suitable dialog directly with
       the user, based on the behavior specified.

       When _mv_ is dealing with a single file system and _source_file_ is a
       symbolic link, the link itself is moved as a consequence of the
       dependence on the _rename_() functionality, per the DESCRIPTION.
       Across file systems, this has to be made explicit.
