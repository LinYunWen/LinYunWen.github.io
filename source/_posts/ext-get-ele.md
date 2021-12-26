---
title: Extjs get Element
date: 2021-12-26 09:42:08
tags: [note, extjs, javascript, get, fly]
---

# Ext.get , Ext.fly , Ext.getDom , Ext.getCmp
## Ext.get
- 通過這一個method可以取按 dom的id 、dom節點、已存在的Ext.Element物件 來取得一個 "HTMLElement節點的Ext.Element物件"。
- 使用方法：
    - var el = Ext.get('myDom');
- 回傳值：
    - Ext.Element
## Ext.fly
- 通過這一個method可以取按 dom的id 、dom節點 來取得"全局共享的Ext.Element物件"。
- 使用方法：
    - var el = Ext.fly('myDom');
- 回傳值：
    - Ext.Element
:::info
- 注意：
```javascript
var  my_one = Ext.fly('myDom1');  // my_one取得全局共享myDom1
var my_tow = Ext.fly('myDom2');   // my_tow取得全局共享的myDom2,但是原來全局共享的myDom1被myDom2覆蓋了!!!!!
my_one.hide(); //<-----變成myDom2不見了… 
```
:::
<!--more-->
## Ext.getDom
* 通過這一個method可以取按 dom的id 、dom節點、已存在的Ext.Element物件 來取得一個 "HTML Element"。也就是一般操作的 Html Dom 節點
* 使用方法：
    * var el = Ext.getDom('myDom');
* 回傳值：
    * Html Element

## Ext.getCmp
* 通過這一個method可以取 id 取回一個 Ext.Component 的物件，然後繼續操作這個物件，這一個方法在後期使用非常多
* 使用方法
    ```javascript
    var myWindow = Ext.create("MyWindow",{
       extend:"Ext.window",
       id:'myWindow',
       items:[
           {xtype:'textfield',text:'name'}
        ]
    });
    var obj = Ext.getCmp('myWindow');
    ```
* 回傳值：
    * 原物件的類


## get vs fly
- Ext.get和Ext.fly返回的都是一個Element對象
    - 但是Ext.get返回的是一個獨立的Element，擁有自己獨立的操作接口 封裝，可以將其返回值保存到變量中，以便以後調用操作等，這樣爲重用帶來了方便。
    - 但是它的一個很大缺點就是內存消耗問題，假如調用 Ext.get(id)1000次，則會在內存中創建1000個獨立Element，其內存佔用可想而知。

## reference
- [【ExtJs 教學】Ext.get , Ext.fly , Ext.getDom , Ext.getCmp 的使用方法 | ExtJs](http://extjscanred.blogspot.com/2013/10/extget-extfly-extgetdom-extgetcmp.html)
- [Ext.get和Ext.fly的區別 - 台部落](https://www.twblogs.net/a/5be9b13d2b717720b51e51eb)