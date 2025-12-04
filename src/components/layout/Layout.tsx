import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { KuberaIcon } from '../branding/KuberaIcon'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate(isAdmin ? '/admin' : '/login', { replace: true })
  }

  const userLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Pay In', to: '/payin-request' },
    { label: 'Payout', to: '/payout' },
    { label: 'History', to: '/history' },
  ]

  const adminLinks = [
    { label: 'Dashboard', to: '/adminDashboard' },
    { label: 'Manage Users', to: '/manage-users' },
  ]

  const links = isAdmin ? adminLinks : userLinks

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <header className="sticky top-0 z-40 border-b border-border-subtle/60 bg-surface-elevated/90 backdrop-blur-xl nav-glow">
        <div className="flex w-full items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-primary shadow-[var(--shadow-soft)]">
              <KuberaIcon size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
                kuberanpay
              </p>
              <p className="text-base font-semibold text-text-primary/90">
                Orchestrated money movement
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-base md:flex" aria-label="Primary">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary/20 text-primary shadow-[0_0_0_1px_rgba(129,140,248,0.8)]'
                      : 'text-text-secondary hover:bg-surface-elevated/70 hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right text-sm md:block">
              <p className="font-medium text-text-primary">
                {user?.username || (isAdmin ? 'Admin' : 'User')}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">
                {isAdmin ? 'Admin mode' : 'User mode'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="hidden rounded-full bg-surface-elevated/80 px-4 py-2 text-sm font-medium text-text-secondary shadow-sm ring-1 ring-border-subtle/80 transition hover:bg-surface-elevated hover:text-text-primary hover:ring-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:inline-flex"
            >
              Logout
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-surface-elevated/80 px-3 py-2 text-sm font-medium text-text-secondary shadow-sm ring-1 ring-border-subtle/80 transition hover:bg-surface-elevated hover:text-text-primary hover:ring-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav
            className="flex w-full flex-col gap-1 px-4 pb-3 text-sm text-text-secondary md:hidden"
            aria-label="Mobile primary"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 font-medium transition ${
                    isActive
                      ? 'bg-primary/20 text-primary shadow-[0_0_0_1px_rgba(129,140,248,0.8)]'
                      : 'text-text-secondary hover:bg-surface-elevated/70 hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 inline-flex items-center justify-center rounded-lg bg-surface-elevated/80 px-3 py-2.5 text-sm font-medium text-text-secondary shadow-sm ring-1 ring-border-subtle/80 transition hover:bg-surface-elevated hover:text-text-primary hover:ring-primary/70"
            >
              Logout
            </button>
          </nav>
        )}
      </header>

      <main className="flex w-full flex-1 px-4 pb-10 pt-8 md:px-8">
        <div className="w-full">{children}</div>
      </main>
    </div>
  )
}

