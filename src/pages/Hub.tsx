import { Link } from 'react-router-dom'
import {
  AdminJourneyDiagram,
  BindingFlowDiagram,
  CJourneyDiagram,
  FlowCard,
  SettlementFlowDiagram,
} from '../components/FlowDiagram'
import { LaterTag } from '../components/Wireframe'

const cScreens = [
  { to: '/c/auth', name: '零门槛开通（授权）' },
  { to: '/c/bind', name: '分享绑定结果' },
  { to: '/c', name: '推广首页' },
  { to: '/c/materials', name: '素材中心' },
  { to: '/c/subs', name: '下级列表' },
  { to: '/c/commissions', name: '佣金明细' },
  { to: '/c/withdraw', name: '提现' },
]

const adminScreens = [
  { to: '/admin', name: '分销数据大盘' },
  { to: '/admin/config', name: '分销基础配置' },
  { to: '/admin/products', name: '商品分销配置' },
  { to: '/admin/users', name: '推广用户管理' },
  { to: '/admin/commissions', name: '佣金与提现管理' },
  { to: '/admin/materials', name: '推广素材管理' },
  { to: '/admin/risk', name: '风控配置' },
]

export default function Hub() {
  return (
    <div className="min-h-screen bg-gray-200">
      <header className="border-b border-gray-400 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-3 px-4 py-5">
          <div>
            <div className="text-xs tracking-wide text-gray-500">产品原型交互图 · Wireframe</div>
            <h1 className="mt-1 text-2xl font-semibold text-gray-900">
              微信小程序 · 二级分销系统
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              可点击线框原型：C 端推广员中心（移动端）+ 运营后台（桌面）。Mock
              数据演示空态/加载/错误与关键交互，非真实微信能力。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/c"
              className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white"
            >
              打开 C 端
            </Link>
            <Link
              to="/admin"
              className="rounded border border-gray-500 bg-white px-4 py-2 text-sm text-gray-800"
            >
              打开运营后台
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <section className="rounded border border-gray-400 bg-white p-4">
          <h2 className="text-sm font-semibold text-gray-900">规则要点（底层强制）</h2>
          <ul className="mt-3 grid gap-2 text-sm text-gray-700 md:grid-cols-2">
            <li className="rounded border border-dashed border-gray-400 px-3 py-2">
              零门槛开通：扫码授权即推广员，无入门费/强制购买
            </li>
            <li className="rounded border border-dashed border-gray-400 px-3 py-2">
              绑定后不可换上级；unionId 唯一；重扫其他码忽略
            </li>
            <li className="rounded border border-dashed border-gray-400 px-3 py-2">
              计酬层级硬上限二级；不以拉人头计酬
            </li>
            <li className="rounded border border-dashed border-gray-400 px-3 py-2">
              实付为基数；单品比例优先于全局；保本期后可提现
            </li>
          </ul>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <LaterTag />
            <span>等级体系 / 弹窗引导 / 服务通知 — 原型中标注「后续」，未展开实现</span>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <FlowCard
            title="绑定与开通流程"
            subtitle="分享链接 / 海报 + unionId"
            to="/flows/binding"
          >
            <BindingFlowDiagram />
          </FlowCard>
          <FlowCard
            title="订单与佣金结算流程"
            subtitle="支付 → 待结算 → 可提现 / 退款爪回"
            to="/flows/settlement"
          >
            <SettlementFlowDiagram />
          </FlowCard>
        </div>

        <section className="rounded border border-gray-400 bg-white p-4">
          <h2 className="text-sm font-semibold">C 端主旅程</h2>
          <p className="mt-1 text-xs text-gray-500">点击节点进入对应可交互屏幕</p>
          <div className="mt-3">
            <CJourneyDiagram />
          </div>
        </section>

        <section className="rounded border border-gray-400 bg-white p-4">
          <h2 className="text-sm font-semibold">运营后台主旅程</h2>
          <p className="mt-1 text-xs text-gray-500">桌面布局 · 配置 / 审核 / 风控 / 统计</p>
          <div className="mt-3">
            <AdminJourneyDiagram />
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded border border-gray-400 bg-white p-4">
            <h2 className="text-sm font-semibold">C 端屏幕地图</h2>
            <ul className="mt-3 space-y-2">
              {cScreens.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="flex items-center justify-between rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    <span>{s.name}</span>
                    <span className="text-xs text-gray-400">{s.to}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded border border-gray-400 bg-white p-4">
            <h2 className="text-sm font-semibold">后台屏幕地图</h2>
            <ul className="mt-3 space-y-2">
              {adminScreens.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="flex items-center justify-between rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    <span>{s.name}</span>
                    <span className="text-xs text-gray-400">{s.to}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded border border-dashed border-gray-500 bg-gray-50 p-4 text-xs text-gray-600">
          <strong className="text-gray-800">系统角色：</strong>
          C 端推广员 · 运营管理员 · 系统定时任务（保本期结算 / 坏账抵扣，在结算流程图中体现）
        </section>
      </main>
    </div>
  )
}
