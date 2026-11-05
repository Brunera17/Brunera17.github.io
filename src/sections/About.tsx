import Section from '../components/layout/Section'
import { profile } from '../data/profile'

const pillars = [
  { title: 'Automação', text: 'Rotinas que tiram trabalho repetitivo das pessoas e devolvem horas à equipe.' },
  { title: 'Integração', text: 'Sistemas que conversam entre si: ERPs, APIs públicas, planilhas e documentos.' },
  { title: 'Ponta a ponta', text: 'Do modelo de dados ao deploy, com código que outra pessoa consegue manter.' },
]

export default function About() {
  return (
    <Section id="sobre" index="01" title="Sobre mim">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="reveal space-y-5 text-lg leading-relaxed text-muted">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ul className="space-y-3">
          {pillars.map((p, i) => (
            <li key={p.title} className="reveal rounded-xl border border-line bg-surface p-5">
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="font-display text-lg font-semibold">{p.title}</span>
              </p>
              <p className="mt-1.5 pl-8 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
