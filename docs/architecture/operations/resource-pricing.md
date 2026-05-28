---
sidebar_position: 5
---

# 資源計價方式

本文件說明 Infra Labs 如何計算與決定每項資源的價格。這套機制是「顯示計費（showback）」——目的是讓使用者看見這套免費基礎設施的真實價值，並鼓勵清理閒置的 VM，而非實際向使用者請款。

## 為什麼計價：顯示計費（Showback），而非真實帳單

Infra Labs 的計價是 **顯示計費（showback）**，不是真實的計費或請款。系統每月會寄出一份成本報表給各專案成員，但 **不會** 產生帳單或發票、**不涉及任何金流**，也 **不會** 強制配額或自動刪除資源。

為避免誤解，先界定本文件的用語：「**計價**」指 *算出某項資源值多少錢*（估算其價值），而「**請款／收款**」指 *實際向使用者收取金錢*。Infra Labs 只做前者，從不做後者。

目的有兩個：

- **價值意識**——讓使用者知道「這套免費的基礎設施其實是有成本的」。
- **清理誘因**——對長期閒置、卻仍佔用資源的 VM 形成溫和的提醒。

成本報表的資料來源、產生流程與寄送機制屬於維運工具範疇（CloudKitty + 每月報表程式），本文件聚焦於 **價格本身是如何訂出來的**。

## 定價哲學：錨定在平價雲端的約 65%

我們的費率是 **供應商中立** 的，並 **錨定在平價雲端方案（如 DigitalOcean、Vultr）的約 65%**，而非對標 AWS/GCP 等超大規模雲。

理由很單純：Infra Labs **不提供任何可用性 SLA**，也 **沒有儲存 QoS 保證**。因此誠實的對標對象應該是平價 VPS 與 LowEndBox 等級的供應商，而不是超大規模雲。

以一台 2 vCPU / 4 GB 的 VM 為例，這套費率會落在每月約 **$15**，位於：

- 平價 VPS（約 $20–24/月，但對方提供 99.99% SLA）之下，以及
- 無 SLA 的 LowEndBox 底價（約 $5/月）之上。

整張費率表由 `rate.py` 頂端的單一 `MULTIPLIER` 常數統一縮放；若想要更溫和的提醒效果，可將其調低（例如 `0.5`）。**目前 `MULTIPLIER = 1.0`**，因此下方表列的費率即為實際套用的值，未再額外打折。

## 計價模型

價格 **不是** 逐一手動列舉每個 flavor。系統會即時從 Nova 讀取 flavor 清單，並依據各 flavor 的 **vCPU 數** 與 **RAM 容量** 推導出每個計價週期的成本：

```
每小時成本 = vCPU 費率 × vCPU 數 + RAM 費率 × RAM (GiB)
每週期成本 = 每小時成本 × MULTIPLIER ÷ 每小時週期數
```

採用週期收集（每 10 分鐘一個週期），所有費率以「每小時」或「每月」表示，實際每週期金額由系統在執行時換算。

### 目前費率

| 資源 | 費率 | 錨定基準（平價雲約 65%） |
|------|------|--------------------------|
| vCPU | $0.006 / vCPU-小時 | 平價 VPS（DO/Vultr）共享 CPU，拆解後因無 SLA 折扣 |
| RAM | $0.002 / GB-小時 | 刻意壓低：此處 RAM 充裕，真正稀缺的是 vCPU / 實例數 |
| 儲存 | $0.04 / GiB-月 | 平價區塊儲存（DO/Vultr 約 $0.05–0.10）的約 65%：複寫式 Ceph RBD，無 SLA、無 QoS/IOPS 保證 |
| GPU `TeslaT10` | +$0.25 / 小時 | T4/T10 等級社群／代管推論（$0.20–0.30） |
| GPU `NVIDIA-A5000-24Q`（完整 24 GB） | +$0.25 / 小時 | RunPod/Vast 社群 A5000 隨需（$0.16–0.27） |
| GPU `NVIDIA-A5000-12Q`（半張 12 GB） | +$0.125 / 小時 | 完整切片的一半 |
| GPU `Intel-Arc-Pro-B50-VF` | +$0.15 / 小時 | 無雲端對標；依 INT8 TOPS（約 170）歸入 T 級，MSRP $349 |

### 每月成本範例（24/7 運轉）

| Flavor | 每小時 | 每月（約） |
|--------|--------|------------|
| 2 vCPU / 4 GB | `0.006×2 + 0.002×4 = $0.020/小時` | ~$15（約為 DO/Vultr $22 的 65%） |
| 4 vCPU / 8 GB | — | ~$29 |
| 8 vCPU / 16 GB | — | ~$58 |
| 4 vCPU / 8 GB + `NVIDIA-A5000-24Q` | `0.029（運算）+ 0.25（GPU 加成）= $0.279/小時` | ~$204（運算 ~$29 + GPU ~$175） |

