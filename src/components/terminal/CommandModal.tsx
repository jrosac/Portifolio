import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import { Prompt } from '../terminal/Prompt'

type CommandModalProps = {
  open: boolean
  command: string
  labelledBy?: string
  onClose: () => void
  children: ReactNode
  zIndex?: string
  ignoreEscape?: boolean
}

export function CommandModal({
  open,
  command,
  labelledBy,
  onClose,
  children,
  zIndex = 'z-40',
  ignoreEscape = false,
}: CommandModalProps) {
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    dialogRef.current?.focus({ preventScroll: true })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !ignoreEscape) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus({ preventScroll: true })
    }
  }, [ignoreEscape, onClose, open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={`fixed inset-0 ${zIndex} flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className="flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden border border-border bg-terminal outline-none sm:rounded-xl"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
              <Prompt command={command} className="text-xs sm:text-sm" />
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-muted hover:text-fg"
                aria-label={t.a11y.closeModal}
              >
                esc
              </button>
            </div>
            <div className="overflow-y-auto p-4 sm:p-6">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
