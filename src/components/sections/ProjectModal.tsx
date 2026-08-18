import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import { projects } from '../../data/projects'
import { Prompt } from '../terminal/Prompt'

type ProjectModalProps = {
  projectId: string | null
  onClose: () => void
}

export function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const { lang, t } = useLanguage()
  const closeRef = useRef<HTMLButtonElement>(null)
  const project = projects.find((item) => item.id === projectId) ?? null

  useEffect(() => {
    if (!project) return
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [onClose, project])

  const hasLive = Boolean(project?.liveUrl && project.liveUrl !== '#')

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden border border-border bg-terminal sm:rounded-xl"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
              <Prompt command={`open ${project.id}`} className="text-xs sm:text-sm" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="text-xs text-muted hover:text-fg"
                aria-label={t.a11y.closeModal}
              >
                esc
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6">
              <img
                src={project.image}
                alt=""
                className="mb-5 w-full rounded-md border border-border"
                loading="lazy"
              />

              <p className="text-xs tracking-wide text-muted">PROJECT</p>
              <h2 id="project-title" className="mt-1 text-xl text-fg">
                {project.name[lang]}
              </h2>

              <p className="mt-6 text-xs tracking-wide text-muted">
                {t.projects.description}
              </p>
              <p className="mt-2 text-sm text-fg">{project.description[lang]}</p>

              <p className="mt-6 text-xs tracking-wide text-muted">
                {t.projects.technologies}
              </p>
              <p className="mt-2 text-sm text-accent">
                {project.technologies.join(' / ')}
              </p>

              <p className="mt-6 text-xs tracking-wide text-muted">
                {t.projects.features}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {project.features[lang].map((feature) => (
                  <li key={feature} className="text-fg">
                    <span className="text-success">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {hasLive ? (
                  <a
                    href={project.liveUrl ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-accent hover:bg-accent/15"
                  >
                    [ {t.projects.live} ]
                  </a>
                ) : (
                  <span className="rounded border border-border px-3 py-2 text-sm text-muted">
                    [ {t.projects.noLive} ]
                  </span>
                )}
                {project.githubUrl && project.githubUrl !== '#' ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border border-border px-3 py-2 text-sm text-fg hover:border-accent/40 hover:text-accent"
                  >
                    [ {t.projects.github} ]
                  </a>
                ) : (
                  <span className="rounded border border-border px-3 py-2 text-sm text-muted">
                    [ {t.projects.github} ]
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