GPU 範例顯示加成項的份量：同一台 4 vCPU / 8 GB 的 VM，加上一張完整 A5000 後，月成本主要由 GPU 加成（~$175）主導，運算部分（~$29）反而是小頭。

## 各資源類別的決策說明

### 運算（vCPU 與 RAM）

vCPU 是這套環境中相對稀缺的資源，因此其費率是計價的主軸；RAM 則因供應充裕而 **刻意壓低**。這樣的權重設計，讓「實例數量」與「vCPU 配置」成為使用者最該關注的成本因子。

### GPU 為加成項，且不打 65% 折扣

GPU 費率是 **疊加在 flavor 運算成本之上的加成項**，並 **不** 像運算與儲存那樣折到 65%。原因是這些費率本身已經落在社群市集（RunPod／Vast）水準——這已是這類顯示卡無 SLA 的底價；同時 GPU 是最稀缺的資源，值得保持其成本的「可見度」。

GPU flavor 由其 `pci_passthrough:alias` 屬性自動偵測。若出現費率表中未列的新 GPU alias，該 VM 會 **僅以運算成本計價**，並在處理器日誌中留下警告。

### 儲存採單一混合 GiB 費率

儲存以單一的混合 GiB 費率計價，原因是收集到的指標（`openstack_cinder_limits_volume_used_gb`）是 **各專案的總量**，沒有 volume type 的細分；且 Ceph 後端本身不提供每個 volume 的 QoS。費率錨定在平價區塊儲存的約 65%，反映其為複寫式 Ceph RBD、無 SLA、無 IOPS 保證的特性。

### 網路刻意不計量

網路流量 **刻意不納入計價**。目前持續上行頻寬約 2 Gb/s，因此重度 egress 的工作負載是 **被勸退、但不計入成本** 的。

## 計價的可信度與失敗處理

計價邏輯透過 Nova API 將每個實例的 UUID 對應到 flavor。當 Nova 發生問題時：

- **快取命中**：直接以記憶體中的快取計價，不打 API。
- **快取未命中（新建 VM）**：同步嘗試重整快取，含退避重試；若全數失敗，該實例 **以 $0 計價** 並留下警告。
- **快取整體重整失敗**：既有快取繼續沿用；不在快取中的 UUID 以 $0 計價。

這背後是一條明確的實驗室政策：**若無法驗證，就不計入成本。** 寧可少算，也不錯算。也因此，成本報表本質上是一份 **保守的下限估計**——在 Nova 故障或 VM 剛建立的期間，實際價值可能略高於報表所顯示的數字。

## 調整費率

費率調整由維運人員操作，流程概述如下（詳見維運手冊）：

1. 修改計價腳本頂端的費率常數（vCPU、RAM、儲存、GPU、MULTIPLIER）。
2. 重新推送腳本（以名稱 upsert，原地更新）。
3. 若調整需套用到既有資料，對歷史週期觸發 **重新計價（reprocess）**，再重新產生受影響月份的報表。

由於計價是按週期儲存的，**啟用計價之前** 收集的週期會被記為零費率，只能透過事後 reprocess 修正。

## 計價錨點來源

費率錨點（2026 年 5 月取得）：

- 平價 VPS（主要錨點）：
  [DigitalOcean Droplet Pricing](https://www.digitalocean.com/pricing/droplets) /
  [Vultr Regular Performance Compute](https://www.vultr.com/products/regular-performance-compute/)
- 平價區塊儲存：
  [DigitalOcean Volume Pricing](https://docs.digitalocean.com/products/volumes/details/pricing/)（$0.10/GiB-月，NVMe，99.99% SLA）/
  [Vultr Block Storage](https://www.vultr.com/products/block-storage/)（HDD 約 $0.05/GiB-月）
- 無 SLA 底價（用於校驗低端）：
  [LowEndBox](https://lowendbox.com/)（4 GB KVM VPS 常見約 $4–5/月）
- 超大規模雲參考（我們刻意低於的水準）：
  [AWS EC2 On-Demand](https://aws.amazon.com/ec2/pricing/on-demand/) /
  [Google Cloud VM Pricing](https://cloud.google.com/compute/vm-instance-pricing)
- GPU（社群市集）：
  [RunPod RTX A5000](https://www.runpod.io/gpu-models/rtx-a5000) /
  [Vast.ai RTX A5000](https://vast.ai/pricing/gpu/RTX-A5000)；
  [Intel Arc Pro B50 規格/MSRP - Tom's Hardware](https://www.tomshardware.com/pc-components/gpus/intel-launches-usd299-arc-pro-b50-with-16gb-of-memory)
