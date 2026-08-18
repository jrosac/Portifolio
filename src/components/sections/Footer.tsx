import { Prompt } from '../terminal/Prompt'
import { useLanguage } from '../../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer
      id="footer"
      className="scroll-mt-4 px-4 py-10 sm:px-6 md:px-8 md:py-14"
    >
      <Prompt command={t.footer.command} className="mb-6" />
      <p className="text-fg">{t.footer.thanks}</p>
      <p className="mt-2 text-muted">{t.footer.closed}</p>
      <p className="mt-8 text-xs text-muted">{t.footer.copy}</p>
    </footer>
  )
}
