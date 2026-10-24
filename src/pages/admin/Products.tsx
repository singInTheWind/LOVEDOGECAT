import { AdminShell } from '../../components/AdminShell'
import { adminConfig, adminProducts } from '../../data/mock'

export default function Products() {
  return (
    <AdminShell title="商品分销配置">
      <p className="mb-3 text-sm text-gray-600">
        单品佣金比例优先于全局（当前全局 一级 {adminConfig.level1Rate}% / 二级{' '}
        {adminConfig.level2Rate}%）。关闭分销则该商品不计入推广。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-xs text-gray-500">
              <th className="py-2 pr-3">商品</th>
              <th className="py-2 pr-3">售价</th>
              <th className="py-2 pr-3">一级%</th>
              <th className="py-2 pr-3">二级%</th>
              <th className="py-2 pr-3">覆盖全局</th>
              <th className="py-2">分销</th>
            </tr>
          </thead>
          <tbody>
            {adminProducts.map((p) => (
              <tr key={p.id} className="border-b border-gray-200">
                <td className="py-3 pr-3 font-medium">{p.name}</td>
                <td className="py-3 pr-3 tabular-nums">¥{p.price}</td>
                <td className="py-3 pr-3 tabular-nums">
                  {p.level1 ?? `全局 ${adminConfig.level1Rate}`}
                </td>
                <td className="py-3 pr-3 tabular-nums">
                  {p.level2 ?? `全局 ${adminConfig.level2Rate}`}
                </td>
                <td className="py-3 pr-3">{p.override ? '是' : '否'}</td>
                <td className="py-3">
                  <span
                    className={`rounded px-2 py-0.5 text-xs ${
                      p.onSale ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {p.onSale ? '开启' : '关闭'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  )
}
