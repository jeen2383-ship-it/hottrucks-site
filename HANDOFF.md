# HOTTRUCKS 웹사이트 — 프로젝트 인수인계 문서

이 문서는 지금까지 Cowork(Claude)와 함께 만든 HOTTRUCKS 랜딩페이지의 현재 상태를 정리한 것입니다.
Claude Code 등 다른 AI/환경으로 작업을 옮길 때, 이 문서 하나만 보고도 프로젝트 맥락을 전부 파악할 수 있도록 작성했습니다.

(참고: 프로젝트 루트에 `DESIGN.md`라는 파일이 있는데, 이건 프로젝트 초기 스캐폴딩 때 생성된 것으로 실제 이 사이트와 무관한 내용(Vodafone 디자인 시스템 템플릿)입니다. 무시하고 이 문서를 기준으로 삼으면 됩니다.)

---

## 1. 프로젝트 개요

**HOTTRUCKS**는 군부대 행사(부대개방행사, 체육대회, 훈련, 지휘관 이·취임식 등)에 맞는 푸드트럭을 매칭해주는 중개 서비스입니다. 대표(손진)는 육군 대위 출신(10년 복무)이며, 이 경력을 서비스 신뢰도의 핵심 스토리로 사용합니다.

- 서비스 핵심 가치: 출장비 없음 / 부대 예산 미사용 / 행정 절차(출입 신청, 식중독 예방 교육 등) 일괄 대행
- 타겟 고객: 군부대 인사과/행정 담당자, 지휘관
- 사이트 목적: 랜딩페이지 + 견적 문의 폼 (전화 유도가 아니라 폼 제출 유도)
- 현재 배포 주소: `hottrucks.netlify.app` (Netlify, 단 현재 크레딧 이슈로 신규 배포 일시 차단 상태 — 8절 참고)

---

## 2. 기술 스택

- **빌드 도구**: Vite
- **프레임워크**: React 18 (함수형 컴포넌트 + Hooks만 사용, 상태관리 라이브러리 없음)
- **스타일**: Tailwind CSS (커스텀 테마 확장, 아래 3절 참고)
- **폰트**: Pretendard (본문 전체), 로컬 파일이 아니라 `fontFamily.sans`에 등록되어 있음. `--external:pretendard/*` 형태로 빌드 시 외부 참조됨
- **배포 방식**: `npm run build` 로 로컬 빌드 → `dist` 폴더를 Netlify 대시보드에 드래그앤드롭으로 수동 배포 (CI/CD 연동 없음, Git 리포지토리 연결도 안 되어 있음 — 순수 로컬 파일 기반 프로젝트)
- **애니메이션**: 별도 라이브러리 없이 `IntersectionObserver` + Tailwind `transition` 클래스로 스크롤 reveal 구현

---

## 3. 디자인 시스템 (tailwind.config.js)

```js
colors: {
  primary: '#D91E24',       // 메인 레드 (CTA, 강조)
  'primary-dark': '#A5151A',
  ink: '#161211',            // 다크 배경/텍스트
  'ink-soft': '#241E1C',     // 다크 배경 변형
  canvas: '#FFFFFF',         // 밝은 배경
  'canvas-soft': '#F6F1EE',  // 밝은 배경 변형(크림톤)
  body: '#6B6663',           // 본문 회색 텍스트
  mute: '#B8ACA6',           // 보조/라벨 텍스트
},
fontFamily: {
  sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'],
},
borderRadius: { pill: '999px', card: '14px' },
boxShadow: { soft: '0 20px 40px -20px rgba(22, 18, 17, 0.35)' },
```

**섹션 배경 교차 규칙**: 밝은 배경(`canvas`/`canvas-soft`)과 어두운 배경(`ink`/`ink-soft`)을 섹션마다 번갈아 사용해서 스크롤 시 리듬감을 줌. 새 섹션을 추가할 때 이 교차 순서를 깨지 않도록 주의.

---

## 4. 페이지 구조 (App.jsx 기준, 위→아래 순서)

