import { CommandBlock } from '../terminal/CommandBlock'
import { useLanguage } from '../../i18n/LanguageContext'

export function Contact() {
  const { t } = useLanguage()

  return (
    <CommandBlock id="contact" command={t.contact.command}>
      <div className="space-y-8">
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
    </CommandBlock>
  )
}
