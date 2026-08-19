import type { ReactNode } from 'react'
import { LanguageSwitch } from '../nav/LanguageSwitch'

type TerminalChromeProps = {
  children: ReactNode
}

export function TerminalChrome({ children }: TerminalChromeProps) {
  return (
    <div className="h-dvh bg-page p-2 sm:p-3 lg:p-4">
      <div className="mx-auto flex h-full min-h-0 min-w-0 w-full max-w-[92rem] flex-col overflow-hidden rounded-lg border border-border bg-terminal md:rounded-xl md:shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <header className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-3 py-2 md:px-4">
          <div className="flex w-16 shrink-0 gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
            <span className="size-2.5 rounded-full bg-[#28c840]/90" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center text-xs text-muted sm:text-sm">
            joao@portfolio — zsh
          </p>
          <div className="flex w-16 shrink-0 justify-end">
            <LanguageSwitch />
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}
