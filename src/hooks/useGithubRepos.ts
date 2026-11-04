import { useEffect, useState } from 'react'

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
}

// Busca os repositórios públicos com commit mais recente direto da API do GitHub (sem token).
// Ignora forks, repositórios sem descrição (exercícios soltos) e os listados em `exclude`
// (ex.: os que já estão em destaque).
export function useGithubRepos(user: string, exclude: string[] = [], limit = 6) {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const excludeKey = exclude.join(',')

  useEffect(() => {
    const controller = new AbortController()
    const skip = new Set(excludeKey.toLowerCase().split(','))
    fetch(`https://api.github.com/users/${user}/repos?per_page=100`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status))
        return res.json() as Promise<GithubRepo[]>
      })
      .then((data) =>
        setRepos(
          data
            .filter(
              (r) =>
                !r.fork &&
                r.name !== user &&
                r.description?.trim() &&
                !skip.has(r.name.toLowerCase()),
            )
            .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
            .slice(0, limit),
        ),
      )
      .catch((e) => {
        if (e.name !== 'AbortError') setError(true)
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [user, excludeKey, limit])

  return { repos, loading, error }
}
