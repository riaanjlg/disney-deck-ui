import { Moon, Sun } from 'lucide-react'
import { Button } from '../ui/button'
import type { Theme } from '#/types/common.ts'

interface ThemeToggleProps {
  currentTheme: Theme
  toggleTheme: () => void
}

export const ThemeToggle = ({
  currentTheme,
  toggleTheme,
}: ThemeToggleProps) => {
  return (
    <Button onClick={toggleTheme} className="h-10 w-10">
      {currentTheme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
    </Button>
  )
}
