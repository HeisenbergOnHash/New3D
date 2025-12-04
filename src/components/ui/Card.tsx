import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  right?: ReactNode
}

export function Card({ title, subtitle, children, right }: CardProps) {
  return (
    <section className="glass-card p-4 md:p-5">
      {(title || subtitle || right) && (
        <header className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            {title && <h2 className="text-sm font-semibold text-slate-50 md:text-base">{title}</h2>}
            {subtitle && (
              <p className="text-[11px] text-text-secondary md:text-xs">{subtitle}</p>
            )}
          </div>
          {right && <div className="text-[11px] text-text-secondary md:text-xs">{right}</div>}
        </header>
      )}
      <div className="text-[11px] text-text-secondary md:text-xs">{children}</div>
    </section>
  )
}