```
Header (고정 상단바)
Hero              — canvas(밝음)
GallerySection    — canvas-soft(밝음)
ProblemSection    — ink(어두움)      "WHY NEEDED"
WhySection        — canvas(밝음)      "Hottrucks 소개"
MenuSection       — canvas-soft(밝음) "MENU"
ProcessSection    — ink(어두움)       "How It Works"
TrustSection      — canvas-soft(밝음) "Why Trust Us"
QuoteForm         — ink-soft(어두움)  "Get a Quote"
Footer            — ink(어두움)
```

### Header.jsx
- 고정(`fixed top-0`) 반투명 다크 헤더. 로고 텍스트만(이미지 로고 없음) + 우측 "견적 문의" 필 버튼(클릭 시 `#quote-form`으로 스무스 스크롤)

### Hero.jsx
- 헤드라인: "부대 예산 걱정 없이 / 푸드트럭, **원스톱** 매칭"
- 서브카피 2줄, 실제 트럭 사진(`/hero-truck.png`), CTA 버튼("30초 만에 무료 견적 받기") → `#quote-form` 스크롤
- 전화번호 CTA는 의도적으로 제거된 상태 (통화 유도보다 폼 제출 유도가 목적)

### GallerySection.jsx
- 실제 현장 사진 6장을 좌/우 2열로 **명시적으로 분할**(`photos.slice(0,3)` / `slice(3,6)`) 배치
- ⚠️ 처음엔 CSS `columns-2`(masonry)로 만들었다가 실제 모바일 Safari에서 순서가 뒤섞이는 버그가 있어서 명시적 2-flex-column 구조로 교체함. **다시 masonry 방식으로 되돌리지 말 것.**
- 각 사진은 `RevealPhoto` 컴포넌트로 감싸져 있고 `IntersectionObserver`로 스크롤 진입 시 fade+slide-up
- ⚠️ 버그였던 것: 이미지 로드 전에는 `<img>` 높이가 0이라 IntersectionObserver가 "이미 화면에 보인다"고 오판해서 애니메이션이 스크롤 전에 이미 끝나버리는 문제가 있었음 → 각 `RevealPhoto` 래퍼에 `min-h-[160px]`를 줘서 해결함
- 사진 파일: `/gallery/gallery-{chicken,icecream,beefbowl,steak,tteokbokki,coffeeade}.jpg`

### ProblemSection.jsx ("WHY NEEDED")
가장 반복적으로 다듬어진 섹션. 3개의 문제 제기 카드 + 하단 "핫트럭스=정답" 클로징으로 구성.

`stages` 배열 (각 카드):
```js
{
  key, image,               // 캐릭터 일러스트 (누끼 딴 PNG, /mz-soldier.png 등)
  prefix, emphasis,         // 제목 문구 (emphasis는 빨간색 span)
  lineBreak,                // prefix와 emphasis 사이 줄바꿈 여부
  points,                   // 불릿 리스트
  singleCol,                // 리스트를 1열로 할지 2열 그리드로 할지
  fillImage,                // true면 이미지가 카드 세로 전체를 채움(object-cover), false면 정사각형 박스 안에 온전히 보임(object-contain)
  reverse,                  // (현재는 전부 false — 이미지는 항상 좌측)
}
```

현재 3개 카드:
1. `mz`: 캐릭터=선글라스 낀 병사. 제목 "체감형 복지를 원하는" (줄바꿈) "MZ 장병 등장"(빨강). `singleCol: true`
2. `reality`: 캐릭터=근심하는 병사. 제목 "여건이 부족한 부대 현실"(부대 현실만 빨강)
3. `limit`: 캐릭터=핫도그 먹는 남자. `fillImage: true`. 제목 2줄 "푸드트럭을 부르려 해도.." / "기존 푸드트럭 업체들의 한계"(빨강)

레이아웃 세부 수치(모바일 기준, 여러 번 조정된 최종값):
- 이미지 박스: `w-24 sm:w-36` (96px/144px), 세 카드 모두 동일 너비로 통일
- 텍스트 영역 패딩: `pt-4 pr-4 pb-4 pl-8 sm:pt-5 sm:pr-5 sm:pb-5 sm:pl-10` — 왼쪽 패딩(`pl-8`)을 오른쪽보다 크게 줘서 이미지와 텍스트 사이 간격을 의도적으로 넓힘
- `RevealCard`로 감싸서 스크롤 reveal 애니메이션 적용 (threshold 0.25)

