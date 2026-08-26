import { useEffect, useRef, useState } from 'react'

const photos = [
  { src: '/gallery/gallery-chicken.webp', alt: '핫트럭스 치킨 푸드트럭 현장' },
  { src: '/gallery/gallery-icecream.webp', alt: '핫트럭스 아이스크림 푸드트럭 현장' },
  { src: '/gallery/gallery-beefbowl.webp', alt: '핫트럭스 소고기덮밥 푸드트럭 현장' },
  { src: '/gallery/gallery-steak.webp', alt: '핫트럭스 스테이크 푸드트럭 현장' },
  { src: '/gallery/gallery-tteokbokki.webp', alt: '핫트럭스 떡볶이 푸드트럭 현장' },
  { src: '/gallery/gallery-coffeeade.webp', alt: '핫트럭스 커피 에이드 푸드트럭 현장' },
]

function RevealPhoto({ src, alt }) {
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={
        'min-h-[160px] transition-all duration-700 ease-out ' +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')
      }
    >
      <img src={src} alt={alt} className="w-full h-auto rounded-card" />
    </div>
  )
}

export default function GallerySection() {
  const left = photos.slice(0, 3)
  const right = photos.slice(3, 6)

  return (
    <section className="bg-canvas-soft py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl flex gap-2">
        <div className="flex-1 flex flex-col gap-2">
          {left.map((p) => (
            <RevealPhoto key={p.src} src={p.src} alt={p.alt} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {right.map((p) => (
            <RevealPhoto key={p.src} src={p.src} alt={p.alt} />
          ))}
        </div>
      </div>
    </section>
  )
}
