import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import GallerySection from './components/GallerySection.jsx'
import ProblemSection from './components/ProblemSection.jsx'
import WhySection from './components/WhySection.jsx'
import MenuSection from './components/MenuSection.jsx'
import TrustSection from './components/TrustSection.jsx'
import ProcessSection from './components/ProcessSection.jsx'
import QuoteForm from './components/QuoteForm.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <main>
        <Hero />
        <GallerySection />
        <ProblemSection />
        <WhySection />
        <MenuSection />
        <ProcessSection />
        <TrustSection />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  )
}
