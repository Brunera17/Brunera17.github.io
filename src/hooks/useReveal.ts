import { useEffect } from 'react'

// Adiciona .is-visible aos elementos .reveal quando entram na tela.
// Chamado uma vez em App; elementos adicionados depois (ex.: repositórios do GitHub)
// são observados via MutationObserver.
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    const observeAll = () =>
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el))

    observeAll()
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
