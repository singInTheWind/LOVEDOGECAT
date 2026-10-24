import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MobileShell } from '../../components/MobileShell'
import {
  GhostBtn,
  PrimaryBtn,
  ScreenLabel,
  SectionTitle,
  StatCell,
  StateBanner,
  Toast,
} from '../../components/Wireframe'
import { promoterStats } from '../../data/mock'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(t)
  }, [])

  const sharePoster = () => {
    setToast('已生成专属海报（含二维码）· 可分享给好友')
    window.setTimeout(() => setToast(null), 2200)
  }

  return (
    <MobileShell
      title="推广首页"
      right={
        <button
          type="button"
          className="text-[11px] text-gray-500"
          onClick={() => {
            setError((e) => !e)
            setLoading(false)
          }}
        >
          {error ? '恢复' : '错误态'}
        </button>
      }
    >
      <div className="space-y-4 p-3">
        <ScreenLabel>C · 数据总览 + 快捷海报</ScreenLabel>

        {loading ? (
          <StateBanner tone="loading">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton h-14" />
              ))}
            </div>
          </StateBanner>
        ) : null}

        {error ? (
          <StateBanner tone="error">
            数据加载失败。
            <button
              type="button"
              className="ml-2 underline"
              onClick={() => {
                setError(false)
                setLoading(true)
                window.setTimeout(() => setLoading(false), 600)
              }}
            >
              重试
            </button>
          </StateBanner>
        ) : null}

        {!loading && !error ? (
          <>
            <div className="grid grid-cols-3 gap-2">
              <StatCell label="一级下级" value={String(promoterStats.level1Count)} />
              <StatCell label="二级下级" value={String(promoterStats.level2Count)} />
              <StatCell label="订单数" value={String(promoterStats.orderCount)} />
              <StatCell
                label="待结算"
                value={`¥${promoterStats.pendingAmount.toFixed(2)}`}
              />
              <StatCell
                label="可提现"
                value={`¥${promoterStats.withdrawableAmount.toFixed(2)}`}
              />
              <StatCell
                label="累计收益"
                value={`¥${promoterStats.totalEarned.toFixed(0)}`}
              />
            </div>

            <div className="wf-solid rounded bg-white p-3">
              <SectionTitle title="快捷推广" />
              <p className="mb-3 text-xs text-gray-500">
                一键生成带个人 QR 的商品海报，好友扫码完成绑定与下单。
              </p>
              <PrimaryBtn onClick={sharePoster}>生成并分享专属海报</PrimaryBtn>
              <div className="mt-2">
                <Link to="/c/materials">
                  <GhostBtn className="w-full">进入素材中心</GhostBtn>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/c/subs"
                className="wf-solid rounded bg-white px-3 py-3 text-sm text-gray-800"
              >
                下级列表 →
              </Link>
              <Link
                to="/c/commissions"
                className="wf-solid rounded bg-white px-3 py-3 text-sm text-gray-800"
              >
                佣金明细 →
              </Link>
              <Link
                to="/c/withdraw"
                className="wf-solid rounded bg-white px-3 py-3 text-sm text-gray-800"
              >
                申请提现 →
              </Link>
              <Link
                to="/flows/settlement"
                className="wf-dashed rounded bg-gray-50 px-3 py-3 text-sm text-gray-600"
              >
                结算流程图
              </Link>
            </div>
          </>
        ) : null}
      </div>
      <Toast message={toast} />
    </MobileShell>
  )
}
