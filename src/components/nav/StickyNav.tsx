import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { Cursor } from '../terminal/Cursor'
import { Prompt } from '../terminal/Prompt'
import type { HistoryItem } from '../../hooks/useTerminal'

type CommandBarProps = {
  onCommand: (value: string) => void
}

export function CommandBar({ onCommand }: CommandBarProps) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
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
    <form
      onSubmit={submit}
      className="flex items-baseline gap-3 px-4 py-1 sm:px-6 md:px-8"
    >
      <label className="flex min-w-0 flex-1 cursor-text flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
        <span className="shrink-0">
          <span className="text-accent">joao</span>
          <span className="text-muted">@portfolio</span>
          <span className="text-fg">:~$</span>
        </span>
        <span className="relative min-w-[8rem] flex-1">
          <input
            id="command-input"
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label={t.a11y.commandInput}
            autoComplete="off"
            spellCheck={false}
            className="absolute inset-0 z-10 w-full bg-transparent caret-transparent text-transparent outline-none"
          />
          <span className="pointer-events-none inline-flex min-h-[1.25em] max-w-full flex-wrap items-baseline whitespace-pre-wrap break-all text-fg">
            {value}
            {focused ? <Cursor /> : null}
          </span>
        </span>
      </label>
    </form>
  )
}

export function HistoryLine({ item }: { item: Extract<HistoryItem, { kind: 'line' }> }) {
  return (
    <div className="px-4 py-1 sm:px-6 md:px-8">
      <Prompt command={item.command} className="text-sm" />
      {item.message ? (
        <p
          className={`mt-1 text-xs ${item.error ? 'text-[#f85149]' : 'text-muted'}`}
        >
          {item.message}
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
    <div className="px-4 py-3 sm:px-6 md:px-8">
      <div className="mb-5 max-w-3xl space-y-3 text-sm">
        <h1 className="text-base font-medium text-accent">{t.commands.guide.title}</h1>
        <p className="text-fg">{t.commands.guide.intro}</p>
        <p className="text-muted">{t.commands.guide.explanation}</p>
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            {t.commands.guide.manualTitle}
          </p>
          <ol className="space-y-1 text-xs text-fg">
            {t.commands.guide.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

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
            <ul className="divide-y divide-border/60 border border-border/70 bg-surface/40">
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
