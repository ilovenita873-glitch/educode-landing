import { Code2, Send, Phone, Mail, MapPin, Globe, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-12 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="bg-blue-600 rounded-3xl p-8 sm:p-10 mb-16 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg shadow-blue-600/15">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Yangi darslar va chegirmalardan xabardor bo'ling
            </h3>
            <p className="text-blue-100 text-sm">
              Haftada bir marta IT olamidagi eng so'nggi yangiliklar va foydali manbalarni yuboramiz.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email manzilingiz"
              className="px-5 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 w-full sm:w-72"
            />
            <button className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shrink-0">
              <span>A'zo bo'lish</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                Edu<span className="text-blue-600">Code</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Zamonaviy IT ta'limi va amaliy ko'nikmalarni o'rgatuvchi platforma. Kelajak kasbini bugundan biz bilan birga egallang.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm" title="Telegram">
                <Send className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm" title="Social">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm" title="Website">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-slate-900 font-bold text-sm mb-4">Navigatsiya</p>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><a href="#about" className="hover:text-blue-600 transition-colors">Biz haqimizda</a></li>
              <li><a href="#courses" className="hover:text-blue-600 transition-colors">Yo'nalishlar</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Afzalliklar</a></li>
              <li><a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <p className="text-slate-900 font-bold text-sm mb-4">Yo'nalishlar</p>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><a href="#courses" className="hover:text-blue-600 transition-colors">Frontend Dasturlash</a></li>
              <li><a href="#courses" className="hover:text-blue-600 transition-colors">Backend Dasturlash</a></li>
              <li><a href="#courses" className="hover:text-blue-600 transition-colors">Full-Stack JavaScript</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-slate-900 font-bold text-sm mb-4">Aloqa</p>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>+998 (90) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>info@educode.uz</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Toshkent sh., Yunusobod t.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EduCode Academy. Barcha huquqlar himoyalangan.</p>
          <p>React, TypeScript & Tailwind CSS bilan tayyorlandi</p>
        </div>

      </div>
    </footer>
  )
}