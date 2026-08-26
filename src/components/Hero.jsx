export default function Hero() {
  const scrollToForm = (e) => {
    e.preventDefault()
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="relative bg-canvas pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* soft accent */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <h1 className="text-ink font-extrabold tracking-tight text-[2.3rem] leading-[1.25] sm:text-6xl sm:leading-[1.15]">
          부대 예산 걱정 없이
          <br />
          푸드트럭, <span className="text-primary">원스톱</span> 매칭
        </h1>

        <p className="mt-5 text-body text-base sm:text-lg leading-relaxed max-w-xl">
          군부대 훈련·행사·기념일, 어떤 곳이든 출장비 없이
        </p>
        <p className="mt-1 text-body text-base sm:text-lg leading-relaxed max-w-xl">
          행사 취지에 맞는 푸드트럭을 매칭해 드립니다.
        </p>

        <div className="mt-6 rounded-card overflow-hidden border border-mute/20">
          <img src="/hero-truck.webp" alt="핫트럭스 푸드트럭" className="w-full h-auto object-cover" />
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="#quote-form"
            onClick={scrollToForm}
            className="inline-block rounded-pill bg-primary text-white text-center font-bold px-7 py-4 shadow-soft active:scale-95 transition-transform"
          >
            30초 만에 무료 견적 받기
          </a>
        </div>
      </div>
    </section>
  )
}
