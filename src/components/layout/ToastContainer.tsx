import { useEffect } from 'react'
import { useToastStore } from '@/store'
import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
} as const

const styles = {
  success: 'border-success/30 bg-success-light text-success',
  warning: 'border-warning/30 bg-warning-light text-warning',
  error: 'border-danger/30 bg-danger-light text-danger',
  info: 'border-primary/30 bg-primary-light text-primary',
} as const

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const Icon = icons[toast.type]
        return (
          <ToastItem
            key={toast.id}
            id={toast.id}
            type={toast.type}
            title={toast.title}
            description={toast.description}
            icon={<Icon className="w-5 h-5 flex-shrink-0" />}
            style={styles[toast.type]}
            onClose={() => removeToast(toast.id)}
          />
        )
      })}
    </div>
  )
}

function ToastItem({
  id,
  title,
  description,
  icon,
  style,
  onClose,
}: {
  id: string
  type: string
  title: string
  description?: string
  icon: React.ReactNode
  style: string
  onClose: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto flex items-start gap-3 p-4 rounded-md border shadow-elevated animate-slide-up',
        style
      )}
    >
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {description && <p className="text-xs mt-0.5 opacity-80">{description}</p>}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
