import { useState, type FormEvent } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { SectionId } from '../../hooks/useTerminal'

const SECTIONS: { id: Extract<SectionId, 'about' | 'skills' | 'projects' | 'contact'>; key: 'about' | 'skills' | 'projects' | 'contact' }[] =
  [
    { id: 'about', key: 'about' },
    { id: 'skills', key: 'skills' },
    { id: 'projects', key: 'projects' },
    { id: 'contact', key: 'contact' },
  ]

type StickyNavProps = {
  onNavigate: (id: SectionId) => void
  onCommand: (value: string) => void
  feedback: string | null
}

export function StickyNav({ onNavigate, onCommand, feedback }: StickyNavProps) {
  const { lang, setLang, t } = useLanguage()
  const [value, setValue] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next = value.trim()
    if (!next) return
    onCommand(next)
    setValue('')
  }

  return (
    <div className="shrink-0 border-b border-border bg-terminal/95 backdrop-blur">
      <nav
        className="flex flex-wrap items-center gap-2 px-3 py-2 sm:px-4 md:px-6"
        aria-label="sections"
      >
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onNavigate(section.id)}
            className="whitespace-nowrap rounded border border-border bg-surface px-2 py-1 text-xs text-fg transition-colors hover:border-accent/50 hover:text-accent sm:text-sm"
          >
            <span className="text-muted">$ </span>
            {t.nav[section.key]}
          </button>
        ))}

        <div
          className="ml-auto flex items-center gap-1 text-xs sm:text-sm"
          role="group"
          aria-label={t.a11y.langSwitch}
        >
          <button
            type="button"
            onClick={() => setLang('pt')}
            className={`px-1.5 py-1 ${lang === 'pt' ? 'text-accent' : 'text-muted hover:text-fg'}`}
            aria-pressed={lang === 'pt'}
          >
            PT
          </button>
          <span className="text-border">|</span>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-1.5 py-1 ${lang === 'en' ? 'text-accent' : 'text-muted hover:text-fg'}`}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
        </div>
      </nav>

      <form
        onSubmit={submit}
        className="hidden border-t border-border/70 px-4 py-2 md:flex md:px-6"
      >
        <label className="flex w-full items-center gap-2 text-sm">
          <span className="shrink-0 text-accent">$</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={t.commands.placeholder}
            aria-label={t.a11y.commandInput}
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-fg outline-none placeholder:text-muted/70"
          />
        </label>
      </form>

      {feedback ? (
        <p className="border-t border-border/70 px-4 py-2 text-xs text-muted md:px-6">
          {feedback}
        </p>
      ) : null}
    </div>
  )
}
