'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ThemeToggle() {
  const { toggle } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={toggle}
      aria-label={'Växla tema'}
      title={'Växla tema'}
    >
      {/* CSS-only icon swap to avoid hydration differences */}
      <Sun className="h-4 w-4 hidden dark:inline-block" />
      <Moon className="h-4 w-4 inline-block dark:hidden" />
      <span className="sr-only">Växla tema</span>
    </Button>
  )}
