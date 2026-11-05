import { useCallback, useEffect, useRef, useState } from 'react'
import type { Project } from '../../types'
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  GithubIcon,
} from './Icons'
import { StatusBadge } from './ProjectCard'
import Tag from './Tag'

const asset = (src: string) => `${import.meta.env.BASE_URL}${src}`

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

// Janela de detalhes do projeto, com galeria de telas no estilo da Play Store:
// uma faixa de capturas que rola para o lado; clicar numa captura abre ela em tela cheia.
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState<number | null>(null)
  const images = project?.images ?? []

  // Abre/fecha o <dialog> nativo (traz foco preso e Esc de graça).
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }
    if (!project && dialog.open) dialog.close()
    setZoom(null)
    stripRef.current?.scrollTo({ left: 0 })
  }, [project])

  const handleClose = useCallback(() => {
    document.body.style.overflow = ''
    onClose()
  }, [onClose])

  // Esc fecha primeiro a imagem ampliada; só depois a janela.
  const handleCancel = (e: React.SyntheticEvent) => {
    if (zoom !== null) {
      e.preventDefault()
      setZoom(null)
    }
  }

  // Setas do teclado navegam na imagem ampliada.
  useEffect(() => {
    if (zoom === null) return
    const onKey = (e: KeyboardEvent) => {
      // Impede o <dialog> de receber o Esc: fecha só a imagem ampliada.
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        setZoom(null)
      }
      if (e.key === 'ArrowRight') setZoom((z) => (z === null ? z : (z + 1) % images.length))
      if (e.key === 'ArrowLeft') setZoom((z) => (z === null ? z : (z - 1 + images.length) % images.length))
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [zoom, images.length])

  const scrollStrip = (dir: 1 | -1) => {
    const el = stripRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onCancel={handleCancel}
      onClick={(e) => {
        // Clique no fundo escuro (fora da caixa) fecha.
        if (e.target === dialogRef.current) dialogRef.current?.close()
      }}
      aria-labelledby="project-modal-title"
      className="m-auto max-h-[92vh] w-[calc(100%-1.5rem)] max-w-5xl overflow-hidden rounded-2xl border border-line bg-surface p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="flex max-h-[92vh] flex-col">
          {/* Cabeçalho */}
          <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
            <div>
              <StatusBadge status={project.status} />
              <h2 id="project-modal-title" className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Fechar"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="overflow-y-auto">
            {/* Galeria */}
            {images.length > 0 && (
              <div className="relative border-b border-line bg-surface-2 py-5">
                <div
                  ref={stripRef}
                  className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-7 [scrollbar-width:thin]"
                >
                  {images.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setZoom(i)}
                      className="group shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-bg"
                      aria-label={`Ampliar: ${img.alt}`}
                    >
                      <img
                        src={asset(img.src)}
                        alt={img.alt}
                        loading="lazy"
                        className="h-56 w-auto transition-transform duration-300 group-hover:scale-[1.02] sm:h-80"
                      />
                    </button>
                  ))}
                </div>
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => scrollStrip(-1)}
                      aria-label="Telas anteriores"
                      className="absolute top-1/2 left-2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 shadow-lg hover:text-accent md:grid"
                    >
                      <ChevronLeftIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollStrip(1)}
                      aria-label="Próximas telas"
                      className="absolute top-1/2 right-2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 shadow-lg hover:text-accent md:grid"
                    >
                      <ChevronRightIcon />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Detalhes */}
            <div className="grid gap-8 px-5 py-6 sm:px-7 md:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="text-lg leading-relaxed">{project.summary}</p>
                {project.problem && (
                  <p className="mt-4 border-l-2 border-accent pl-3 text-muted">
                    <span className="font-medium text-fg">Problema: </span>
                    {project.problem}
                  </p>
                )}
                {project.highlights.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-0.5 font-mono text-accent">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs tracking-wider text-muted uppercase">Tecnologias</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
                {(project.repoUrl || project.liveUrl) && (
                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent"
                      >
                        Abrir o site <ArrowUpRightIcon width={16} height={16} />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm hover:border-accent hover:text-accent"
                      >
                        <GithubIcon width={16} height={16} /> Ver o código
                      </a>
                    )}
                  </div>
                )}
                {!project.repoUrl && (
                  <p className="text-sm text-muted">Código privado, desenvolvido para uso interno.</p>
                )}
              </div>
            </div>
          </div>

          {/* Imagem ampliada */}
          {zoom !== null && images[zoom] && (
            <div
              className="fixed inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/90 p-4"
              onClick={() => setZoom(null)}
            >
              <img
                src={asset(images[zoom].src)}
                alt={images[zoom].alt}
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="text-center text-sm text-white/80">
                {images[zoom].alt}
                <span className="ml-2 font-mono text-white/50">
                  {zoom + 1}/{images.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setZoom(null)}
                aria-label="Fechar imagem"
                className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <CloseIcon />
              </button>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setZoom((zoom - 1 + images.length) % images.length)
                    }}
                    aria-label="Imagem anterior"
                    className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setZoom((zoom + 1) % images.length)
                    }}
                    aria-label="Próxima imagem"
                    className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronRightIcon />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </dialog>
  )
}
