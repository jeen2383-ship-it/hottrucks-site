import { useEffect, useRef, useState } from 'react'

const reviews = [
  {
    photo: '/reviews/review-1.webp',
    author: '○○부대 상병',
    text: '힘든 훈련 마치고 PX에서도 못 먹던 메뉴를 먹을 수 있어서 정말 좋았습니다. 부대 안인데도 꼭 대학 축제에 온 것 같은 기분이 들었습니다. 훈련의 피로가 싹 풀리는 느낌이었습니다. 다음에 훈련 때도 또 왔으면 좋겠습니다!',
  },
  {
    photo: '/reviews/review-2.webp',
    author: '○○부대 지원과장',
    text: '혹한기 훈련을 마친 간부들과 용사들 모두 지쳐있었는데, 핫트럭스 덕분에 평소 접하기 힘든 메뉴를 부대 안에서 편하게 즐길 수 있었습니다. 장병들이 오랜만에 밝은 표정으로 줄을 서서 기다리는 모습을 보니 지원과장으로서 뿌듯했습니다. 사소한 것 같아도 장병 사기에 큰 보탬이 되는 것 같습니다. 다음 훈련 이후에도 꼭 다시 이용하고 싶습니다.',
  },
  {
    photo: '/reviews/review-3.webp',
    author: '○○부대 ○○상병 여자친구',
    text: '부대개방행사 때 남자친구 면회 가서 핫트럭스 츄러스를 같이 먹었어요. 부대 안인데도 꼭 공원에 피크닉 온 것처럼 달콤한 츄러스를 나눠 먹으니 오랜만에 데이트하는 기분이 들어서 좋았어요. 분위기가 딱딱할줄 알았는데 일반 축제에 온 것 같아서 재밌었어요. 다음 개방행사 때도 또 오고싶다는 생각이 들었어요^^',
  },
  {
    photo: '/reviews/review-4.webp',
    author: '○○부대 인사담당관',
    text: '부대 행사 때 핫트럭스를 통해 여러 푸드트럭을 섭외했는데, 시원한 음료도 음료지만 트럭에 붙어있는 "커피 한잔의 여유를 아는 품격 있는 군인" 같은 재치 있는 문구들이 장병들 사이에서 화제였습니다. 부대 행사에 이런 유쾌한 포인트가 있으니 분위기가 한결 밝아졌습니다. 사진 찍으며 웃는 장병들을 보니 인사담당관으로서도 흐뭇했습니다. 다음 행사 기획할 때도 꼭 다시 섭외하고 싶습니다.',
  },
  {
    photo: '/reviews/review-5.webp',
    author: '○○부대 중대장',
    text: '중대 체육대회를 준비하며 식사 문제로 고민이 많았는데, 핫트럭스 덕분에 편하게 해결할 수 있었습니다. 별도 준비 없이 푸드트럭 예약만으로 행사가 매끄럽게 진행되어 큰 도움이 되었습니다. 장병들도 다양한 메뉴에 만족해하는 모습을 보니 중대장으로서 마음이 놓였습니다. 다음 행사에도 꼭 다시 이용하고 싶습니다.',
  },
  {
    photo: '/reviews/review-6.webp',
    author: '○○부대 대대장',
    text: '대대장 이취임식에 핫트럭스 커피차를 불렀습니다. 처음 부임하는 자리에서 장병들에게 따뜻한 마음을 전할 수 있어 뜻깊었습니다. 격식 있는 행사 속에서도 장병들이 편안하게 커피 한 잔의 여유를 즐기는 모습이 보기 좋았습니다. 대대를 이끌어가는 첫걸음을 함께해 주어 감사했습니다.',
  },
  {
    photo: '/reviews/review-7.webp',
    author: '○○부대 장병 부모님',
    text: '부대개방행사 때 아들 면회 가서 커피차를 처음 이용해봤어요. 부대 안에서도 이렇게 맛있는 커피와 간식을 즐길 수 있다는 게 놀라웠어요. 아들이 사회에 있을 때랑 비슷하게 지낼 수 있는 것 같아 마음이 놓였어요. 이런 행사 덕분에 아들과 더 편하게 시간을 보낼 수 있어서 감사했어요.',
  },
  {
    photo: '/reviews/review-8.webp',
    author: '○○사관학교 생도',
    text: '생도의 날 행사에서 평소 좋아하던 타코야끼를 핫트럭스에서 먹을 수 있어서 정말 반가웠습니다. 생도 생활 중에는 접하기 어려운 메뉴라 더욱 특별하게 느껴졌습니다. 분대원들과 함께 줄을 서서 기다리며 먹었던 그 순간이 즐거운 추억으로 남을 것 같습니다. 다음 축제때도 또 맛보고 싶습니다!',
  },
]

function ReviewCard({ r }) {
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
        'shrink-0 snap-center w-[78%] sm:w-[62%] transition-all duration-700 ease-out ' +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')
      }
    >
      <div className="h-full rounded-card overflow-hidden border border-mute/20 bg-canvas shadow-soft flex flex-col">
        <img src={r.photo} alt={r.author} className="w-full aspect-[4/3] object-cover shrink-0" />
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-body text-sm leading-relaxed">{r.text}</p>
          <p className="mt-auto pt-3 text-ink text-xs font-bold text-right">- {r.author}</p>
        </div>
      </div>
    </div>
  )
}

export default function ReviewSection() {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  const onPointerDown = (e) => {
    const el = trackRef.current
    if (!el) return
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
    el.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    const el = trackRef.current
    if (!el || !drag.current.active) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 3) drag.current.moved = true
    el.scrollLeft = drag.current.startScroll - dx
  }
  const endDrag = () => {
    drag.current.active = false
  }

  return (
    <section className="bg-canvas-soft py-16 px-4 sm:px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <span className="text-primary text-xs font-extrabold tracking-widest uppercase">Review</span>
        <h2 className="mt-2 text-ink font-extrabold text-2xl sm:text-4xl leading-tight">
          후기를 확인해보세요!
        </h2>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        className="mt-8 flex gap-3 overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-mandatory px-4 sm:px-6 pb-2 no-scrollbar cursor-grab active:cursor-grabbing select-none"
      >
        {reviews.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
    </section>
  )
}
