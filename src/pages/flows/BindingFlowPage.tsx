import { Link } from 'react-router-dom'
import { BindingFlowDiagram } from '../../components/FlowDiagram'

export default function BindingFlowPage() {
  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            ← 交互总览
          </Link>
          <div className="flex gap-2">
            <Link to="/c/auth" className="rounded border border-gray-500 bg-white px-3 py-1.5 text-xs">
              开通屏
            </Link>
            <Link to="/c/bind" className="rounded border border-gray-500 bg-white px-3 py-1.5 text-xs">
              绑定结果屏
            </Link>
          </div>
        </div>
        <div className="rounded border border-gray-400 bg-white p-5">
          <h1 className="text-lg font-semibold">绑定与开通 · 交互流程图</h1>
          <p className="mt-1 text-sm text-gray-600">
            零门槛开通；分享链接/海报携带签名；unionId 唯一绑定；绑定后不可换上级；底层强制二级上限。
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <BindingFlowDiagram />
          </div>
          <div className="mt-6 grid gap-3 text-sm md:grid-cols-3">
            <div className="rounded border border-dashed border-gray-400 p-3">
              <div className="text-xs text-gray-500">入口</div>
              <div className="mt-1">扫推广海报 QR / 点击分享卡片链接</div>
            </div>
            <div className="rounded border border-dashed border-gray-400 p-3">
              <div className="text-xs text-gray-500">校验</div>
              <div className="mt-1">链接签名 + unionId；已绑定则忽略新上级</div>
            </div>
            <div className="rounded border border-dashed border-gray-400 p-3">
              <div className="text-xs text-gray-500">计酬</div>
              <div className="mt-1">仅一级、二级；三级及以上不产生佣金</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
