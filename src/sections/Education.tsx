import Section from '../components/layout/Section'
import { ArrowUpRightIcon, AwardIcon } from '../components/ui/Icons'
import { awards, certifications, education } from '../data/education'

const totalHours = certifications.reduce((sum, c) => sum + c.hours, 0)
const groups = [...new Set(certifications.map((c) => c.group))]

export default function Education() {
  return (
    <Section id="formacao" index="05" title="Formação e reconhecimentos">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {/* Formação */}
          <div className="reveal rounded-2xl border border-line bg-surface p-6 md:p-8">
            <h3 className="font-mono text-xs tracking-wider text-accent uppercase">Formação</h3>
            <ul className="mt-5 space-y-5">
              {education.map((e) => (
                <li key={e.course}>
                  <p className="font-display text-lg font-semibold">{e.course}</p>
                  <p className="text-sm text-muted">
                    {e.institution} · {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Reconhecimentos */}
          <div className="reveal rounded-2xl border border-line bg-surface p-6 md:p-8">
            <h3 className="font-mono text-xs tracking-wider text-accent uppercase">Reconhecimentos</h3>
            <ul className="mt-5 space-y-4">
              {awards.map((a) => (
                <li key={a.title} className="flex gap-3">
                  <AwardIcon className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-sm text-muted">{a.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certificações */}
        <div className="reveal rounded-2xl border border-line bg-surface p-6 md:p-8">
          <div className="flex items-baseline justify-between">
            <h3 className="font-mono text-xs tracking-wider text-accent uppercase">Certificações Alura</h3>
            <p className="font-display text-2xl font-semibold">
              {totalHours}h<span className="ml-1 text-sm font-normal text-muted">de estudo</span>
            </p>
          </div>
          <div className="mt-5 space-y-6">
            {groups.map((g) => (
              <div key={g}>
                <p className="text-sm font-medium text-muted">{g}</p>
                <ul className="mt-2 divide-y divide-line">
                  {certifications
                    .filter((c) => c.group === g)
                    .map((c) => (
                      <li key={c.url}>
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-3 py-2.5 text-[15px]"
                        >
                          <span className="flex-1 group-hover:text-accent">{c.title}</span>
                          <span className="font-mono text-xs text-muted">{c.hours}h</span>
                          <ArrowUpRightIcon width={14} height={14} className="text-muted group-hover:text-accent" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
