import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MobileShell } from '../../components/MobileShell'
import { PrimaryBtn, ScreenLabel, StateBanner } from '../../components/Wireframe'

export default function AuthOpen() {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const authorize = () => {
    setError(false)
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      if (Math.random() < 0.08) {
        setError(true)
        return
      }
      nav('/c/bind?first=1')
    }, 900)
  }

  return (
    <MobileShell title="开通推广员" showTab={false} backTo="/">
      <div className="space-y-4 p-4">
        <ScreenLabel>C · 零门槛开通</ScreenLabel>
        <div className="wf-dashed rounded-lg bg-white p-4">
          <div className="text-base font-semibold">微信授权即可成为推广员</div>
          <p className="mt-2 text-sm text-gray-600">
            无入门费、无强制购买。授权后自动开通推广身份，可通过海报/链接发展下级（计酬上限二级）。
          </p>
          <ul className="mt-3 space-y-1 text-xs text-gray-500">
            <li>· 将获取：昵称、头像、unionId（Mock）</li>
            <li>· 绑定关系以首次有效扫码/链接为准</li>
          </ul>
        </div>

        {loading ? (
          <StateBanner tone="loading">
            <div className="space-y-2">
              <div className="skeleton h-3 w-2/3" />
              <div className="skeleton h-3 w-1/2" />
              <div className="pt-1 text-xs">正在拉起微信授权…</div>
            </div>
          </StateBanner>
        ) : null}

        {error ? (
          <StateBanner tone="error">
            授权失败（模拟）。可重试；生产环境需记录全链路日志。
          </StateBanner>
        ) : null}

        <PrimaryBtn onClick={authorize} disabled={loading}>
          {loading ? '授权中…' : '微信一键授权开通'}
        </PrimaryBtn>
        <button
          type="button"
          className="w-full text-center text-xs text-gray-500 underline"
          onClick={() => nav('/c')}
        >
          已是推广员，进入中心
        </button>
      </div>
    </MobileShell>
  )
}
