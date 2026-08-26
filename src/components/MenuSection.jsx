import { useState } from 'react'

const bestMenus = [
  { key: 'coffee', name: '커피차', icon: '☕', price: '4,000원~', truckPhoto: null, menuPhoto: null },
  { key: 'snack', name: '간식차', icon: '🍿', price: '3,000원~', truckPhoto: null, menuPhoto: null },
  { key: 'churros', name: '츄러스', icon: '🥨', price: '4,000원~', truckPhoto: null, menuPhoto: null },
  { key: 'friedchicken', name: '닭강정', icon: '🍗', price: '8,000원~', truckPhoto: null, menuPhoto: null },
  { key: 'skewer', name: '닭꼬치', icon: '🍢', price: '3,000원~', truckPhoto: null, menuPhoto: null },
  { key: 'streetfood', name: '분식', icon: '🍥', price: '5,000원~', truckPhoto: null, menuPhoto: null },
]

const eventMenus = [
  { event: '부대개방행사', items: ['분식', '핫도그', '소세지', '닭강정', '커피차'] },
  { event: '체육대회', items: ['닭꼬치', '닭강정', '분식', '간식', '아이스크림', '커피차'] },
  { event: '각종 훈련', items: ['분식', '간식', '식사', '아이스크림', '커피차'] },
  { event: '지휘관 이취임식', items: ['커피차'] },
]

const otherMenus = [
  '떡볶이', '튀김', '순대', '어묵', '염통꼬치', '회오리감자', '탕수육', '타코', '팟타이',
  '츄러스', '꽈배기', '덮밥', '야끼소바', '오꼬노미야끼', '햄버거', '피자', '스테이크', '초밥',
  '불초밥', '케밥', '퀘사디아', '뉴욕핫도그', '삼겹살', '닭발', '샌드위치', '와플', '빵류', '젤라또', '슬러시', '곱창', '타코야끼',
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

function BestMenuCard({ item, open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={
        'text-left rounded-card border p-4 transition-colors ' +
        (open ? 'bg-canvas border-primary/30' : 'bg-canvas border-mute/20')
      }
    >
      <div className="flex items-center gap-3">
        <span className="shrink-0 h-11 w-11 rounded-full bg-primary/10 text-2xl flex items-center justify-center">
          {item.icon}
        </span>
        <div className="flex-1">
          <p className="text-ink font-bold text-sm">{item.name}</p>
          <p className="text-mute text-xs">{open ? '접으려면 탭' : '탭해서 보기'}</p>
        </div>
        <span className={'text-mute text-xs transition-transform ' + (open ? 'rotate-180' : '')}>▾</span>
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-mute/15">
          <div className="flex flex-col gap-2">
            <PhotoSlot label="트럭 사진" src={item.truckPhoto} />
            <PhotoSlot label="메뉴 사진" src={item.menuPhoto} />
          </div>
          <p className="mt-3 text-primary font-extrabold text-sm">{item.price}</p>
        </div>
      )}
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
        <p className="mt-1 text-body text-xs">아이콘을 탭하면 트럭 사진 · 메뉴 사진 · 단가를 볼 수 있어요</p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {bestMenus.map((item) => (
            <BestMenuCard
              key={item.key}
              item={item}
              open={openKey === item.key}
              onToggle={() => setOpenKey((k) => (k === item.key ? null : item.key))}
            />
          ))}
        </div>

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
