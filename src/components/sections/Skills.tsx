import { useLanguage } from '../../i18n/LanguageContext'
import { levelDots, skillCategories, type SkillLevel } from '../../data/skills'

function LevelDots({ level }: { level: SkillLevel }) {
  const filled = levelDots[level]
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          className={`size-1.5 rounded-full ${dot <= filled ? 'bg-accent' : 'bg-border'}`}
        />
      ))}
    </span>
  )
}

export function Skills() {
  const { lang, t } = useLanguage()

  return (
    <div className="space-y-8">
      <h2 id="skills-title" className="sr-only">
        {t.skills.command}
      </h2>
      <div>
        <p className="text-sm tracking-wide text-muted">{t.skills.intro}</p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span>{t.skills.legend}:</span>
          <span className="inline-flex items-center gap-2">
            <LevelDots level="familiar" /> {t.skills.levels.familiar}
          </span>
          <span className="inline-flex items-center gap-2">
            <LevelDots level="working" /> {t.skills.levels.working}
          </span>
          <span className="inline-flex items-center gap-2">
            <LevelDots level="strong" /> {t.skills.levels.strong}
          </span>
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <article
            key={category.id}
            className="rounded-md border border-border bg-surface/60 p-4"
          >
            <p className="text-xs text-muted">$ {category.command}</p>
            <h3 className="mt-2 text-sm font-medium text-accent">
              {category.label[lang]}
            </h3>
            <ul className="mt-3 space-y-2">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-fg">{item.name}</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="sr-only">{t.skills.levels[item.level]}</span>
                    <LevelDots level={item.level} />
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
