---
title: npm
date: 2020-09-26 21:23:26
tags: note, npm, tip, book section
---
# npm
### install
> - mostly install it with nodejs 
- brew
- zip

<!--more-->
### update
```
npm install -g npm
```

### package
```c
// install package
npm install ${package_name}
npm uninstall ${package_name}
// -g is global
// --save-dev is install in dev dependency
npm list [-g] [--depth 0]

```

#### update
- default native
    ```c
    npm update [-g] [${pacakge_name}]
    ```
- [npm-check](https://www.npmjs.com/package/npm-check)
    ```c
    npm-check
    // use gui to update
    npm-check -u
    ```

- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
    ```c
    ncu
    ```
    > - Red = major upgrade (and all [major version zero](https://semver.org/#spec-item-4))
    > - Cyan = minor upgrade
    > - Green = patch upgrade



#### remove useless packages
```c
npm prune [${pacakge_name}]
```
