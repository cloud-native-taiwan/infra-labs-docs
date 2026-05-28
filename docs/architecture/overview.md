---
sidebar_position: 2
sidebar_label: "系統概覽"
---

# 系統概覽

## 使命

Infra Labs 為 CNTUG（Cloud Native Taiwan User Group）成員提供社群基礎設施即服務（IaaS）。平台提供運算、儲存及網路資源，讓社群成員得以執行工作負載、實驗雲端原生技術，並參與開源專案——全程使用真正的生產等級基礎設施。

---

## 技術選型

| 層級 | 技術 | 備註 |
|------|------|------|
| 雲端平台 | OpenStack | 透過 Kolla-Ansible 部署（容器化服務） |
| 儲存 | Ceph | 透過 Cephadm 部署；提供 block（RBD）、object（RGW/S3）及 filesystem（CephFS） |
| 網路（overlay） | OVN | 分散式虛擬路由器、交換器、安全群組及負載均衡器 |
| 網路（實體） | Arista DCS-7060CX-32S（核心）、Juniper NFX250（邊界） | BGP、VLAN trunking、100G 上行鏈路 |
| 管理交換器 | Juniper EX3300-48T | 帶外管理及 IPMI 存取 |
| 運算架構 | x86_64 | 所有伺服器皆使用 AMD EPYC 或 Intel Xeon 處理器 |
| 計價（顯示計費） | CloudKitty | 計算各專案的資源成本以產生顯示計費報表；計價資料儲存於 OpenSearch |

---

## 實體位置

所有設備部署於台灣一座共置機房的**單一機櫃**中。上游連線透過兩條 100G 鏈路連接至 AS 38008。

---

## 實體設備清冊

### 伺服器

| 主機名稱 | 角色 | 架構 | 備註 |
|----------|------|------|------|
| openstack01 | Controller + Compute + Ceph OSD | x86_64 | |
| openstack02 | Controller + Compute + Ceph OSD | x86_64 | |
| openstack04 | Controller + Compute + Ceph OSD | x86_64 | |
| openstack05 | Compute + Ceph OSD | x86_64 | |
| openstack06 | Ceph OSD | x86_64 | |

三台伺服器（openstack01、openstack02、openstack04）組成具備高可用性（HAProxy、Keepalived）的 OpenStack 控制平面。全部五台伺服器皆參與 Ceph 叢集作為 OSD 節點（4 台同時運行 Ceph 和運算工作負載；openstack06 為純儲存節點）。四個節點運行 Nova compute（openstack01、openstack02、openstack04、openstack05）。

### 網路設備

| 設備 | 型號 | 角色 |
|------|------|------|
| Arista 核心交換器 | DCS-7060CX-32S | 核心路由與交換、與上游 BGP peering、100G fabric |
| Juniper NFX250 | NFX250 | 邊界功能、IPMI 連線（8x RJ-45 ge-0/0/0 至 ge-0/0/7） |
| Juniper 管理交換器 | EX3300-48T | 帶外管理、IPMI |

---

## 公開服務

| 服務 | 網址 | 說明 |
|------|------|------|
| OpenStack 儀表板 | `openstack.cloudnative.tw` | Horizon 及 Skyline 網頁介面，供租戶自助操作 |
| S3 相容物件儲存 | `s3.cloudnative.tw` | Ceph RGW 端點，提供 S3 API |

---

## IP 定址

Infra Labs 採用 IPv4 與 IPv6 dual stack。

| 協定 | 前綴 |
|------|------|
| IPv4 | 103.122.116.0/23 |
| IPv6 | 2403:8ec0::/48 |

### BGP

| 參數 | 值 |
|------|-----|
| 本地 ASN | AS 147035 |
| 上游 ASN | AS 38008 |
| 上行鏈路容量 | 2 x 100G（Arista 7060CX-32S） |

---

## 架構決策紀錄

### 決策 1：為何選擇 OpenStack

**背景：** 平台需要一個成熟的開源 IaaS 層，支援多租戶、自助配置，以及廣泛的生態系整合。

**決策：** 採用 OpenStack 作為雲端平台。

**理由：**
- 開源私有雲的事實標準。
- 豐富的 API 介面，相容眾多 CLI/SDK 工具。
- 龐大的貢獻者社群及長期支援週期。
- 讓 CNTUG 成員獲得真實的維運經驗。

---

### 決策 2：為何選擇 Ceph

**背景：** 平台需要 block storage（VM volumes）、object storage（S3 相容），以及潛在的 filesystem storage，理想情況下由單一統一系統提供。

**決策：** 採用 Ceph 作為統一儲存後端。

**理由：**
- 單一叢集同時提供 RBD（Cinder/Glance 的 block storage）、RGW（S3 相容 object storage）及 CephFS（共享檔案系統）。
- 可透過新增 OSD 節點水平擴展。
- 與 OpenStack 緊密整合（原生 Cinder 及 Glance 驅動程式）。
- 成熟且經全球生產環境實戰驗證。

---

### 決策 3：為何選擇 Kolla-Ansible

**背景：** OpenStack 包含數十個服務，且服務間相依性複雜。部署工具必須可由小型志工團隊維護。

**決策：** 使用 Kolla-Ansible（容器化服務）部署 OpenStack。

**理由：**
- 每個 OpenStack 服務運行於獨立容器中，隔離相依套件。
- 滾動升級簡便（拉取新映像、重啟容器）。
- 文件完善，在 OpenStack 社群中廣泛使用。
- 組態為宣告式（Ansible 變數），存於版本控制中。

---

### 決策 4：為何選擇 OVN

**背景：** 網路層必須支援租戶隔離、分散式路由、安全群組及浮動 IP，且無需集中式瓶頸。

**決策：** 採用 OVN（Open Virtual Network）作為 Neutron ML2 mechanism driver。

**理由：**
- 完全分散式資料平面——無需集中式網路節點。
- 原生支援分散式路由器、ACL 及 DHCP。
- 在 OVS 專案下積極進行上游開發。
- 以更簡潔的架構取代舊版 ML2/OVS agent。

---

### 決策 5：為何導入 CloudKitty 顯示計費

**背景：** Infra Labs 是免費提供的社群資源，缺乏成本意識容易導致閒置 VM 長期佔用稀缺的運算資源。平台需要一種機制讓使用者看見其用量的真實價值，但又不應變成真正的收費系統。

**決策：** 部署 CloudKitty（`rating` 服務），以 OpenSearch 為儲存後端，產生每月的 **顯示計費（showback）** 報表——只計價、不請款。

**理由：**
- 顯示計費能凸顯免費基礎設施的真實價值，並溫和地鼓勵清理閒置資源，而不引入金流或計費的負擔。
- CloudKitty 為 OpenStack 原生計價服務，可直接取用既有的 Keystone、Nova 及 Prometheus 資料。
- Kolla-Ansible 2026.1 移除 influxdb 後，OpenSearch 為其支援的 storage v2 後端，且可與未來的集中式日誌共用同一套叢集。
- 費率錨定於平價雲端水準（無 SLA），詳見[資源計價方式](operations/resource-pricing.md)。

---

## 下一步

前往[網路架構](network/)瞭解實體拓撲、VLAN 規劃、BGP peering 及 OVN overlay 網路的詳細資訊。
