import { Prompt } from '../terminal/Prompt'
import { useLanguage } from '../../i18n/LanguageContext'

export function About() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6 text-sm sm:text-base">
      <h2 id="about-title" className="sr-only">
        {t.about.command}
      </h2>
      <dl className="space-y-1">
        <div>
          <dt className="inline text-muted">{t.about.nameLabel}: </dt>
          <dd className="inline text-fg">{t.about.name}</dd>
        </div>
        <div>
          <dt className="inline text-muted">{t.about.roleLabel}: </dt>
          <dd className="inline text-accent">{t.about.role}</dd>
        </div>
      </dl>

      <p className="max-w-prose text-fg">
        <span className="text-command">&gt; </span>
        {t.about.bio}
      </p>
      <p className="max-w-prose text-muted">{t.about.interests}</p>

      <div className="space-y-3">
        <Prompt command={t.about.softCommand} />
        <ol className="space-y-1">
          {t.softSkills.map((skill, index) => (
            <li key={skill} className="flex gap-3">
              <span className="text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{skill}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-3">
        <Prompt command={t.about.hobbiesCommand} />
        <p className="text-muted">{t.about.hobbiesLabel}</p>
        <ul className="space-y-1">
          {t.about.hobbies.map((hobby) => (
            <li key={hobby} className="text-fg">
              <span className="text-command">-</span> {hobby}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
