import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  index: string
  title: string
  subtitle?: string
  children: ReactNode
}

// Casca comum de todas as seções: âncora, numeração, título e largura máxima.
export default function Section({ id, index, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <header className="reveal mb-12 max-w-2xl">
        <p className="font-mono text-sm text-accent">
          {index} <span className="text-muted">/</span> {id}
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
      </header>
      {children}
    </section>
  )
}
