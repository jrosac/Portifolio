export function Cursor({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block h-[1.05em] w-[0.55ch] translate-y-[0.12em] bg-accent align-baseline animate-caret ${className}`}
      aria-hidden="true"
    />
  )
}
