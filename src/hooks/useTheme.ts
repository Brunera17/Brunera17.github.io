import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'

// O tema inicial é aplicado por um script em index.html (evita "piscar").
// Aqui só lemos o valor atual e alternamos.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme) ?? 'dark',
  )

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = next
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* navegação privada: só não lembra a escolha */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
