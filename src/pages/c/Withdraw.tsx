import { useState } from 'react'
import { MobileShell } from '../../components/MobileShell'
import {
  PrimaryBtn,
  ScreenLabel,
  SectionTitle,
  StateBanner,
  Toast,
} from '../../components/Wireframe'
import { adminConfig, promoterStats, withdrawHistory } from '../../data/mock'

export default function Withdraw() {
  const [amount, setAmount] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const threshold = adminConfig.withdrawThreshold
  const available = promoterStats.withdrawableAmount
  const value = Number(amount)
  const belowThreshold = !amount || Number.isNaN(value) || value < threshold
  const overAvailable = value > available

  const apply = () => {
    if (belowThreshold || overAvailable) return
    setSubmitted(true)
    setToast(
      value > adminConfig.autoPayLimit
        ? '已提交 · 超自动打款限额，转入人工审核'
        : '已提交 · 将自动打款（Mock）',
    )
    window.setTimeout(() => setToast(null), 2500)
  }

  return (
    <MobileShell title="提现" backTo="/c/commissions" showTab>
      <div className="space-y-3 p-3">
        <ScreenLabel>C · 门槛校验 + 审核/自动打款</ScreenLabel>

        <div className="wf-solid rounded bg-white p-4">
          <div className="text-xs text-gray-500">可提现余额</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">
            ¥{available.toFixed(2)}
          </div>
          <div className="mt-2 text-[11px] text-amber-800">
            提现门槛 ¥{threshold} · 单笔 ≤¥{adminConfig.autoPayLimit} 可自动打款，超出需人工审核
          </div>
        </div>

        <div className="wf-solid rounded bg-white p-3">
          <label className="text-xs text-gray-500">提现金额</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
              setSubmitted(false)
            }}
            placeholder={`最低 ${threshold}`}
            className="mt-1 w-full border-b border-gray-400 bg-transparent py-2 text-lg outline-none"
          />
          {amount && belowThreshold ? (
            <StateBanner tone="error">
              未达提现门槛（¥{threshold}），无法提交。
            </StateBanner>
          ) : null}
          {overAvailable ? (
            <div className="mt-2">
              <StateBanner tone="error">超过可提现余额。</StateBanner>
            </div>
          ) : null}
          {submitted ? (
            <div className="mt-2">
              <StateBanner tone="info">申请已受理，可在下方历史查看进度。</StateBanner>
            </div>
          ) : null}
          <div className="mt-3">
            <PrimaryBtn onClick={apply} disabled={belowThreshold || overAvailable}>
              申请提现
            </PrimaryBtn>
          </div>
        </div>

        <div>
          <SectionTitle title="提现历史" />
          <ul className="space-y-2">
            {withdrawHistory.map((w) => (
              <li key={w.id} className="wf-solid flex items-center justify-between rounded bg-white p-3 text-sm">
                <div>
                  <div className="font-medium tabular-nums">¥{w.amount}</div>
                  <div className="text-[11px] text-gray-500">{w.time}</div>
                </div>
                <span
                  className={`text-xs ${
                    w.status === 'rejected'
                      ? 'text-red-700'
                      : w.status === 'manual_review'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                  }`}
                >
                  {w.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Toast message={toast} />
    </MobileShell>
  )
}
