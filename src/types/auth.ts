export type LoginStep = 'phone' | 'credentials'

export interface AuthUser {
  username: string
  phone: string
}

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  balance?: string
  initializing: boolean
  setUser: (user: AuthUser | null) => void
  setIsAdmin: (isAdmin: boolean) => void
  setBalance: (balance: string | undefined) => void
  logout: () => void
}


