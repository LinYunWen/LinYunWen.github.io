---
title: C/C++ f 系列
date: 2021-10-04 07:53:45
tags: note, c/c++, fget, fopen, fclose, book section
---

# C/C++ f 系列

## fopen

## fgetc
> - `#include <stdio.h>`
```clike
int fgetc(FILE *stream);
char *fgets(char *s, int size, FILE *stream);
int getc(FILE *stream);
int getchar(void);
char *gets(char *s);
int ungetc(int c, FILE *stream);
```
<!--more-->
- fgetc()
    - get a byte from a stream
    - reads the next character from stream and returns it as an unsigned char cast to an int, or EOF on end of file or error.
* getc()
    * is equivalent to fgetc() except that it may be implemented as a macro which evaluates stream more than once.
* getchar()
    * is equivalent to getc(stdin).
* gets()
    * reads a line from stdin into the buffer pointed to by s until either a terminating newline or EOF, which it replaces with a null byte (aq\0aq).
    * No check for buffer overrun is performed (see BUGS below).
* fgets()
    * reads in at most one less than size characters from stream and stores them into the buffer pointed to by s.
    * Reading stops after an EOF **or a newline**.
    * If a newline is read, it is stored into the buffer. A terminating null byte (aq\0aq) is stored after the last character in the buffer.
* ungetc()
    * pushes c back to stream, cast to unsigned char, where it is available for subsequent read operations. Pushed-back characters will be returned in reverse order; only one pushback is guaranteed.
### param

- fgets
    - str -- 這是字符串讀取存儲的字符數組的指針。
    - n -- 這是最大的被讀取的字符數（包括最後的空字符）。通常情況下，通過使用str是數組的長度。 
    - stream -- 這是一個文件對象標識流中讀取字符的指針。
### return
- fgetc(), getc() and getchar()
    - character read as an unsigned char cast to an int or EOF on end of file or error.
- gets() and fgets()
    - return s on success
    - NULL on error or when end of file occurs while no characters have been read.
- ungetc()
    - c on success, or EOF on error.

### e.g.
```clike
#include <stdio.h>

int main()
{
   FILE *fp;
   char str[60];

   /* opening file for reading */
   fp = fopen("file.txt" , "r");
   if(fp == NULL) {
      perror("Error opening file");
      return(-1);
   }
   if( fgets (str, 60, fp)!=NULL ) {
      /* writing content to stdout */
      puts(str);
   }
   fclose(fp);
   
   return(0);
}
```
### reference
- [fgetc(3p) - Linux manual page](https://man7.org/linux/man-pages/man3/fgetc.3p.html)
- [fgetc(3): input of char/strings - Linux man page](https://linux.die.net/man/3/fgetc)
- [fgets() - C語言庫函數 - C語言標準庫](http://tw.gitbook.net/c_standard_library/c_function_fgets.html)
- [fgetc() - C語言庫函數 - C語言標準庫](http://tw.gitbook.net/c_standard_library/c_function_fgetc.html)


## clearerr, feof, ferror, fileno
> - `#include <stdio.h>`
- check and reset stream status
```clike
void clearerr(FILE *stream);
int feof(FILE *stream);
int ferror(FILE *stream);
int fileno(FILE *stream);
```
* clearerr()
	- clears the end-of-file and error indicators for the stream pointed to by stream.
* feof()
	* tests the end-of-file indicator for the stream pointed to by stream, returning nonzero if it is set. The end-of-file indicator can only be cleared by the function clearerr().
* ferror()
	* tests the error indicator for the stream pointed to by stream, returning nonzero if it is set. The error indicator can only be reset by the clearerr() function.
* fileno()
	* examines the argument stream and returns its integer descriptor.

### param
- stream -- 這是一個文件 FILE 對象的標識流的指針。
### return
- feof
    - 這個函數返回一個非零值時，與該流關聯的文件結束指示器設置
    - 否則返回零。

### e.g.
```clike
#include <stdio.h>

int main ()
{
   FILE *fp;
   int c;
   int n = 0;
  
   fp = fopen("file.txt","r");
   if(fp == NULL) 
   {
      perror("Error in opening file");
      return(-1);
   }
   while(!feof(fp))
   {
      c = fgetc(fp);
      printf("%c", c);
   }
  
   fclose(fp);
   
   return(0);
}
```

### reference
- [feof() - C庫函數 - C語言標準庫](http://tw.gitbook.net/c_standard_library/c_function_feof.html)
- [feof(3): check/reset stream status - Linux man page](https://linux.die.net/man/3/feof)
## fclose
> - `#include <stdio.h>`
- flushes the stream pointed to by stream (writing any buffered output data using fflush(3))
- closes the underlying file descriptor.
### return
- Upon successful completion, 0 is returned.
- Otherwise, EOF is returned and errno is set to indicate the error.
    - In either case, any further access (including another call to fclose()) to the stream results in undefined behavior.

### reference
- [fclose(3) - Linux manual page](https://man7.org/linux/man-pages/man3/fclose.3.html)
- [fclose() - C庫函數 - C語言標準庫](http://tw.gitbook.net/c_standard_library/c_function_fclose.html)