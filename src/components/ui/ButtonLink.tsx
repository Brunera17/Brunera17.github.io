import type { ReactNode } from 'react'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
}

export default function ButtonLink({ href, children, variant = 'primary' }: ButtonLinkProps) {
  const external = href.startsWith('http')
  const styles =
    variant === 'primary'
      ? 'bg-fg text-bg hover:bg-accent'
      : 'border border-line bg-surface text-fg hover:border-accent hover:text-accent'
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${styles}`}
    >
      {children}
    </a>
  )
}
