import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  right?: ReactNode
}

export function Card({ title, subtitle, children, right }: CardProps) {
  return (
    <section className="glass-card p-5 md:p-6">
      {(title || subtitle || right) && (
        <header className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            {title && <h2 className="text-base font-semibold text-slate-50 md:text-lg">{title}</h2>}
            {subtitle && <p className="text-sm text-text-secondary md:text-base">{subtitle}</p>}
          </div>
          {right && <div className="text-sm text-text-secondary md:text-base">{right}</div>}
        </header>
      )}
      <div className="text-sm text-text-secondary md:text-base">{children}</div>
    </section>
  )
}