하단 클로징(박스 없음):
- 흰색 핫트럭스 로고(`/hottrucks-logo-white.png`), 크기는 `logoTextRef`로 측정한 "복지도, 예산도, 행정도" 텍스트 너비의 1.4배로 동적 계산(`ResizeObserver` 사용)
- 카피: "복지도, 예산도, 행정도 / 군부대 행사엔 **핫트럭스**가 정답입니다" — "핫트럭스"만 `text-yellow-400`
- 하단 배지 3개: 출장비 없음 / 부대 예산 미사용 / 행정 절차 일괄 대행

⚠️ **이미지 에셋 관련 중요 이력**: `/hotdog-guy.png`는 한때 배경 누끼가 전혀 안 따진 상태(불투명 크림색 배경)로 배포된 적이 있었음. Python PIL의 flood-fill 알고리즘(테두리에서 시작, 배경색(254,244,235) 기준 색상 거리로 판정)으로 재작업해서 투명 배경으로 교체함. **새 캐릭터 이미지를 추가할 때 반드시 실제로 RGBA 알파 채널이 있는지, 배경이 진짜 투명한지 확인할 것** (`PIL.Image.open(path).mode == 'RGBA'`이고 alpha 히스토그램에 0 값이 충분히 있는지 체크하는 방식으로 검증 가능).

### WhySection.jsx ("Hottrucks 소개")
- 소개 카피 + 3개 특징 카드 (아이콘 이모지 + 제목 + 설명), `text-center` 정렬
- features: 🎖️ 軍 이해 기반 설계 / ⚡ 즉시 실행 가능한 무예산 복지 서비스 / ⚖️ 지휘관·실무자·장병 모두를 위한 균형 복지

### MenuSection.jsx ("MENU") — 이번 세션에 신규 추가된 섹션
WhySection과 ProcessSection 사이에 삽입. "메뉴 종류가 정말 많다"는 인상을 주기 위한 **전시용(비기능성)** 섹션 — 견적 폼과 연동되지 않음.

- 타이틀: "여러분이 찾는 모든 메뉴가 가능합니다"
- 설명(최종 확정 문구): "각 부대별 장병 선호도에 따른 메뉴를 말씀해주세요!"
- "대표 군부대 행사 추천메뉴" — 카드형 박스, 행사 종류별 추천 메뉴를 텍스트로 나열(배지/pill 형태 아님, 순수 텍스트를 `·`로 구분):
  - 부대개방행사 — 분식 · 핫도그 · 소세지 · 닭강정 · 커피차
  - 체육대회 — 닭꼬치 · 닭강정 · 분식 · 간식 · 아이스크림 · 커피차
  - 각종 훈련 — 분식 · 간식 · 식사 · 아이스크림 · 커피차
  - 지휘관 이취임식 — 커피차
- "그 외에도 다양한 메뉴가 준비되어 있습니다" — 나머지 메뉴 30여 개를 회색 pill 태그로 나열(떡볶이, 튀김, 순대, 어묵, 탕수육, 스테이크, 초밥, 피자, 햄버거, 삼겹살, 곱창, 타코야끼 등)

### ProcessSection.jsx ("How It Works")
- 서비스 이용 절차 4단계(행사 계획 → 문의 및 상담 → 운영 계획 조율 → 진행 및 피드백), 2x2 그리드 카드
- 하단 문구: "출입 신청 · 식중독 예방 교육 · 필요 서류 처리 등 행정 절차는 핫트럭스가 전적으로 담당합니다."

