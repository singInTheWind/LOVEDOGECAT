import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Hub from './pages/Hub'
import BindingFlowPage from './pages/flows/BindingFlowPage'
import SettlementFlowPage from './pages/flows/SettlementFlowPage'
import AuthOpen from './pages/c/AuthOpen'
import BindResult from './pages/c/BindResult'
import Home from './pages/c/Home'
import Materials from './pages/c/Materials'
import Subs from './pages/c/Subs'
import Commissions from './pages/c/Commissions'
import Withdraw from './pages/c/Withdraw'
import Dashboard from './pages/admin/Dashboard'
import Config from './pages/admin/Config'
import Products from './pages/admin/Products'
import Users from './pages/admin/Users'
import AdminCommissions from './pages/admin/Commissions'
import AdminMaterials from './pages/admin/Materials'
import Risk from './pages/admin/Risk'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/flows/binding" element={<BindingFlowPage />} />
        <Route path="/flows/settlement" element={<SettlementFlowPage />} />

        <Route path="/c" element={<Home />} />
        <Route path="/c/auth" element={<AuthOpen />} />
        <Route path="/c/bind" element={<BindResult />} />
        <Route path="/c/materials" element={<Materials />} />
        <Route path="/c/subs" element={<Subs />} />
        <Route path="/c/commissions" element={<Commissions />} />
        <Route path="/c/withdraw" element={<Withdraw />} />

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/config" element={<Config />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/commissions" element={<AdminCommissions />} />
        <Route path="/admin/materials" element={<AdminMaterials />} />
        <Route path="/admin/risk" element={<Risk />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
