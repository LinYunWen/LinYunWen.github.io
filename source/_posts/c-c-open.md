---
title: File Open 系列
date: 2021-10-02 21:21:08
tags: [note, c/c++, file, open, fopen, book section]
---

# File Open 系列

## open
> - `#include <fcntl.h>`
- open, openat, creat - open and possibly create a file
```clike
int open(const char *pathname, int flags);
int open(const char *pathname, int flags, mode_t mode);
```
<!--more-->
### 參數
- flags
    - The argument flags must include one of the following access modes: O_RDONLY, O_WRONLY, or O_RDWR.  These request opening the file read-only, write-only, or read/write, respectively.
### return
- On success, open(), openat(), and creat() return the new file descriptor (a nonnegative integer).
- On error, -1 is returned and errno is set to indicate the error.
    - EACCES
### e.g.
```clike
#include<stdio.h>
#include <fcntl.h>
main()
{
int sz;
 
int fd = open("foo.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
if (fd < 0)
{
    perror("r1");
    exit(1);
}
 
sz = write(fd, "hello geeks\n", strlen("hello geeks\n"));
 
printf("called write(% d, \"hello geeks\\n\", %d)."
    " It returned %d\n", fd, strlen("hello geeks\n"), sz);
 
close(fd);
}
```
```clike
#define MAXLEN  1024
int main(void)
{ 
    int ret;
   // char key[17];
    char *p;

    p = (char*)malloc(MAXLEN*(sizeof(char*)));	//申請一塊記憶體，存放讀取資料
    memset(p,0,MAXLEN);

    printf("請輸入一串字元：\n");

    ret = read(0,p,MAXLEN);

    printf("read 函式就可以直接從command line 讀取資料嗎？試一試read到沒！\n");
    printf("下面為定義記憶體資料輸出。。。\n");

    for(int i =0; p[i]!='\n';i++)
    {
        printf("key[%d] = %c\n",i,p[i]);
    }

    printf("試一試write函式~~~\n");
	for(int i =0; p[i] != '\n';i++)
	{
		ret = write(1,&p[i],1);
		printf("\n");
		printf("寫入資料個數：ret = %d\n",ret);
	}
	free(p);
	
}
```
### reference
- [open(2) - Linux manual page](https://man7.org/linux/man-pages/man2/open.2.html)
- [C語言read和write函式解析 - IT閱讀](https://www.itread01.com/content/1542382033.html)
- [Input-output system calls in C | Create, Open, Close, Read, Write - GeeksforGeeks](https://www.geeksforgeeks.org/input-output-system-calls-c-create-open-close-read-write/)
## fopen, fdopen, freopn
> - `#include <stdio.h>`
-  fopen, fdopen, freopen - stream open functions
```clike
FILE *fopen(const char *restrict pathname, const char *restrict mode);
FILE *fdopen(int fd, const char *mode);
FILE *freopen(const char *restrict pathname, const char *restrict mode, FILE *restrict stream);
```
### 參數
- mode
    - r 
    	- Open text file for reading.  The stream is positioned at the beginning of the file.
    - r+
        - Open for reading and writing.  The stream is positioned at the beginning of the file.
    - w
        - Truncate file to zero length or create text file for writing.  The stream is positioned at the beginning of the file.
    - w+
        - Open for reading and writing.  The file is created if it does not exist, otherwise it is truncated.  The stream is positioned at the beginning of the file.
    - a
        - Open for appending (writing at end of file).  The file is created if it does not exist.  The stream is positioned at the end of the file.
    - a+
        - Open for reading and appending (writing at end of file). The file is created if it does not exist.  Output is always appended to the end of the file.  POSIX is silent on what the initial read position is when using this mode. For glibc, the initial file position for reading is at the beginning of the file, but for Android/BSD/MacOS, the initial file position for reading is at the end of the file.
    > - The mode string can also include the letter 'b' either as a last character or as a character between the characters in any of the two-character strings described above.  This is strictly for compatibility with C89 and has no effect; the 'b' is ignored on all POSIX conforming systems, including Linux.  (Other systems may treat text files and binary files differently, and adding the 'b' may be a good idea if you do I/O to a binary file and expect that your program may be ported to non-UNIX environments.)
### return
- Upon successful completion fopen(), fdopen(), and freopen() return a FILE pointer.
- Otherwise, NULL is returned and errno is set to indicate the error.
    - EINVAL The mode provided to fopen(), fdopen(), or freopen() was invalid.

### e.g.
```clike
#include <stdio.h>
#include <stdlib.h>

int main()
{
   FILE * fp;

   fp = fopen ("file.txt", "w+");
   fprintf(fp, "%s %s %s %d", "We", "are", "in", 2012);
   
   fclose(fp);
   
   return(0);
}
```
### note
- The C standard doesn't mention anything about fopening directories.
    > The fopen() function will fail if:
    > […]
    > [EISDIR] The named file is a directory and mode requires write access.
    - [linux - c - fopen opening directories? - Stack Overflow](https://stackoverflow.com/questions/42876210/c-fopen-opening-directories)
### reference
- [fopen(3) - Linux manual page](https://man7.org/linux/man-pages/man3/fopen.3.html)
- [fopen](https://pubs.opengroup.org/onlinepubs/9699919799/functions/fopen.html)
- [fopen() - C語言庫函數 - C語言標準庫](http://tw.gitbook.net/c_standard_library/c_function_fopen.html)
## flags 比較
```
┌─────────────┬───────────────────────────────┐
│fopen() mode │ open() flags                  │
├─────────────┼───────────────────────────────┤
│     r       │ O_RDONLY                      │
├─────────────┼───────────────────────────────┤
│     w       │ O_WRONLY | O_CREAT | O_TRUNC  │
├─────────────┼───────────────────────────────┤
│     a       │ O_WRONLY | O_CREAT | O_APPEND │
├─────────────┼───────────────────────────────┤
│     r+      │ O_RDWR                        │
├─────────────┼───────────────────────────────┤
│     w+      │ O_RDWR | O_CREAT | O_TRUNC    │
├─────────────┼───────────────────────────────┤
│     a+      │ O_RDWR | O_CREAT | O_APPEND   │
└─────────────┴───────────────────────────────┘
```

## File* to fd
> - `#include <stdio.h>`

- obtain file descriptor of a stdio stream
- `int fileno(FILE *stream)`

### return
- On success, fileno() returns the file descriptor associated with stream.
- On failure, -1 is returned and errno is set to indicate the error.
### reference
- [c - How can I convert a file pointer ( FILE* fp ) to a file descriptor (int fd)? - Stack Overflow](https://stackoverflow.com/questions/3167298/how-can-i-convert-a-file-pointer-file-fp-to-a-file-descriptor-int-fd)
- [fileno(3) - Linux manual page](https://man7.org/linux/man-pages/man3/fileno.3.html)