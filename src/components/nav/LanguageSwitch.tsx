import { useLanguage } from '../../i18n/LanguageContext'

export function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      className="flex shrink-0 items-center text-xs"
      role="group"
      aria-label={t.a11y.langSwitch}
    >
      <button
        type="button"
        onClick={() => setLang('pt')}
        className={`px-1 ${lang === 'pt' ? 'text-accent' : 'text-muted hover:text-fg'}`}
        aria-pressed={lang === 'pt'}
      >
        PT
      </button>
      <span className="text-border">/</span>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-1 ${lang === 'en' ? 'text-accent' : 'text-muted hover:text-fg'}`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}
