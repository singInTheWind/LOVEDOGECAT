import { useState } from 'react'
import { AdminShell } from '../../components/AdminShell'
import { PrimaryBtn, Toast } from '../../components/Wireframe'
import { adminConfig } from '../../data/mock'

export default function Config() {
  const [cfg, setCfg] = useState(adminConfig)
  const [toast, setToast] = useState<string | null>(null)

  return (
    <AdminShell title="分销基础配置">
      <div className="mb-4 flex items-center justify-between rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
        <span>分销总开关</span>
        <button
          type="button"
          onClick={() => setCfg((c) => ({ ...c, enabled: !c.enabled }))}
          className={`rounded px-3 py-1 text-xs font-medium text-white ${
            cfg.enabled ? 'bg-emerald-700' : 'bg-gray-500'
          }`}
        >
          {cfg.enabled ? '已开启' : '已关闭'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="一级佣金比例（%）"
          value={cfg.level1Rate}
          onChange={(v) => setCfg({ ...cfg, level1Rate: v })}
        />
        <Field
          label="二级佣金比例（%）"
          value={cfg.level2Rate}
          onChange={(v) => setCfg({ ...cfg, level2Rate: v })}
        />
        <Field
          label="保本期（天）"
          value={cfg.protectDays}
          onChange={(v) => setCfg({ ...cfg, protectDays: v })}
        />
        <Field
          label="提现门槛（元）"
          value={cfg.withdrawThreshold}
          onChange={(v) => setCfg({ ...cfg, withdrawThreshold: v })}
        />
        <Field
          label="自动打款限额（元）"
          value={cfg.autoPayLimit}
          onChange={(v) => setCfg({ ...cfg, autoPayLimit: v })}
        />
      </div>

      <p className="mt-4 text-xs text-gray-500">
        说明：底层强制二级上限，不可配置三级。单品比例在「商品分销配置」中优先覆盖全局。
      </p>

      <div className="mt-4 max-w-xs">
        <PrimaryBtn
          onClick={() => {
            setToast('配置已保存（Mock）')
            window.setTimeout(() => setToast(null), 2000)
          }}
        >
          保存配置
        </PrimaryBtn>
      </div>
      <Toast message={toast} />
    </AdminShell>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <label className="block text-sm">
      <span className="text-xs text-gray-500">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded border border-gray-400 px-3 py-2"
      />
    </label>
  )
}
