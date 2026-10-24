import { Link } from 'react-router-dom'
import { AdminShell } from '../../components/AdminShell'
import { LaterTag } from '../../components/Wireframe'
import { dashboardStats } from '../../data/mock'

export default function Dashboard() {
  return (
    <AdminShell
      title="分销数据大盘"
      actions={
        <span className="rounded border border-dashed border-gray-400 px-2 py-1 text-xs text-gray-500">
          数据 Mock · 非实时
        </span>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardStats.map((s) => (
          <div key={s.label} className="rounded border border-gray-300 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className="mt-2 text-2xl font-semibold tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded border border-dashed border-gray-400 p-4">
          <div className="text-sm font-medium">漏斗（线框）</div>
          <div className="mt-3 space-y-2 text-sm">
            <Bar label="曝光分享" w="100%" />
            <Bar label="扫码/点击" w="72%" />
            <Bar label="授权开通" w="48%" />
            <Bar label="首单支付" w="31%" />
            <Bar label="过保本期结算" w="24%" />
          </div>
        </div>
        <div className="rounded border border-dashed border-gray-400 p-4 text-sm">
          <div className="mb-2 flex items-center gap-2 font-medium">
            快捷入口 <LaterTag />
          </div>
          <ul className="space-y-2">
            <li>
              <Link className="underline" to="/admin/commissions">
                待审核提现 1 笔
              </Link>
            </li>
            <li>
              <Link className="underline" to="/admin/risk">
                风控告警 3 条
              </Link>
            </li>
            <li>
              <Link className="underline" to="/admin/materials">
                草稿素材 1 条待发布
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            服务通知 / 等级看板标为「后续」，本原型不展开。
          </p>
        </div>
      </div>
    </AdminShell>
  )
}

function Bar({ label, w }: { label: string; w: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-gray-500">
        <span>{label}</span>
        <span>{w}</span>
      </div>
      <div className="h-3 rounded bg-gray-100">
        <div className="h-3 rounded bg-gray-700" style={{ width: w }} />
      </div>
    </div>
  )
}
