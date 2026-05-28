/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    'intro',
    {
      type: 'category',
      label: '基礎教學',
      link: {
        type: 'generated-index',
        description: "5 分鐘內熟悉 Openstack 並且建立 VM。"
      },
      items: [
        'tutorial-basics/upload-ssh-key',
        'tutorial-basics/create-security-group',
        'tutorial-basics/create-vm',
        'tutorial-basics/congratulations',
      ]
    },
    {
      type: 'category',
      label: '進階教學',
      link: {
        type: 'generated-index',
      },
      items: [
        'tutorial-extra/create-private-network',
        'tutorial-extra/floating-ip',
        'tutorial-extra/create-volume',
      ]
    },
    'faq',
  ],
  architecture: [
    { type: 'doc', id: 'architecture/index', label: '架構總覽' },
    { type: 'doc', id: 'architecture/overview', label: '系統概覽' },
    {
      type: 'category',
      label: '網路架構',
      link: { type: 'doc', id: 'architecture/network/index' },
      items: [
        'architecture/network/physical-topology',
        'architecture/network/vlan-ip-addressing',
        'architecture/network/routing',
        'architecture/network/traffic-flows',
      ],
    },
    {
      type: 'category',
      label: '運算架構',
      link: { type: 'doc', id: 'architecture/compute/index' },
      items: [
        'architecture/compute/hardware-inventory',
        'architecture/compute/node-roles',
        'architecture/compute/multi-arch',
      ],
    },
    {
      type: 'category',
      label: '儲存架構',
      link: { type: 'doc', id: 'architecture/storage/index' },
      items: [
        'architecture/storage/ceph-topology',
        'architecture/storage/crush-map',
        'architecture/storage/pools-and-backends',
      ],
    },
    {
      type: 'category',
      label: 'OpenStack 服務',
      link: { type: 'doc', id: 'architecture/openstack/index' },
      items: [
        'architecture/openstack/control-plane',
        'architecture/openstack/service-catalog',
        'architecture/openstack/neutron-networking',
        'architecture/openstack/identity-and-access',
      ],
    },
    {
      type: 'category',
      label: '維運',
      link: { type: 'doc', id: 'architecture/operations/index' },
      items: [
        'architecture/operations/high-availability',
        'architecture/operations/disaster-recovery',
        'architecture/operations/monitoring-gaps',
        'architecture/operations/capacity-planning',
        'architecture/operations/resource-pricing',
      ],
    },
    {
      type: 'category',
      label: 'Admin Cookbook',
      link: {
        type: 'generated-index',
        description: 'Admin 管理相關操作 Cookbook',
      },
      items: [
        'admin/image_build',
        'admin/openstack_operation',
      ],
    },
  ],
  self_paced_labs: [
    'self-paced-labs',
    {
      type: 'category',
      label: 'Network',
      collapsed: true,
      link: {
        type: 'generated-index',
      },
      items: [
        'self-paced-labs/frr_bgp'
      ]
    },
    {
      type: 'category',
      label: 'Container',
      collapsed: true,
      link: {
        type: 'generated-index',
      },
      items: [
        'self-paced-labs/kaniko/index',
        'self-paced-labs/tool_compare_lab/index',
      ]
    },
    {
      type: 'category',
      label: 'Kubernetes',
      collapsed: true,
      link: {
        type: 'generated-index',
      },
      items: [
        'self-paced-labs/kops/index',
        'self-paced-labs/kubeadm/index',
        'self-paced-labs/kwok-in-docker/index',
        'self-paced-labs/vault/index',
        'self-paced-labs/quarkus-with-helm-charts/index',
        'self-paced-labs/vault-secrets-store-csi-with-quarkus/index',
        'self-paced-labs/prometheus/index',
      ]
    },
    {
      type: 'category',
      label: 'Continuous Delivery',
      collapsed: true,
      link: {
        type: 'generated-index',
      },
      items: [
        'self-paced-labs/argocd-multiple-clusters/index',
      ]
    }
  ],
};

module.exports = sidebars;
