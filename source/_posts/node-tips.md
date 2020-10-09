---
title: Nodejs Tips
date: 2020-10-09 21:13:49
tags: note, nodejs, tips
---

# Nodejs Tips

## Child Process
### exec, spawn
> - 是從 child_process 中出來
> - 要記得字串會先被 escape 一次

<!--more-->
- exec
    - 基本上就是將字串以指令的方式執行
    - 會將輸出暫存在 buffer 中，所以他跟 spawn 的差數中多了 `maxBuffer` ，即為設定要暫存的大小
    - 可以設定 cwd 和是否要用 shell 執行
    - return ChildProcess Object
    - 有 sync 版本
    - 並用一個 callback 將 error, stdout, stderr 做傳出
    ```javascript
    const { exec } = require('child_process');
    exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
    ```
    ```javascript
    exec('"/path/to/test file/test.sh" arg1 arg2');
    // Double quotes are used so that the space in the path is not interpreted as
    // a delimiter of multiple arguments.

    exec('echo "The \\$HOME variable is $HOME"');
    // The $HOME variable is escaped in the first instance, but not in the second.
    ```
- execFile
    - 跟 `exec` 差不多，就是用 file 做 stdin
- spawn
    - 基本上就是將字串以指令的方式執行，但是跟 `exec` 的差異比較像是這會給定參數
    - 可以設定 cwd 和是否要用 shell 執行
    - return ChildProcess Object
    - 有 sync 版本
    - 利用事件的方式將 stdout, sterr 做輸出，因此沒有 `maxBuffer`
    ```javascript
    const { spawn } = require('child_process');
    const ls = spawn('ls', ['-lh', '/usr']);

    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    ```

## Path
### path.join, path.resolve
- path.join()
    - params 是多個路徑，他會將其進行串接整理並輸出符合 os 的對應相對路徑
    - 如果沒有輸入任何路徑的話，則輸出當前的相對位置
    - 可以利用 `..`, `.` 來進行溝通
    ```javascript
    path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
    // '/foo/bar/baz/asdf'
    path.join()
    // '.'
    ```
- path.resolve()
    - 跟 join 很像，params 是多個路徑，將其進行串接整理並輸出符合 os 的對應**絕對**路徑
    - 方便在變更 current work directory 上
    ```javascript
    path.resolve('/foo/bar', './baz');
    // '/foo/bar/baz'
    path.resolve('/foo/bar', '/tmp/file/');
    // '/tmp/file'
    path.resolve()
    // '/Users/linyunwen'
    ```

### __dirname, process.cwd(), os.homedir()
- 在 node 中
    - __dirname 
        - 是該執行檔案的位置
        - 不能變更
    - process.cwd()
        - 其實就是 current work directory
        - 通常會跟 __dirname 在相同位置
        - 可以利用 `process.chdir(${path})` 來進行變更
    - os.homedir()
        - 家目錄的位置
            - On POSIX, it uses the $HOME environment variable if defined. Otherwise it uses the effective UID to look up the user's home directory.
            - On Windows, it uses the USERPROFILE environment variable if defined. Otherwise it uses the path to the profile directory of the current user.

## Reference
- [OS - Node.js v14.13.1 Documentation](https://nodejs.org/api/os.html#os_os_homedir)
- [path - Node.js v14.13.1 Documentation](https://nodejs.org/api/path.html)
- [child_process - Node.js v14.13.1 Documentation](https://nodejs.org/api/child_process.html)