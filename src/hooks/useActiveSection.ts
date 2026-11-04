import { useEffect, useState } from 'react'

// Retorna o id da seção visível no momento, para destacar o item no menu.
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    // No topo da página (hero) nenhum item fica ativo.
    const onScroll = () => {
      if (window.scrollY < 200) setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  return active
}
