import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { TypeLine } from './TypeLine'

type CommandBlockProps = {
  id: string
  command: string
  children: ReactNode
}

export function CommandBlock({ id, command, children }: CommandBlockProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [typed, setTyped] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const root = document.getElementById('main')
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true)
      },
      { root, threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="scroll-mt-4 border-b border-border/80 px-4 py-10 sm:px-6 md:px-8 md:py-14"
    >
      <p className="mb-6 flex flex-wrap items-baseline gap-x-2 break-all">
        <span className="shrink-0">
          <span className="text-accent">joao</span>
          <span className="text-muted">@portfolio</span>
          <span className="text-fg">:~$</span>
        </span>
        <TypeLine
          text={command}
          active={inView}
          className="text-command"
          showCursor={!typed}
          onDone={() => setTyped(true)}
        />
      </p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  )
}
