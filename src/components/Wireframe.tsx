import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function ScreenLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="rounded bg-gray-800 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white">
        原型屏
      </span>
      <span className="text-xs text-gray-500">{children}</span>
    </div>
  )
}

export function StateBanner({
  tone,
  children,
}: {
  tone: 'empty' | 'loading' | 'error' | 'info'
  children: ReactNode
}) {
  const map = {
    empty: 'border-dashed border-gray-400 bg-gray-50 text-gray-600',
    loading: 'border-gray-300 bg-white text-gray-600',
    error: 'border-red-300 bg-red-50 text-red-800',
    info: 'border-gray-400 bg-gray-100 text-gray-700',
  }
  return (
    <div className={`rounded border px-3 py-3 text-sm ${map[tone]}`}>{children}</div>
  )
}

export function StatCell({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="wf-solid rounded bg-white p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-lg font-semibold tabular-nums text-gray-900">{value}</div>
      {hint ? <div className="mt-1 text-[11px] text-gray-400">{hint}</div> : null}
    </div>
  )
}

export function PrimaryBtn({
  children,
  onClick,
  disabled,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded bg-gray-800 px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  )
}

export function GhostBtn({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded border border-gray-400 bg-white px-3 py-2 text-sm text-gray-800 ${className}`}
    >
      {children}
    </button>
  )
}

export function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex border-b border-gray-300 bg-white">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`flex-1 py-2.5 text-sm ${
            active === t.id
              ? 'border-b-2 border-gray-900 font-medium text-gray-900'
              : 'text-gray-500'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded bg-black/80 px-4 py-2 text-sm text-white">
      {message}
    </div>
  )
}

export function NavChip({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center rounded border border-gray-400 bg-white px-2.5 py-1 text-xs text-gray-800 hover:bg-gray-50"
    >
      {children}
    </Link>
  )
}

export function SectionTitle({
  title,
  extra,
}: {
  title: string
  extra?: ReactNode
}) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      {extra}
    </div>
  )
}

export function LaterTag() {
  return (
    <span className="rounded border border-dashed border-amber-600 px-1.5 py-0.5 text-[10px] text-amber-800">
      后续
    </span>
  )
}
