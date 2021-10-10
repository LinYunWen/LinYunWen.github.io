---
title: gRPC
date: 2021-10-10 10:14:43
tags: [note, net, grpc]
---

# gRPC
- RPC 的全名是 remote procedure call，主要是作為電腦和電腦間溝通使用。
    - A 電腦可以呼叫 B 電腦執行某些程式，B 電腦會將結果回傳給 A 電腦，A 電腦在收到回應後會再繼續處理其他任務。
    - RPC 的好處在於，雖然 A 電腦是發送請求去請 B 電腦做事，但其呼叫的方式，就很像是 A 電腦直接在呼叫自己內部的函式一般。
<!--more-->
- gRPC 也是基於這樣的概念，讓想要呼叫 server 處理請求的 client，在使用這支 API 時就好像是呼叫自己內部的函式一樣簡單自然。
- 從功能面來說，gRPC 就像 Web 常用的 Restful API 一樣，都是在處理請求和回應，並且進行資料交換，但 gRPC 還多了其他的功能和特色。
- gRPC 是由 Google 開發的開源框架，它快速有效、奠基在 HTTP/2 上提供低延遲（low latency），支援串流，更容易做到權限驗證（authentication）。
- ![](https://i.imgur.com/CfguHEE.png)

## Protocol Buffers
- 在傳統的 Restful API 中，最常使用的資料交換格式通常是 JSON；但到了 gRPC 中，資料交換的格式則是使用名為 Protocol Buffers 的規範／語言。
- 也就是說，當我們想要使用 gRPC 的服務來交換資料前，必須先把資料「格式」和「方法」都定義清楚。
    - ![](https://i.imgur.com/K6XIElE.png)
- 透過 Protocol Buffer 定義好資料的傳輸欄位（`message`）和呼叫的方法（`service`）後，gRPC 即可在不同程式語言上運行，這非常適合微服務（micro-services）的應用情境，只要雙方一起定義好 schema 後，就可以用不同的程式語言進行開發。

> - 使用 gRPC 前，不只需要先把資料交換的格式定義清楚，同時也需要把資料交換的方法定義清楚。
> - Protocol Buffers 可以獨立使用，不一定要搭配 gRPC；但使用 gRPC 一定要搭配 Protocol Buffers

### 使用 Protocol Buffers 的好處#
* 節省網路傳輸量：速度更快、檔案更小
* 節省 CPU 消耗：Parse JSON 本身是 CPU intensive 的任務；Parse Protocol Buffer（binary format）因為更接近底層機器表徵資料的方式，消耗的 CPU 資源較低
* 跨程式語言：Protocol Buffer 可以根據不同的程式語言編譯出不同的檔案
* 可以寫註解、型別清楚明確

## gRPC mode
* Unary：
    * 類似傳統 API，client 發送 request 而 server 回傳 response
* Server Streaming：
    * 透過 HTTP/2，client 發送一次 request，而 server 可以回傳多次資料
* Client Streaming：
    * client 發送多次資料，直到告知 server 資料傳完後，server 再給予 response
* Bi Directional Streaming：
    * 兩邊都用串流的方式傳送資料
![](https://i.imgur.com/jCI40ft.png)

## gRPC v.s. RESTFUL API
| 功能 | gRPC | HTTP Api 與 JSON |
| --- | --- | --- |
| 合約 | 必要 (_。 proto_) | 選擇性的 (OpenAPI) |
| 通訊協定 | HTTP/2 | HTTP |
| Payload | [Protobuf (small、binary)](https://docs.microsoft.com/zh-tw/aspnet/core/grpc/comparison?view=aspnetcore-5.0#performance) | JSON (大型、人類看得懂的) |
| Prescriptiveness | [嚴格規格](https://docs.microsoft.com/zh-tw/aspnet/core/grpc/comparison?view=aspnetcore-5.0#strict-specification) | 鬆散。 任何 HTTP 都有效。 |
| 串流 | [用戶端、伺服器、雙向](https://docs.microsoft.com/zh-tw/aspnet/core/grpc/comparison?view=aspnetcore-5.0#streaming) | 用戶端、伺服器 |
| 瀏覽器支援 | [無 (需要 grpc-web)](https://docs.microsoft.com/zh-tw/aspnet/core/grpc/comparison?view=aspnetcore-5.0#limited-browser-support) | 是 |
| 安全性 | 傳輸 (TLS) | 傳輸 (TLS) |
| 用戶端程式代碼產生 | [是](https://docs.microsoft.com/zh-tw/aspnet/core/grpc/comparison?view=aspnetcore-5.0#code-generation) | OpenAPI + 協力廠商工具 |

## cons
- Protocol Buffer 不像 JSON 是 Human Readable。
- 需要額外的學習時間和導入成本。
- 瀏覽器原生目前還不支援，須透過套件 grpc-web 來處理

## gRPC 建議的案例
* 微服務： gRPC 是針對低延遲和高輸送量的通訊所設計。 gRPC 非常適合於高效率的輕量微服務。
* 點對點即時通訊： gRPC 有絕佳的雙向串流支援。 gRPC services 可以即時推播訊息，而不會進行輪詢。
* 多語言環境： gRPC 工具支援所有熱門的開發語言，讓 gRPC 成為多國語言環境的理想選擇。
* 網路受限的環境： gRPC 訊息會以 Protobuf （輕量訊息格式）進行序列化。 GRPC 訊息一律小於相等的 JSON 訊息。
* 處理序間通訊 (ipc)：如 Unix 網域通訊端和具名管道等 ipc 傳輸，可與 gRPC 搭配使用，以在同一部電腦上的應用程式之間進行通訊。 如需詳細資訊，請參閱與 gRPC 的處理程序間通訊。

## reference
- [[gRPC] gRPC Getting Started | PJCHENder 未整理筆記](https://pjchender.dev/golang/grpc-getting-started/)
- [gRPC](https://grpc.io/)
- [比較 gRPC 服務與 HTTP API | Microsoft Docs](https://docs.microsoft.com/zh-tw/aspnet/core/grpc/comparison?view=aspnetcore-5.0)
- [什麼是 gRPC ？](http://gelis-dotnet.blogspot.com/2019/04/grpc.html)