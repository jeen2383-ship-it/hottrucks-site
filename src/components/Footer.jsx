export default function Footer() {
  return (
    <footer className="bg-ink py-10 px-4 sm:px-6 border-t border-white/10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/hottrucks-icon.webp" alt="HOTTRUCKS" className="h-8 w-8 object-contain" />
          <span className="text-white font-extrabold tracking-tight">HOTTRUCKS</span>
        </div>

        <div className="text-white/50 text-sm space-y-1">
          <p>대표 문의 <a href="tel:01096421323" className="text-white/80 font-semibold">010-9642-1323</a></p>
          <p>카카오톡 <span className="text-white/80 font-semibold">son_1323</span></p>
          <p>이메일 <a href="mailto:gogohottrucks@gmail.com" className="text-white/80 font-semibold">gogohottrucks@gmail.com</a></p>
        </div>
      </div>
      <p className="mx-auto max-w-6xl mt-6 text-white/30 text-xs">
        © {new Date().getFullYear()} HOTTRUCKS. All rights reserved.
      </p>
    </footer>
  )
}
