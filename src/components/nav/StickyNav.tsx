import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import { Cursor } from '../terminal/Cursor'
import { IdentityBanner } from '../terminal/IdentityBanner'
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

export function HomeScreen() {
  return <IdentityBanner />
}

type CommandLegendProps = {
  onCommand: (value: string) => void
}

export function CommandLegend({ onCommand }: CommandLegendProps) {
  const { t } = useLanguage()

  const groupLabel = (id: string) =>
    id === 'nav' ? t.commands.navGroup : t.commands.sysGroup

  return (
    <motion.div
      className="px-4 py-3 sm:px-6 md:px-8"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-xl space-y-7 text-sm">
        {t.commands.groups.map((group) => (
          <div key={group.id}>
            <p className="mb-3 text-[11px] tracking-[0.16em] text-muted">
              {groupLabel(group.id)}
            </p>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item.cmd}>
                  <button
                    type="button"
                    onClick={() => onCommand(item.cmd)}
                    className="grid w-full grid-cols-[7.5rem_1fr] items-baseline gap-3 py-0.5 text-left transition-colors hover:text-fg"
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
    </motion.div>
  )
}
