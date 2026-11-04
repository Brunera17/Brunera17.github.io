import Section from '../components/layout/Section'
import { skills } from '../data/skills'

export default function Skills() {
  return (
    <Section id="habilidades" index="04" title="Stack">
      <div className="grid overflow-hidden rounded-2xl border border-line bg-line gap-px sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <div key={g.category} className="reveal bg-surface p-6">
            <h3 className="font-mono text-xs tracking-wider text-accent uppercase">{g.category}</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {g.items.map((i) => (
                <li key={i} className="text-[15px]">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Célula final para fechar a grade de 6 */}
        <div className="hidden bg-surface p-6 lg:block">
          <p className="font-mono text-xs tracking-wider text-muted uppercase">Sempre aprendendo</p>
          <p className="mt-4 text-[15px] text-muted">Hoje estudando Django e IA aplicada.</p>
        </div>
      </div>
    </Section>
  )
}