### TrustSection.jsx ("Why Trust Us")
- 타이틀: "10년간 군 복무한 / 노하우를 담아낸 서비스입니다"
- 대표 사진(`/founder-v2.png`, `w-[136px] sm:w-[163px]`) + "손진 대표" 텍스트를 가로 배치(`flex items-center gap-3`)
- 인용문(3줄로 줄바꿈): "제가 사랑했던 군 조직이 더 행복한 공간이 될 수 있기를, / 그리고 그곳에서 더 많은 추억을 쌓을 수 있기를 바라며 / 이 서비스를 기획하였습니다."
- **이력 박스**: `career` 배열을 `divide-y`로 나열. 각 행은 라벨(고정폭)+값 구조.
  - `career = [{복무:육군}, {복무기간:2013~2023(10년)}, {최종계급:대위}, {최종보직:중대장}, {주요근무지:27사단·2사단 신병교육대대·육군학생군사학교·55사단}]`
  - ⚠️ **라벨 "배분정렬(justify)" 관련 중요 이력**: 처음엔 CSS `text-align:justify; text-align-last:justify; text-justify:inter-character` 트릭으로 구현했는데, (1) 라벨 문자열에 실제 공백이 있으면(`'복무 기간'`) 그 공백만 비정상적으로 확 늘어나는 버그, (2) 실제 아이폰 Safari에서는 이 CSS 자체가 아예 적용 안 되고 그냥 붙어서 나오는 버그가 있었음. **최종 해결책은 CSS 트릭을 버리고 라벨을 글자 단위로 쪼개서 `flex justify-between`인 고정폭(`w-14`) 컨테이너에 넣는 방식**(JS로 `label.split('')`). 이 방식이 크로스 브라우저로 안정적이니 유지할 것.
  - "주요근무지" 값이 길어서 좁은 화면에서 2줄로 넘어가는 이슈가 있었음(라벨-값 간격을 `gap-1.5`로, 라벨 폭을 `w-14`로 줄여서 최대한 완화했으나 완전히 한 줄로 보장은 안 됨 — 화면 폭에 따라 다름)
- 대표 사진은 처음 요청보다 1.7배 확대된 상태(`w-[136px] sm:w-[163px]`)

### QuoteForm.jsx ("Get a Quote") — 견적 신청 폼 + ntfy 알림
- 필드: 지역 및 사단, 직책, 연락처, 행사 형태(드롭다운→주관식 입력으로 변경됨), 예상 인원 — 라벨 없이 placeholder만 사용
- 제출 시 `fetch('https://ntfy.sh/hottrucks-quote-ajpnpub56e', {method:'POST', headers:{Title, Priority, Tags}, body:...})`로 진의 휴대폰에 ntfy 앱 푸시 알림 전송
- 제출 성공 화면 문구: "빠른 시일 내로 연락드리겠습니다." (원래는 연락처까지 언급했으나 간결하게 수정됨)
- ⚠️ **알림 제목(Title)에 한글을 쓰면 안 됨** — 8절의 ntfy 관련 버그 설명 참고. 이 파일은 Title이 영어("HOTTRUCKS Quote Request")라서 문제없이 작동 중.

### Footer.jsx
- 작은 아이콘 로고(`/hottrucks-icon.png`, 트럭 아이콘만, 워드마크 없음) + "HOTTRUCKS" 텍스트
- 연락처: 010-9642-1323 / 카카오톡 son_1323 / gogohottrucks@gmail.com

---

## 5. 이미지 에셋 목록 (public/)

| 파일 | 용도 |
|---|---|
| `hero-truck.png` | Hero 섹션 트럭 사진 |
| `mz-soldier.png` | ProblemSection 카드1 캐릭터 (누끼 완료) |
| `worried-soldier.png` | ProblemSection 카드2 캐릭터 (누끼 완료) |
| `hotdog-guy.png` | ProblemSection 카드3 캐릭터 (누끼 완료 — 재작업 이력 있음, 4절 참고) |
| `hottrucks-logo-white.png` | ProblemSection 클로징 로고(흰색 버전) |
| `hottrucks-logo.png` | 원본 레드 로고 (흰색 버전은 이걸 리컬러해서 생성함) |
| `hottrucks-icon.png` | Footer용 소형 트럭 아이콘(워드마크 없음) |
| `founder-v2.png` | TrustSection 대표 사진(투명 배경) |
| `gallery/gallery-*.jpg` | GallerySection 실제 현장 사진 6장 |

---

## 6. 별도 프로젝트: 블로그 문의 폼 (blog-inquiry/)

