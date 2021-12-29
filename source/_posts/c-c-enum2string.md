---
title: enum to string
date: 2021-12-30 07:54:59
tags: [note, c/c++, enum, string, book section]
---

# enum to string
## 使用 switch case
```clike
enum EValue { KZero, KOne, KTwo };

const char* ToString(EValue value)
{
	switch (value) {
	case KZero:
		return "Zero";
	case KOne:
		return "One";
	case KTwo:
		return "Two";
	}
	return "Not Defined";
}
```
<!--more-->
## 使用陣列索引進行查表
```clike
enum EValue { KZero, KOne, KTwo };

const char* ToString(EValue value)
{
	static char *table[] = { "Zero", "One", "Two" };
	return table[value];
}
```

## 使用 X Macro 來實作陣列查表
```clike
#define VALUE_TABLE \
	X(KZero, "Zero") \
	X(KOne, "One") \
	X(KTwo, "Two")

#define X(a, b) a,
enum EValue { VALUE_TABLE };
#undef X

const char* ToString(EValue value)
{
#define X(a, b) b,
	static char *table[] = { VALUE_TABLE };
#undef X
	return table[value];
}
```

```clike
#define FOREACH_FRUIT(FRUIT) \
        FRUIT(apple)   \
        FRUIT(orange)  \
        FRUIT(grape)   \
        FRUIT(banana)  \

#define GENERATE_ENUM(ENUM) ENUM,
#define GENERATE_STRING(STRING) #STRING,

enum FRUIT_ENUM {
    FOREACH_FRUIT(GENERATE_ENUM)
};

static const char *FRUIT_STRING[] = {
    FOREACH_FRUIT(GENERATE_STRING)
};

// After the preprocessor gets done, you'll have:
// enum FRUIT_ENUM {
//     apple, orange, grape, banana,
// };

// static const char *FRUIT_STRING[] = {
//     "apple", "orange", "grape", "banana",
// };
printf("enum apple as a string: %s\n",FRUIT_STRING[apple]);
```

## advanced macro
```clike
enum fruit                                                                   
{
    APPLE = 0, 
    ORANGE, 
    GRAPE,
    BANANA,
    /* etc. */
    FRUIT_MAX
};   

const char * const fruit_str[] =
{
    [BANANA] = "banana",
    [ORANGE] = "orange",
    [GRAPE]  = "grape",
    [APPLE]  = "apple",
    /* etc. */  
};

printf("enum apple as a string: %s\n", fruit_str[APPLE]);
```

## reference

- [[C/C++] enum to string 的方法實作 (X Macro) | Jayce 的共享記憶體](https://blog.jaycetyle.com/2018/09/c-xmacro/)
- [How to convert enum names to string in c - Stack Overflow](https://stackoverflow.com/questions/9907160/how-to-convert-enum-names-to-string-in-c)
- [How do I create an array of strings in C? - Stack Overflow](https://stackoverflow.com/questions/1088622/how-do-i-create-an-array-of-strings-in-c/1095006)