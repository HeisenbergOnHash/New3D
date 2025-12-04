interface PageHeaderProps {
  title: string
  subtitle?: string
  right?: React.ReactNode
}

export function PageHeader({ title, subtitle, right }: PageHeaderProps) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-lg font-semibold text-slate-50 md:text-xl">{title}</h1>
        {subtitle && <p className="text-sm text-text-secondary md:text-base">{subtitle}</p>}
      </div>
      {right && <div className="text-sm text-text-secondary md:text-base">{right}</div>}
    </div>
  )
}


