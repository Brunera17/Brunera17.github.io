import type { Project, ProjectStatus } from '../../types'
import { ArrowUpRightIcon, GithubIcon, LockIcon } from './Icons'
import Tag from './Tag'

export const statusLabel: Record<ProjectStatus, string> = {
  producao: 'Em produção',
  publico: 'Código aberto',
  privado: 'Privado',
  estudo: 'Estudo',
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  if (status === 'producao') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        {statusLabel.producao}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
      {status === 'privado' && <LockIcon width={12} height={12} />}
      {statusLabel[status]}
    </span>
  )
}

export default function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article
      className={`reveal group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/60 ${
        large ? 'md:p-8' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <StatusBadge status={project.status} />
        <div className="flex gap-1 text-muted">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Código de ${project.title} no GitHub`}
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-surface-2 hover:text-fg"
            >
              <GithubIcon />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir ${project.title}`}
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-surface-2 hover:text-fg"
            >
              <ArrowUpRightIcon />
            </a>
          )}
        </div>
      </div>

      <h3 className={`mt-5 font-display font-semibold tracking-tight ${large ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
        {project.title}
      </h3>
      <p className={`mt-2 text-muted ${large ? 'md:text-lg' : 'text-[15px]'}`}>{project.summary}</p>

      {large && project.problem && (
        <p className="mt-4 border-l-2 border-accent pl-3 text-sm text-muted">
          <span className="font-medium text-fg">Problema: </span>
          {project.problem}
        </p>
      )}

      {project.highlights.length > 0 && (
        <ul className={`mt-5 space-y-2 text-sm ${large ? 'md:grid md:grid-cols-3 md:gap-4 md:space-y-0' : ''}`}>
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-0.5 font-mono text-accent">→</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </article>
  )
}
