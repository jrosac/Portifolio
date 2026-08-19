import { useLanguage } from '../../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <div>
      <h2 id="exit-title" className="sr-only">
        {t.footer.command}
      </h2>
      <p className="text-fg">{t.footer.thanks}</p>
      <p className="mt-2 text-muted">{t.footer.closed}</p>
      <p className="mt-8 text-xs text-muted">{t.footer.copy}</p>
    </div>
  )
}
