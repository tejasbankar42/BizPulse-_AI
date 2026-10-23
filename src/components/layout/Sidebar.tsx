import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  Lightbulb,
  CheckSquare,
  FileText,
  FlaskConical,
  Settings,
  ChevronLeft,
  Zap,
} from 'lucide-react'

const navItems = [
  { path: '/app/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { path: '/app/upload', icon: Upload, labelKey: 'nav.upload' },
  { path: '/app/chat', icon: MessageSquare, labelKey: 'nav.chat' },
  { path: '/app/insights', icon: Lightbulb, labelKey: 'nav.insights' },
  { path: '/app/actions', icon: CheckSquare, labelKey: 'nav.actions' },
  { path: '/app/reports', icon: FileText, labelKey: 'nav.reports' },
  { path: '/app/evaluation', icon: FlaskConical, labelKey: 'nav.evaluation' },
  { path: '/app/settings', icon: Settings, labelKey: 'nav.settings' },
] as const

export function Sidebar() {
  const { t } = useTranslation()
  const { sidebarOpen, toggleSidebar } = useAppStore()

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col fixed left-0 top-0 h-screen bg-surface border-r border-border z-40 transition-all duration-200',
        sidebarOpen ? 'w-sidebar' : 'w-sidebar-collapsed'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-white flex-shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        {sidebarOpen && (
          <span className="text-lg font-semibold text-foreground whitespace-nowrap">
            BizPulse AI
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ path, icon: Icon, labelKey }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-muted hover:bg-background hover:text-foreground'
              )
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>{t(labelKey)}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center h-12 border-t border-border text-muted hover:text-foreground transition-colors"
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <ChevronLeft
          className={cn(
            'w-5 h-5 transition-transform duration-200',
            !sidebarOpen && 'rotate-180'
          )}
        />
      </button>
    </aside>
  )
}
