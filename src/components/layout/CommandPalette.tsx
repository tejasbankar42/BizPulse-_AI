import { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'
import { Search, ArrowRight } from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  category: 'page' | 'question'
  action: () => void
}

export function CommandPalette() {
  const { t } = useTranslation()
  const { commandPaletteOpen, toggleCommandPalette } = useAppStore()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const allItems: CommandItem[] = useMemo(
    () => [
      { id: 'nav-dashboard', label: t('nav.dashboard'), category: 'page', action: () => navigate('/app/dashboard') },
      { id: 'nav-upload', label: t('nav.upload'), category: 'page', action: () => navigate('/app/upload') },
      { id: 'nav-chat', label: t('nav.chat'), category: 'page', action: () => navigate('/app/chat') },
      { id: 'nav-insights', label: t('nav.insights'), category: 'page', action: () => navigate('/app/insights') },
      { id: 'nav-actions', label: t('nav.actions'), category: 'page', action: () => navigate('/app/actions') },
      { id: 'nav-reports', label: t('nav.reports'), category: 'page', action: () => navigate('/app/reports') },
      { id: 'nav-eval', label: t('nav.evaluation'), category: 'page', action: () => navigate('/app/evaluation') },
      { id: 'nav-settings', label: t('nav.settings'), category: 'page', action: () => navigate('/app/settings') },
      { id: 'q-1', label: 'What was yesterday\'s revenue?', category: 'question', action: () => { navigate('/app/chat'); } },
      { id: 'q-2', label: 'Which product has the highest margin?', category: 'question', action: () => { navigate('/app/chat'); } },
      { id: 'q-3', label: 'Show me the sales trend for Vada Pav', category: 'question', action: () => { navigate('/app/chat'); } },
      { id: 'q-4', label: 'Why did Cold Coffee sales drop?', category: 'question', action: () => { navigate('/app/chat'); } },
      { id: 'q-5', label: 'Forecast next week\'s revenue', category: 'question', action: () => { navigate('/app/chat'); } },
    ],
    [t, navigate]
  )

  const filtered = useMemo(() => {
    if (!query) return allItems
    const lower = query.toLowerCase()
    return allItems.filter((item) => item.label.toLowerCase().includes(lower))
  }, [query, allItems])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        toggleCommandPalette()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [commandPaletteOpen, toggleCommandPalette])

  // Reset query when opened — track previous state to avoid setState in effect
  const prevOpenRef = useRef(commandPaletteOpen)
  if (commandPaletteOpen && !prevOpenRef.current) {
    setQuery('')
  }
  prevOpenRef.current = commandPaletteOpen

  if (!commandPaletteOpen) return null

  const pages = filtered.filter((i) => i.category === 'page')
  const questions = filtered.filter((i) => i.category === 'question')

  const handleSelect = (item: CommandItem) => {
    item.action()
    toggleCommandPalette()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 animate-fade-in"
        onClick={toggleCommandPalette}
      />

      {/* Dialog */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 animate-scale-in">
        <div className="bg-surface rounded-lg shadow-dropdown border border-border overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 h-12 border-b border-border">
            <Search className="w-5 h-5 text-muted flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('common.search')}
              className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted outline-none"
              autoFocus
            />
            <kbd className="px-1.5 py-0.5 rounded border border-border text-[10px] text-muted font-mono">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2">
            {pages.length > 0 && (
              <div>
                <p className="px-4 py-1 text-[11px] font-medium text-muted uppercase tracking-wider">
                  Pages
                </p>
                {pages.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-2.5 text-sm text-foreground',
                      'hover:bg-background transition-colors text-left'
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-muted" />
                  </button>
                ))}
              </div>
            )}

            {questions.length > 0 && (
              <div>
                <p className="px-4 py-1 mt-1 text-[11px] font-medium text-muted uppercase tracking-wider">
                  Suggested Questions
                </p>
                {questions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-2.5 text-sm text-foreground',
                      'hover:bg-background transition-colors text-left'
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-muted" />
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-muted">
                No results found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
