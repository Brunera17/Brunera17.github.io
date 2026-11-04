import { useState } from 'react'
import Section from '../components/layout/Section'
import ProjectCard, { statusLabel } from '../components/ui/ProjectCard'
import { ArrowUpRightIcon, LockIcon, StarIcon } from '../components/ui/Icons'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { useGithubRepos } from '../hooks/useGithubRepos'
import type { ProjectStatus } from '../types'

const featured = projects.filter((p) => p.featured)
const others = projects.filter((p) => !p.featured)

// Nomes de repositório já exibidos acima, para não repetir na lista automática.
const shownRepos = projects
  .map((p) => p.repoUrl?.split('/').pop())
  .filter((n): n is string => Boolean(n))

type Filter = 'todos' | ProjectStatus
const filters: Filter[] = ['todos', 'producao', 'publico']

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('todos')
  const { repos, loading, error } = useGithubRepos(profile.githubUser, shownRepos)

  const visible = filter === 'todos' ? featured : featured.filter((p) => p.status === filter)

  return (
    <Section
      id="projetos"
      index="02"
      title="Projetos"
      subtitle="Sistemas em produção, automações que rodam todo dia e projetos abertos para você ler o código."
    >
      {/* Filtros */}
      <div className="reveal mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar projetos">
        {filters.map((f) => {
          const count = f === 'todos' ? featured.length : featured.filter((p) => p.status === f).length
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                filter === f
                  ? 'border-fg bg-fg text-bg'
                  : 'border-line text-muted hover:border-fg/40 hover:text-fg'
              }`}
            >
              {f === 'todos' ? 'Todos' : statusLabel[f]}
              <span className="ml-1.5 font-mono text-xs opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      {/* 1. Destaques — o primeiro ocupa a linha inteira */}
      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((p, i) => (
          <div key={p.slug} className={i === 0 && filter === 'todos' ? 'md:col-span-2' : ''}>
            <ProjectCard project={p} large={i === 0 && filter === 'todos'} />
          </div>
        ))}
      </div>

      {/* 2. Outros projetos */}
      <h3 className="reveal mt-20 font-display text-xl font-semibold">Outros projetos</h3>
      <ul className="mt-5 divide-y divide-line border-y border-line">
        {others.map((p) => {
          const href = p.liveUrl ?? p.repoUrl
          const content = (
            <>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-medium">
                  {p.title}
                  {p.status === 'privado' && <LockIcon width={13} height={13} className="text-muted" />}
                </p>
                <p className="mt-0.5 text-sm text-muted">{p.summary}</p>
              </div>
              <p className="hidden shrink-0 font-mono text-xs text-muted sm:block">{p.stack.slice(0, 3).join(' · ')}</p>
              {href && <ArrowUpRightIcon className="shrink-0 text-muted transition group-hover:text-accent" />}
            </>
          )
          return (
            <li key={p.slug} className="reveal">
              {href ? (
                <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-6 py-4">
                  {content}
                </a>
              ) : (
                <div className="flex items-center gap-6 py-4">{content}</div>
              )}
            </li>
          )
        })}
      </ul>

      {/* 3. Atividade recente no GitHub (automático, via API) */}
      <div className="reveal mt-20 flex items-end justify-between gap-4">
        <h3 className="font-display text-xl font-semibold">Atividade recente no GitHub</h3>
        <a
          href={`https://github.com/${profile.githubUser}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-sm text-muted hover:text-accent"
        >
          Ver todos →
        </a>
      </div>
      {loading && (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl border border-line bg-surface" />
          ))}
        </div>
      )}
      {error && (
        <p className="mt-5 text-sm text-muted">Não foi possível carregar os repositórios agora.</p>
      )}
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {repos.map((r) => (
          <li key={r.id} className="reveal">
            <a
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/60"
            >
              <p className="truncate font-mono text-sm font-medium">{r.name}</p>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted">{r.description}</p>
              <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted">
                {r.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {r.language}
                  </span>
                )}
                {r.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <StarIcon width={13} height={13} /> {r.stargazers_count}
                  </span>
                )}
                <span className="ml-auto">
                  {new Date(r.pushed_at).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
