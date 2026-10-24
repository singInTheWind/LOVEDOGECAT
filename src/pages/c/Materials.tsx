import { useMemo, useState } from 'react'
import { MobileShell } from '../../components/MobileShell'
import {
  GhostBtn,
  PrimaryBtn,
  ScreenLabel,
  SectionTitle,
  StateBanner,
  Toast,
} from '../../components/Wireframe'
import { materialCategories, materials } from '../../data/mock'

export default function Materials() {
  const [cat, setCat] = useState<string>('all')
  const [toast, setToast] = useState<string | null>(null)
  const [posterOpen, setPosterOpen] = useState<string | null>(null)
  const [emptyDemo, setEmptyDemo] = useState(false)

  const list = useMemo(() => {
    if (emptyDemo) return []
    if (cat === 'all') return materials
    if (cat === 'recent') return materials.filter((m) => m.recent)
    return materials.filter((m) => m.category === cat)
  }, [cat, emptyDemo])

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2000)
  }

  return (
    <MobileShell
      title="素材中心"
      right={
        <button
          type="button"
          className="text-[11px] text-gray-500"
          onClick={() => setEmptyDemo((v) => !v)}
        >
          {emptyDemo ? '有数据' : '空态'}
        </button>
      }
    >
      <div className="relative min-h-full space-y-3 p-3">
        <ScreenLabel>C · 分类 / 推荐置顶 / 红点 / 海报合成</ScreenLabel>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <Chip active={cat === 'all'} onClick={() => setCat('all')}>
            全部
          </Chip>
          <Chip active={cat === 'recent'} onClick={() => setCat('recent')}>
            最近使用
          </Chip>
          {materialCategories.map((c) => (
            <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              <span className="relative inline-flex items-center gap-1">
                {c.name}
                {c.hasNew ? <span className="red-dot" /> : null}
              </span>
            </Chip>
          ))}
        </div>

        {!emptyDemo ? (
          <div className="wf-solid rounded bg-white p-2">
            <SectionTitle
              title="推荐 / 置顶"
              extra={<span className="text-[11px] text-gray-400">运营配置</span>}
            />
            <div className="flex gap-2 overflow-x-auto">
              {materials
                .filter((m) => m.recommend || m.pinned)
                .map((m) => (
                  <div
                    key={m.id}
                    className="w-28 shrink-0 rounded border border-gray-300 bg-gray-50 p-2 text-xs"
                  >
                    <div className="mb-1 flex gap-1">
                      {m.pinned ? (
                        <span className="rounded bg-gray-800 px-1 text-[10px] text-white">置顶</span>
                      ) : null}
                      {m.recommend ? (
                        <span className="rounded border border-gray-500 px-1 text-[10px]">推荐</span>
                      ) : null}
                    </div>
                    <div className="line-clamp-2 font-medium">{m.title}</div>
                  </div>
                ))}
            </div>
          </div>
        ) : null}

        {list.length === 0 ? (
          <StateBanner tone="empty">
            暂无素材。运营上架后会出现在此；新素材分类带小红点提示。
          </StateBanner>
        ) : (
          <ul className="space-y-2">
            {list.map((m) => (
              <li key={m.id} className="wf-solid rounded bg-white p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {m.title}
                      {m.isNew ? <span className="red-dot" /> : null}
                    </div>
                    <div className="mt-1 text-[11px] text-gray-500">
                      {m.type === 'image' ? `图片模板 · ${m.qrHint}` : '文案素材'}
                    </div>
                  </div>
                  <span className="rounded border border-gray-300 px-1.5 py-0.5 text-[10px] text-gray-500">
                    {m.type === 'image' ? '海报' : '文案'}
                  </span>
                </div>

                {m.type === 'copy' ? (
                  <p className="mt-2 rounded bg-gray-50 px-2 py-2 text-xs text-gray-700">
                    {m.body}
                  </p>
                ) : (
                  <div className="relative mt-2 flex h-28 items-center justify-center rounded border border-dashed border-gray-400 bg-gray-100 text-xs text-gray-500">
                    海报底图占位
                    <div className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center border border-gray-600 bg-white text-[9px]">
                      QR
                    </div>
                  </div>
                )}

                <div className="mt-2 flex gap-2">
                  {m.type === 'image' ? (
                    <>
                      <PrimaryBtn
                        className="!py-1.5 text-xs"
                        onClick={() => setPosterOpen(m.id)}
                      >
                        生成带 QR 海报
                      </PrimaryBtn>
                      <GhostBtn
                        className="text-xs"
                        onClick={() => showToast('已保存到相册（UI Mock）')}
                      >
                        保存相册
                      </GhostBtn>
                    </>
                  ) : (
                    <PrimaryBtn
                      className="!py-1.5 text-xs"
                      onClick={() => showToast('文案已复制')}
                    >
                      一键复制文案
                    </PrimaryBtn>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {posterOpen ? (
        <div className="absolute inset-0 z-20 flex items-end bg-black/40">
          <div className="w-full rounded-t-2xl bg-white p-4">
            <div className="text-sm font-semibold">海报预览 · 已合成专属二维码</div>
            <div className="relative mt-3 flex h-48 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs text-gray-500">
              模板 + 推广员 QR
              <div className="absolute bottom-3 right-3 flex h-12 w-12 flex-col items-center justify-center border-2 border-gray-800 bg-white text-[9px]">
                QR
                <span className="text-[8px] text-gray-400">签名</span>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <PrimaryBtn
                className="!py-2"
                onClick={() => {
                  showToast('已保存到相册（UI Mock）')
                  setPosterOpen(null)
                }}
              >
                保存到相册
              </PrimaryBtn>
              <GhostBtn className="flex-1" onClick={() => setPosterOpen(null)}>
                关闭
              </GhostBtn>
            </div>
          </div>
        </div>
      ) : null}

      <Toast message={toast} />
    </MobileShell>
  )
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
        active ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-400 bg-white text-gray-700'
      }`}
    >
      {children}
    </button>
  )
}
