import { useState } from 'react'
import { AdminShell } from '../../components/AdminShell'
import { Toast } from '../../components/Wireframe'
import { adminUsers } from '../../data/mock'

type Node = {
  id: string
  name: string
  level: number
  status: string
  children: Node[]
}

export default function Users() {
  const [tree, setTree] = useState<Node[]>(adminUsers as Node[])
  const [toast, setToast] = useState<string | null>(null)

  const toggle = (id: string) => {
    const walk = (nodes: Node[]): Node[] =>
      nodes.map((n) => {
        if (n.id === id) {
          const next = n.status === 'active' ? 'disabled' : 'active'
          setToast(`${n.name} 已${next === 'disabled' ? '禁用' : '启用'}（Mock）`)
          window.setTimeout(() => setToast(null), 2000)
          return { ...n, status: next }
        }
        return { ...n, children: walk(n.children) }
      })
    setTree(walk(tree))
  }

  return (
    <AdminShell title="推广用户管理">
      <p className="mb-3 text-sm text-gray-600">
        树形展示上下级；禁用后停止其作为上级产生新绑定佣金（既有订单按结算规则处理）。脱敏展示。
      </p>
      <div className="rounded border border-gray-300 p-3">
        {tree.map((n) => (
          <TreeNode key={n.id} node={n} onToggle={toggle} />
        ))}
      </div>
      <Toast message={toast} />
    </AdminShell>
  )
}

function TreeNode({
  node,
  onToggle,
  depth = 0,
}: {
  node: Node
  onToggle: (id: string) => void
  depth?: number
}) {
  return (
    <div>
      <div
        className="mb-1 flex items-center justify-between rounded border border-gray-200 bg-white px-3 py-2 text-sm"
        style={{ marginLeft: depth * 20 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-400">{depth === 0 ? '●' : '└'}</span>
          <span className="font-medium">{node.name}</span>
          <span className="rounded bg-gray-100 px-1.5 text-[10px] text-gray-600">
            {node.level === 0 ? '根推广' : `${node.level}级`}
          </span>
          {node.status === 'disabled' ? (
            <span className="text-[10px] text-red-700">已禁用</span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => onToggle(node.id)}
          className="rounded border border-gray-400 px-2 py-0.5 text-xs"
        >
          {node.status === 'active' ? '禁用' : '启用'}
        </button>
      </div>
      {node.children.map((c) => (
        <TreeNode key={c.id} node={c} onToggle={onToggle} depth={depth + 1} />
      ))}
    </div>
  )
}
