import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MobileShell } from '../../components/MobileShell'
import { ScreenLabel, StateBanner, TabBar } from '../../components/Wireframe'
import { commissions, type CommissionStatus } from '../../data/mock'

const statusLabel: Record<CommissionStatus, string> = {
  pending: '待结算',
  withdrawable: '可提现',
  invalid: '退款失效',
}

export default function Commissions() {
  const [tab, setTab] = useState<CommissionStatus | 'all'>('all')
  const [range, setRange] = useState('30d')
  const [loading, setLoading] = useState(false)

  const list = useMemo(() => {
    const filtered = tab === 'all' ? commissions : commissions.filter((c) => c.status === tab)
    return filtered
  }, [tab])

  const reload = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 800)
  }

  return (
    <MobileShell
      title="佣金明细"
      right={
        <Link to="/c/withdraw" className="text-[11px] text-gray-700">
          提现
        </Link>
      }
    >
      <div className="p-3 pb-0">
        <ScreenLabel>C · 待结算 / 可提现 / 退款失效</ScreenLabel>
        <div className="mb-2 flex gap-2">
          {[
            { id: '7d', label: '近7日' },
            { id: '30d', label: '近30日' },
            { id: 'all', label: '全部' },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setRange(r.id)
                reload()
              }}
              className={`rounded border px-2 py-1 text-xs ${
                range === r.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-400 bg-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <TabBar
        tabs={[
          { id: 'all', label: '全部' },
          { id: 'pending', label: '待结算' },
          { id: 'withdrawable', label: '可提现' },
          { id: 'invalid', label: '退款失效' },
        ]}
        active={tab}
        onChange={(id) => setTab(id as CommissionStatus | 'all')}
      />

      <div className="space-y-2 p-3">
        {loading ? (
          <StateBanner tone="loading">
            <div className="space-y-2">
              <div className="skeleton h-12" />
              <div className="skeleton h-12" />
            </div>
          </StateBanner>
        ) : list.length === 0 ? (
          <StateBanner tone="empty">该筛选下暂无佣金记录。</StateBanner>
        ) : (
          list.map((c) => (
            <div key={c.id} className="wf-solid rounded bg-white p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">{c.orderNo}</div>
                  <div className="mt-0.5 text-[11px] text-gray-500">
                    {c.time} · {c.level}级 · 买家 {c.buyer}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold tabular-nums">+¥{c.amount.toFixed(2)}</div>
                  <div
                    className={`mt-0.5 text-[11px] ${
                      c.status === 'invalid'
                        ? 'text-red-700'
                        : c.status === 'pending'
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                    }`}
                  >
                    {statusLabel[c.status]}
                  </div>
                </div>
              </div>
              {c.reason ? (
                <div className="mt-2 rounded bg-red-50 px-2 py-1 text-[11px] text-red-800">
                  {c.reason}
                </div>
              ) : null}
            </div>
          ))
        )}
        <Link to="/flows/settlement" className="block text-center text-xs text-gray-500 underline">
          查看结算状态机流程图
        </Link>
      </div>
    </MobileShell>
  )
}
