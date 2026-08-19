import { useLanguage } from '../../i18n/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <div className="space-y-3">
      <h1 id="whoami-title" className="text-2xl font-medium text-fg sm:text-3xl">
        {t.hero.name}
      </h1>
      <p className="text-accent">{t.hero.role}</p>
      <p className="max-w-prose text-muted">{t.hero.tagline}</p>
      <p className="pt-2 text-sm text-success">{t.hero.available}</p>
    </div>
  )
}
