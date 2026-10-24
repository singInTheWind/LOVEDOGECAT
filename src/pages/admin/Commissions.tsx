import { useState } from 'react'
import { AdminShell } from '../../components/AdminShell'
import { GhostBtn, Toast } from '../../components/Wireframe'
import { adminWithdrawals } from '../../data/mock'

export default function AdminCommissions() {
  const [rows, setRows] = useState(adminWithdrawals)
  const [toast, setToast] = useState<string | null>(null)

  const audit = (id: string, pass: boolean) => {
    setRows((list) =>
      list.map((r) =>
        r.id === id ? { ...r, status: pass ? 'paid' : 'rejected' } : r,
      ),
    )
    setToast(pass ? '审核通过 · 已打款（Mock）' : '已驳回（Mock）')
    window.setTimeout(() => setToast(null), 2000)
  }

  return (
    <AdminShell title="佣金与提现管理">
      <p className="mb-3 text-sm text-gray-600">
        人工审核提现；坏账标记用于已提现后退款的后续抵扣。链接结算流程图见交互总览。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-xs text-gray-500">
              <th className="py-2 pr-3">用户</th>
              <th className="py-2 pr-3">金额</th>
              <th className="py-2 pr-3">时间</th>
              <th className="py-2 pr-3">状态</th>
              <th className="py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-200 align-top">
                <td className="py-3 pr-3">{r.user}</td>
                <td className="py-3 pr-3 tabular-nums">¥{r.amount}</td>
                <td className="py-3 pr-3 text-xs text-gray-500">{r.time}</td>
                <td className="py-3 pr-3">
                  <Status status={r.status} />
                  {r.note ? (
                    <div className="mt-1 text-[11px] text-red-700">{r.note}</div>
                  ) : null}
                </td>
                <td className="py-3">
                  {r.status === 'pending_audit' ? (
                    <div className="flex gap-2">
                      <GhostBtn className="!py-1 text-xs" onClick={() => audit(r.id, true)}>
                        通过
                      </GhostBtn>
                      <GhostBtn className="!py-1 text-xs" onClick={() => audit(r.id, false)}>
                        驳回
                      </GhostBtn>
                    </div>
                  ) : r.status === 'bad_debt' ? (
                    <span className="text-xs text-gray-500">进入抵扣队列</span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toast message={toast} />
    </AdminShell>
  )
}

function Status({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending_audit: '待审核',
    paid: '已打款',
    rejected: '已驳回',
    bad_debt: '坏账',
  }
  const color: Record<string, string> = {
    pending_audit: 'text-amber-700',
    paid: 'text-emerald-700',
    rejected: 'text-gray-600',
    bad_debt: 'text-red-700',
  }
  return <span className={`text-xs font-medium ${color[status]}`}>{map[status] || status}</span>
}
