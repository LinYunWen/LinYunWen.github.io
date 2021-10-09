---
title: PPPOE
date: 2021-10-09 17:14:45
tags: [note, pppoe, net]
---

# PPPOE
- Point-to-Point Protocol over Ethernet
- 是將對等協定（PPP）封裝在乙太網路（Ethernet）框架中的一種網路隧道協定
- 由於協定中整合PPP協定，所以實現出傳統乙太網路不能提供的身分驗證、加密以及壓縮等功能，也可用於纜線數據機（cable modem）和數位使用者線路（DSL）等以乙太網路協定向使用者提供接入服務的協定體系
- 本質上，它是一個允許在乙太網路廣播域中的兩個乙太網路介面間建立對等隧道的協定。
<!--more-->
## introduction
- PPPoE分為兩個階段，PPPoE發現、PPP對談

### PPPoE發現
- 由於傳統的PPP連接是建立在串行鏈路或撥號時建立的ATM虛電路連接上的，所有的PPP訊框都可以確保通過電纜到達對端。
- 但是乙太網路是多路存取的，每一個節點都可以相互存取。以太影格包含目的節點的實體位址（MAC位址），這使得該影格可以到達預期的目的節點。 
- 因此，為了在乙太網路上建立連接而交換PPP控制報文之前，兩個端點都必須知道對端的MAC位址，這樣才可以在控制報文中攜帶MAC位址。
- PPPoE發現階段做的就是這件事。除此之外，在此階段還將建立一個對談ID，以供後面交換報文使用。
#### details
- 儘管傳統的PPP是對等協定，但是由於多個主機可以通過一個單獨的物理連接連接到一個服務提供者，因此PPPoE本身就是一個客戶端-伺服器的關係。
- 發現過程包含四個步驟。
- 主機作為客戶端，ISP端的存取集中器作為伺服器
- 最後一步第五步是關閉一個現存對談的方法
##### 客戶端到伺服器：Initiation（PADI）
- PADI為PPPoE Active Discovery Initiation的縮寫。
    - 如果一個使用者想要使用DSL撥號連入Internet，那麼他的電腦必須首先在其ISP的網路服務提供點（POP）找到DSL存取集中器（DSL-AC）。
    - 在乙太網路上通訊只能通過MAC位址。
    - 由於電腦不知道DSL-AC的MAC位址，於是就在乙太網路上廣播一個PADI報文。這個報文中包含傳送者的MAC位址。
##### 伺服器到客戶端：Offer (PADO)
- PADO為PPPoE Active Discovery Offer的縮寫。
    - 一但使用者電腦傳送了PADI報文，DSL-AC就會使用PADI中提供的MAC位址回覆一個PADO報文。
    - PADO報文中包含了DSL-AC的MAC位址、名稱以及服務名。如果多於一個POP的DSL-AC回覆了PADO報文，使用者電腦就使用提供的名稱和服務來從中選擇一個。

###### 客戶端到伺服器：Request（PADR）
- PADR為PPPoE Active Discovery Request的縮寫。
    - 當使用者電腦收到一個來自DSL-AC的可接受的PADO報文後，就會傳送一個PADR報文給DSL-AC，用來確認接受傳送PADO報文的DSL-AC所提供的PPPoE連接。

###### 伺服器到客戶端：Session-confirmation（PADS）
- PADS為PPPoE Active Discovery Session-confirmation的縮寫。
    - 上面的PADR報文由DSL-AC的PADS報文進行確認，並在其中攜帶一個對談ID。使用者電腦與此DSL-AC的連接現在就完整建立了。

###### 任何一方：Termination（PADT）
- PADT為PPPoE Active Discovery Termination的縮寫。
    - 這個報文終結使用者電腦與POP的的連接，可由使用者電腦或DSL-AC任意一方傳送。

### PPP對談
- 一旦連接的雙方知道了對端的MAC位址，對談就建立了。
## error code
- 678: 沒有應答。
	- 問題原因：ISP運營商的伺服器出現故障，或者數據機出現故障。
	- 解決方法：
	    - 首先查看光貓的狀態，可以斷電重新啟動一次。
	    - 再不行打客服電話報故障。從實際經驗看，是原來的撥號沒有斷開，直接拔下網線插到路由器WAN口就會出現撥號失敗。
	    - 插到電腦撥號會出現678錯誤，是運營商伺服器掛起，後台顯示連接未斷開。
	    - 解決辦法，5分鐘後重試。如果是光貓，光貓斷電5分鐘以上然後重啟，再撥號絕大部分時候就可以了，這個辦法是電信機房工作人員告訴我的。
- 691
	- 問題原因：輸入的用戶名和密碼不對，無法建立連接。
	- 解決方法：
	    - 出現691的錯誤時，用戶名和密碼輸入有誤的可能性很大，重新手動輸入用戶名和密碼，儘量不要粘貼，從實際經驗看粘貼密碼經常這樣，可能多了些控制字符或空格吧。
- 602: 埠已經打開。
	- 問題原因：撥號網絡由於設備安裝錯誤或正在使用，不能進行連接。
	- 解決方法：
	    - 撥號網絡網絡由於設備安裝錯誤或正在使用，不能進行連接導致，需要卸載乾淨任何PPPoE軟體，重新安裝。

## cons
- 使用Internet前，需先透過PPPoE進行撥接，而非電腦啟動後立即上網。
- 部分ISP會對PPPoE的連線使用者採取定時斷線，以節省營運成本及IP位址的佔用，故對於需長時間掛網的使用者較不利。但也有部份ISP為提供使用者選擇PPPoE可發配非固定IP或固定IP的服務。
- 目前Windows XP之後的Windows，Mac OS X、Linux等作業系統等皆已內建PPPoE的撥接功能，更早期的作業系統需另行安裝PPPoE的撥接程式，如Enternet 300、RAS PPPoE等。
## reference
- [PPPoE - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/PPPoE)
- [科普一下什麼是PPPoE - 每日頭條](https://kknews.cc/news/665blgp.html)