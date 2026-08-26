import { useEffect, useRef, useState } from 'react'

const steps = [
  { no: '01', title: '행사 계획' },
  { no: '02', title: '문의 및 상담' },
  { no: '03', title: '운영 계획 조율' },
  { no: '04', title: '진행 및 피드백' },
]

export default function ProcessSection() {
  const gridRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-ink py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <span className="text-primary text-xs font-extrabold tracking-widest uppercase">How It Works</span>
        <h2 className="mt-2 text-white font-extrabold text-2xl sm:text-4xl leading-tight">
          서비스 이용 절차
        </h2>

        <div ref={gridRef} className="mt-10 grid grid-cols-2 gap-3">
          {steps.map((s, i) => (
            <div
              key={s.no}
              className={
                'rounded-card bg-white/5 border border-white/10 p-4 flex items-center gap-3 transition-all duration-700 ease-out ' +
                (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')
              }
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
            >
              <span className="shrink-0 h-9 w-9 rounded-full bg-primary/15 text-primary font-extrabold text-sm flex items-center justify-center">
                {s.no}
              </span>
              <h3 className="text-white font-bold text-sm sm:text-base leading-snug">{s.title}</h3>
            </div>
          ))}
        </div>

        <p className="mt-6 text-white/50 text-sm leading-relaxed text-center">
          출입 신청 · 식중독 예방 교육 · 필요 서류 처리 등 행정 절차는
          <br />
          핫트럭스가 전적으로 담당합니다.
        </p>
      </div>
    </section>
  )
}
