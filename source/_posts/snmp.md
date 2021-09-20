---
title: snmp
date: 2021-09-20 14:14:05
tags: [note, snmp]
---

# SNMP (Simple Network Management Protocol)
- 簡單網路管理協定(Simple Network Management Protocol; SNMP)
- 是由IETF (Internet Engineering Task Force)所定義，用以管理網路設備之通訊協定
- SNMP 是用於管理和監視網路元素的廣泛接受的通訊協定之一
- 使用SNMP管理的網路主要由3個元件所組成：
	1. 網路管理系統(Network Management System)為安裝於管理端(Manager)的軟體，用以向代理者查詢被管理裝置的相關資訊。
	2. 被管理裝置(Managed Device)是指網路中被監控的設備節點。
	3. 代理者(Agent)為安裝於被管理裝置的軟體，負責監控及回傳被監控設備的相關資訊。
<!--more-->
## SNMP Agent
- 管理資訊庫 (MIB) 是用於管理網路元素的資訊的集合。MIB 包含由名稱物件識別碼（物件 ID 或 OID）標識的受控物件。
- 是以變數方式呈現被管理裝置的相關資訊，每個變數皆有其唯一的物件識別碼(Object Identifier; OID)，而OID是以階層方式被描述於管理資訊庫(Management Information Base; MIB)
    - 例如OID為1.3.6.1.4.1.9代表Cisco公司。
    - ![](https://i.imgur.com/dX1MMsK.png)
- SNMP是運作於OSI模型之應用層，管理端經由UDP傳送request至代理者(port 161)
- 代理者透過來源埠傳送response至管理端。此外，當被監控設備發生異常事件時，例如cold start或link down，代理者可經由UDP主動傳送notification至管理端(port 162)
    - 預設情況下，SNMP 使用連接埠 161、TRAP / INFORM 使用連接埠 162 進行通訊。
- 管理端一方面可經由Get、GetNext或GetBulk指令向代理者擷取被監控設備的相關資訊，另一方面亦可透過代理者經由Trap或Inform指令主動傳送資料。此外，管理端使用Set指令以達到系統管理之目的。

## SNMP 的基本命令
- 資訊交換的簡單性使得 SNMP 成為廣泛接受的通訊協定。主要原因是簡潔的命令集，以下為命令集清單：
    -   GET：GET 操作是管理器向受控裝置傳送的請求。執行該操作可從受控裝置擷取一個或多個值。
    -   GET NEXT：此操作與 GET 相似。重要的區別是 GET NEXT 操作擷取 MIB 樹中下一個 OID 的值。
    -   GET BULK：GETBULK 操作用於從大型 MIB 表格中擷取大量資料。
    -   SET：管理員使用此操作修改或分配受控裝置的值。
    -   TRAPS：與從 SNMP 管理器啟動的上述命令不同，TRAPS 由代理程式啟動。這是代理程式在發生事件時向 SNMP 管理器發出的訊號。
    -   INFORM：該命令與代理程式啟動的 TRAP 類似，但 INFORM 包含 SNMP 管理器在接收訊息時的確認。
    -   RESPONSE：此命令用於傳回由 SNMP 管理器執行的動作的值或訊號。
-   graph
    - GET/GET NEXT/GET BULK/SET
        - ![](https://www.manageengine.com/tw/network-monitoring/images/snmp-get-response.gif)
    - TRAP
        - ![](https://www.manageengine.com/tw/network-monitoring/images/snmp-trap.gif)
    - INFORM
        - ![](https://www.manageengine.com/tw/network-monitoring/images/snmp-inform-acknowledgment.gif)

## SNMP協定的資安應用
> - 惡意無線基地台(Rogue Acces Point)是指在網路管理員未知情且未予以授權之情況下，逕自將Acces Point (AP)私接於組織內部有線網路以提供或使用無線網路服務，因此惡意無線基地台對於企業組織來說，形成一個安全威脅的嚴重問題。
>     - 舉例而言，若有惡意無線基地台連結至公司內部網路，且該惡意無線基地台並無相關使用者認證設定，如同形成一個繞過安全管控機制而進入公司內部網路的節點，讓公司內部或外部鄰近該惡意無線基地台的人員得以於訊號範圍內任意存取公司內部網路資源。
- 無線網路控制器(Controller)可以經由簡單網路管理協定(SNMP)來輪詢(polling)無線基地台並經由回傳的物件識別碼(OID)來偵測惡意無線基地台的存在。一但發現惡意無線基地台存在，網路管理員可經由無線網路控制器一方面可以阻止正常用戶和惡意無線基地台建立連線，另一方面亦不會影響正常用戶和合法無線基地台之通訊行為，隔離過程可以持續至網路管理員將惡意無線基地台實際從網路中移除。



## reference
- [淺談簡單網路管理協定(SNMP)](https://www.cc.ntu.edu.tw/chinese/epaper/0047/20181220_4707.html)
- [什麼是SNMP？| SNMP教程 - 基礎知識 - 監控 - 代理 - 管理](https://www.manageengine.com/tw/network-monitoring/what-is-snmp.html)