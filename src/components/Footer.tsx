import { useState } from 'react'
import { Send, Check, Loader2 } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError('Togri email manzilini kiriting')
      return
    }

    setError('')
    setLoading(true)    

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

    const message = `
📬 <b>Yangi Newsletter Obunachisi!</b>

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
    <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="space-y-2 text-center lg:text-left max-w-xl">
        <h2 className="text-2xl sm:text-3xl font-black">
          Yangi darslar va chegirmalardan xabardor bo'ling
        </h2>
        <p className="text-blue-100 text-sm">
          Haftada bir marta IT olamidagi eng so'nggi yangiliklar va foydali manbalarni yuboramiz.
        </p>
      </div>

      <div className="w-full lg:w-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <div className="relative flex-1">
            <input
              type="email"
              placeholder="emailingizni kiriting@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              disabled={subscribed}
              className={`w-full px-5 py-3.5 rounded-2xl bg-white/90 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 transition-all ${
                error ? 'ring-2 ring-rose-400 bg-rose-50' : 'focus:ring-blue-300'
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
  )
}