import { useState } from 'react'

// ntfy.sh 알림 토픽 (진이 ntfy 앱에서 구독해야 하는 이름과 동일해야 함)
const NTFY_TOPIC = 'hottrucks-quote-ajpnpub56e'

const initialForm = {
  region: '',
  position: '',
  contact: '',
  eventType: '',
  headcount: '',
}

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.region || !form.position || !form.contact || !form.eventType || !form.headcount) {
      setError('모든 항목을 입력해 주세요.')
      return
    }
    setError('')

    // ntfy.sh로 알림 전송 → 진의 휴대폰에 즉시 푸시 알림
    try {
      await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
        method: 'POST',
        headers: {
          'Title': 'HOTTRUCKS Quote Request',
          'Priority': 'high',
          'Tags': 'bell',
        },
        body:
          `새 견적 신청이 들어왔어요!\n` +
          `지역: ${form.region}\n` +
          `직책: ${form.position}\n` +
          `연락처: ${form.contact}\n` +
          `행사형태: ${form.eventType}\n` +
          `예상인원: ${form.headcount}명`,
      })
    } catch (err) {
      console.error('알림 전송 실패:', err)
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="quote-form" className="bg-ink-soft py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
            ✓
          </div>
          <h2 className="mt-5 text-white font-extrabold text-2xl">신청이 접수되었습니다</h2>
          <p className="mt-3 text-white/70 text-sm leading-relaxed">
            빠른 시일 내로 연락드리겠습니다.
          </p>
          <button
            onClick={() => {
              setForm(initialForm)
              setSubmitted(false)
            }}
            className="mt-6 rounded-pill border border-white/30 text-white text-sm font-bold px-6 py-3"
          >
            다시 신청하기
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="quote-form" className="bg-ink-soft py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        <span className="text-primary text-xs font-extrabold tracking-widest uppercase">Get a Quote</span>
        <h2 className="mt-2 text-white font-extrabold text-2xl sm:text-4xl leading-tight">
          무료 견적 신청
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <input
            type="text"
            value={form.region}
            onChange={handleChange('region')}
            placeholder="지역 및 사단 (예: 강원도 인제군 00사단)"
            className="w-full rounded-card bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3.5 text-base focus:outline-none focus:border-primary"
          />

          <input
            type="text"
            value={form.position}
            onChange={handleChange('position')}
            placeholder="직책 (예: 인사과장)"
            className="w-full rounded-card bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3.5 text-base focus:outline-none focus:border-primary"
          />

          <input
            type="tel"
            value={form.contact}
            onChange={handleChange('contact')}
            placeholder="연락처 (예: 010-0000-0000)"
            className="w-full rounded-card bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3.5 text-base focus:outline-none focus:border-primary"
          />

          <input
            type="text"
            value={form.eventType}
            onChange={handleChange('eventType')}
            placeholder="행사 형태 (예: 부대개방행사)"
            className="w-full rounded-card bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3.5 text-base focus:outline-none focus:border-primary"
          />

          <input
            type="number"
            inputMode="numeric"
            min="1"
            value={form.headcount}
            onChange={handleChange('headcount')}
            placeholder="예상 인원 (예: 150)"
            className="w-full rounded-card bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3.5 text-base focus:outline-none focus:border-primary"
          />

          {error && <p className="text-primary text-sm font-semibold">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-pill bg-primary text-white font-bold px-6 py-4 text-base active:scale-95 transition-transform"
          >
            신청하기
          </button>
        </form>
      </div>
    </section>
  )
}
