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
  const [first, ...rest] = profile.name.split(' ')

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-20 sm:px-6 md:pt-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Aberto a oportunidades e freelances
          </span>

          <h1 className="mt-6 font-display text-5xl leading-[1.05] font-bold tracking-tight md:text-7xl">
            {first}
            <br />
            <span className="text-muted">{rest.join(' ')}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
            <span className="text-fg">{profile.role}.</span> {profile.headline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projetos">Ver projetos</ButtonLink>
            <ButtonLink href="#contato" variant="ghost">
              Fale comigo
            </ButtonLink>
            <div className="ml-1 flex gap-1 text-muted">
              <a href={profile.socials[0].url} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-lg hover:bg-surface-2 hover:text-fg">
                <GithubIcon width={20} height={20} />
              </a>
              <a href={profile.socials[1].url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-lg hover:bg-surface-2 hover:text-fg">
                <LinkedinIcon width={20} height={20} />
              </a>
            </div>
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
