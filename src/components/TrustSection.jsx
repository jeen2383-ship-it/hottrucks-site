const career = [
  { label: '복무', value: '육군' },
  { label: '복무기간', value: '2013 ~ 2023 (10년)' },
  { label: '최종계급', value: '대위' },
  { label: '최종보직', value: '중대장' },
  { label: '주요근무지', value: '27사단 · 2사단 신병교육대대 · 육군학생군사학교 · 55사단' },
]

export default function TrustSection() {
  return (
    <section className="bg-canvas py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <span className="text-primary text-xs font-extrabold tracking-widest uppercase">Why Trust Us</span>
        <h2 className="mt-2 text-ink font-extrabold text-2xl sm:text-4xl leading-tight">
          10년간 군 복무한
          <br />
          노하우를 담아낸 서비스입니다
        </h2>

        <div className="mt-3 flex items-center justify-center gap-3">
          <img src="/founder-v2.webp" alt="핫트럭스 손진 대표" className="w-[136px] sm:w-[163px] h-auto object-contain" />
          <p className="text-ink font-bold text-base">손진 대표</p>
        </div>

        <blockquote className="mt-4 text-body text-sm leading-relaxed text-center">
          "제가 사랑했던 군 조직이 더 행복한 공간이 될 수 있기를,
          <br />
          그리고 그곳에서 더 많은 추억을 쌓을 수 있기를 바라며
          <br />
          이 서비스를 기획하였습니다."
        </blockquote>

        <div className="mt-6 rounded-card bg-canvas border border-mute/20 divide-y divide-mute/20 overflow-hidden">
          {career.map((c) => (
            <div key={c.label} className="flex items-center gap-1.5 px-3 py-2">
              <span className="shrink-0 w-14 flex justify-between">
                {c.label.split('').map((ch, i) => (
                  <span key={i} className="text-mute text-[11px] font-bold">
                    {ch}
                  </span>
                ))}
              </span>
              <span className="text-ink text-xs font-semibold">{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
