export const theme = {
  colors: {
    background: '#020617', // slate-950
    surface: '#020617',
    surfaceElevated: 'rgba(15, 23, 42, 0.9)', // slate-900/90
    borderSubtle: 'rgba(148, 163, 184, 0.3)', // slate-400/30
    primary: '#7c3aed', // violet-600
    primarySoft: 'rgba(129, 140, 248, 0.2)', // indigo-400/20
    secondary: '#06b6d4', // cyan-500
    accent: '#a855f7', // purple-500
    textPrimary: '#e5e7eb', // gray-200
    textSecondary: '#9ca3af', // gray-400
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    muted: '#4b5563',
    glassHighlight: 'rgba(148, 163, 184, 0.18)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 40%, #7c3aed 100%)',
    secondary: 'linear-gradient(135deg, #0f172a 0%, #0f766e 40%, #22d3ee 100%)',
    accent: 'linear-gradient(135deg, #581c87 0%, #a855f7 45%, #22d3ee 100%)',
    heroOrb: 'radial-gradient(circle at 0% 0%, #4f46e5 0%, transparent 50%), radial-gradient(circle at 100% 100%, #0ea5e9 0%, transparent 55%)',
    cardBorder: 'linear-gradient(135deg, rgba(148,163,184,0.35), rgba(56,189,248,0.4), rgba(167,139,250,0.5))',
  },
  shadows: {
    soft: '0 18px 60px rgba(15, 23, 42, 0.75)',
    medium: '0 24px 80px rgba(15, 23, 42, 0.85)',
    large: '0 32px 120px rgba(15, 23, 42, 0.95)',
    glow: '0 0 25px rgba(124, 58, 237, 0.65)',
  },
  animations: {
    floatSlow: 'animate-float-slow',
    floatMedium: 'animate-float-medium',
    pulseSoft: 'animate-pulse-soft',
    shimmer: 'animate-shimmer',
  },
} as const

export type Theme = typeof theme


