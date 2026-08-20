import { useLanguage } from '../../i18n/LanguageContext'
import { experience } from '../../data/experience'

export function Experience() {
  const { lang, t } = useLanguage()

  return (
    <div className="space-y-8 text-sm sm:text-base">
      <h2 id="experience-title" className="sr-only">
        {t.experience.command}
      </h2>
      <p className="text-xs tracking-[0.14em] text-muted">
        {t.experience.intro}
      </p>

      <ol className="space-y-8">
        {experience.map((item) => (
          <li key={item.id} className="space-y-3">
            <div className="space-y-1">
              <p className="text-fg">{item.role[lang]}</p>
              <p className="text-accent">{item.org[lang]}</p>
              <p className="text-xs text-muted">
                {item.period[lang]}
                <span className="text-border"> · </span>
                {item.location[lang]}
              </p>
            </div>
            <p className="max-w-prose text-muted">{item.summary[lang]}</p>
            <ul className="space-y-1">
              {item.highlights[lang].map((line) => (
                <li key={line} className="text-fg">
                  <span className="text-command">-</span> {line}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
