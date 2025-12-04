import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthContextValue, AuthUser } from '../types/auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const USER_KEY = 'kuberanpay:user'
const ADMIN_FLAG_KEY = 'kuberanpay:isAdmin'
const BALANCE_KEY = 'kuberanpay:balance'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<AuthUser | null>(null)
  const [isAdmin, setIsAdminState] = useState(false)
  const [balance, setBalanceState] = useState<string | undefined>(undefined)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem(USER_KEY)
      const storedAdmin = window.localStorage.getItem(ADMIN_FLAG_KEY)
      const storedBalance = window.localStorage.getItem(BALANCE_KEY)

      if (storedUser) {
        setUserState(JSON.parse(storedUser))
        setIsAdminState(storedAdmin === 'true')
      }
      if (storedBalance) {
        setBalanceState(storedBalance)
      }
    } catch {
      // ignore malformed storage
    } finally {
      setInitializing(false)
    }
  }, [])

  const setUser = useCallback((next: AuthUser | null) => {
    setUserState(next)
    if (next) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(next))
    } else {
      window.localStorage.removeItem(USER_KEY)
    }
  }, [])

  const setIsAdmin = useCallback((next: boolean) => {
    setIsAdminState(next)
    window.localStorage.setItem(ADMIN_FLAG_KEY, next ? 'true' : 'false')
  }, [])

  const setBalance = useCallback((next: string | undefined) => {
    setBalanceState(next)
    if (next !== undefined) {
      window.localStorage.setItem(BALANCE_KEY, next)
    } else {
      window.localStorage.removeItem(BALANCE_KEY)
    }
  }, [])

  const logout = useCallback(() => {
    setUserState(null)
    setIsAdminState(false)
    setBalanceState(undefined)
    window.localStorage.removeItem(USER_KEY)
    window.localStorage.removeItem(ADMIN_FLAG_KEY)
    window.localStorage.removeItem(BALANCE_KEY)
  }, [])

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin,
      balance,
      initializing,
      setUser,
      setIsAdmin,
      setBalance,
      logout,
    }),
    [user, isAdmin, balance, initializing, setUser, setIsAdmin, setBalance, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}


