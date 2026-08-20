import { useLanguage } from '../../i18n/LanguageContext'
import { projects } from '../../data/projects'
import { CommandModal } from '../terminal/CommandModal'

type ProjectModalProps = {
  projectId: string | null
  onClose: () => void
}

const actionClass =
  'inline-flex min-w-[10.5rem] items-center justify-center rounded border border-accent/40 bg-accent/10 px-3 py-2 text-center text-sm text-accent transition-colors hover:bg-accent/15'

const disabledClass =
  'inline-flex min-w-[10.5rem] items-center justify-center rounded border border-border px-3 py-2 text-center text-sm text-muted'

export function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const { lang, t } = useLanguage()
  const project = projects.find((item) => item.id === projectId) ?? null
  const hasLive = Boolean(project?.liveUrl && project.liveUrl !== '#')

  return (
    <CommandModal
      open={Boolean(project)}
      command={project ? `projects/${project.id}` : 'projects'}
      labelledBy="project-title"
      onClose={onClose}
      zIndex="z-50"
    >
      {project ? (
        <>
          <img
            src={project.image}
            alt=""
            className="mb-5 w-full rounded-md border border-border"
            loading="lazy"
          />

          <p className="text-xs tracking-wide text-muted">{t.projects.projectLabel}</p>
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
                className={actionClass}
              >
                [ {t.projects.live} ]
              </a>
            ) : (
              <span className={disabledClass}>[ {t.projects.noLive} ]</span>
            )}
            {project.githubUrl && project.githubUrl !== '#' ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={actionClass}
              >
                [ {t.projects.github} ]
              </a>
            ) : (
              <span className={disabledClass}>[ {t.projects.github} ]</span>
            )}
          </div>
        </>
      ) : null}
    </CommandModal>
  )
}
