import { useState } from 'react'
import { AdminShell } from '../../components/AdminShell'
import { GhostBtn, PrimaryBtn, Toast } from '../../components/Wireframe'
import { adminMaterials } from '../../data/mock'

export default function AdminMaterials() {
  const [items, setItems] = useState(adminMaterials)
  const [selected, setSelected] = useState(adminMaterials[0])
  const [toast, setToast] = useState<string | null>(null)
  const [qr, setQr] = useState(adminMaterials[0].qr)

  return (
    <AdminShell
      title="推广素材管理"
      actions={
        <GhostBtn
          className="text-xs"
          onClick={() => {
            setToast('上传底图（Mock 文件选择）')
            window.setTimeout(() => setToast(null), 2000)
          }}
        >
          上传底图
        </GhostBtn>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 text-xs text-gray-500">素材列表</div>
          <ul className="space-y-2">
            {items.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(m)
                    setQr(m.qr)
                  }}
                  className={`flex w-full items-center justify-between rounded border px-3 py-2 text-left text-sm ${
                    selected.id === m.id ? 'border-gray-800 bg-gray-50' : 'border-gray-300'
                  }`}
                >
                  <span>{m.title}</span>
                  <span className="text-[11px] text-gray-500">
                    {m.status === 'published' ? '已发布' : '草稿'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded border border-gray-300 p-3">
          <div className="text-sm font-medium">可视化二维码位置 · {selected.title}</div>
          <div
            className="relative mt-3 h-56 cursor-crosshair rounded border border-dashed border-gray-500 bg-gray-100"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = Math.round(((e.clientX - rect.left) / rect.width) * 100)
              const y = Math.round(((e.clientY - rect.top) / rect.height) * 100)
              setQr({ x, y })
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
              点击画布设置 QR 锚点
            </div>
            <div
              className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-gray-900 bg-white text-[10px]"
              style={{ left: `${qr.x}%`, top: `${qr.y}%` }}
            >
              QR
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            位置：X {qr.x}% · Y {qr.y}%
            {selected.copyBound ? ' · 已绑定文案' : ' · 未绑定文案'}
          </div>
          <div className="mt-3 flex gap-2">
            <PrimaryBtn
              className="!w-auto !px-4 !py-2 text-xs"
              onClick={() => {
                setItems((list) =>
                  list.map((i) =>
                    i.id === selected.id
                      ? { ...i, qr, status: 'published', copyBound: true }
                      : i,
                  ),
                )
                setToast('已发布并绑定文案（Mock）')
                window.setTimeout(() => setToast(null), 2000)
              }}
            >
              绑定文案并发布
            </PrimaryBtn>
            <GhostBtn
              className="text-xs"
              onClick={() => {
                setToast('已保存草稿')
                window.setTimeout(() => setToast(null), 2000)
              }}
            >
              存草稿
            </GhostBtn>
          </div>
        </div>
      </div>
      <Toast message={toast} />
    </AdminShell>
  )
}
