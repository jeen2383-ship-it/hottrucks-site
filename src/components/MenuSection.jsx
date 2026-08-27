import { useState } from 'react'

const bestMenus = [
  { key: 'coffee', name: '커피차', icon: '☕', price: '3,000~4,500원', truckPhoto: '/menu-trucks/truck-coffee.webp' },
  { key: 'snack', name: '간식차', icon: '🍿', price: '4,000~6,000원', truckPhoto: '/menu-trucks/truck-snack.webp' },
  { key: 'churros', name: '츄러스', icon: '🥨', price: '4,000~6,000원', truckPhoto: '/menu-trucks/truck-churros.webp' },
  { key: 'friedchicken', name: '닭강정', icon: '🍗', price: '10,000~15,000원', truckPhoto: '/menu-trucks/truck-friedchicken.webp' },
  { key: 'skewer', name: '닭꼬치', icon: '🍢', price: '3,000~5,000원', truckPhoto: '/menu-trucks/truck-skewer.webp' },
  { key: 'streetfood', name: '분식', icon: '🍥', price: '3,000~7,000원', truckPhoto: '/menu-trucks/truck-streetfood.webp' },
]

const eventMenus = [
  { event: '부대개방행사', items: ['분식', '핫도그', '소세지', '닭강정', '커피차'] },
  { event: '체육대회', items: ['닭꼬치', '닭강정', '분식', '간식', '아이스크림', '커피차'] },
  { event: '각종 훈련', items: ['분식', '간식', '식사', '아이스크림', '커피차'] },
  { event: '지휘관 이취임식', items: ['커피차'] },
]

const otherMenus = [
  '염통꼬치', '탕수육', '타코', '팟타이',
  '꽈배기', '덮밥', '야끼소바', '오꼬노미야끼', '햄버거', '피자', '스테이크', '초밥',
  '불초밥', '케밥', '퀘사디아', '뉴욕핫도그', '삼겹살', '닭발', '샌드위치', '와플', '빵류', '젤라또', '슬러시', '곱창',
]

function PhotoSlot({ label, src }) {
  return (
    <div className="w-full aspect-[4/3] rounded-card bg-canvas-soft border border-dashed border-mute/40 flex flex-col items-center justify-center gap-1 overflow-hidden">
      {src ? (
        <img src={src} alt={label} className="w-full h-full object-cover" />
      ) : (
        <>
          <span className="text-2xl">📷</span>
          <span className="text-mute text-xs font-semibold">{label} 준비중</span>
        </>
      )}
    </div>
  )
}

function MenuIconButton({ item, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 flex flex-col items-center gap-1.5 w-16"
    >
      <span
        className={
          'h-12 w-12 rounded-full text-2xl flex items-center justify-center border-2 transition-colors ' +
          (active ? 'bg-primary/10 border-primary' : 'bg-canvas border-mute/20')
        }
      >
        {item.icon}
      </span>
      <span className={'text-xs font-bold ' + (active ? 'text-primary' : 'text-ink')}>{item.name}</span>
    </button>
  )
}

export default function MenuSection() {
  const [openKey, setOpenKey] = useState(null)

  return (
    <section className="bg-canvas-soft py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <span className="text-primary text-xs font-extrabold tracking-widest uppercase">Menu</span>
        <h2 className="mt-2 text-ink font-extrabold text-2xl sm:text-4xl leading-tight">
          여러분이 찾는 모든 메뉴가 가능합니다
        </h2>
        <p className="mt-4 text-body text-sm sm:text-base leading-relaxed max-w-2xl">
          각 부대별 장병 선호도에 따른 메뉴를 말씀해주세요!
        </p>

        <p className="mt-8 text-ink font-bold text-sm">베스트 메뉴</p>
        <p className="mt-1 text-body text-xs">아이콘을 탭하면 트럭 사진과 단가를 볼 수 있어요</p>
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
          {bestMenus.map((item) => (
            <MenuIconButton
              key={item.key}
              item={item}
              active={openKey === item.key}
              onClick={() => setOpenKey((k) => (k === item.key ? null : item.key))}
            />
          ))}
        </div>

        {openKey && (() => {
          const item = bestMenus.find((m) => m.key === openKey)
          return (
            <div className="mt-3 rounded-card border border-primary/30 bg-canvas p-4">
              <PhotoSlot label="트럭 사진" src={item.truckPhoto} />
              <p className="mt-3 text-primary font-extrabold text-sm">{item.name} · {item.price}</p>
            </div>
          )
        })()}

        <p className="mt-8 text-ink font-bold text-sm">그 외에도 다양한 메뉴가 준비되어 있습니다</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {otherMenus.map((m) => (
            <span
              key={m}
              className="rounded-pill bg-canvas border border-mute/20 text-body text-xs font-semibold px-3 py-1.5"
            >
              {m}
            </span>
          ))}
        </div>

        <p className="mt-8 text-ink font-bold text-sm">대표 군부대 행사 추천메뉴</p>
        <div className="mt-3 rounded-card bg-canvas border border-mute/20 divide-y divide-mute/20 overflow-hidden">
          {eventMenus.map((e) => (
            <div key={e.event} className="p-4">
              <p className="text-ink font-bold text-sm">{e.event}</p>
              <p className="mt-1.5 text-body text-sm leading-relaxed">{e.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
