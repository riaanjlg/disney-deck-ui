import { routes } from '#/lib/routes.ts'
import type { Route } from '#/lib/routes.ts'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/Button'
import { ThemeToggle } from './ThemeToggle'
import type { Theme } from '#/types/common.ts'
import { ArrowLeftToLine } from 'lucide-react'

interface CollapsedNavbarProps {
  currentTheme: Theme
  toggleTheme: () => void
  onToggle: () => void
}

export const CollapsedNavBar = ({
  currentTheme,
  toggleTheme,
  onToggle,
}: CollapsedNavbarProps) => {
  return (
    <aside className="w-20 h-full bg-background border-r border-zinc-800">
      <Button icon={ArrowLeftToLine} onClick={onToggle} />
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.id}>
              <NavItem route={route} />
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle currentTheme={currentTheme} toggleTheme={toggleTheme} />
    </aside>
  )
}

const NavItem = ({ route }: { route: Route }) => {
  const { label, icon: Icon, path } = route

  return (
    <Link to={path}>
      {Icon && <Icon size={16} className="no-shrink" />}
      <span>{label}</span>
    </Link>
  )
}
