export default function Header() {
  const scrollToForm = (e) => {
    e.preventDefault()
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="text-white font-extrabold tracking-tight text-lg">HOTTRUCKS</span>
        </a>
        <a
          href="#quote-form"
          onClick={scrollToForm}
          className="rounded-pill bg-primary text-white text-sm font-bold px-4 py-2.5 active:scale-95 transition-transform"
        >
          견적 문의
        </a>
      </div>
    </header>
  )
}
