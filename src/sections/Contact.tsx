import { useState } from 'react'
import { ArrowUpRightIcon, GithubIcon, LinkedinIcon, MailIcon } from '../components/ui/Icons'
import { profile } from '../data/profile'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const icons: Record<string, typeof GithubIcon> = { GitHub: GithubIcon, LinkedIn: LinkedinIcon }

  return (
    <section id="contato" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <div className="reveal relative overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-14">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="relative">
          <p className="font-mono text-sm text-accent">
            06 <span className="text-muted">/</span> contato
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Tem um processo manual sobrando aí?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Estou aberto a oportunidades, freelances e colaborações. Me conta o problema que eu te digo como resolveria.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 rounded-xl bg-fg px-5 py-3.5 font-medium text-bg transition-colors hover:bg-accent"
            >
              <MailIcon />
              <span className="break-all">{profile.email}</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-xl border border-line px-5 py-3.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              aria-live="polite"
            >
              {copied ? 'E-mail copiado ✓' : 'Copiar e-mail'}
            </button>
            {profile.socials.map((s) => {
              const Icon = icons[s.label] ?? ArrowUpRightIcon
              return (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3.5 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon /> {s.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
