import { useCallback, useState } from 'react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { MotionConfig } from 'framer-motion'
import { useTerminal } from './hooks/useTerminal'
import { TerminalChrome } from './components/terminal/TerminalChrome'
import { StickyNav } from './components/nav/StickyNav'
import { BootScreen } from './components/sections/BootScreen'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { ProjectModal } from './components/sections/ProjectModal'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'

const BOOT_KEY = 'portfolio-booted'

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
  const { projectId, setProjectId, feedback, run, scrollTo } = useTerminal()

  const enter = useCallback(() => {
    try {
      localStorage.setItem(BOOT_KEY, '1')
    } catch {
      /* ignore */
    }
    setBooted(true)
  }, [])

  if (!booted) {
    return <BootScreen onEnter={enter} />
  }

  return (
    <>
      <a className="skip-link" href="#hero">
        {t.a11y.skip}
      </a>

      <TerminalChrome>
        <StickyNav
          onNavigate={scrollTo}
          onCommand={run}
          feedback={feedback}
        />
        <main
          id="main"
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
        >
          <Hero />
          <About />
          <Skills />
          <Projects onOpen={setProjectId} />
          <Contact />
          <Footer />
        </main>
      </TerminalChrome>

      <ProjectModal projectId={projectId} onClose={() => setProjectId(null)} />
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
