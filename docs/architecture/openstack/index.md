---
sidebar_position: 6
sidebar_label: "OpenStack 服務"
---

# OpenStack 架構

Infra Labs 透過 **Kolla-Ansible** 部署 OpenStack，所有服務皆以 Docker 容器方式運行。控制平面橫跨三個控制節點（`openstack01`、`openstack02`、`openstack04`），為所有 API 服務、資料庫和訊息佇列提供高可用性。運算工作負載則在專用的運算節點上執行。

網路部分採用 **OVN**（Open Virtual Network）作為 ML2 mechanism driver，提供分散式虛擬路由、安全群組，以及透過 Geneve 隧道實現的 overlay 網路。

資源計價由 **CloudKitty**（`rating` 服務）負責，以 **OpenSearch** 為儲存後端，產生每月的顯示計費（showback）報表。計價邏輯與費率詳見[資源計價方式](../operations/resource-pricing.md)。

## 子頁面

- [控制平面與高可用性](control-plane.md) -- HA 架構、叢集服務、quorum 需求
- [服務目錄與端點](service-catalog.md) -- 所有已註冊的 OpenStack 服務及其公開/內部端點
- [Neutron 網路（OVN）](neutron-networking.md) -- OVN 拓撲、provider 網路、租戶 overlay 及網路代理
- [身分與存取管理](identity-and-access.md) -- Keystone 設定、Fernet token、使用者上線流程及配額

## 部署參考

- **部署工具**：Kolla-Ansible（容器化 OpenStack）
- **容器執行環境**：Docker
- **容器映像檔**：AMD64，託管於 Harbor registry（registry.cloudnative.tw）
- **設定檔儲存庫**：[infra-labs-kolla-ansible](https://github.com/cloud-native-taiwan/infra-labs-kolla-ansible)
