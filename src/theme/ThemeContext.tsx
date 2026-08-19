import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export const THEMES = ['github', 'midnight'] as const

export type ThemeId = (typeof THEMES)[number]

const STORAGE_KEY = 'portfolio-theme'

type ThemeContextValue = {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  cycleTheme: () => ThemeId
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'github' || stored === 'midnight') return stored
  } catch {
    /* ignore */
  }
  return 'github'
}

export function isThemeId(value: string): value is ThemeId {
  return THEMES.includes(value as ThemeId)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readStoredTheme)

  const apply = useCallback((next: ThemeId) => {
    setThemeState(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const setTheme = useCallback(
    (next: ThemeId) => {
      apply(next)
    },
    [apply],
  )

  const cycleTheme = useCallback(() => {
    const index = THEMES.indexOf(theme)
    const next = THEMES[(index + 1) % THEMES.length] ?? 'github'
    apply(next)
    return next
  }, [apply, theme])

  const value = useMemo(
    () => ({ theme, setTheme, cycleTheme }),
    [cycleTheme, setTheme, theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