메인 사이트와는 **완전히 독립된 정적 HTML 페이지 2개**. React/빌드 과정 없이 순수 HTML+CSS+JS 단일 파일임.

- `blog-inquiry/insurance.html` — 보험 블로그용 문의 폼 (이름/연락처/문의내용)
- `blog-inquiry/hottrucks-blog.html` — 핫트럭스 블로그용 문의 폼 (지역/직책/연락처/행사형태/예상인원/문의내용 — 메인 QuoteForm과 동일한 필드 구성)

**왜 별도로 만들었나**: 진이 운영하는 네이버 블로그(보험 블로그, 핫트럭스 블로그) 포스트 안에는 스크립트/폼을 직접 심을 수 없어서(네이버 블로그 에디터가 raw HTML/script 삽입을 막음), 별도 페이지를 만들어서 블로그 포스트 하단에 링크만 거는 방식으로 우회함.

**호스팅**: 메인 사이트(Netlify)와는 별개로 **Cloudflare**(Workers 정적 자산 방식으로 자동 배포됨, 대시보드에서 폴더 드래그앤드롭)에 올려서 사용 중. 현재 배포 주소는 랜덤 생성된 이름이라 매번 다름(예: `royal-violet-7b8d.jeen2383.workers.dev`) — **정확한 최신 주소는 사용자에게 직접 확인 필요**.

**ntfy 알림 토픽** (메인 사이트의 `hottrucks-quote-ajpnpub56e`와는 별개, 블로그별로 분리):
- 보험 블로그: `insurance-inquiry-l6z02325`
- 핫트럭스 블로그: `hottrucks-blog-inquiry-j2sy9sl5`

**⚠️ 매우 중요한 버그와 해결책 (ntfy Title 헤더 한글 인코딩 문제)**:
초기 구현에서는 ntfy 발행 방식으로 `fetch('https://ntfy.sh/{topic}', {headers: {Title: '한글제목', Priority, Tags}, body: '...'})` 형태(HTTP 헤더에 제목을 직접 넣는 방식)를 썼음. 이 방식은 **Title 헤더 값이 한글이면 iOS ntfy 앱에서 푸시 알림이 오지 않는 버그**가 있었음(메시지 자체는 ntfy 서버에 정상 도달해서 웹 뷰어(`ntfy.sh/{topic}`)에서는 보이지만, 폰 푸시 알림만 안 옴 — 헤더는 원래 non-ASCII를 안전하게 다루지 못함).

**해결책**: JSON 발행 방식으로 전환. `POST https://ntfy.sh/`(토픽 없는 루트 경로!)에 `Content-Type: application/json` 헤더만 쓰고, topic/title/message/priority/tags를 전부 JSON 바디에 담음:
```js
await fetch('https://ntfy.sh/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    topic: NTFY_TOPIC,
    title: '한글 제목 가능',
    message: '...',
    priority: 4,
    tags: ['bell']
  })
})
```
이 방식이 두 blog-inquiry HTML 파일에는 적용되어 있음. **QuoteForm.jsx(메인 사이트)는 아직 예전 헤더 방식을 쓰고 있는데, 거긴 Title이 영어라서 실제로는 문제없이 작동 중** — 다만 나중에 한글 제목으로 바꾸고 싶다면 반드시 이 JSON 방식으로 먼저 전환해야 함. 수정 확인은 사용자가 실제로 테스트하는 중이었고, 최종적으로 성공했는지 여부는 대화 마지막 시점 기준 미확인 상태.

---

## 7. 알려진 이슈 / 미해결 사항

