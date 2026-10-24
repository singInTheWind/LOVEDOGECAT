import { Link } from 'react-router-dom'
import { SettlementFlowDiagram } from '../../components/FlowDiagram'

export default function SettlementFlowPage() {
  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            ← 交互总览
          </Link>
          <div className="flex gap-2">
            <Link
              to="/c/commissions"
              className="rounded border border-gray-500 bg-white px-3 py-1.5 text-xs"
            >
              佣金明细
            </Link>
            <Link
              to="/admin/commissions"
              className="rounded border border-gray-500 bg-white px-3 py-1.5 text-xs"
            >
              后台审核
            </Link>
          </div>
        </div>
        <div className="rounded border border-gray-400 bg-white p-5">
          <h1 className="text-lg font-semibold">订单与佣金结算 · 交互流程图</h1>
          <p className="mt-1 text-sm text-gray-600">
            实付金额为基数；支付后待结算；确认收货 + 保本期无退款 → 可提现；退款扣减；已提现坏账后续抵扣。
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <SettlementFlowDiagram />
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 text-xs text-gray-500">
                  <th className="py-2 pr-3 font-medium">状态</th>
                  <th className="py-2 pr-3 font-medium">触发</th>
                  <th className="py-2 font-medium">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-3">待结算</td>
                  <td className="py-2 pr-3">支付成功</td>
                  <td className="py-2">按全局/单品比例预提（单品优先）</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-3">可提现</td>
                  <td className="py-2 pr-3">确认收货 + 保本期结束且无退款</td>
                  <td className="py-2">定时任务翻转状态</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pr-3">退款失效</td>
                  <td className="py-2 pr-3">保本期内退款</td>
                  <td className="py-2">对应佣金扣减或整笔失效</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3">坏账</td>
                  <td className="py-2 pr-3">已提现后退款</td>
                  <td className="py-2">标记坏账，后续提现抵扣</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
