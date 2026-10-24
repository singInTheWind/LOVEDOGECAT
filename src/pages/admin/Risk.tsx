import { useState } from 'react'
import { AdminShell } from '../../components/AdminShell'
import { riskRules } from '../../data/mock'

export default function Risk() {
  const [rules, setRules] = useState(riskRules)

  return (
    <AdminShell title="风控配置">
      <p className="mb-3 text-sm text-gray-600">
        同设备 / 同 IP 等规则拦截异常绑定与刷单。命中后可人工复核（Mock 开关）。
      </p>
      <ul className="space-y-2">
        {rules.map((r) => (
          <li
            key={r.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded border border-gray-300 px-3 py-3 text-sm"
          >
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-xs text-gray-500">处置：{r.action}</div>
            </div>
            <button
              type="button"
              onClick={() =>
                setRules((list) =>
                  list.map((x) => (x.id === r.id ? { ...x, enabled: !x.enabled } : x)),
                )
              }
              className={`rounded px-3 py-1 text-xs font-medium text-white ${
                r.enabled ? 'bg-gray-900' : 'bg-gray-400'
              }`}
            >
              {r.enabled ? '启用中' : '已关闭'}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded border border-dashed border-gray-400 bg-gray-50 p-3 text-xs text-gray-600">
        后端仍强制：二级层级校验、推广链接签名、脱敏、全链路日志（本原型仅示意配置面）。
      </div>
    </AdminShell>
  )
}