1. **Netlify 계정 크레딧 이슈**: 메인 사이트(`hottrucks.netlify.app`)가 Netlify 무료 플랜 크레딧(월 300개) 관련 버그로 신규 배포가 막힌 상태. 계정에 크레딧이 남아있는데도(마지막 확인 22개) "Account credit usage exceeded" 오류가 뜨는 건 Netlify 측에 보고된 알려진 버그(가짜 플래그)로 추정됨. Netlify 지원팀에 문의 티켓을 넣어둔 상태(응답 대기 중). 이 문제가 원인 중 하나로, 이번 세션에서 20회 가까이 반복 배포한 것도 크레딧을 많이 소모시킨 것으로 추정.
2. **QuoteForm.jsx의 ntfy 발행 방식이 blog-inquiry와 다름**(헤더 방식 vs JSON 방식) — 일관성을 위해 나중에 통일하는 것을 고려할 수 있음(현재는 기능상 문제없어서 그대로 둠).
3. **blog-inquiry의 정확한 배포 URL**은 세션 종료 시점에 확정되지 않음(Cloudflare가 랜덤 이름을 부여함). 커스텀 이름/도메인으로 바꾸는 것을 고려할 수 있음.
4. **7번째 갤러리 사진** 요청이 있었으나(부대 마크가 그려진 커피컵 사진) 업로드가 두 차례 실패해서 결국 갤러리에 추가되지 못함(현재 6장만 존재).

---

## 8. 작업 방식/워크플로우 관련 참고사항

- 이 프로젝트는 npm/Node가 정상 동작하지 않는 샌드박스 환경에서 작업되었기 때문에, 실제 빌드 검증은 프로젝트 자체 `node_modules`가 아니라 별도의 Linux용 esbuild 바이너리로 JSX 문법 체크만 하는 방식으로 이뤄졌음(`main.jsx`를 엔트리로 번들링해서 에러 여부만 확인, 실제 `npm run build`는 사용자가 로컬에서 직접 실행). **Claude Code 환경(사용자 로컬 PC)에서는 정상적으로 `npm run build`, `npm run dev`를 바로 쓸 수 있을 것이므로 이 우회가 필요 없음.**
- 실제 시각적 확인은 브라우저 렌더링이 아니라 **Python PIL로 만든 근사 목업 이미지**로 진행되었음(레이아웃을 완벽히 재현하진 않지만 대략적 배치/색상/텍스트 줄바꿈 확인용). Claude Code 환경에서는 실제 `npm run dev`로 브라우저에서 바로 확인 가능하므로 이 방식도 필요 없어짐 — 더 정확하게 작업할 수 있음.
- 사용자는 실제 변경사항을 **아이폰 Safari로 라이브 사이트에 접속해서 스크린샷을 찍어 피드백**하는 방식으로 작업해왔음. 여러 차례 "PC 미리보기에서는 괜찮았는데 실제 폰에서는 다르게 보인다"는 이슈가 있었으므로(예: masonry 갤러리 순서 뒤섞임, CSS `text-justify` 미적용), **실기기 테스트를 중요하게 여기는 사용자**임을 참고할 것.
- 사용자는 "실행 요청"과 "고민 상담"을 구분해서 응답받길 원함 — "만들어줘/수정해줘"류는 바로 실행, "어떻게 할까/고민이야"류는 소크라테스식으로 질문을 던지며 답을 유도하는 대화 방식을 선호함.
- 사용자는 간결하고 군더더기 없는 답변을 선호함.

---

## 9. 다음에 이어서 할 만한 작업 후보

- ~~Netlify 크레딧 이슈 해결 후 최신 코드로 재배포~~ → 10절 참고, Netlify 자체를 떠나기로 결정함
- blog-inquiry 페이지들을 정식 커스텀 도메인/서브도메인으로 정리
- QuoteForm과 blog-inquiry의 ntfy 발행 방식 통일(JSON 방식으로)
- 7번째 갤러리 사진 추가(사용자가 재전송하면)
- MenuSection 최종 카피 확정 및 재검증
- 견적 폼(ntfy 푸시 알림만 존재, 영구 기록 없음) 리드 유실 위험 — Google Sheets 웹훅 등으로 이중 기록 추가 고려
- QuoteForm.jsx `handleSubmit`의 폰번호 형식 검증(현재는 비어있는지만 체크)

---

## 10. Claude Code 세션에서 진행한 작업 (Netlify → Cloudflare Pages 이전 준비)

**배경**: Netlify 무료 플랜이 "크레딧 통합제"로 바뀌면서, 이번 달 크레딧을 다 써서 수정/재배포가 아예 막힘. 사용자가 Netlify 이탈을 요청함 → Cloudflare Pages로 이전하기로 결정(트래픽/빌드 크레딧 걱정이 구조적으로 없고, blog-inquiry가 이미 Cloudflare에 있어 계정 재사용 가능).

