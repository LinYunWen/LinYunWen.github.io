---
title: c string array length
date: 2022-01-02 13:57:15
tags: note, c/c++, array length, book section
---

# c string array length

## declare
- 這是有一個 array 有兩個 items 放 char* 的東西
```clike
const char *a[2];
a[0] = "blah";
a[1] = "hmm";

const char *strings[] = {"one","two","three"};
```
<!--more-->
## length
### Using sizeof()
```clike
// Careful though, this works with arrays. It won't work with pointers.
num = sizeof(names) / sizeof(names[0]);
```
- The fact that the strings in the examples are of different length does not matter.
- names is an array of char *, so the total size of the array in bytes is the number of elements in array times the size of each element (i.e. a char *).
- Each of those pointers could point to a string of any length, or to NULL. Doesn't matter.
```clike
#include<stdio.h>

int main(void)
{
    char* names1[]={"A", "B", "C"}; // Three elements
    char* names2[]={"A", "", "C"}; // Three elements
    char* names3[]={"", "A", "C", ""}; // Four elements
    char* names4[]={"John", "Paul", "George", "Ringo"}; // Four elements
    char* names5[]={"", "B", NULL, NULL, "E"}; // Five elements

    printf("len 1 = %zu\n",sizeof(names1)/sizeof(names1[0]));
    printf("len 2 = %zu\n",sizeof(names2)/sizeof(names2[0]));
    printf("len 3 = %zu\n",sizeof(names3)/sizeof(names3[0]));
    printf("len 4 = %zu\n",sizeof(names4)/sizeof(names4[0]));
    printf("len 5 = %zu\n",sizeof(names5)/sizeof(names5[0]));
}

// len 1 = 3
// len 2 = 3
// len 3 = 4
// len 4 = 4
// len 5 = 5
```
### Using pointer arithmetic
```clike
int arrSize = *(&arr + 1) - arr;
```
- (&arr + 1) points to the memory address right after the end of the array.
- *(&arr + 1) simply casts the above address to an int *.
- Subtracting the address of the start of the array, from the address of the end of the array,​ gives the length of the array.

## reference
- [Finding the length of a Character Array in C - Stack Overflow](https://stackoverflow.com/questions/4180818/finding-the-length-of-a-character-array-in-c)
- [Find the number of strings in an array of strings in C - Stack Overflow](https://stackoverflow.com/questions/9522760/find-the-number-of-strings-in-an-array-of-strings-in-c)
- [C sizeof a passed array - Stack Overflow](https://stackoverflow.com/questions/5493281/c-sizeof-a-passed-array)
- [Find the Size of integer array received as an argument to a function in c - Stack Overflow](https://stackoverflow.com/questions/25680014/find-the-size-of-integer-array-received-as-an-argument-to-a-function-in-c)
- [How to find the length of an ​array in C++](https://www.educative.io/edpresso/how-to-find-the-length-of-an-array-in-cpp)
- [c++ - How do I find the length of an array? - Stack Overflow](https://stackoverflow.com/questions/4108313/how-do-i-find-the-length-of-an-array)