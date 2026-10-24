import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { MobileShell } from '../../components/MobileShell'
import { GhostBtn, PrimaryBtn, ScreenLabel, StateBanner } from '../../components/Wireframe'

export default function BindResult() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const mode = params.get('mode') || (params.get('first') ? 'success' : 'success')

  return (
    <MobileShell title="上下级绑定" showTab={false} backTo="/c/auth">
      <div className="space-y-4 p-4">
        <ScreenLabel>C · 绑定结果态</ScreenLabel>

        <div className="flex gap-2 text-xs">
          <Link
            to="/c/bind?mode=success"
            className={`rounded border px-2 py-1 ${mode === 'success' ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-400'}`}
          >
            首次绑定成功
          </Link>
          <Link
            to="/c/bind?mode=locked"
            className={`rounded border px-2 py-1 ${mode === 'locked' ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-400'}`}
          >
            已绑定·忽略换绑
          </Link>
          <Link
            to="/c/bind?mode=invalid"
            className={`rounded border px-2 py-1 ${mode === 'invalid' ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-400'}`}
          >
            签名无效
          </Link>
        </div>

        {mode === 'success' ? (
          <StateBanner tone="info">
            <div className="font-medium text-emerald-800">绑定成功</div>
            <p className="mt-1 text-sm">
              已通过分享链接绑定上级：<strong>张*推广</strong>。此后不可更换上级。
            </p>
            <p className="mt-2 text-xs text-gray-500">unionId 已登记 · 计酬层级受二级上限约束</p>
          </StateBanner>
        ) : null}

        {mode === 'locked' ? (
          <StateBanner tone="empty">
            <div className="font-medium">已有上级，本次扫码已忽略</div>
            <p className="mt-1 text-sm">
              当前上级：<strong>张*推广</strong>。系统禁止换绑，重扫其他推广码不会改变关系。
            </p>
          </StateBanner>
        ) : null}

        {mode === 'invalid' ? (
          <StateBanner tone="error">
            <div className="font-medium">链接签名校验失败</div>
            <p className="mt-1 text-sm">请使用最新海报或分享卡片重新进入（Mock 错误态）。</p>
          </StateBanner>
        ) : null}

        <div className="wf-solid rounded bg-white p-3 text-xs text-gray-600">
          <div className="font-medium text-gray-800">硬规则提示</div>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>绑定后不可换上级</li>
            <li>仅一级 / 二级产生佣金</li>
            <li>不以拉人头计酬，以有效订单实付结算</li>
          </ul>
        </div>

        <PrimaryBtn onClick={() => nav('/c')}>进入推广中心</PrimaryBtn>
        <div className="flex justify-center">
          <GhostBtn className="!w-auto">
            <Link to="/flows/binding">查看绑定流程图</Link>
          </GhostBtn>
        </div>
      </div>
    </MobileShell>
  )
}
