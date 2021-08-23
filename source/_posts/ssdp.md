---
title: SSDP
date: 2021-08-23 20:50:30
tags: [note, ssdp]
---

# SSDP

## introduce
- SSDP（Simple Service Discovery Protocol），一種應用層協定，是隨插即用（UPnP，Universal Plug and Play）技術核心協定之一，使用UDP，Port1900。
- SSDP應用在現代的路由器、電視、印表機...等，可以說是幾乎身邊的電器3C產品都有這項技術。在封包層面支援UPnP的主機利用群播到`239.255.255.250`的方式，告訴整個區域網路下的主機們有這項服務。
- 我們可以群播出一個SSDP Discover封包，只要是支援UPnP服務的主機會傳回它所提供的服務。
<!--more-->
- 在2013-2015年間，SSDP變成全世界DDoS（Distributed Denial of Service）攻擊方式排行第一名，SSDP能夠被放大30倍左右，雖然低於NTP（Network Time Protocol）很多（NTP能夠被放大500倍以上），但是由於現代很多網路設備都有UPnP技術，所以數量上SSDP能夠佔不少優勢，講白話就是你可能會被你家的冰箱DDoS。



## Reference
- [security - I stopped MiniSSDPD, will something bad happen? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/155154/i-stopped-minissdpd-will-something-bad-happen)
- [libnet/ssdp.c · Network Packet Programming 網路封包程式設計](https://qbsuranalang.gitbooks.io/network-packet-programming/content/libnet/ssdp.html)
- [簡單服務發現協定 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E7%AE%80%E5%8D%95%E6%9C%8D%E5%8A%A1%E5%8F%91%E7%8E%B0%E5%8D%8F%E8%AE%AE)