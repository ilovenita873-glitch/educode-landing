import { useState, useRef, useEffect } from 'react'
import { X, User, Phone, BookOpen, Send, CheckCircle2, AlertCircle, ChevronDown, Check } from 'lucide-react'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

const COURSES = [
  'Frontend Dasturlash',
  'Backend Dasturlash',
  'Full-Stack JavaScript'
]

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    course: 'Frontend Dasturlash'
  })

  const [errors, setErrors] = useState({
    name: '',
    phone: ''
  })

  // Dropdown'dan tashqariga bosilganda menyuni yopish
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!isOpen) return null

  // Telefon raqam maskasi (+998 (90) 123-45-67)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value

    if (!input.startsWith('+998')) {
      input = '+998 '
    }

    const digits = input.replace(/\D/g, '')
    const limitedDigits = digits.slice(0, 12)

    let formatted = '+998 '
    if (limitedDigits.length > 3) {
      formatted += '(' + limitedDigits.slice(3, 5)
    }
    if (limitedDigits.length >= 5) {
      formatted += ') ' + limitedDigits.slice(5, 8)
    }
    if (limitedDigits.length >= 8) {
      formatted += '-' + limitedDigits.slice(8, 10)
    }
    if (limitedDigits.length >= 10) {
      formatted += '-' + limitedDigits.slice(10, 12)
    }

    setFormData(prev => ({ ...prev, phone: formatted }))
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, name: e.target.value }))
    if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
  }

  const validate = () => {
    let isValid = true
    const newErrors = { name: '', phone: '' }

    if (formData.name.trim().length < 3) {
      newErrors.name = 'Ismingizni to\'liq kiriting (kamida 3 ta harf)'
      isValid = false
    }

    const rawDigits = formData.phone.replace(/\D/g, '')
    if (rawDigits.length !== 12) {
      newErrors.phone = 'Telefon raqamni to\'liq kiriting'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

    const message = `
🚀 <b>Yangi Ariza!</b>

👤 <b>Ism:</b> ${formData.name.trim()}
📞 <b>Tel:</b> ${formData.phone}
📚 <b>Kurs:</b> ${formData.course}
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
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          onClose()
          setFormData({ name: '', phone: '+998 ', course: 'Frontend Dasturlash' })
          setErrors({ name: '', phone: '' })
        }, 2500)
      } else {
        alert('Xatolik yuz berdi. Qayta urinib ko\'ring.')
      }
    } catch (error) {
      console.error('Telegram botga yuborishda xatolik:', error)
      alert('Tarmoqda xatolik yuz berdi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Arizangiz qabul qilindi!</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Tez orada siz bilan bog'lanamiz.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <h3 className="text-2xl font-black text-slate-900">Kursga a'zo bo'ling</h3>
              <p className="text-xs text-slate-500">
                Ma'lumotlaringizni qoldiring, sifatli ta'limni birgalikda boshlaymiz.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Ism va Familiya</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Eshmatov Toshmat"
                    value={formData.name}
                    onChange={handleNameChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm font-medium focus:outline-none transition-all ${
                      errors.name 
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' 
                        : 'border-slate-200/80 focus:ring-2 focus:ring-blue-600 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs font-medium text-rose-500 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Telefon raqam</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+998 (90) 123-45-67"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm font-medium focus:outline-none transition-all ${
                      errors.phone 
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' 
                        : 'border-slate-200/80 focus:ring-2 focus:ring-blue-600 focus:bg-white'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs font-medium text-rose-500 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Custom Course Dropdown */}
              <div className="space-y-1.5 relative" ref={dropdownRef}>
                <label className="text-xs font-bold text-slate-700">Yo'nalishni tanlang</label>
                
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className={`w-full relative pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 text-sm font-medium flex items-center justify-between transition-all ${
                    isSelectOpen ? 'ring-2 ring-blue-600 bg-white border-transparent' : 'hover:bg-slate-100/80'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <span className="truncate">{formData.course}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 transition-transform duration-200 ${isSelectOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {/* Dropdown Menu Options */}
                {isSelectOpen && (
                  <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    {COURSES.map((courseOption) => {
                      const isSelected = formData.course === courseOption
                      return (
                        <button
                          key={courseOption}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, course: courseOption }))
                            setIsSelectOpen(false)
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm font-medium flex items-center justify-between transition-colors ${
                            isSelected 
                              ? 'bg-blue-50 text-blue-600 font-bold' 
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{courseOption}</span>
                          {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? 'Yuborilmoqda...' : 'Arizani Yuborish'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}