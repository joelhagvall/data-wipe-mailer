'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'dw_theme'

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyThemeClass(theme: Theme) {
  if (typeof document === 'undefined') return
  const isDark = theme === 'dark' || (theme === 'system' && getSystemPrefersDark())
  document.documentElement.classList.toggle('dark', isDark)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          return stored
        }
      } catch {}
    }
    return 'system'
  })

  // Apply class whenever theme changes (initial + updates)
  useEffect(() => {
    applyThemeClass(theme)
  }, [theme])

  // React to system changes when in system mode
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') {
        applyThemeClass('system')
      }
    }
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler)
    } else {
      // Deprecated in modern browsers but present in older Safari
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(mql as any).addListener(handler)
    }
    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', handler)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mql as any).removeListener(handler)
      }
    }
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    applyThemeClass(next)
  }, [])

  const toggle = useCallback(() => {
    const next = (theme === 'dark' || (theme === 'system' && getSystemPrefersDark()))
      ? 'light'
      : 'dark'
    setTheme(next)
  }, [theme, setTheme])

  const resolvedTheme: 'light' | 'dark' = useMemo(() => {
    return theme === 'system' ? (getSystemPrefersDark() ? 'dark' : 'light') : theme
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggle }),
    [theme, resolvedTheme, setTheme, toggle]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
