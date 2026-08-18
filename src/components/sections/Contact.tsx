import { useState, type FormEvent } from 'react'
import { CommandBlock } from '../terminal/CommandBlock'
import { Prompt } from '../terminal/Prompt'
import { useLanguage } from '../../i18n/LanguageContext'

export function Contact() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status !== 'idle') return
    setStatus('sending')
    // Hook for Formspree / Web3Forms later.
    window.setTimeout(() => setStatus('sent'), 700)
  }

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

        <div className="space-y-4">
          <Prompt command={t.contact.formTitle} />
          <form onSubmit={submit} className="max-w-lg space-y-4">
            <label className="block space-y-1 text-sm">
              <span className="text-muted">{t.contact.name}</span>
              <input
                name="name"
                required
                autoComplete="name"
                placeholder={t.contact.namePlaceholder}
                disabled={status !== 'idle'}
                className="w-full rounded border border-border bg-surface px-3 py-2 text-fg outline-none placeholder:text-muted/60 focus:border-accent"
              />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="text-muted">{t.contact.email}</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t.contact.emailPlaceholder}
                disabled={status !== 'idle'}
                className="w-full rounded border border-border bg-surface px-3 py-2 text-fg outline-none placeholder:text-muted/60 focus:border-accent"
              />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="text-muted">{t.contact.message}</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t.contact.messagePlaceholder}
                disabled={status !== 'idle'}
                className="w-full resize-y rounded border border-border bg-surface px-3 py-2 text-fg outline-none placeholder:text-muted/60 focus:border-accent"
              />
            </label>
            {status === 'sent' ? (
              <p className="text-sm text-success">&gt; {t.contact.sent}</p>
            ) : (
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-accent hover:bg-accent/15 disabled:opacity-60"
              >
                $ {status === 'sending' ? t.contact.sending : t.contact.send}
              </button>
            )}
          </form>
        </div>
      </div>
    </CommandBlock>
  )
}
