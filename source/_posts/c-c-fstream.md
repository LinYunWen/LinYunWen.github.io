---
title: C++ fstream, ifstream, ofstream
date: 2021-10-20 21:38:45
tags: [note, c/c++, fstream, ifstream, ofstream]
---

# C++ fstream, ifstream, ofstream

## ifstream
- constructor
1. default constructor
    - Constructs an ifstream object that is not associated with any file.
    - Internally, its istream base constructor is passed a pointer to a newly constructed filebuf object (the internal file stream buffer).
2. initialization constructor
    - Constructs an ifstream object, initially associated with the file identified by its first argument (filename), open with the mode specified by mode.
    - Internally, its istream base constructor is passed a pointer to a newly constructed filebuf object (the internal file stream buffer). Then, filebuf::open is called with filename and mode as arguments.
    - If the file cannot be opened, the stream's failbit flag is set.
3. copy constructor (deleted)
    - Deleted (no copy constructor).
4. move constructor
    - Acquires the contents of x.
    - First, the function move-constructs both its base istream class from x and a filebuf object from x's internal filebuf object, and then associates them by calling member set_rdbuf.
    - x is left in an unspecified but valid state.
<!--more-->
## Parameters
- filename
    - A string representing the name of the file to open.
    - Specifics about its format and validity depend on the library implementation and running environment.
- mode
    - Flags describing the requested i/o mode for the file.

| member constant | stands for | access |
| --- | --- | --- |
| in * | **in**put | File open for reading: the _[internal stream buffer](https://www.cplusplus.com/ifstream::rdbuf)_ supports input operations. |
| out | **out**put | File open for writing: the _[internal stream buffer](https://www.cplusplus.com/ifstream::rdbuf)_ supports output operations. |
| binary | **binary** | Operations are performed in binary mode rather than text. |
| ate | **at e**nd | The _output position_ starts at the end of the file. |
| app | **app**end | All output operations happen at the end of the file, appending to its existing contents. |
| trunc | **trunc**ate | Any contents that existed in the file before it is open are discarded. |

- [ifstream::ifstream - C++ Reference](https://www.cplusplus.com/reference/fstream/ifstream/ifstream/)

## open
- Opens the file identified by argument filename, associating its content with the _file stream buffer_ object to perform input/output operations on it. The operations allowed and some operating details depend on parameter mode.  
  
- If the object is already associated with a file (i.e., it is already _[open](https://www.cplusplus.com/filebuf::is_open)_), this function fails.
### parameter
- filename
- mode

### return
- The function returns this if successful.
- In case of failure, the file is not open, and a null pointer is returned.
### reference
- [filebuf::open - C++ Reference](https://www.cplusplus.com/reference/fstream/filebuf/open/)

## is_open
- Check if a file is open
- Returns whether the stream is currently associated to a file.  
- Streams can be associated to files by a successful call to member [open](https://www.cplusplus.com/ifstream::open) or directly on construction, and disassociated by calling [close](https://www.cplusplus.com/ifstream::close) or on destruction.

### reference
- [ifstream::is_open - C++ Reference](https://www.cplusplus.com/reference/fstream/ifstream/is_open/)

## good, fail, bad
- failbit is generally set by an operation when the error is related to the internal logic of the operation itself; further operations on the stream may be possible. While badbit is generally set when the error involves the loss of integrity of the stream, which is likely to persist even if a different operation is attempted on the stream.
- badbit can be checked independently by calling member function [bad](https://www.cplusplus.com/ios::bad):
- Notice that this function is not the exact opposite of [good](https://www.cplusplus.com/ios::good), which checks whether none of the error flags (eofbit, failbit and badbit) are set, and not only badbit:

|iostate value |indicates|good()|eof()|fail()|bad()|rdstate()|
|--- |--- |--- |--- |--- |--- |--- |
|goodbit|No errors (zero value iostate)|true|false|false|false|goodbit|
|eofbit|End-of-File reached on input operation|false|true|false|false|eofbit|
|failbit|Logical error on i/o operation|false|false|true|false|failbit|
|badbit|Read/writing error on i/o operation|false|false|true|true|badbit|



### reference
- [ios::good - C++ Reference](https://www.cplusplus.com/reference/ios/ios/good/)
- [ios::fail - C++ Reference](https://www.cplusplus.com/reference/ios/ios/fail/)
- [ios::bad - C++ Reference](https://www.cplusplus.com/reference/ios/ios/bad/)
## reference
- 