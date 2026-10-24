export type CommissionStatus = 'pending' | 'withdrawable' | 'invalid'

export const promoterStats = {
  level1Count: 28,
  level2Count: 96,
  orderCount: 214,
  pendingAmount: 1286.4,
  withdrawableAmount: 3520.8,
  totalEarned: 18640.5,
}

export const materialCategories = [
  { id: 'poster', name: '商品海报', count: 12, hasNew: true },
  { id: 'campaign', name: '活动营销', count: 8, hasNew: true },
  { id: 'brand', name: '品牌宣传', count: 5, hasNew: false },
  { id: 'moments', name: '朋友圈文案', count: 18, hasNew: false },
] as const

export const materials = [
  {
    id: 'm1',
    type: 'image' as const,
    category: 'poster',
    title: '春季爆款·护手霜套装',
    pinned: true,
    recommend: true,
    recent: true,
    isNew: true,
    qrHint: '右下角二维码位',
  },
  {
    id: 'm2',
    type: 'image' as const,
    category: 'campaign',
    title: '满减活动海报',
    pinned: false,
    recommend: true,
    recent: false,
    isNew: true,
    qrHint: '中部居中二维码位',
  },
  {
    id: 'm3',
    type: 'copy' as const,
    category: 'moments',
    title: '朋友圈种草文案 A',
    pinned: true,
    recommend: false,
    recent: true,
    isNew: false,
    body: '这款真的回购了三次｜亲测好用｜扫码同款→',
  },
  {
    id: 'm4',
    type: 'image' as const,
    category: 'brand',
    title: '品牌故事长图',
    pinned: false,
    recommend: false,
    recent: false,
    isNew: false,
    qrHint: '底部横条二维码位',
  },
  {
    id: 'm5',
    type: 'copy' as const,
    category: 'moments',
    title: '限时拼团话术',
    pinned: false,
    recommend: true,
    recent: false,
    isNew: false,
    body: '今晚 24 点结束｜拼团价更香｜点开海报扫码参团',
  },
]

export const subordinates = {
  level1: [
    {
      id: 'u1',
      nickname: '小*鱼',
      avatar: '🐟',
      registeredAt: '2026-03-12',
      orders: 18,
      amount: 2460,
    },
    {
      id: 'u2',
      nickname: '阿*明',
      avatar: '🧑',
      registeredAt: '2026-04-02',
      orders: 9,
      amount: 980,
    },
    {
      id: 'u3',
      nickname: '林*子',
      avatar: '👩',
      registeredAt: '2026-05-18',
      orders: 4,
      amount: 320,
    },
  ],
  level2: [
    {
      id: 'u4',
      nickname: '周*周',
      avatar: '🙂',
      registeredAt: '2026-04-20',
      orders: 6,
      amount: 540,
      via: '小*鱼',
    },
    {
      id: 'u5',
      nickname: '陈*然',
      avatar: '😎',
      registeredAt: '2026-06-01',
      orders: 2,
      amount: 168,
      via: '阿*明',
    },
  ],
}

export const commissions = [
  {
    id: 'c1',
    orderNo: 'SO20261023001',
    buyer: '小*鱼',
    level: 1,
    amount: 36.5,
    status: 'pending' as CommissionStatus,
    time: '2026-10-23 14:21',
  },
  {
    id: 'c2',
    orderNo: 'SO20261020088',
    buyer: '周*周',
    level: 2,
    amount: 12.8,
    status: 'withdrawable' as CommissionStatus,
    time: '2026-10-20 09:03',
  },
  {
    id: 'c3',
    orderNo: 'SO20261015012',
    buyer: '阿*明',
    level: 1,
    amount: 48.0,
    status: 'withdrawable' as CommissionStatus,
    time: '2026-10-15 19:44',
  },
  {
    id: 'c4',
    orderNo: 'SO20261010007',
    buyer: '陈*然',
    level: 2,
    amount: 9.6,
    status: 'invalid' as CommissionStatus,
    time: '2026-10-10 11:12',
    reason: '整单退款·佣金失效',
  },
]

export const withdrawHistory = [
  {
    id: 'w1',
    amount: 500,
    status: 'auto_paid',
    label: '自动打款成功',
    time: '2026-10-08 10:00',
  },
  {
    id: 'w2',
    amount: 1200,
    status: 'manual_review',
    label: '人工审核中',
    time: '2026-10-22 16:30',
  },
  {
    id: 'w3',
    amount: 300,
    status: 'rejected',
    label: '审核驳回·需补充信息',
    time: '2026-09-18 12:10',
  },
]

export const adminConfig = {
  enabled: true,
  level1Rate: 10,
  level2Rate: 5,
  protectDays: 7,
  withdrawThreshold: 50,
  autoPayLimit: 800,
}

export const adminProducts = [
  {
    id: 'p1',
    name: '护手霜套装',
    price: 128,
    level1: 12,
    level2: 6,
    override: true,
    onSale: true,
  },
  {
    id: 'p2',
    name: '身体乳 500ml',
    price: 89,
    level1: null,
    level2: null,
    override: false,
    onSale: true,
  },
  {
    id: 'p3',
    name: '礼盒·节日限定',
    price: 268,
    level1: 15,
    level2: 7,
    override: true,
    onSale: false,
  },
]

export const adminUsers = [
  {
    id: 'root',
    name: '张*推广',
    level: 0,
    status: 'active',
    children: [
      {
        id: 'u1',
        name: '小*鱼',
        level: 1,
        status: 'active',
        children: [
          { id: 'u4', name: '周*周', level: 2, status: 'active', children: [] },
        ],
      },
      {
        id: 'u2',
        name: '阿*明',
        level: 1,
        status: 'disabled',
        children: [
          { id: 'u5', name: '陈*然', level: 2, status: 'active', children: [] },
        ],
      },
    ],
  },
]

export const adminWithdrawals = [
  {
    id: 'aw1',
    user: '张*推广',
    amount: 1200,
    status: 'pending_audit',
    time: '2026-10-22 16:30',
  },
  {
    id: 'aw2',
    user: '小*鱼',
    amount: 80,
    status: 'bad_debt',
    time: '2026-10-19 08:12',
    note: '已提现后退款·标记坏账抵扣',
  },
  {
    id: 'aw3',
    user: '林*子',
    amount: 200,
    status: 'paid',
    time: '2026-10-08 10:00',
  },
]

export const adminMaterials = [
  {
    id: 'am1',
    title: '春季爆款·护手霜套装',
    status: 'published',
    qr: { x: 78, y: 82 },
    copyBound: true,
  },
  {
    id: 'am2',
    title: '满减活动海报',
    status: 'draft',
    qr: { x: 50, y: 55 },
    copyBound: false,
  },
]

export const dashboardStats = [
  { label: '今日新增推广员', value: '36' },
  { label: '今日分销订单', value: '128' },
  { label: '待结算佣金', value: '¥18,420' },
  { label: '可提现池', value: '¥42,860' },
  { label: '本月累计佣金', value: '¥196,500' },
  { label: '坏账待抵扣', value: '¥1,280' },
]

export const riskRules = [
  { id: 'r1', name: '同设备多账号绑定', enabled: true, action: '拦截并人工复核' },
  { id: 'r2', name: '同 IP 短时高频注册', enabled: true, action: '限流 + 告警' },
  { id: 'r3', name: '自买自推异常订单', enabled: true, action: '佣金挂起' },
  { id: 'r4', name: '提现设备与下单设备不一致', enabled: false, action: '转人工审核' },
]
