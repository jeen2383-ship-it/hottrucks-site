# HOTTRUCKS 홈페이지

군부대 행사 전문 푸드트럭 중개 서비스 '핫트럭스' 메인 페이지. React(Vite) + Tailwind CSS.

## 실행 방법

로컬 컴퓨터(npm 설치되어 있어야 함)에서:

```bash
npm install
npm run dev
```

터미널에 뜨는 주소(보통 http://localhost:5173)로 접속하면 바로 확인할 수 있습니다.

배포용 빌드:

```bash
npm run build
```

`dist` 폴더가 생성되며, 이 폴더를 Vercel/Netlify/Cafe24 등 어떤 정적 호스팅에도 올릴 수 있습니다.

## 아직 해야 할 것

- **견적 신청 폼 백엔드 연동**: 현재 폼은 프론트엔드에서 "접수 완료" 화면만 보여줍니다. 실제로 신청 내용이
  이메일/문자로 오게 하려면 Formspree, EmailJS 같은 무료 폼 서비스나 자체 API 서버를 연결해야 합니다.
  (`src/components/QuoteForm.jsx`의 `handleSubmit` 함수 안 TODO 참고)
- **도메인 연결 및 배포**
- 필요시 실제 행사 사진, 대표 프로필 사진 교체

## 구조

```
src/
  components/
    Header.jsx        상단 고정 네비게이션
    Hero.jsx           히어로 (핵심 메시지 + CTA)
    TrustSection.jsx   대표 이력 기반 신뢰 섹션
    ProcessSection.jsx 이용 절차 4단계
    WhySection.jsx      선택 이유 3가지
    QuoteForm.jsx        견적 신청 폼
    Footer.jsx           푸터 (연락처)
  App.jsx
  main.jsx
```
