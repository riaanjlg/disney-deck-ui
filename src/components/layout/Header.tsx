import type { ReactNode } from 'react'

interface HeaderProps {
  title: string
  description: string
  center?: boolean
  children?: ReactNode
}

const Header = ({ title, description, center, children }: HeaderProps) => {
  return (
    <header
      className={`flex ${center ? 'justify-center' : 'justify-between'} mb-8`}
    >
      <div>
        <h1 className="mb-2 heading-md">{title}</h1>
        <p className="text-zinc-500">{description}</p>
      </div>
      {children && children}
    </header>
  )
}

export default Header
