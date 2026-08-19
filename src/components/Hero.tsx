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
                {/* Primary Button -> Opens Modal */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-3"
                >
                  <span>Kursni Boshlash</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Secondary Button -> Scrolls to Courses */}
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

            {/* Right Code Visual Terminal */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 relative">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">&gt;_ App.tsx</span>
                </div>

                {/* Code Snippet */}
                <div className="font-mono text-xs sm:text-sm leading-relaxed space-y-2">
                  <p className="text-slate-500">// EduCode O'quvchisi</p>
                  <p className="text-slate-200">
                    <span className="text-purple-400">const</span> student = &#123;
                  </p>
                  <p className="pl-4 text-slate-300">
                    name: <span className="text-amber-300">'Siz'</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    status: <span className="text-amber-300">'Boshlovchi'</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    target: <span className="text-amber-300">'Junior Frontend Dev'</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    skills: [<span className="text-amber-300">'React'</span>, <span className="text-amber-300">'TypeScript'</span>, <span className="text-amber-300">'Tailwind'</span>],
                  </p>
                  <p className="pl-4 text-slate-300">
                    result: <span className="text-purple-400">function</span>() &#123;
                  </p>
                  <p className="pl-8 text-emerald-400">
                    return 'Yuqori maoshli ish!'
                  </p>
                  <p className="pl-4 text-slate-300">&#125;</p>
                  <p className="text-slate-200">&#125;</p>
                </div>

                {/* Certificate Banner Card */}
                <div className="mt-8 p-4 rounded-2xl bg-blue-950/60 border border-blue-800/50 flex items-center gap-3.5">
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

      {/* Modal Dialog Connection */}
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}