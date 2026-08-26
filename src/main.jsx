import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import 'pretendard/dist/web/variable/pretendardvariable.css'
import './index.css'
import App from './App.jsx'

// 데스크톱처럼 넓은 화면에서 접속해도 항상 모바일 비율로 보이도록,
// 실제 모바일 너비의 iframe 안에 사이트를 렌더링합니다.
// (iframe 내부는 그 자체로 독립된 뷰포트를 가지므로, Tailwind의 반응형 클래스가
// 바깥 브라우저 창 크기가 아니라 iframe의 너비를 기준으로 정확히 동작합니다.)
const MOBILE_WIDTH = 430
const isFramed = window.self !== window.top

function Root() {
  const [isWideViewport, setIsWideViewport] = useState(
    !isFramed && window.innerWidth > MOBILE_WIDTH
  )

  useEffect(() => {
    if (isFramed) return
    const onResize = () => setIsWideViewport(window.innerWidth > MOBILE_WIDTH)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (isWideViewport) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#e7e2dd',
          padding: '24px',
        }}
      >
        <iframe
          src={window.location.href}
          title="HOTTRUCKS"
          style={{
            width: MOBILE_WIDTH,
            height: '92vh',
            maxHeight: 900,
            border: 'none',
            borderRadius: '28px',
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.35)',
          }}
        />
      </div>
    )
  }

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
