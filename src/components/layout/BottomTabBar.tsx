import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  Lightbulb,
  CheckSquare,
} from 'lucide-react'

const tabItems = [
  { path: '/app/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { path: '/app/upload', icon: Upload, labelKey: 'nav.upload' },
  { path: '/app/chat', icon: MessageSquare, labelKey: 'nav.chat' },
  { path: '/app/insights', icon: Lightbulb, labelKey: 'nav.insights' },
  { path: '/app/actions', icon: CheckSquare, labelKey: 'nav.actions' },
] as const

export function BottomTabBar() {
  const { t } = useTranslation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-tab-bar bg-surface border-t border-border z-40 flex items-center justify-around px-2 safe-area-bottom">
      {tabItems.map(({ path, icon: Icon, labelKey }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors min-w-[56px]',
              isActive
                ? 'text-primary'
                : 'text-muted'
            )
          }
        >
          <Icon className="w-5 h-5" />
          <span>{t(labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
