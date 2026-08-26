import { useEffect, useRef, useState } from 'react'

const features = [
  {
    icon: '🎖️',
    title: '軍 이해 기반 설계',
    desc: '대위 출신 대표가 직접 설계한 군부대 맞춤 서비스',
  },
  {
    icon: '⚡',
    title: '즉시 실행 가능한 무예산 복지 서비스',
    desc: '출장비·예산 편성 없이 바로 시작',
  },
  {
    icon: '⚖️',
    title: '지휘관·실무자·장병 모두를 위한 균형 복지',
    desc: '간부와 장병 모두가 만족하는 복지',
  },
]

export default function WhySection() {
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
    <section className="bg-canvas-soft py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <span className="text-primary text-xs font-extrabold tracking-widest uppercase">Hottrucks 소개</span>
        <h2 className="mt-2 text-ink font-extrabold text-2xl sm:text-4xl leading-tight">
          핫트럭스는 이런 서비스입니다
        </h2>
        <p className="mt-4 text-body text-sm sm:text-base leading-relaxed max-w-2xl">
          군·공공 행사에 적합한 푸드트럭을 선별하고, 연결하고, 운영까지
          <br />
          한 번에 관리하는 중개 서비스입니다.
        </p>

        <div ref={gridRef} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={
                'rounded-card bg-canvas p-6 text-center transition-all duration-700 ease-out ' +
                (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')
              }
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
            >
              <h3 className="text-ink font-bold text-lg">
                <span className="mr-1.5">{f.icon}</span>
                {f.title}
              </h3>
              <p className="mt-2 text-body text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
