import type { ReactNode } from 'react'

type TerminalChromeProps = {
  children: ReactNode
}

export function TerminalChrome({ children }: TerminalChromeProps) {
  return (
    <div className="h-dvh bg-[#07090d] md:p-4 lg:p-6">
      <div className="mx-auto flex h-full min-h-0 min-w-0 max-w-5xl flex-col overflow-hidden border-border bg-terminal md:rounded-xl md:border md:shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <header className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-3 py-2 md:px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
            <span className="size-2.5 rounded-full bg-[#28c840]/90" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center text-xs text-muted sm:text-sm">
            joao@portfolio — zsh
          </p>
          <span className="hidden w-10 sm:block" aria-hidden="true" />
        </header>
        {children}
      </div>
    </div>
  )
}
