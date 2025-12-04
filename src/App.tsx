import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ToastContainer } from './components/toast/ToastContainer'
import { AuthGuard } from './components/auth/AuthGuard'
import { Layout } from './components/layout/Layout'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { AdminLogin } from './pages/AdminLogin'
import { Dashboard } from './pages/Dashboard'
import { History } from './pages/History'
import { Payout } from './pages/Payout'
import { PayIn } from './pages/PayIn'
import { AdminDashboard } from './pages/AdminDashboard'
import { ManageUsers } from './pages/ManageUsers'
import { BulkPayout } from './pages/BulkPayout'

function ProtectedAppShell() {
  return (
    <AuthGuard>
      <Layout>
        <Outlet />
      </Layout>
    </AuthGuard>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-background text-text-primary">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminLogin />} />

              <Route element={<ProtectedAppShell />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/payout" element={<Payout />} />
                <Route path="/payin-request" element={<PayIn />} />
                <Route path="/payin" element={<PayIn />} />

                <Route path="/adminDashboard" element={<AdminDashboard />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/bulk-payout" element={<BulkPayout />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  )
}
