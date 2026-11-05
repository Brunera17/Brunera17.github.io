import { profile } from '../data/profile'
import ButtonLink from '../components/ui/ButtonLink'
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons'

// Linhas do "terminal" ilustrativo do hero.
const terminal = [
  { kind: 'cmd', text: 'python automacao.py --rotina fiscal' },
  { kind: 'out', text: 'lendo PDFs de consulta fiscal' },
  { kind: 'out', text: 'gerando memorandos .docx' },
  { kind: 'out', text: 'sincronizando com o Domínio' },
  { kind: 'done', text: '+50h/mês devolvidas à equipe' },
] as const

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[1.2fr_1fr]">
        <div className="reveal">
          {/* Quem sou */}
          <div className="flex items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full border border-line"
            />
            <div className="leading-tight">
              <p className="font-medium">{profile.name}</p>
              <p className="text-sm text-muted">{profile.currentJob}</p>
            </div>
          </div>

          <h1 className="mt-8 max-w-2xl font-display text-4xl leading-[1.1] font-semibold tracking-tight text-balance md:text-[3.4rem]">
            {profile.headline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ButtonLink href="#projetos">Ver o que já fiz</ButtonLink>
            <p className="text-sm text-muted">
              ou me escreva em{' '}
              <a
                href={`mailto:${profile.email}`}
                className="text-fg underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {profile.email}
              </a>
            </p>
          </div>

          <div className="mt-6 flex gap-4 text-sm text-muted">
            <a href={profile.socials[0].url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <GithubIcon width={16} height={16} /> GitHub
            </a>
            <a href={profile.socials[1].url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <LinkedinIcon width={16} height={16} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Terminal ilustrativo */}
        <div className="reveal rounded-2xl border border-line bg-surface shadow-2xl shadow-black/10" aria-hidden="true">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-muted">bruno@domingos: ~/automacoes</span>
          </div>
          <div className="space-y-2.5 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
            {terminal.map((line) => (
              <p key={line.text} className="flex gap-2">
                {line.kind === 'cmd' && (
                  <>
                    <span className="text-accent">$</span>
                    <span>{line.text}</span>
                  </>
                )}
                {line.kind === 'out' && (
                  <>
                    <span className="text-muted">→</span>
                    <span className="flex-1 text-muted">{line.text}</span>
                    <span className="text-accent">✓</span>
                  </>
                )}
                {line.kind === 'done' && (
                  <>
                    <span className="text-accent">✔</span>
                    <span className="font-medium text-accent">{line.text}</span>
                  </>
                )}
              </p>
            ))}
            <p className="caret text-accent">$</p>
          </div>
        </div>
      </div>

      {/* Números de impacto */}
      <div className="relative mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <dl className="reveal grid divide-line overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-3 sm:divide-x max-sm:divide-y">
          {profile.highlights.map((h) => (
            <div key={h.label} className="p-6">
              <dt className="font-display text-4xl font-semibold tracking-tight">{h.value}</dt>
              <dd className="mt-1 text-sm text-muted">{h.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
