import { Cursor } from './Cursor'

type PromptProps = {
  command?: string
  showCursor?: boolean
  className?: string
}

export function Prompt({ command, showCursor = false, className = '' }: PromptProps) {
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 break-all ${className}`}>
      <span className="shrink-0">
        <span className="text-accent">joao</span>
        <span className="text-muted">@portfolio</span>
        <span className="text-fg">:~$</span>
      </span>
      {command ? <span className="text-command">{command}</span> : null}
      {showCursor ? <Cursor /> : null}
    </p>
  )
}
