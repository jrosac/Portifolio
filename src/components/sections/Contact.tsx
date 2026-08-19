import { useLanguage } from '../../i18n/LanguageContext'

export function Contact() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      <h2 id="contact-title" className="sr-only">
        {t.contact.command}
      </h2>
      <p className="text-lg tracking-wide text-accent sm:text-xl">
        {t.contact.headline}
      </p>

      <dl className="space-y-2 text-sm sm:text-base">
        <div className="flex flex-wrap gap-x-3">
          <dt className="text-muted">{t.contact.email}:</dt>
          <dd>
            <a
              href={`mailto:${t.contacts.email}`}
              className="text-fg underline-offset-4 hover:text-accent hover:underline"
            >
              {t.contacts.email}
            </a>
          </dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="text-muted">{t.contact.github}:</dt>
          <dd>
            <a
              href={t.contacts.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-fg underline-offset-4 hover:text-accent hover:underline"
            >
              {t.contacts.githubLabel}
            </a>
          </dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="text-muted">{t.contact.linkedin}:</dt>
          <dd>
            <a
              href={t.contacts.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-fg underline-offset-4 hover:text-accent hover:underline"
            >
              {t.contacts.linkedinLabel}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  )
}
