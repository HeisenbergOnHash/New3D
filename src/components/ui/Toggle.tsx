interface ToggleProps {
  checked: boolean
  onChange: (next: boolean) => void
  label?: string
  className?: string
}

export function Toggle({ checked, onChange, label, className = '' }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 text-[11px] text-text-secondary ${className}`}
      aria-pressed={checked}
    >
      {label && <span>{label}</span>}
      <span
        className={`relative inline-flex h-4 w-7 items-center rounded-full border border-border-subtle/70 bg-surface-elevated/80 transition ${
          checked ? 'border-emerald-400/80 bg-emerald-500/20' : ''
        }`}
      >
        <span
          className={`absolute left-0.5 h-3 w-3 rounded-full bg-text-secondary transition ${
            checked ? 'translate-x-3 bg-emerald-300' : ''
          }`}
        />
      </span>
    </button>
  )
}


