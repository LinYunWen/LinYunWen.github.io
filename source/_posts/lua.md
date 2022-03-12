---
title: lua
date: 2022-03-12 22:37:27
tags: [note, lua]
---

# Lua

## io.popen v.s. io.execute
### io.popen (prog [, mode])
- This function is system dependent and is not available on all platforms.
- Starts program prog in a separated process
- returns a file handle that you can use to read data from this program (if mode is "r", the default) or to write data to this program (if mode is "w").
- 如果失敗會直接中斷 program
#### mode
* The mode string can be any of the following:
    * "r": read mode (the default);
    * "w": write mode;
    * "a": append mode;
    * "r+": update mode, all previous data is preserved;
    * "w+": update mode, all previous data is erased;
    * "a+": append update mode, previous data is preserved, writing is only allowed at the end of file.
#### e.g.
```lua
local handle = io.popen("echo hello")
-- local file = assert(io.popen('/bin/ls -la', 'r'))
local result = handle:read("*a")
handle:close()
```
### os.execute ([command])
* This function is equivalent to the ISO C function system.
* It passes command to be executed by an operating system shell.
* Its first result is true if the command terminated successfully, or nil otherwise. After this first result the function returns a string and a number, as follows:
    * "exit": the command terminated normally; the following number is the exit status of the command.
    * "signal": the command was terminated by a signal; the following number is the signal that terminated the command.
* When called without a command, os.execute returns a boolean that is true if a shell is available.

### diff
- The difference between the **os.execute()** function and the **io.popen()** function is that the output value of the **os.execute()** function is much harder to deal with, and that is the reason why it is recommended to use the **io.popen()** function, whose output value is much easier to handle and make use of.

### reference
- [io.popen() function in Lua Programming](https://www.tutorialspoint.com/io-popen-function-in-lua-programming)
- [Lua 5.2 Reference Manual](https://www.lua.org/manual/5.2/manual.html#pdf-io.popen)
- [Lua 5.2 Reference Manual](https://www.lua.org/manual/5.2/manual.html#pdf-os.execute)
- [io.popen - how to wait for process to finish in Lua? - Stack Overflow](https://stackoverflow.com/questions/5239317/io-popen-how-to-wait-for-process-to-finish-in-lua)
## error throw

### assert (v [, message])
- Issues an error when the value of its argument `v` is false (i.e., **nil** or **false**); otherwise, returns all its arguments. `message` is an error message; when absent, it defaults to "assertion failed!"
#### e.g.
```lua
local function add(a,b)
   assert(type(a) == "number", "a 不是一個數字")
   assert(type(b) == "number", "b 不是一個數字")
   return a+b
end
add(10)

lua: test.lua:3: b 不是一個數字
stack traceback:
    [C]: in function 'assert'
    test.lua:3: in local 'add'
    test.lua:6: in main chunk
    [C]: in ?
```

### error (message [, level])
- Terminates the last protected function called and returns message as the error message.
- Function error never returns.
- Usually, error adds some information about the error position at the beginning of the message, if the message is a string.
- The level argument specifies how to get the error position.
    - With level 1 (the default), the error position is where the error function was called.
    - Level 2 points the error to where the function that called error was called; and so on.
    - Passing a level 0 avoids the addition of error position information to the message.
    > - Level參數指示獲得錯誤的位置：
    > * Level=1[默認]：爲調用error位置(文件+行號) 
    > * Level=2：指出哪個調用error的函數的函數
    > * Level=0:不添加錯誤位置信息
:::danger
- if you need to catch errors in Lua, you can use pcall or xpcall to call a given function in protected mode.
:::
### pcall (f [, arg1, ···])
* Calls function f with the given arguments in protected mode.
* This means that any error inside f is not propagated; instead, pcall catches the error and returns a status code.
* Its first result is the status code (a boolean), which is true if the call succeeds without errors. In such case, pcall also returns all results from the call, after this first result.
* In case of any error, pcall returns false plus the error message.
#### e.g.
```lua
function foo ()
    ...
  if unexpected_condition then error() end
    ...
  print(a[i])    -- potential error: `a' may not be a table
    ...
end
if pcall(foo) then
  -- no errors while running `foo'
  ...
else
-- `foo' raised an error: take appropriate actions
  ...
end
```
```lua
local status, err = pcall(function () error({code=121}) end)
print(err.code)  -->  121
```
```lua
local a = pcall(function(i) print(i) end, 33)
print(a) --true

local b = pcall(function(i) print(i) error('error..') end, 33)
print(b)  --false
local i, v = pcall(function (i) return i end, 33)
print(i, v) --打印出i爲true v爲33

local i, v = pcall(function (i) end, 33)
print(i, v) --打印出i爲true v爲nil
```
### xpcall (f, msgh [, arg1, ···])
- This function is similar to pcall, except that it sets a new message handler msgh.

#### e.g.
```lua
function myfunction ()
   n = n/nil
end

function myerrorhandler( err )
   print( "ERROR:", err )
end

status = xpcall( myfunction, myerrorhandler )
print( status)

-- 
ERROR:	test2.lua:2: attempt to perform arithmetic on global 'n' (a nil value)
false
```
### reference
- [Lua 5.2 Reference Manual](https://www.lua.org/manual/5.2/manual.html#pdf-assert)
- [lua中的錯誤處理(assert、error、pcall、xpcall、debug) - 台部落](https://www.twblogs.net/a/5d3f3782bd9eee51fbf8fe9d)
- [Lua - Error Handling](https://www.tutorialspoint.com/lua/lua_error_handling.htm)
- [Lua 5.2 Reference Manual](https://www.lua.org/manual/5.2/manual.html#pdf-xpcall)

## . v.s. :
> - 這兩種形式是有區別的，區別很大，但只有一個。
```lua
mSprite.setPosition(100, 20);
mSprite:setPosition(100, 20);
```
* 冒號的作用就是：
    * 定義函數時，給函數的添加隱藏的第一個參數self；
    * 調用函數時，默認把當前調用者作為第一個參數傳遞進去。
* 使用了冒號之後，就相當於我們剛剛使用點號時一樣，只是我們不再需要顯式地定義self參數以及主動地傳遞who參數。
### e.g.
```lua
girl = {money = 200}
function girl.goToMarket(girl ,someMoney)
	girl.money = girl.money - someMoney
end
girl.goToMarket(girl ,100)
print(girl.money)
```
```lua
boy = {money = 200}
function boy.goToMarket(self ,someMoney)
	self.money = self.money - someMoney
end
boy:goToMarket(100)
print(boy.money)
```
```lua
boy = {money = 200}
function boy:goToMarket(someMoney)
	self.money = self.money - someMoney
end
boy:goToMarket(100)
print(boy.money)
```
### reference
- [Lua中調用函數使用點號和冒號的區別 - IT閱讀](https://www.itread01.com/content/1499074818.html)
- [理解lua 语言中的点、冒号与self_继续沉淀！-CSDN博客_lua 冒号](https://blog.csdn.net/wangbin_jxust/article/details/12170233)