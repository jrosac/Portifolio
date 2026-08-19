import { useCallback, useState } from 'react'
import { projects } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'contact' | 'footer'

export function useTerminal() {
  const { setLang, t } = useLanguage()
  const reduced = usePrefersReducedMotion()
  const [projectId, setProjectId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const scrollTo = useCallback(
    (id: SectionId) => {
      const scroller = document.getElementById('main')
      const node = document.getElementById(id)
      if (!scroller || !node) return

      const nextTop =
        scroller.scrollTop +
        node.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top

      scroller.scrollTo({
        top: nextTop,
        behavior: reduced ? 'auto' : 'smooth',
      })
      window.scrollTo(0, 0)
    },
    [reduced],
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
          scrollTo(cmd)
          setFeedback(null)
          return
        case 'whoami':
        case 'home':
        case 'clear':
          if (cmd === 'clear') {
            setFeedback(null)
            return
          }
          scrollTo('hero')
          setFeedback(null)
          return
        case 'exit':
          scrollTo('footer')
          setFeedback(null)
          return
        case 'help':
          setFeedback(t.commands.help)
          return
        case 'lang': {
          const next = args[0]
          if (next === 'pt' || next === 'en') {
            setLang(next)
            setFeedback(
              next === 'pt' ? 'Idioma: Português' : 'Language: English',
            )
            return
          }
          setFeedback(t.commands.langUsage)
          return
        }
        case 'open': {
          const token = args[0]?.replace(/^#/, '') ?? ''
          const id = token.padStart(2, '0')
          const exists = projects.some((project) => project.id === id)
          if (exists) {
            setProjectId(id)
            scrollTo('projects')
            setFeedback(null)
            return
          }
          setFeedback(t.commands.projectNotFound)
          return
        }
        default:
          setFeedback(t.commands.notFound.replace('{cmd}', cmd))
      }
    },
    [scrollTo, setLang, t],
  )

  return { projectId, setProjectId, feedback, run, scrollTo }
}
