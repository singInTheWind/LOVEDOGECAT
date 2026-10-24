# 二级分销 · 产品原型交互图

微信小程序二级分销系统的**可点击线框原型**（非生产实现）。包含：

- **交互总览**：屏幕地图、绑定流程、订单佣金结算流程
- **C 端推广员中心**（移动端小程序观感）
- **运营后台**（桌面布局）

全部为 Mock 数据，无真实微信授权 / 支付 / 后端。

## 本地运行

```bash
npm install
npm run dev
```

默认开发服务器：`http://127.0.0.1:4721`

## 主要路由

| 路径 | 说明 |
|------|------|
| `/` | 交互总览 / 屏幕地图 |
| `/flows/binding` | 绑定与开通流程图 |
| `/flows/settlement` | 订单与佣金结算流程图 |
| `/c` | C 端推广首页 |
| `/c/materials` | 素材中心 |
| `/c/subs` | 下级列表 |
| `/c/commissions` | 佣金明细 |
| `/c/withdraw` | 提现 |
| `/admin` | 运营后台数据大盘 |
| `/admin/config` 等 | 配置 / 商品 / 用户 / 佣金 / 素材 / 风控 |

## 技术栈

Vite + React + TypeScript + Tailwind CSS + React Router

## GitHub Pages

Production build is committed under `docs/` for GitHub Pages.

1. Repo **Settings → Pages**
2. Deploy from a branch → Branch **`main`** → Folder **`/docs`** → Save
3. Site: https://singinthewind.github.io/LOVEDOGECAT/
