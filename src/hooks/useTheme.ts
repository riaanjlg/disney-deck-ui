import type { Theme } from '#/types/common.ts'
import { useEffect, useState } from 'react'

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  return (localStorage.getItem('theme') ?? 'dark') as Theme
}

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark')
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  const toggleTheme = () =>
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { currentTheme, toggleTheme }
}
