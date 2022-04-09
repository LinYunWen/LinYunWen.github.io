---
title: c string copy
date: 2022-04-07 07:38:21
tags: [note, string, copy, c/c++]
---

# c string copy
## strdup
> - #include <string.h>
> - char *strdup(const char *s1);
<!--more-->
### intro
- return a pointer to a new string, which is a duplicate of the string pointed to by s1. The returned pointer can be passed to free().
- A null pointer is returned if the new string cannot be created.
### return
- return a pointer to a new string on success
- a null pointer and set errno to indicate the error.

### e.g.
```clike
#include <string.h>

const char *stringA = "foo";
char *stringB = NULL;

stringB = strdup(stringA);
/* ... */
free(stringB);    
```
### reference
- [strdup](https://pubs.opengroup.org/onlinepubs/009604599/functions/strdup.html)

## strcpy
> - #include <string.h>
> - char *strcpy(char *restrict s1, const char *restrict s2);
### intro
- you need to allocate space first, which isn't hard to do but can lead to an overflow error, if not done correctly:
### return
- return s1
- no return value is reserved to indicate an error.
### e.g.
```clike
#include <string.h>

const char *stringA = "foo";
char *stringB = NULL;

/* you must add one to cover the byte needed for the terminating null character */
stringB = (char *) malloc( strlen(stringA) + 1 ); 
strcpy( stringB, stringA );
/* ... */
free(stringB);
```
## strncpy
> - #include <string.h>
> - char *strncpy(char *s1, const char *s2, size_t n);
### intro
- copies not more than n bytes (bytes that follow a null byte are not copied) from the array pointed to by s2 to the array pointed to by s1.
- If copying takes place between objects that overlap, the behaviour is undefined.
### return
- returns s1
- no return value is reserved to indicate an error.
### e.g.
```clike
#include <string.h>

const char *stringA = "foo";
char *stringB = NULL;

/* you must add one to cover the byte needed for the terminating null character */
stringB = (char *) malloc( strlen(stringA) + 1 ); 
strcpy( stringB, stringA );
/* ... */
free(stringB);
```
## reference
- [c++ - Proper way to copy C strings - Stack Overflow](https://stackoverflow.com/questions/9593798/proper-way-to-copy-c-strings)