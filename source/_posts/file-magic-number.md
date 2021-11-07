---
title: Linux File Magic Number
date: 2021-11-07 09:15:28
tags: [note, linux, file, magic number, file signatures]
---

# Linux File Magic Number
> - `file <file_name>`
> - magic numbers are usually stored in (linux) `/usr/share/file/magic`
- also File Signatures, Magic Bytes
- A magic number is a numeric or string constant that indicates the file type.
- This number is in the first 512 bytes of the file.
    - Originally, this term was used for a specific set of 2-byte identifiers at the beginnings of files, but since any binary sequence can be regarded as a number, any feature of a file format which uniquely distinguishes it can be used for identification
- By default the localized magic file /usr/lib/locale/locale/LC_MESSAGES/magic is used to identify files that have a magic number.
    - If a localized magic file does not exist, the /etc/magic file is utilized.
<!--more-->
## get magic number of file
- `xxd image.png | head`
    - ![](https://i.imgur.com/UqEuHAc.png)


## reference
- [unix - How to get magic number of a binary file - Stack Overflow](https://stackoverflow.com/questions/2147484/how-to-get-magic-number-of-a-binary-file)
- [What is a magic number?](https://www.ibm.com/support/pages/what-magic-number)
- [Working with Magic numbers in Linux - GeeksforGeeks](https://www.geeksforgeeks.org/working-with-magic-numbers-in-linux/)
- [List of file signatures - Wikipedia](https://en.wikipedia.org/wiki/List_of_file_signatures)