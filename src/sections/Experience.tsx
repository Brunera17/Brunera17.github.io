import Section from '../components/layout/Section'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <Section id="experiencia" index="03" title="Experiência">
      <ol className="relative space-y-4">
        {experience.map((e) => (
          <li
            key={e.role + e.company}
            className="reveal grid gap-2 rounded-2xl border border-line bg-surface p-6 md:grid-cols-[200px_1fr] md:gap-8 md:p-8"
          >
            <p className="font-mono text-sm text-muted">
              {e.period === 'Atual' ? (
                <span className="inline-flex items-center gap-2 text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Atual
                </span>
              ) : (
                e.period
              )}
            </p>
            <div>
              <h3 className="font-display text-xl font-semibold">{e.role}</h3>
              <p className="text-accent">{e.company}</p>
              <p className="mt-3 leading-relaxed text-muted">{e.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
