import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function FlowCard({
  title,
  subtitle,
  children,
  to,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  to?: string
}) {
  const body = (
    <div className="rounded border border-gray-400 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p> : null}
        </div>
        {to ? (
          <span className="shrink-0 rounded border border-gray-400 px-2 py-0.5 text-[11px] text-gray-700">
            进入原型 →
          </span>
        ) : null}
      </div>
      {children}
    </div>
  )
  return to ? (
    <Link to={to} className="block transition hover:border-gray-700">
      {body}
    </Link>
  ) : (
    body
  )
}

export function Node({
  children,
  tone = 'default',
}: {
  children: ReactNode
  tone?: 'default' | 'ok' | 'warn' | 'danger' | 'muted'
}) {
  const tones = {
    default: 'border-gray-500 bg-white',
    ok: 'border-emerald-700 bg-emerald-50',
    warn: 'border-amber-700 bg-amber-50',
    danger: 'border-red-700 bg-red-50',
    muted: 'border-dashed border-gray-400 bg-gray-50 text-gray-500',
  }
  return (
    <div className={`flow-node text-center ${tones[tone]}`}>{children}</div>
  )
}

export function Arrow({ label }: { label?: string }) {
  return (
    <div className="flow-arrow flex flex-col items-center py-1">
      <span aria-hidden>↓</span>
      {label ? <span className="text-[11px]">{label}</span> : null}
    </div>
  )
}

export function HArrow({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-1 px-1 text-[11px] text-gray-500">
      <span aria-hidden>→</span>
      {label ? <span>{label}</span> : null}
    </div>
  )
}

export function BindingFlowDiagram() {
  return (
    <div className="space-y-1">
      <Node>微信授权登录（零门槛开通推广员）</Node>
      <Arrow label="扫码 / 分享链接" />
      <Node tone="ok">解析签名链接 + unionId 绑定上级</Node>
      <Arrow />
      <div className="grid grid-cols-2 gap-2">
        <Node tone="ok">首次绑定成功 · 锁定上级</Node>
        <Node tone="muted">再次扫其他码 · 忽略换绑</Node>
      </div>
      <Arrow label="系统强制校验" />
      <Node tone="warn">计酬层级硬上限：仅一级 / 二级</Node>
    </div>
  )
}

export function SettlementFlowDiagram() {
  return (
    <div className="space-y-1">
      <Node>用户支付（实付金额为基数）</Node>
      <Arrow />
      <Node tone="warn">佣金状态：待结算</Node>
      <Arrow label="确认收货 + 保本期无退款" />
      <Node tone="ok">可提现</Node>
      <Arrow />
      <div className="grid grid-cols-2 gap-2">
        <Node>申请提现 → 审核/自动打款</Node>
        <Node tone="danger">退款 → 佣金扣减 / 失效</Node>
      </div>
      <Arrow label="已提现后退款" />
      <Node tone="danger">坏账标记 · 后续提现抵扣</Node>
    </div>
  )
}

export function CJourneyDiagram() {
  const steps = [
    { to: '/c', label: '推广首页' },
    { to: '/c/materials', label: '素材中心' },
    { to: '/c/subs', label: '下级列表' },
    { to: '/c/commissions', label: '佣金明细' },
    { to: '/c/withdraw', label: '提现' },
  ]
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.to} className="flex items-center gap-2">
          <Link
            to={s.to}
            className="rounded border border-gray-500 bg-white px-3 py-2 text-xs font-medium text-gray-800 hover:bg-gray-50"
          >
            {s.label}
          </Link>
          {i < steps.length - 1 ? <span className="text-gray-400">→</span> : null}
        </div>
      ))}
    </div>
  )
}

export function AdminJourneyDiagram() {
  const steps = [
    { to: '/admin/config', label: '基础配置' },
    { to: '/admin/products', label: '商品分销' },
    { to: '/admin/materials', label: '素材管理' },
    { to: '/admin/users', label: '用户树' },
    { to: '/admin/commissions', label: '佣金提现' },
    { to: '/admin/risk', label: '风控' },
    { to: '/admin', label: '数据大盘' },
  ]
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.to + s.label} className="flex items-center gap-2">
          <Link
            to={s.to}
            className="rounded border border-gray-500 bg-white px-3 py-2 text-xs font-medium text-gray-800 hover:bg-gray-50"
          >
            {s.label}
          </Link>
          {i < steps.length - 1 ? <span className="text-gray-400">→</span> : null}
        </div>
      ))}
    </div>
  )
}
