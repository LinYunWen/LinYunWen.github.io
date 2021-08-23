---
title: 網際網路上用來找尋設備的方法
date: 2021-08-23 20:50:59
tags: [note, web, device]
---

# 網際網路上用來找尋設備的方法
- 茲將網際網路上常用來找尋設備的方法整理如下：  
    -   WS-Discovery (ONVIF組織定義的方法)
    -   SSDP  (DLNA組織定義的方法)
    -   Multicast Domain Name Service(mDNS)
    -   ADwin Config
    -   Bonjour
<!--more-->
## WS-Discovery (Web Services Dynamic Discovery)
- 此方法屬於web services的一部分，又稱為SOAP-over-UDP。2009/07/01 由 OASIS組織宣布成為業界標準。主要是透過 multicast 傳送 SOAP/XML，流程如下：
![](https://i.imgur.com/pyXdBAh.png)
- 當 IPCam 開機後，會在網路上群播 Hello 資訊，若此時網路上存在NVR，便可以收到此資訊。 
- 若 NVR 啟動後沒有收到 Hello 資訊，則可以主動送出 Probe，其中會包含service contract type, keywords, and scope，若區域網路內的 IPCam 發現彼此服務match，便會回覆訊息(PM：ProbeMatch)。接著NVR可以送出 Resolve 取得 IPCam 的 transport address。

> -   DISCOVERY_PORT: port 3702 \[IANA\] 
> -   IPv4 multicast address: 239.255.255.250
> -   IPv6 multicast address: FF02::C (link-local scope)

## SSDP
- 屬於UPNP服務的一部分。作法是透過multicast送出http封包 (M-Search)，支援SSDP的設備會回復設備資訊。實例如下：
```clike
M-SEARCH * HTTP/1.1
MX: 3
ST: upnp:rootdevice
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
```

## MDNS (Multicast Domain Name Service)
- 屬於 Zero configuration 的一部分，當區域網路內不存在 DNS 伺服器時，可以透過此種方式找尋想要的服務。
- 其技術原理是透過 IP multicast over User Datagram Protocol (UDP)，進行 Host Discovery 或是 Service Discovery。下圖為一個 Host Discovery 的例子。
![](https://i.imgur.com/kuidihz.png)

## ADwin Config
- 用來偵測或設定ADwin公司的設備。

## Bonjour
- Apple公司用來找尋設備的協議，只能夠在一個子網內運行。主要支援三種運作。
    - Publication (advertising a service)
        - 設備配置給自己一個 link-local IP address，例如:169.254.150.84，接著在網路上廣播尋找此位置(透過ARP)，若沒有收到回應，表示此IP尚未有人使用，設備便可以將此IP當成自己的IP位置。 
        - 接著透過同樣的方式，設定設備的Domain name，例如：eds-musicbox.local.  ，同時設定Domain name時，可以設定 service record，註明將會提供的無誤，例如：Ed’s Party Mix._music._tcp.local.
    - Discovery (browsing for available services)
        - 要找尋某個特別設備時，可使用 MDNS 定義的 standard query，詢問網路上是否在區域網路上存在一個使用TCP的音樂設備，例如：詢問  ._music._tcp.local.，如此便可以找到步驟 publication 中的設備。
    - Resolution (translating service names to addresses and port numbers for use)
        - 將查詢到的  name " Ed’s Party Mix._music._tcp.local." 轉換為 IP address + port number

## Summary
- 找尋設備的方法，其基本原則是透過 IP Multicast/broadcast，每種協定對應的 address/port 整理如下：
    -   239.255.255.250：3702  --> WS-Discovery
    -   239.255.255.250：1900 --> SSDP
    -   224.0.0.251：5353 --> MDNS
    -   255.255.255.255：10669  -->ADWin Config
- 其作法大同小異，但特別需要注意的是穿透NAT的方法，就上述幾個方法而言，只有 UPNP 與 WS-Discovery 可以


## Reference
- [Albert 的筆記本: 網際網路上用來找尋設備的方法](http://albert-oma.blogspot.com/2012/07/blog-post.html)