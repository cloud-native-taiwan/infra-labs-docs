---
sidebar_position: 2
---

# 服務目錄與端點

所有 OpenStack 服務皆註冊於 Keystone 服務目錄中，具備公開端點和內部端點。公開端點透過 HAProxy 以 TLS 提供服務。內部端點則使用 API VIP（192.168.113.252）上的純 HTTP。

## 端點列表

| 服務 | 類型 | 公開端點 | 內部端點 |
|------|------|----------|----------|
| Keystone | identity | `https://openstack.cloudnative.tw:5000` | `http://192.168.113.252:5000` |
| Nova | compute | `https://openstack.cloudnative.tw:8774/v2.1` | `http://192.168.113.252:8774/v2.1` |
| Nova Legacy | compute_legacy | `https://openstack.cloudnative.tw:8774/v2/%(tenant_id)s` | `http://192.168.113.252:8774/v2/%(tenant_id)s` |
| Neutron | network | `https://openstack.cloudnative.tw:9696` | `http://192.168.113.252:9696` |
| Glance | image | `https://openstack.cloudnative.tw:9292` | `http://192.168.113.252:9292` |
| Cinder | block-storage | `https://openstack.cloudnative.tw:8776/v3` | `http://192.168.113.252:8776/v3` |
| Cinderv3 | volumev3 | `https://openstack.cloudnative.tw:8776/v3/%(tenant_id)s` | `http://192.168.113.252:8776/v3/%(tenant_id)s` |
| Swift (RGW) | object-store | `https://s3.cloudnative.tw:6780/swift/v1/AUTH_%(project_id)s` | `http://192.168.113.252:6780/swift/v1/AUTH_%(project_id)s` |
| Heat | orchestration | `https://openstack.cloudnative.tw:8004/v1/%(tenant_id)s` | `http://192.168.113.252:8004/v1/%(tenant_id)s` |
| Heat CFN | cloudformation | `https://openstack.cloudnative.tw:8000/v1` | `http://192.168.113.252:8000/v1` |
| Designate | dns | `https://openstack.cloudnative.tw:9001` | `http://192.168.113.252:9001` |
| Octavia | load-balancer | `https://openstack.cloudnative.tw:9876` | `http://192.168.113.252:9876` |
| Placement | placement | `https://openstack.cloudnative.tw:8780` | `http://192.168.113.252:8780` |
| CloudKitty | rating | `https://openstack.cloudnative.tw:8889` | `http://192.168.113.252:8889` |
| Skyline | panel | `https://openstack.cloudnative.tw:9998` | `http://192.168.113.252:9998` |

## 備註

- 所有公開端點使用 HTTPS（TLS 於 HAProxy 終止）。
- 所有內部端點使用 API VIP（192.168.113.252）上的純 HTTP，經由 VLAN 1113。
- Swift 端點由 Ceph RADOS Gateway（RGW）提供，支援 S3 相容及 Swift 相容的物件儲存。
- Skyline 為儀表板 UI，取代 Horizon。
- CloudKitty（`rating`）提供資源計價（rating），為每月的 **顯示計費（showback）** 報表計算成本；其計價資料儲存於 OpenSearch（見[控制平面](control-plane.md#opensearch)）。計價邏輯與費率詳見[資源計價方式](../operations/resource-pricing.md)。
- 內部端點埠號為 Kolla-Ansible 預設值；若有自訂 `*_api_port`，請以實際 Keystone 目錄為準（`openstack endpoint list`）。
- Region：**RegionOne**（單一 region 部署）。

## 服務相依性圖

```mermaid
graph TD
    KS["Keystone<br/>(identity)"]
    Nova["Nova<br/>(compute)"]
    Neutron["Neutron<br/>(network)"]
    Glance["Glance<br/>(image)"]
    Cinder["Cinder<br/>(block-storage)"]
    Swift["Swift / RGW<br/>(object-store)"]
    Heat["Heat<br/>(orchestration)"]
    Designate["Designate<br/>(dns)"]
    Octavia["Octavia<br/>(load-balancer)"]
    Placement["Placement"]
    Skyline["Skyline<br/>(dashboard)"]
    CloudKitty["CloudKitty<br/>(rating)"]
    OpenSearch["OpenSearch<br/>(rating storage)"]

    Nova --> KS
    Nova --> Neutron
    Nova --> Glance
    Nova --> Cinder
    Nova --> Placement
    Neutron --> KS
    Glance --> KS
    Glance --> Swift
    Cinder --> KS
    Swift --> KS
    Heat --> KS
    Heat --> Nova
    Heat --> Neutron
    Heat --> Cinder
    Designate --> KS
    Designate --> Neutron
    Octavia --> KS
    Octavia --> Neutron
    Octavia --> Nova
    Skyline --> KS
    Placement --> KS
    CloudKitty --> KS
    CloudKitty -->|查詢 flavor| Nova
    CloudKitty -.->|計價資料儲存| OpenSearch
```

> OpenSearch 為後端資料儲存（datastore），並非註冊於 Keystone 目錄的服務，故以虛線表示。

所有服務皆透過 Keystone 進行驗證。Nova 是關聯性最高的服務，依賴 Neutron 提供網路、Glance 提供映像檔、Cinder 提供磁碟區，以及 Placement 進行資源追蹤。
