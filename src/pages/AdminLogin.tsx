import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export function AdminLogin() {
  const { setUser, setIsAdmin } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleMockLogin = (event: React.FormEvent) => {
    event.preventDefault()
    setUser({ username: 'admin.demo', phone: '8888888888' })
    setIsAdmin(true)
    addToast('Logged in to kuberanpay admin', 'success')
    navigate('/adminDashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="glass-card w-full max-w-sm px-5 py-6">
        <div className="mb-4 space-y-1 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-secondary">
            kuberanpay
          </p>
          <h1 className="text-base font-semibold text-slate-50">Admin Portal</h1>
          <p className="text-xs text-text-secondary">
            Secure access for operations &amp; treasury teams. This is a mock login wired to local
            state.
          </p>
        </div>

        <form onSubmit={handleMockLogin} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-text-secondary">
              Registered phone
            </label>
            <input
              type="tel"
              defaultValue="8888888888"
              className="h-8 w-full rounded-lg border border-border-subtle/80 bg-surface-elevated/80 px-2 text-xs text-text-primary outline-none ring-primary/40 placeholder:text-text-secondary/50 focus:ring-1"
              placeholder="Enter phone"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-text-secondary">Admin password</label>
            <input
              type="password"
              defaultValue="admin"
              className="h-8 w-full rounded-lg border border-border-subtle/80 bg-surface-elevated/80 px-2 text-xs text-text-primary outline-none ring-primary/40 placeholder:text-text-secondary/50 focus:ring-1"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gradient-secondary px-3 py-2 text-xs font-semibold text-sky-50 shadow-[var(--shadow-soft)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            Enter Admin Dashboard
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-[11px] text-text-secondary">
          <Link to="/" className="hover:text-text-primary">
            ← Back to overview
          </Link>
          <Link to="/login" className="hover:text-text-primary">
            User login
          </Link>
        </div>
      </div>
    </div>
  )
}


