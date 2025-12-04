import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, initializing } = useAuth()
  const location = useLocation()

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="glass-card flex items-center gap-3 px-6 py-4">
          <div className="h-3 w-3 animate-ping rounded-full bg-primary" />
          <p className="text-sm text-text-secondary">Initializing kuberanpay session…</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin')
    return <Navigate to={isAdminRoute ? '/admin' : '/login'} replace />
  }

  return <>{children}</>
}


