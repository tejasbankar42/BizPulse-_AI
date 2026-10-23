import { useTranslation } from 'react-i18next'

interface PlaceholderPageProps {
  titleKey: string
  descriptionKey?: string
}

export function PlaceholderPage({ titleKey, descriptionKey }: PlaceholderPageProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
        <div className="w-8 h-8 rounded-full bg-primary/20" />
      </div>
      <h1 className="text-2xl font-semibold text-foreground mb-2">{t(titleKey)}</h1>
      {descriptionKey && (
        <p className="text-muted text-sm max-w-md">{t(descriptionKey)}</p>
      )}
      <p className="text-muted text-xs mt-4">Coming soon</p>
    </div>
  )
}
