import { CommandBlock } from '../terminal/CommandBlock'
import { Cursor } from '../terminal/Cursor'
import { useLanguage } from '../../i18n/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <CommandBlock id="hero" command={t.hero.command}>
      <div className="space-y-3">
        <h1 className="text-2xl font-medium text-fg sm:text-3xl">{t.hero.name}</h1>
        <p className="text-accent">{t.hero.role}</p>
        <p className="max-w-prose text-muted">{t.hero.tagline}</p>
        <p className="pt-2 text-sm text-success">{t.hero.available}</p>
        <p className="pt-4 text-muted">
          <span className="text-accent">joao</span>
          <span className="text-muted">@portfolio</span>
          <span className="text-fg">:~$</span>
          <Cursor className="ml-2" />
        </p>
      </div>
    </CommandBlock>
  )
}
