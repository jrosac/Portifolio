import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

type StickyNavProps = {
  onCommand: (value: string) => void
  feedback: string | null
}

export function StickyNav({ onCommand, feedback }: StickyNavProps) {
  const { lang, setLang, t } = useLanguage()
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const focusPrompt = () => {
    inputRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    focusPrompt()
  }, [])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next = value.trim()
    if (!next) return
    onCommand(next)
    setValue('')
    focusPrompt()
  }

  const run = (command: string) => {
    onCommand(command)
    setValue('')
    focusPrompt()
  }

  return (
    <div className="z-20 shrink-0 border-b border-border bg-terminal/95 backdrop-blur">
      <div className="flex items-center justify-end px-3 pt-2 sm:px-4 md:px-6">
        <div
          className="flex items-center gap-1 text-xs sm:text-sm"
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
      </div>

      <form onSubmit={submit} className="px-3 pb-2 sm:px-4 md:px-6">
        <label className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <span className="shrink-0">
            <span className="text-accent">joao</span>
            <span className="text-muted">@portfolio</span>
            <span className="text-fg">:~$</span>
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={t.commands.placeholder}
            aria-label={t.a11y.commandInput}
            autoComplete="off"
            spellCheck={false}
            className="min-w-[12rem] flex-1 bg-transparent caret-accent text-fg outline-none placeholder:text-muted/55"
          />
        </label>
      </form>

      <div className="border-t border-border/70 px-3 py-2 sm:px-4 md:px-6">
        <p className="mb-1.5 text-[10px] uppercase tracking-wider text-muted">
          {t.commands.legendLabel}
          <span className="normal-case tracking-normal">
            {' '}
            · {t.commands.enterHint}
          </span>
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          {t.commands.list.map((item) => (
            <li key={item.cmd}>
              <button
                type="button"
                onClick={() => run(item.cmd)}
                className="text-left text-xs"
              >
                <span className="text-command hover:text-accent">{item.cmd}</span>
                <span className="text-muted"> — {item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {feedback ? (
        <p
          className={`border-t border-border/70 px-3 py-2 text-xs md:px-6 ${
            feedback.includes('not found') ? 'text-[#f85149]' : 'text-muted'
          }`}
        >
          {feedback}
        </p>
      ) : null}
    </div>
  )
}
