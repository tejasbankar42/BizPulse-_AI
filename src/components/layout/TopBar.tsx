import { useTranslation } from 'react-i18next'
import { useAppStore, useAuthStore } from '@/store'
import { cn } from '@/lib/utils'
import { Search, Globe, LogOut, Command } from 'lucide-react'
import type { Language } from '@/types'

const languageLabels: Record<Language, string> = {
  en: 'EN',
  hi: 'हि',
  mr: 'म',
}

export function TopBar() {
  const { t, i18n } = useTranslation()
  const { language, setLanguage, toggleCommandPalette } = useAppStore()
  const { user, logout } = useAuthStore()

  const cycleLanguage = () => {
    const langs: Language[] = ['en', 'hi', 'mr']
    const nextIndex = (langs.indexOf(language) + 1) % langs.length
    const next = langs[nextIndex]
    setLanguage(next)
    i18n.changeLanguage(next)
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 md:px-6 bg-surface/80 backdrop-blur-md border-b border-border">
      {/* Search / Command Palette Trigger */}
      <button
        onClick={toggleCommandPalette}
        className={cn(
          'flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-background',
          'text-sm text-muted hover:text-foreground transition-colors',
          'w-full max-w-xs md:max-w-sm'
        )}
      >
        <Search className="w-4 h-4 flex-shrink-0" />
        <span className="flex-1 text-left">{t('common.search')}</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] text-muted font-mono">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {/* Right Actions */}
      <div className="flex items-center gap-2 ml-4">
        {/* Language Switcher */}
        <button
          onClick={cycleLanguage}
          className="flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-medium text-muted hover:text-foreground hover:bg-background transition-colors"
          aria-label="Switch language"
        >
          <Globe className="w-4 h-4" />
          <span>{languageLabels[language]}</span>
        </button>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-2 ml-2">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-foreground leading-tight">{user.name}</p>
              <p className="text-xs text-muted capitalize">{user.role}</p>
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-light text-primary text-sm font-semibold">
              {user.name.charAt(0)}
            </div>
            <button
              onClick={logout}
              className="flex items-center justify-center w-9 h-9 rounded-md text-muted hover:text-danger hover:bg-danger-light transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
