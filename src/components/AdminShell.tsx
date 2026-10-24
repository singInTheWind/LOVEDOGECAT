import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

const menus = [
  { to: '/admin', end: true, label: '数据大盘' },
  { to: '/admin/config', label: '分销基础配置' },
  { to: '/admin/products', label: '商品分销配置' },
  { to: '/admin/users', label: '推广用户管理' },
  { to: '/admin/commissions', label: '佣金与提现' },
  { to: '/admin/materials', label: '推广素材管理' },
  { to: '/admin/risk', label: '风控配置' },
]

export function AdminShell({
  title,
  children,
  actions,
}: {
  title: string
  children: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="border-b border-gray-400 bg-white px-4 py-2 text-xs text-gray-500">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="hover:text-gray-800">
            ← 交互总览
          </Link>
          <span>运营后台 · 桌面原型</span>
          <Link to="/c" className="hover:text-gray-800">
            C端推广中心 →
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-4 p-4">
        <aside className="w-52 shrink-0 rounded border border-gray-400 bg-white">
          <div className="border-b border-gray-300 px-3 py-3 text-sm font-semibold">
            二级分销后台
          </div>
          <nav className="p-2">
            {menus.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                end={m.end}
                className={({ isActive }) =>
                  `mb-1 block rounded px-2.5 py-2 text-sm ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {m.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-dashed border-gray-300 p-3 text-[11px] text-gray-500">
            角色：运营管理员
            <br />
            数据均为 Mock
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            <div className="flex gap-2">{actions}</div>
          </div>
          <div className="rounded border border-gray-400 bg-white p-4">{children}</div>
        </main>
      </div>
    </div>
  )
}
