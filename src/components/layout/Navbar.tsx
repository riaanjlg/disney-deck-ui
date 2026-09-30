import { routes } from '#/lib/routes.ts'
import type { Route } from '#/lib/routes.ts'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { ThemeToggle } from './ThemeToggle'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '#/hooks/useTheme.ts'

export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { currentTheme, toggleTheme } = useTheme()

  const toggleCollapse = () => setCollapsed((prev) => !prev)

  return (
    <aside
      className={`${collapsed ? 'w-24' : 'w-64'} h-full flex flex-col justify-between items-start gap-8 p-6 bg-background border-r border-zinc-800 transition-[width] duration-100`}
    >
      <div className="flex flex-col gap-5 justify-center items-center w-full">
        <div
          className={`flex items-center w-full ${collapsed ? 'justify-center' : 'justify-between'}`}
        >
          {!collapsed && (
            <Link to="/" className="logo">
              Disney Deck
            </Link>
          )}
          <Button onClick={toggleCollapse} className="w-8 h-8">
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </Button>
        </div>
        <nav className="mt-4 self-start">
          <ul className="flex flex-col gap-2 items-start justify-start">
            {routes.map((route) => (
              <li key={route.id}>
                <NavItem route={route} isCollapsed={collapsed} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ThemeToggle currentTheme={currentTheme} toggleTheme={toggleTheme} />
    </aside>
  )
}

interface NavItemProps {
  route: Route
  isCollapsed: boolean
}

const NavItem = ({ route, isCollapsed }: NavItemProps) => {
  const { label, icon: Icon, path } = route

  return (
    <Link
      to={path}
      className="flex items-center text-wite justify-left h-8 gap-2 py-2 px-3 hover:bg-primary hover:text-background transition-colors rounded-md"
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      {!isCollapsed && (
        <span className="text-sm whitespace-no-wrap">{label}</span>
      )}
    </Link>
  )
}
