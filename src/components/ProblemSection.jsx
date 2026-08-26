import { useEffect, useRef, useState } from 'react'

const stages = [
  {
    key: 'mz',
    image: '/mz-soldier.webp',
    prefix: '체감형 복지를 원하는',
    emphasis: 'MZ 장병 등장',
    lineBreak: true,
    points: ['복지 기대치 상승', 'PX 보다도 배달음식 선호'],
    singleCol: true,
    reverse: false,
    imgLeft: 7,
    imgTop: 20,
    imgWidth: 110,
  },
  {
    key: 'reality',
    image: '/worried-soldier.webp',
    prefix: '여건이 부족한 ',
    emphasis: '부대 현실',
    points: ['인력 부족', '예산 제한', '현행 업무 과중'],
    reverse: false,
    imgTop: 7,
    imgHeight: 110,
  },
  {
    key: 'limit',
    image: '/hotdog-guy.webp',
    prefix: '푸드트럭을 부르려 해도',
    emphasis: '기존 푸드트럭 업체들의 한계',
    lineBreak: true,
    points: ['출장비 요구', '매출 보장 요구', '민원 소지 우려'],
    reverse: false,
    imgTop: 20,
    imgScaleX: 1.15,
  },
]

const solutionBadges = ['출장비 없음', '부대 예산 미사용', '행정 절차 일괄 대행']

function RevealCard({ children, className }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={
        className +
        ' transition-all duration-700 ease-out ' +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')
      }
    >
      {children}
    </div>
  )
}

export default function ProblemSection() {
  const logoTextRef = useRef(null)
  const [logoSize, setLogoSize] = useState(64)

  useEffect(() => {
    const el = logoTextRef.current
    if (!el) return
    const update = () => setLogoSize(el.offsetWidth * 1.4)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section className="bg-ink py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <span className="text-primary text-xs font-extrabold tracking-widest uppercase">Why Needed</span>
        <h2 className="mt-2 text-white font-extrabold text-2xl sm:text-4xl leading-tight">
          체감형 복지는 원하는데,
          <br />
          현실은 녹록지 않습니다
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          {stages.map((s) => (
            <RevealCard
              key={s.key}
              className={'rounded-card overflow-hidden border border-mute/20 bg-canvas-soft flex items-center ' + (s.reverse ? 'flex-row-reverse' : 'flex-row')}
            >
              <div className="relative overflow-hidden shrink-0 self-stretch bg-canvas-soft w-[120px]">
                <img
                  src={s.image}
                  alt={s.emphasis}
                  className="absolute w-auto"
                  style={{
                    top: (s.imgTop ?? 10) + 'px',
                    left: (s.imgLeft ?? 5) + 'px',
                    height: s.imgHeight ? s.imgHeight + 'px' : `calc(100% - ${s.imgTop ?? 10}px)`,
                    width: s.imgWidth ? s.imgWidth + 'px' : 'auto',
                    transform: `scale(${s.imgScaleX ?? s.imgScale ?? 1}, ${s.imgScaleY ?? s.imgScale ?? 1})`,
                    transformOrigin: 'top left',
                  }}
                />
              </div>
              <div className="flex-1 pt-4 pr-4 pb-4 pl-5 sm:pt-5 sm:pr-5 sm:pb-5 sm:pl-6 flex flex-col justify-center">
                <h3
                  className={
                    'font-bold text-base sm:text-lg text-ink leading-snug relative z-10' +
                    (s.titleOverlap ? ' -ml-12 sm:ml-0 whitespace-nowrap sm:whitespace-normal' : '')
                  }
                >
                  {s.prefix}
                  {s.lineBreak && <br />}
                  <span className="text-primary">{s.emphasis}</span>
                </h3>
                <ul className={'mt-3 ' + (s.singleCol ? 'space-y-1.5' : 'grid grid-cols-2 gap-x-3 gap-y-1.5')}>
                  {s.points.map((p) => (
                    <li key={p} className="text-body text-sm leading-relaxed flex gap-1.5">
                      <span className="text-mute">·</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealCard>
          ))}
        </div>

        {/* 핫트럭스 = 정답 클로징 섹션 (박스 없음) */}
        <div className="mt-12 text-center">
          <div
            className="mx-auto rounded-full bg-white flex items-center justify-center shadow-soft"
            style={{ width: logoSize, height: logoSize }}
          >
            <img
              src="/hottrucks-logo-color.webp"
              alt="HOTTRUCKS"
              className="object-contain"
              style={{ width: '78%', height: '78%' }}
            />
          </div>
          <h3 className="mt-3.5 text-white font-extrabold text-xl sm:text-2xl leading-tight">
            <span ref={logoTextRef} className="inline-block">복지도, 예산도, 행정도</span>
            <br />
            군부대 행사엔 <span className="text-yellow-400">핫트럭스</span>가 정답입니다
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {solutionBadges.map((b) => (
              <span key={b} className="rounded-pill bg-white text-primary text-xs font-bold px-3.5 py-2 shadow-soft">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
