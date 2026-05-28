---
sidebar_position: 3
---

# 監控與可觀測性

本文件描述現有監控堆疊、識別缺口，並提出分階段的改善路線圖。

## 現狀

以下監控元件已部署（透過 openstack01 上的 `docker ps` 觀察到）：

| 元件 | 角色 |
|------|------|
| Prometheus server | 指標收集與儲存 |
| AlertManager | 告警路由與通知 |
| Node exporter | 系統層級指標（CPU、記憶體、磁碟、網路） |
| cAdvisor | 容器指標 |
| Libvirt exporter | VM 指標 |
| Memcached exporter | Memcached 指標 |
| MySQL/MariaDB exporter | 資料庫指標 |
| Blackbox exporter | 端點探測 |
| OpenStack exporter | OpenStack API 指標 |
| IPMI exporter | 硬體指標（溫度、風扇轉速、電力） |
| Grafana | 儀表板與視覺化 |
| Fluentd | 日誌收集 |

### 運作良好的部分

部署受益於 Kolla-Ansible 內建的 Prometheus 整合。每節點的指標覆蓋率紮實：系統指標、容器指標、VM 指標、資料庫指標及硬體指標皆有收集。Grafana 提供視覺化層，AlertManager 已就位用於路由告警。

## 已識別的缺口

### 1. 網路設備監控

未對 Arista 核心交換器、Juniper NFX250 邊界路由器或 EX3300 管理交換器設定 SNMP 或 gNMI 收集。鑑於 Arista 是最關鍵的單點故障，這是一個重大的監控盲點。

### 2. Ceph 儀表板整合

Ceph 內建 Prometheus 模組，但 Prometheus 是否已設定抓取 Ceph MGR 端點尚不確定。若未設定，Ceph 健康狀態、OSD 效能及 pool 使用率將無法在 Grafana 中呈現。

### 3. BGP Session 監控

未對 BGP peering 狀態變更設定告警。與上游提供者（AS 38008）的 BGP session 中斷將不會被察覺，直到使用者回報連線問題。

### 4. 告警規則

AlertManager 已部署，但可能需要針對此環境客製化的告警規則。預設規則（若有）可能未涵蓋 Ceph 健康警告、Galera 叢集狀態、RabbitMQ 佇列深度或磁碟空間閾值。

### 5. 日誌彙整

Fluentd 收集日誌，但 **尚未** 接上集中式日誌彙整後端。叢集中雖已部署 OpenSearch（三個控制節點，作為 [CloudKitty 計價資料](../openstack/service-catalog.md) 的儲存後端），但 Kolla 的 central logging（`enable_central_logging`）並未啟用，因此 Fluentd 的日誌目前未匯入該 OpenSearch、無法被搜尋或長期保留。可重用既有的 OpenSearch 叢集作為日誌後端，避免另起一套儲存。

### 6. 值班輪替

未發現 PagerDuty、Opsgenie 或類似工具的整合。AlertManager 的告警可能無法在工作時間外及時送達維運人員。

### 7. 合成監控

Blackbox exporter 已部署，但已設定的探測範圍不明。針對使用者面向端點（Horizon 儀表板、API 端點、公開網路可達性）的合成檢查可能不完整或未設定。

## 改善路線圖

### 第 1 階段：關鍵告警（立即）

- 設定 AlertManager 規則，涵蓋：
  - Ceph 健康警告與錯誤
  - 服務中斷（OpenStack API、RabbitMQ、MariaDB）
  - 磁碟空間閾值（使用率 >80%）
  - 節點不可達
- 驗證 Ceph Prometheus 模組已啟用並被抓取。

### 第 2 階段：網路監控（短期）

- 部署 SNMP exporter，涵蓋 Arista、Juniper NFX250 和 EX3300。
- 新增 BGP session 狀態監控，並設定 peer down 事件告警。
- 建立 Grafana 儀表板，呈現網路設備健康狀態和介面使用率。

### 第 3 階段：日誌彙整（中期）

- 啟用 Kolla central logging，將 Fluentd 日誌匯入既有的 OpenSearch 叢集（目前僅供 CloudKitty 計價資料使用）。
- 設定保留策略和索引生命週期管理。
- 建立日誌搜尋和錯誤分析的儀表板。

### 第 4 階段：合成監控（中期）

- 擴展 Blackbox exporter 設定，涵蓋：
  - Horizon 儀表板可用性
  - Keystone、Nova、Neutron、Cinder、Glance API 端點
  - 從租戶網路到外部網路的可達性
- 設定探測失敗的告警。

### 第 5 階段：事件管理（長期）

- 將 AlertManager 與值班輪替工具（PagerDuty、Opsgenie 或類似工具）整合。
- 定義升級策略及常見告警的 runbook。
- 建立事件後檢討流程。
