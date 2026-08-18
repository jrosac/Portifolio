import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Cursor } from '../terminal/Cursor'
import { Prompt } from '../terminal/Prompt'

type BootScreenProps = {
  onEnter: () => void
}

export function BootScreen({ onEnter }: BootScreenProps) {
  const { lang, setLang, t } = useLanguage()
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(reduced ? t.bootLines.length : 0)
  const logsDone = step >= t.bootLines.length

  useEffect(() => {
    if (reduced) return
    if (step >= t.bootLines.length) return
    const delay = step === 0 ? 180 : 240
    const id = window.setTimeout(() => setStep((current) => current + 1), delay)
    return () => window.clearTimeout(id)
  }, [reduced, step, t.bootLines.length])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEnter()
      if (event.key === 'Enter' && logsDone) onEnter()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [logsDone, onEnter])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-terminal px-4 py-6 text-sm sm:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-xs text-muted">boot sequence</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setLang('pt')}
              className={lang === 'pt' ? 'text-accent' : 'text-muted hover:text-fg'}
            >
              PT
            </button>
            <span className="text-border">|</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'text-accent' : 'text-muted hover:text-fg'}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            onClick={onEnter}
            className="text-xs text-muted underline-offset-4 hover:text-accent hover:underline"
          >
            {t.boot.skip}
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
        <div className="space-y-1">
          {t.bootLines.slice(0, step).map((line, index) => (
            <p
              key={`${line}-${index}`}
              className={line.startsWith('✓') ? 'text-success' : 'text-fg'}
            >
              {line || '\u00a0'}
            </p>
          ))}
        </div>

        {logsDone ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-10 space-y-4"
          >
            <Prompt />
            <div>
              <h1 className="text-2xl font-medium tracking-tight text-fg sm:text-3xl">
                {t.hero.name}
              </h1>
              <p className="mt-1 text-accent">{t.hero.role}</p>
              <p className="mt-4 max-w-prose text-muted">{t.hero.tagline}</p>
            </div>
            <button
              type="button"
              onClick={onEnter}
              className="inline-flex items-center gap-2 rounded border border-accent/40 bg-accent/10 px-3 py-2 text-accent transition-colors hover:bg-accent/15"
            >
              <span>$ {t.boot.enter}</span>
              <Cursor />
            </button>
            <p className="text-xs text-muted">{t.boot.hint}</p>
          </motion.div>
        ) : (
          <div className="mt-2">
            <Cursor />
          </div>
        )}
      </div>
    </div>
  )
}
