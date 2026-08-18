import { CommandBlock } from '../terminal/CommandBlock'
import { useLanguage } from '../../i18n/LanguageContext'
import { projects } from '../../data/projects'

type ProjectsProps = {
  onOpen: (id: string) => void
}

export function Projects({ onOpen }: ProjectsProps) {
  const { lang, t } = useLanguage()

  return (
    <CommandBlock id="projects" command={t.projects.command}>
      <div className="space-y-4">
        <p className="text-sm tracking-wide text-muted">{t.projects.found}</p>
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => onOpen(project.id)}
                aria-label={`${t.a11y.openProject} ${project.name[lang]}`}
                className={`group flex w-full items-start justify-between gap-3 rounded-md border px-3 py-3 text-left transition-colors ${
                  project.featured
                    ? 'border-accent/30 bg-accent/5 hover:border-accent/60'
                    : 'border-border bg-surface/40 hover:border-muted'
                }`}
              >
                <span className="min-w-0">
                  <span className="text-muted">[{project.id}]</span>{' '}
                  <span className="text-fg group-hover:text-accent">
                    {project.name[lang]}
                  </span>
                  <span className="mt-1 block truncate text-xs text-muted">
                    {project.summary[lang]}
                  </span>
                </span>
                {project.featured ? (
                  <span className="shrink-0 text-[10px] uppercase tracking-wider text-accent">
                    {t.projects.featured}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted">$ {t.projects.hint}</p>
      </div>
    </CommandBlock>
  )
}
