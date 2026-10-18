---
sidebar_position: 4
---

# FAQ

## General

> Q: 如何申請使用 Cloud Native Taiwan Infra Labs？

目前 Infra Labs 開放所有希望使用的人申請，欲申請資源請填寫[此表單](https://forms.gle/Hx8oxCBWAFZWUD1Z7)，管理員將會進行審核。

> Q: 若我的配額達上限了，我可以申請更多嗎？

可以，請將使用計畫發送至 [CNTUG Infra 管理員](mailto:infra@cloudnative.tw)，由我們評估。

> Q: 請問 CNTUG Infra Labs 有服務公告頻道嗎？

您可以在 Telegram 上追蹤 [CNTUG Infra Labs Announcements](https://t.me/cntug_infra_labs) 頻道。

> Q: 請問 Infra Labs 提供了哪些服務？

目前提供服務有：

- 虛擬機器 (Virtual Machine)
- 區塊儲存 (Block Storage)
- 物件儲存 (Object Storage)
- 網路
- 附載平衡 (Load Balancer)
- DNS

## VM

> Q: 如何連接虛擬主機 (VM)？

請先在電腦安裝 SSH Client 程式，並搭配 SSH Public Key 進行連接。
請注意，在預設情況下，我們不開放透過 Password 連入。

## GPU

> Q: 可以申請 GPU 嗎？

可以，Infra Labs 有數量有限的 GPU。型號、計價和申請方式見[建立 VM](tutorial-basics/create-vm.md#gpu)頁的 GPU 一節。

## 網路

> Q: 我沒辦法連上我 VM 的一些連接埠 (Port)，請問是什麼問題？

若您無法遠端連入 VM 連接埠，請先確認安全性群組規則中是否有開啟 VM 的此連接埠，預設狀態下所有流入 VM 的流量都會被防火牆 drop 掉。

如果確定有開啟卻還是無法連入，請檢查連接埠號碼是否在以下號碼內：

`25 26 2525 465 587 17 19 137 389 445 1080 1900 3283 5683`

這些連接埠為了防止被攻擊或是被利用來攻擊，已經在路由器進行過濾。
若因特殊原因需要開啟，請 [聯絡管理員](mailto:infra@cloudnative.tw) 並提供詳細的理由。

> Q: 我的 Public IPv4 不夠用了，該怎麼辦？

在預設情況下，我們提供 2 組 Public IPv4 地址。
若您的 IP 地址已用完，我們建議您創建自己的私有網路，並搭配 SNAT 的方式來使用。

若您因實驗需求或服務等其他因素需要更多 Public IPv4 地址。
請 [聯絡管理員](mailto:infra@cloudnative.tw) 並提出使用計畫進行申請。

> Q: 請問 VM 有提供 IPv6 地址嗎？

目前 public 網段預設提供 IPv6 地址，歡迎使用。