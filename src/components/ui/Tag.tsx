export default function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  )
}
