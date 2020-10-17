---
title: CSS 置中方式
date: 2020-09-22 22:19:26
tags: [note, css, web]
---

# CSS 置中方式

> 
> - demo heml
> ```htmlmixed
> <div class="container">
>     <div class="content">
>         content
>     </div>
> </div>
> ```
> ![](https://i.imgur.com/FjGAHa9.png)

<!--more-->

## 水平置中

### block + margin
```css
.container {
    border: 1px solid black;
}

.content {
   display: block; // default
   width: 200px;
   height: 200px;
   background-color: lightblue;
   
   margin: 0 auto;
}
```
![](https://i.imgur.com/pGXrpFg.png)

### inline-block + text-align
```css
.container {
    border: 1px solid black;
    text-align: center;
}

.content {
   display: inline-block;
   width: 200px;
   height: 200px;
   background-color: lightblue;
   margin: 0 auto;
}
```
![](https://i.imgur.com/yjPfCPS.png)


## 垂直置中
### height = line-height
```css
.content {
   height: 200px;
   background-color: lightblue;
   line-height: 200px;
}
```
![](https://i.imgur.com/G6efvNo.png)


### relative and absolute position + margin

```css
.container {
    border: 1px solid black;
    height: 400px;

    position: relative;
}

.content {
    position: absolute;

    width: 200px;
    height: 200px;
    background-color: lightblue;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    margin: auto;
}
```

![](https://i.imgur.com/IxUu1os.png)

### relative and absolute position + transform
```css
.container {
    border: 1px solid black;
    height: 400px;

    position: relative;
}

.content {
    position: absolute;

    width: 200px;
    height: 200px;
    background-color: lightblue;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
}
```
![](https://i.imgur.com/tvCkBOW.png)

### flex
```css
.container {
    border: 1px solid black;
    height: 400px;

    display: flex;
    justify-content: center;
    align-items:center;
}

```
![](https://i.imgur.com/u7fUR2Q.png)


### table
```htmlmixed
<table>
    <tr>
        <td class="content">
            content
        </td>
    </tr>
</table>
```

```css
.content {
    text-align: center;
    vertical-align: middle;
}
```

![](https://i.imgur.com/RaS8e3p.png)
