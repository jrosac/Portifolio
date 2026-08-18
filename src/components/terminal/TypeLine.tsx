import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Cursor } from './Cursor'

type TypeLineProps = {
  text: string
  active?: boolean
  speed?: number
  className?: string
  showCursor?: boolean
  onDone?: () => void
}

export function TypeLine({
  text,
  active = true,
  speed = 22,
  className = '',
  showCursor = false,
  onDone,
}: TypeLineProps) {
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState('')
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const done = shown === text

  useEffect(() => {
    if (!active) return

    if (reduced) {
      setShown(text)
      onDoneRef.current?.()
      return
    }

    setShown('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) {
        window.clearInterval(id)
        onDoneRef.current?.()
      }
    }, speed)

    return () => window.clearInterval(id)
  }, [active, reduced, speed, text])

  return (
    <span className={className}>
      {shown}
      {showCursor && !done ? <Cursor /> : null}
    </span>
  )
}