**이번 세션에서 로컬 코드에 실제로 반영한 변경사항**:
1. **이미지 전량 WebP 변환**: `public/` 총 용량 6.9MB → 1.1MB (~81%↓). 원본 PNG/JPG는 삭제하고 JSX의 `src` 경로를 전부 `.webp`로 교체함(Hero, TrustSection, ProblemSection x4, Footer, GallerySection x6).
2. **파비콘 신설**: 기존엔 favicon으로 1.46MB짜리 마스터 로고 원본을 그대로 썼음 → 180×180 `public/favicon.png` 새로 생성, `index.html` 링크 교체.
3. **미사용/원본 자산 분리**: `founder.png`(구버전, 미사용), `hero-food.jpg`(미사용), `hottrucks-logo.png`(마스터 원본, favicon 생성 후 코드에서 미참조)는 `assets-archive/`로 이동 — `public/` 밖이라 빌드에 포함 안 됨, 그러나 파일 자체는 보존됨.
4. **OG/Twitter 메타태그 추가**: `index.html`에 og:title/description/image/url, twitter:card 추가. **`og:image`/`og:url`에 임시로 `https://hottrucks.pages.dev/`를 박아뒀음 — 실제 Cloudflare Pages 배포 후 확정된 도메인으로 반드시 교체해야 함** (커스텀 도메인 연결 시엔 그 도메인으로).
5. **폰트 경량화**: `pretendard/dist/web/static/pretendard.css`(9개 굵기 × woff+woff2 = 18개 파일, 17MB) → `pretendard/dist/web/variable/pretendardvariable.css`(가변 폰트 1개 파일, 2MB)로 교체. `tailwind.config.js`와 `src/index.css`의 `font-family` 둘 다 `'Pretendard Variable'`을 최우선으로 넣어야 실제로 로드됨 — **`src/index.css`의 `body` 셀렉터에 하드코딩된 `font-family`가 Tailwind 설정보다 우선 적용되는 함정이 있었으니, 폰트 관련 재작업 시 이 두 곳을 같이 확인할 것.**
6. **`.gitignore` 갱신**: 프로젝트 루트에 흩어져 있던 카카오톡 캡처/ChatGPT 생성 이미지 등(`KakaoTalk_*.jpg/png`, `ChatGPT Image *.png`, `hottrucks logo.png`) — 사이트에서 실제로 안 쓰이고 개인정보(카톡 대화 캡처 등) 포함 가능성이 있어 저장소 추적에서 제외함. 파일 자체는 로컬에 그대로 있음, git에만 안 올라감. 루트에 섞여 있던 빈 파일 `npm run build`(0바이트, 오작동으로 생성된 것으로 추정)도 같은 방식으로 제외.
7. **`npm run build` 로컬 검증 완료**: dist 총량 18MB → 3.5MB. `npm run preview`로 실제 브라우저 렌더링/네트워크 요청/폰트 로드 상태까지 확인함(콘솔 에러 없음, 이미지 전부 200, 폰트 `document.fonts` status "loaded" 확인).
8. **git 저장소 최초 생성**: 이 프로젝트에 git이 전혀 연결 안 되어 있었음 → `git init` 후 위 변경사항을 첫 커밋으로 기록함. 원격(GitHub) 연결은 아직 안 함.

**아직 사용자가 직접 해야 하는 것 (로그인이 필요해서 Claude가 대신 못 함)**:
1. GitHub에 새 리포지토리 생성 후 이 로컬 프로젝트를 push
2. Cloudflare Pages 대시보드에서 그 리포지토리 연결 — 빌드 설정: **빌드 명령어 `npm run build`, 출력 디렉터리 `dist`**
3. 배포 완료 후 실제 URL(`*.pages.dev` 또는 연결한 커스텀 도메인)을 확인해서 `index.html`의 `og:image`/`og:url` 자리표시자(`https://hottrucks.pages.dev/`)를 실제 값으로 교체
4. (선택) Netlify 프로젝트는 완전히 이전 확인 후 삭제/방치
