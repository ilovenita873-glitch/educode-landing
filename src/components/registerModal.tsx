import { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  // Form state-lari
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+998 ')
  const [telegram, setTelegram] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  // Ism validatsiyasi
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (/^[a-zA-Zʻ’'`\s]*$/.test(val)) {
      setName(val)
    }
  }

  // Telefon maskasi
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '')

    if (!input.startsWith('998')) {
      input = '998' + input
    }

    if (input.length > 12) {
      input = input.slice(0, 12)
    }

    let formatted = '+998'
    if (input.length > 3) formatted += ` (${input.slice(3, 5)}`
    if (input.length >= 5) formatted += `)`
    if (input.length > 5) formatted += ` ${input.slice(5, 8)}`
    if (input.length > 8) formatted += `-${input.slice(8, 10)}`
    if (input.length > 10) formatted += `-${input.slice(10, 12)}`

    setPhone(formatted)
  }

  // Telegram username ixtiyoriy validatsiyasi (avtomatik @ qo'shish)
  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim()
    if (val && !val.startsWith('@')) {
      val = '@' + val
    }
    setTelegram(val)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const rawDigits = phone.replace(/\D/g, '')
    if (rawDigits.length !== 12) return

    setLoading(true)

    const BOT_TOKEN = '8770461912:AAEXL5SmS3ZKsm5mlKCoDGi8AaeL6mD6YoU'
    const CHAT_ID = '7050156709'

    const tgUser = telegram ? telegram : "Ko'rsatilmadi"
    const message = `📬 *Yangi Ariza (Navbar)*\n\n👤 *Ism:* ${name}\n📞 *Tel:* ${phone}\n💬 *Telegram:* ${tgUser}`

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      })

      const data = await res.json()

      if (data.ok) {
        setIsSuccess(true)
      }
    } catch {
      // Xatolikni yashirish
    } finally {
      setLoading(false)
    }
  }

  const handleCloseAll = () => {
    setIsSuccess(false)
    setName('')
    setPhone('+998 ')
    setTelegram('')
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleCloseAll}
    >
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>

      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseAll}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div>
              <h3 className="text-2xl font-black text-slate-900">Kursga yozilish</h3>
              <p className="text-xs text-slate-500 mt-1">Ma'lumotlaringizni kiriting, tez orada bog'lanamiz.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Ismingiz</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Ismingizni kiriting"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Telefon raqamingiz</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+998 (90) 123-45-67"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-mono"
                />
              </div>

              {/* Telegram Username - Ixtiyoriy */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-500">Telegram username</label>
                  <span className="text-[10px] text-slate-400 font-medium">(Ixtiyoriy)</span>
                </div>
                <input
                  type="text"
                  value={telegram}
                  onChange={handleTelegramChange}
                  placeholder="@username"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-sm disabled:opacity-50"
              >
                {loading ? "Yuborilmoqda..." : "Yuborish"}
              </button>
            </form>
          </>
        ) : (
          /* Muvaffaqiyat oynasi va sakraydigan yashil ikonka */
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center justify-center mx-auto shadow-sm animate-bounce-subtle">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Arizangiz qabul qilindi!</h3>
              <p className="text-sm text-slate-500 font-medium">
                Tez orada mutaxassislarimiz siz bilan bog'lanishadi.
              </p>
            </div>

            <button
              onClick={handleCloseAll}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-sm"
            >
              Yopish
            </button>
          </div>
        )}
      </div>
    </div>
  )
}