import { useCallback, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export type PanelId =
  | 'whoami'
  | 'about'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'exit'

export type HistoryItem =
  | { id: number; kind: 'help' }
  | { id: number; kind: 'line'; command: string; message?: string; error?: boolean }

export function useTerminal() {
  const { setLang, t } = useLanguage()
  const nextId = useRef(1)
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 0, kind: 'help' },
  ])
  const [panel, setPanel] = useState<PanelId | null>(null)
  const [projectId, setProjectId] = useState<string | null>(null)

  const append = useCallback(
    (item: Omit<HistoryItem, 'id'> | HistoryItem) => {
      const id = nextId.current++
      setHistory((current) => [...current, { ...item, id } as HistoryItem])
    },
    [],
  )

  const echo = useCallback(
    (command: string, message?: string, error = false) => {
      append({ kind: 'line', command, message, error })
    },
    [append],
  )

  const openPanel = useCallback(
    (command: string, next: PanelId) => {
      echo(command)
      setProjectId(null)
      setPanel(next)
    },
    [echo],
  )

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim().replace(/^\$\s*/, '').toLowerCase()
      if (!input) return
      const [cmd, ...args] = input.split(/\s+/)
      if (!cmd) return

      switch (cmd) {
        case 'about':
        case 'skills':
        case 'projects':
        case 'contact':
          openPanel(input, cmd)
          return
        case 'whoami':
        case 'home':
          openPanel(input, 'whoami')
          return
        case 'exit':
          openPanel(input, 'exit')
          return
        case 'help':
          echo(input, t.commands.help)
          setPanel(null)
          setProjectId(null)
          return
        case 'clear':
          setHistory([{ id: nextId.current++, kind: 'help' }])
          setPanel(null)
          setProjectId(null)
          return
        case 'lang': {
          const next = args[0]
          if (next === 'pt' || next === 'en') {
            setLang(next)
            echo(
              input,
              next === 'pt' ? 'Idioma: Português' : 'Language: English',
            )
            return
          }
          echo(input, t.commands.langUsage, true)
          return
        }
        default:
          echo(input, t.commands.notFound.replace('{cmd}', cmd), true)
      }
    },
    [append, echo, openPanel, setLang, t],
  )

  return { history, panel, setPanel, projectId, setProjectId, run }
}
