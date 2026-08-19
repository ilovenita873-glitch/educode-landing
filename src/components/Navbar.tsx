import { useState, useEffect } from 'react'
import { Code2, Menu, X, ChevronRight } from 'lucide-react'
import RegisterModal from './registerModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Biz haqimizda')

  const navLinks = [
    { name: 'Biz haqimizda', href: '#about', id: 'about' },
    { name: 'Yo\'nalishlar', href: '#courses', id: 'courses' },
    { name: 'Afzalliklar', href: '#features', id: 'features' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id))
      const scrollPosition = window.scrollY + 200

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentLink = navLinks.find(link => link.id === section.id)
            if (currentLink) {
              setActiveSection(currentLink.name)
            }
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-blue-100/60 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:bg-blue-700 group-hover:scale-105 transition-all duration-200">
                <Code2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  Edu<span className="text-blue-600">Code</span>
                </span>
                <span className="text-[10px] font-bold text-blue-600/80 tracking-widest uppercase mt-0.5">
                  Online Academy
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveSection(link.name)}
                    className={`px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
                    }`}
                  >
                    {link.name}
                  </a>
                )
              })}
            </nav>

            {/* Action Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/25 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Boshlash</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100/80 text-slate-700 hover:text-blue-600 transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-blue-100 px-5 pt-3 pb-6 space-y-4 shadow-xl">
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.name)
                      setIsOpen(false)
                    }}
                    className={`px-4 py-3 rounded-xl text-base font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/60'
                    }`}
                  >
                    {link.name}
                  </a>
                )
              })}
            </nav>
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsModalOpen(true)
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Boshlash</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Register Modal Dialog */}
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}