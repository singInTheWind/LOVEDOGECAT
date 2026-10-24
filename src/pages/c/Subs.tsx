import { useState } from 'react'
import { MobileShell } from '../../components/MobileShell'
import { ScreenLabel, StateBanner, TabBar } from '../../components/Wireframe'
import { subordinates } from '../../data/mock'

export default function Subs() {
  const [tab, setTab] = useState('level1')
  const [empty, setEmpty] = useState(false)
  const list = tab === 'level1' ? subordinates.level1 : subordinates.level2

  return (
    <MobileShell
      title="下级列表"
      right={
        <button type="button" className="text-[11px] text-gray-500" onClick={() => setEmpty((v) => !v)}>
          {empty ? '有数据' : '空态'}
        </button>
      }
    >
      <div className="px-3 pt-3">
        <ScreenLabel>C · 一级/二级 · 脱敏展示</ScreenLabel>
      </div>
      <TabBar
        tabs={[
          { id: 'level1', label: `一级（${subordinates.level1.length}）` },
          { id: 'level2', label: `二级（${subordinates.level2.length}）` },
        ]}
        active={tab}
        onChange={setTab}
      />
      <div className="space-y-2 p-3">
        <p className="text-[11px] text-gray-500">
          昵称/头像脱敏；计酬仅统计到二级，更深层级不展示为「下级业绩」。
        </p>
        {empty || list.length === 0 ? (
          <StateBanner tone="empty">
            暂无{tab === 'level1' ? '一级' : '二级'}下级。分享海报或链接完成首次绑定后出现。
          </StateBanner>
        ) : (
          list.map((u) => (
            <div key={u.id} className="wf-solid flex items-center gap-3 rounded bg-white p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg">
                {u.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {u.nickname}
                  {'via' in u ? (
                    <span className="text-[10px] font-normal text-gray-400">
                      经 {(u as { via: string }).via}
                    </span>
                  ) : null}
                </div>
                <div className="text-[11px] text-gray-500">注册 {u.registeredAt}</div>
              </div>
              <div className="text-right text-xs">
                <div className="font-medium tabular-nums">{u.orders} 单</div>
                <div className="text-gray-500">¥{u.amount}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </MobileShell>
  )
}
