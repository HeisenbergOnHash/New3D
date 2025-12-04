import { useToast } from '../../context/ToastContext'

const TYPE_STYLES: Record<string, string> = {
  success: 'border-emerald-400/70 bg-emerald-500/10 text-emerald-100',
  error: 'border-rose-400/70 bg-rose-500/10 text-rose-100',
  info: 'border-sky-400/70 bg-sky-500/10 text-sky-100',
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-end px-4 pb-6 sm:items-start sm:justify-end sm:px-6 sm:pt-16">
      <div className="flex w-full flex-col items-end space-y-3 sm:max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto glass-card w-full border ${TYPE_STYLES[toast.type]} shadow-lg`}
          >
            <div className="flex items-start px-4 py-3">
              <div className="flex-1 text-sm font-medium">{toast.message}</div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="ml-3 inline-flex shrink-0 rounded-full bg-surface/60 p-1 text-xs text-text-secondary hover:bg-surface hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


