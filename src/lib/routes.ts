import { User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Route {
  id: number
  label: string
  icon?: LucideIcon
  path: string
}

export const routes: Route[] = [
  {
    id: 1,
    label: 'Characters',
    icon: User,
    path: '/characters',
  },
]
