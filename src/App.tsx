import { useCallback, useEffect, useRef, useState } from 'react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { MotionConfig } from 'framer-motion'
import { useTerminal, type PanelId } from './hooks/useTerminal'
import { TerminalChrome } from './components/terminal/TerminalChrome'
import { CommandModal } from './components/terminal/CommandModal'
import {
  CommandBar,
  CommandLegend,
  HistoryLine,
  HomeScreen,
} from './components/nav/StickyNav'
import { BootScreen } from './components/sections/BootScreen'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { ProjectModal } from './components/sections/ProjectModal'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'

const BOOT_KEY = 'portfolio-booted'

const PANEL_META: Record<PanelId, { command: string; labelledBy: string }> = {
  whoami: { command: 'whoami', labelledBy: 'about-title' },
  about: { command: 'about', labelledBy: 'about-title' },
  skills: { command: 'skills', labelledBy: 'skills-title' },
  projects: { command: 'projects', labelledBy: 'projects-title' },
  experience: { command: 'experience', labelledBy: 'experience-title' },
  contact: { command: 'contact', labelledBy: 'contact-title' },
  exit: { command: 'exit', labelledBy: 'exit-title' },
}

function readBooted() {
  try {
    return localStorage.getItem(BOOT_KEY) === '1'
  } catch {
    return false
  }
}

function Portfolio() {
  const { t } = useLanguage()
  const [booted, setBooted] = useState(readBooted)
  const { history, panel, setPanel, projectId, setProjectId, run } =
    useTerminal()
  const logRef = useRef<HTMLElement>(null)

  const enter = useCallback(() => {
    try {
      localStorage.setItem(BOOT_KEY, '1')
    } catch {
      /* ignore */
    }
    setBooted(true)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [booted])

  useEffect(() => {
    const node = logRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [history])

  const closePanel = useCallback(() => {
    setPanel(null)
    setProjectId(null)
  }, [setPanel, setProjectId])

  if (!booted) {
    return <BootScreen onEnter={enter} />
  }

  const meta = panel ? PANEL_META[panel] : null

  return (
    <>
      <a className="skip-link" href="#command-input">
        {t.a11y.skip}
      </a>

      <TerminalChrome>
        <main
          id="main"
          ref={logRef}
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain py-3"
        >
          {history.map((item) =>
            item.kind === 'home' ? (
              <HomeScreen key={item.id} />
            ) : item.kind === 'help' ? (
              <CommandLegend key={item.id} onCommand={run} />
            ) : (
              <HistoryLine key={item.id} item={item} />
            ),
          )}
          <CommandBar onCommand={run} />
        </main>
      </TerminalChrome>

      <CommandModal
        open={Boolean(panel)}
        command={meta?.command ?? ''}
        labelledBy={meta?.labelledBy}
        onClose={closePanel}
        ignoreEscape={Boolean(projectId)}
      >
        {panel === 'whoami' || panel === 'about' ? <About /> : null}
        {panel === 'skills' ? <Skills /> : null}
        {panel === 'projects' ? (
          <Projects onOpen={setProjectId} />
        ) : null}
        {panel === 'experience' ? <Experience /> : null}
        {panel === 'contact' ? <Contact /> : null}
        {panel === 'exit' ? <Footer /> : null}
      </CommandModal>

      <ProjectModal
        projectId={projectId}
        onClose={() => setProjectId(null)}
      />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <Portfolio />
      </MotionConfig>
    </LanguageProvider>
  )
}
