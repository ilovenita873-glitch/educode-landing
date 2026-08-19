import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Courses from './components/Courses'
import Features from './components/Features'
import FAQ from './components/FAQ'
import Footer from './components/Footer' // <-- BU IMPORT BORLIGIGA ISHONCH HOSIL QILING

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Navbar />
      <main>
        <div id="about">
          <Hero />
        </div>
        <div id="courses">
          <Courses />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer /> {/* <-- BU CHAQIRILGANLIGIGA ISHONCH HOSIL QILING */}
    </div>
  )
}