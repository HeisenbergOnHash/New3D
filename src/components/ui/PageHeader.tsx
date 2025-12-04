interface PageHeaderProps {
  title: string
  subtitle?: string
  right?: React.ReactNode
}

export function PageHeader({ title, subtitle, right }: PageHeaderProps) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-base font-semibold text-slate-50 md:text-lg">{title}</h1>
        {subtitle && <p className="text-[11px] text-text-secondary md:text-xs">{subtitle}</p>}
      </div>
      {right && <div className="text-[11px] text-text-secondary md:text-xs">{right}</div>}
    </div>
  )
}


