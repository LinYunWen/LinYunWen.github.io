---
title: Buffer to string
date: 2020-10-15 20:49:21
tags: note, buffer, node
---

# Buffer to string
## Introduction
- 在 node 中網路傳輸、讀存取檔案經常是使用 buffer，但是在查看時都要經過轉換，文件上也沒有寫很清楚，所以才特別紀錄
- 基本上 buffer 是處理 binary 相對方便
- 他是類似 array 的狀態，每一個值代表一個 byte，所以在十進位中其值為 0~255
```javascript
var buff = Buffer.from([1, 2, 3]);
var buff = Buffer.from('hello world', 'utf8');
```
> - `new Buffer(array)` is deprecated
> - use `Buffer.from(array)` instead
<!--more-->
### toString
- 基本上跟 c 語言很像， character 和數字是相關的，可以互相轉換
- 可以利用 `.toString([encoding[, start[, end]]])` 
    - 預設 encoding 是 `utf8`
        | Encoding | Description |
        | --- | --- |
        | 'ascii' | for 7 bit ASCII data only. This encoding method is way fast, but is limited to the ascii character set. To convert a null character into 0x00, you should use 'utf8'. |
        | 'utf8' | Multibyte encoded Unicode characters. It has become the dominant character encoding for the world wide web. |
        | 'utf16le' | 2 or 4 bytes, little-endian encoded Unicode characters, surrogate pairs (U+10000 to U+10FFFF) are supported. |
        | 'ucs2' | Alias of 'utf16le'. |
        | 'base64' | Base64 string encoding. |
        | 'binary' | Method of encoding raw binary data into strings by using only the first 8 bits of each character. This encoding method is deprecated. |
        | 'hex' | This method is used to encode each byte as two hexadecimal characters. |
    - start 是起始位置
    - end 是終止位置
```javascript
const buf1 = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97 is the decimal ASCII value for 'a'.
  buf1[i] = i + 97;
}
console.log(buf1.toString('utf8'));
// Prints: abcdefghijklmnopqrstuvwxyz
console.log(buf1.toString('utf8', 0, 5));
// Prints: abcde
```
## Reference
- [Using Buffers in Node.js](https://www.w3resource.com/node.js/nodejs-buffer.php)
- [Buffer - Node.js v14.13.1 Documentation](https://nodejs.org/api/buffer.html)
- [List of encodings that Node.js supports](https://stackoverflow.com/questions/14551608/list-of-encodings-that-node-js-supports)