import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/c', label: '首页', match: ['/c'] },
  { to: '/c/materials', label: '素材', match: ['/c/materials'] },
  { to: '/c/subs', label: '下级', match: ['/c/subs'] },
  { to: '/c/commissions', label: '佣金', match: ['/c/commissions', '/c/withdraw'] },
]

export function MobileShell({
  title,
  children,
  showTab = true,
  right,
  backTo,
}: {
  title: string
  children: ReactNode
  showTab?: boolean
  right?: ReactNode
  backTo?: string
}) {
  const loc = useLocation()

  return (
    <div className="mx-auto flex w-full max-w-[420px] flex-col items-center gap-3 py-4">
      <div className="flex w-full max-w-[var(--phone-w)] items-center justify-between px-1 text-xs text-gray-500">
        <Link to="/" className="hover:text-gray-800">
          ← 交互总览
        </Link>
        <span>C端 · 小程序模拟</span>
        <Link to="/admin" className="hover:text-gray-800">
          运营后台 →
        </Link>
      </div>

      <div
        className="relative overflow-hidden rounded-[28px] border-2 border-gray-700 bg-[#f7f7f8] shadow-sm"
        style={{ width: 'var(--phone-w)', height: 'var(--phone-h)' }}
      >
        <div className="flex h-11 items-end justify-between bg-white px-5 pb-1 text-[11px] text-gray-800">
          <span>9:41</span>
          <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-gray-900" />
          <span>100%</span>
        </div>

        <header className="flex h-11 items-center justify-between border-b border-gray-200 bg-white px-3">
          {backTo ? (
            <Link to={backTo} className="w-16 text-sm text-gray-700">
              ‹ 返回
            </Link>
          ) : (
            <span className="w-16 text-xs text-gray-400">推广中心</span>
          )}
          <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
          <div className="flex w-16 justify-end">{right}</div>
        </header>

        <div
          className={`overflow-y-auto ${showTab ? 'h-[calc(812px-44px-44px-52px)]' : 'h-[calc(812px-44px-44px)]'}`}
        >
          {children}
        </div>

        {showTab ? (
          <nav className="absolute bottom-0 left-0 right-0 flex h-[52px] border-t border-gray-300 bg-white">
            {tabs.map((t) => {
              const active = t.match.some(
                (m) => loc.pathname === m || (m !== '/c' && loc.pathname.startsWith(m)),
              )
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`flex flex-1 flex-col items-center justify-center text-xs ${
                    active ? 'font-semibold text-gray-900' : 'text-gray-500'
                  }`}
                >
                  <span className="mb-0.5 h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  {t.label}
                </Link>
              )
            })}
          </nav>
        ) : null}
      </div>
    </div>
  )
}
