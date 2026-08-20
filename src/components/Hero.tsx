import { useState } from 'react'
import { ArrowRight, BookOpen, Award } from 'lucide-react'
import RegisterModal from './registerModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden bg-white pt-12 pb-20 lg:pt-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Yangi guruhlarga qabul boshlandi</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Dasturlashni <span className="text-blue-600">noldan</span> amaliyot bilan o'rganing
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
                Quruq nazariyasiz, faqat real loyihalar va shaxsiy mentor nazorati ostida zamonaviy dasturchiga aylaning.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-3"
                >
                  <span>Kursni Boshlash</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="#courses"
                  className="px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-200/80 shadow-sm transition-all flex items-center gap-2.5"
                >
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Yo'nalishlar</span>
                </a>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <p className="text-3xl font-black text-blue-600">100%</p>
                  <p className="text-xs font-medium text-slate-500 mt-1">Amaliyot</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900">1-on-1</p>
                  <p className="text-xs font-medium text-slate-500 mt-1">Mentorlik</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-blue-600">24/7</p>
                  <p className="text-xs font-medium text-slate-500 mt-1">Qo'llab-quvvatlov</p>
                </div>
              </div>

            </div>

            {/* Right Side: 3D Illustration Visual */}
            <div className="lg:col-span-5 relative group">
              
              {/* Blue Glow Background */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-500" />

              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800">
                <img
                  src="/src/hero-illustration.jpg"
                  alt="SetUp platformasi ta'lim muhiti"
                  className="w-full h-auto max-h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Certificate Banner */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 flex items-center gap-3.5 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-blue-300">Bitiruvchilar</p>
                    <p className="text-xs font-bold text-white">Sertifikat bilan ta'minlanadi</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Modal Dialog */}
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}