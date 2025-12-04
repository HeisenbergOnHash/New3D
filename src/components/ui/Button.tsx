import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

const base =
  'inline-flex items-center justify-center rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-gradient-primary text-sky-50 shadow-[var(--shadow-soft)] hover:brightness-110',
  secondary:
    'bg-surface-elevated/80 text-text-secondary ring-1 ring-border-subtle/80 hover:bg-surface-elevated hover:text-text-primary hover:ring-primary/70',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-elevated/60 hover:text-text-primary',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-xs',
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      type={rest.type ?? 'button'}
      {...rest}
    >
      {iconLeft && <span className="mr-1.5 inline-flex">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-1.5 inline-flex">{iconRight}</span>}
    </button>
  )
}


