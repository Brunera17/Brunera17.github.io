import { useEffect, useState } from 'react'
import { navItems } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from '../ui/Icons'

const ids = navItems.map((n) => n.id)

export default function Header() {
  const active = useActiveSection(ids)
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = (id: string) =>
    `transition-colors hover:text-fg ${active === id ? 'text-fg' : 'text-muted'}`

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] ${
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="font-mono text-sm font-medium" onClick={() => setOpen(false)}>
          <span className="text-accent">~/</span>bruno
        </a>

        <div className="flex items-center gap-1 md:gap-8">
          <ul className="hidden gap-7 text-sm md:flex">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <a href={`#${item.id}`} className={linkClass(item.id)}>
                  {item.label}
                </a>
                {active === item.id && (
                  <span className="absolute -bottom-[22px] left-0 h-px w-full bg-accent" />
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-fg"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block py-2.5 ${linkClass(item.id)}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
