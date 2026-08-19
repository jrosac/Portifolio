import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { Cursor } from '../terminal/Cursor'

type CommandBarProps = {
  onCommand: (value: string) => void
  feedback: string | null
}

export function CommandBar({ onCommand, feedback }: CommandBarProps) {
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

  return (
    <div className="z-20 shrink-0 border-b border-border bg-terminal/95 backdrop-blur">
      <form
        onSubmit={submit}
        className="flex items-baseline gap-3 px-3 py-2.5 sm:px-4 md:px-6"
      >
        <label className="flex min-w-0 flex-1 cursor-text flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
          <span className="shrink-0">
            <span className="text-accent">joao</span>
            <span className="text-muted">@portfolio</span>
            <span className="text-fg">:~$</span>
          </span>
          <span className="relative min-w-[8rem] flex-1">
            <input
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              aria-label={t.a11y.commandInput}
              autoComplete="off"
              spellCheck={false}
              className="absolute inset-0 z-10 w-full bg-transparent caret-transparent text-transparent outline-none"
            />
            <span className="pointer-events-none inline-flex min-h-[1.25em] max-w-full flex-wrap items-baseline whitespace-pre-wrap break-all text-fg">
              {value}
              <Cursor />
            </span>
          </span>
        </label>

        <div
          className="shrink-0 self-start pt-0.5 text-xs"
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
      </form>

      {feedback ? (
        <p
          className={`border-t border-border/70 px-3 py-2 text-xs md:px-6 ${
            feedback.includes('not found') ? 'text-[#f85149]' : 'text-muted'
          }`}
        >
          <span className="text-command">&gt; </span>
          {feedback}
        </p>
      ) : null}
    </div>
  )
}

type CommandLegendProps = {
  onCommand: (value: string) => void
}

export function CommandLegend({ onCommand }: CommandLegendProps) {
  const { t } = useLanguage()

  const groupLabel = (id: string) =>
    id === 'nav' ? t.commands.navGroup : t.commands.sysGroup

  return (
    <div
      id="help"
      className="border-b border-border/80 bg-surface/40 px-3 py-3 sm:px-4 md:px-6"
    >
      <p className="mb-3 text-[10px] tracking-wider text-muted">
        <span className="text-command">#</span> {t.commands.legendLabel}
        <span className="text-border"> · </span>
        {t.commands.enterHint}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {t.commands.groups.map((group) => (
          <div key={group.id}>
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              {groupLabel(group.id)}
            </p>
            <ul className="divide-y divide-border/60 border border-border/70 bg-terminal/60">
              {group.items.map((item) => (
                <li key={item.cmd}>
                  <button
                    type="button"
                    onClick={() => onCommand(item.cmd)}
                    className="grid w-full grid-cols-[6.5rem_1fr] items-baseline gap-3 px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-raised"
                  >
                    <span className="truncate text-command">{item.cmd}</span>
                    <span className="truncate text-muted">{item.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
