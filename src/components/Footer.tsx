import { useState } from 'react'
import { Send, Check, Loader2, Phone, Mail, MapPin, Share2, Globe } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError("To'g'ri email kiriting")
      return
    }

    setError('')
    setLoading(true)

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

    const message = `
📬 <b>Yangi Newsletter Obuna!</b>

📧 <b>Email:</b> ${email.trim()}
    `

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      })

      if (response.ok) {
        setSubscribed(true)
        setEmail('')
        setTimeout(() => setSubscribed(false), 3000)
      } else {
        setError('Xatolik yuz berdi')
      }
    } catch (err) {
      setError('Tarmoq xatoligi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-slate-50 pt-12 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Newsletter Banner */}
        <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-600/10">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Yangi darslar va chegirmalardan xabardor bo'ling
            </h2>
            <p className="text-blue-100 text-sm">
              Haftada bir marta IT olamidagi eng so'nggi yangiliklar va foydali manbalarni yuboramiz.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="emailgaqiziqshma@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  disabled={subscribed}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-white/90 focus:bg-white text-slate-900 placeholder:text-slate-500 text-sm font-medium focus:outline-none transition-all ${
                    error ? 'ring-2 ring-rose-400 bg-rose-50' : 'focus:ring-2 focus:ring-slate-900'
                  }`}
                />
                {error && (
                  <span className="absolute -bottom-6 left-2 text-xs text-rose-200 font-medium">
                    {error}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || subscribed}
                className={`px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shrink-0 active:scale-95 ${
                  subscribed
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg'
                }`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : subscribed ? (
                  <>
                    <span>A'zo bo'lindi</span>
                    <Check className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>A'zo bo'lish</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-4">
          
          {/* Column 1: Logo & Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                &lt;/&gt;
              </div>
              <span className="text-xl font-black text-slate-900">EduCode</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              Zamonaviy IT ta'limi va amaliy ko'nikmalarni o'rgatuvchi platforma. Kelajak kasbini bugundan biz bilan birga egallang.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                <Send className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Navigatsiya */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Navigatsiya</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li><a href="#about" className="hover:text-blue-600 transition-colors">Biz haqimizda</a></li>
              <li><a href="#courses" className="hover:text-blue-600 transition-colors">Yo'nalishlar</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Afzalliklar</a></li>
              <li><a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Yo'nalishlar */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Yo'nalishlar</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Frontend Dasturlash</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Backend Dasturlash</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Full-Stack JavaScript</a></li>
            </ul>
          </div>

          {/* Column 4: Aloqa */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Aloqa</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>+998 (90) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>info@educode.uz</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Toshkent sh., Yunusobod t.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  )
}