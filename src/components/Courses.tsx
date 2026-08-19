import { useState } from 'react'
import { Clock, BarChart, CheckCircle2, ArrowRight, X } from 'lucide-react'

export interface CourseType {
  title: string
  duration: string
  level: string
  description: string
  technologies: string[]
  badge?: string
  fullDetails?: {
    overview: string
    topics: string[]
    price: string
  }
}

const COURSES: CourseType[] = [
  {
    title: 'Frontend Dasturlash',
    duration: '6 oy',
    level: "Boshlang'ich",
    badge: 'Eng ommabop',
    description: "Zamonaviy veb-saytlar va interaktiv ilovalar yaratishni mukammal o'rganing.",
    technologies: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind'],
    fullDetails: {
      overview: "Frontend kursi davomida siz zamonaviy veb-saytlar, interaktiv va tezkor SPA yaratishni hamda murakkab foydalanuvchi interfeyslarini qurishni o'rganasiz.",
      topics: [
        "Semantik HTML5 va Moslashuvchan CSS3/Tailwind",
        "JavaScript ES6+ va Asinxron Dasturlash",
        "TypeScript va Qat'iy Tiplash",
        "React.js, Hooks, Redux Toolkit va Router",
        "REST API va Backend bilan integratsiya"
      ],
      price: "460,000 so'm / oy"
    }
  },
  {
    title: 'Backend Dasturlash',
    duration: '6 oy',
    level: "Boshlang'ich",
    description: "Mukammal ma'lumotlar bazasi, serverlar va xavfsiz RESTful API larni qurishni o'rganing.",
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'PostgreSQL'],
    fullDetails: {
      overview: "Backend yo'nalishi orqali siz loyihalarning mantiqiy va xavfsiz server qismini qurish, ma'lumotlar bazasini to'g'ri loyihalash, avtorizatsiya va to'lov tizimlarini integratsiya qilishni o'rganasiz.",
      topics: [
        "Node.js asoslari va Asinxron ishlov berish",
        "Express.js bilan RESTful API va Architecture",
        "MongoDB, Mongoose va PostgreSQL",
        "JWT Auth, Security va Validation (Zod)",
        "Serverga deploy qilish va Docker asoslari"
      ],
      price: "460,000 so'm / oy"
    }
  },
  {
    title: 'Full-Stack JavaScript',
    duration: '8 oy',
    level: "O'rta",
    badge: 'Tavsiya etiladi',
    description: "Ham Frontend, ham Backend qismini noldan loyihalashtirib, tayyor mahsulot darajasiga yetkazing.",
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB'],
    fullDetails: {
      overview: "Full-Stack dasturi sizni to'liq loyihani g'oyadan tortib tayyor mahsulot va deploy darajasigacha olib chiquvchi universal dasturchi qilib tayyorlaydi.",
      topics: [
        "Frontend + Backend mukammal sinxronizatsiya",
        "Next.js (SSR, SSG, Server Actions)",
        "Microservices va Katta Ma'lumotlar Bazasi",
        "Real-time ilovalar (Socket.io)",
        "Amaliy Portfolioning 3 ta yirik loyihasi"
      ],
      price: "460,000 so'm / oy"
    }
  }
]

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null)
  const [isStartModalOpen, setIsStartModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [registeredCourseTitle, setRegisteredCourseTitle] = useState('')

  // Form States
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+998 ')
  const [telegram, setTelegram] = useState('')
  const [loading, setLoading] = useState(false)

  // Ism validatsiyasi (Faqat harf va bo'sh joy)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (/^[a-zA-Zʻ’'`\s]*$/.test(val)) {
      setName(val)
    }
  }

  // Raqam maskasi: +998 (XX) XXX-XX-XX
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

  // Telegram username validatsiyasi
  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim()
    if (val && !val.startsWith('@')) {
      val = '@' + val
    }
    setTelegram(val)
  }

  const handleAzoBolish = (courseTitle: string) => {
    setSelectedCourse(null)
    setRegisteredCourseTitle(courseTitle)
    setIsStartModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const rawDigits = phone.replace(/\D/g, '')
    if (rawDigits.length !== 12) {
      return
    }

    setLoading(true)

    const BOT_TOKEN = '8770461912:AAEXL5SmS3ZKsm5mlKCoDGi8AaeL6mD6YoU'
    const CHAT_ID = '7050156709'

    const tgUser = telegram ? telegram : "Ko'rsatilmadi"
    const message = `📬 *Yangi Ariza!*\n\n👤 *Ism:* ${name}\n📞 *Tel:* ${phone}\n💬 *Telegram:* ${tgUser}\n📚 *Kurs:* ${registeredCourseTitle || 'Umumiy'}`

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
        setIsStartModalOpen(false)
        setName('')
        setPhone('+998 ')
        setTelegram('')
        setIsSuccessModalOpen(true)
      }
    } catch {
      // Tarmoq xatolari
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="courses" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
            O'quv Yo'nalishlari
          </h2>
          <p className="text-slate-500 text-sm">
            Har bir kurs real loyihalar, shaxsiy kod-review va sertifikatlashni o'z ichiga oladi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <div
              key={course.title}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {course.badge && (
                  <span className="absolute -top-3.5 right-8 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
                    {course.badge}
                  </span>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1">
                    <BarChart className="w-3.5 h-3.5" />
                    {course.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-8">
                  {course.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-200/60 rounded-lg text-slate-700 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Sertifikatli
                </span>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group transition-colors"
                >
                  <span>Batafsil</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* BATAFSIL MODAL */}
      {selectedCourse && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCourse(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedCourse.duration}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1.5">
                    <BarChart className="w-3.5 h-3.5" />
                    {selectedCourse.level}
                  </span>
                  {selectedCourse.badge && (
                    <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold">
                      {selectedCourse.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-slate-900">{selectedCourse.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {selectedCourse.fullDetails?.overview || selectedCourse.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">O'rganiladigan texnologiyalar</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourse.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selectedCourse.fullDetails?.topics && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Kurs dasturida</h4>
                  <div className="space-y-2">
                    {selectedCourse.fullDetails.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Kurs narxi</span>
                  <span className="text-lg font-black text-slate-900">
                    {selectedCourse.fullDetails?.price || "460,000 so'm / oy"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAzoBolish(selectedCourse.title)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2 text-sm"
                >
                  <span>A'zo bo'lish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOSHLASH / ARIZA MODALI */}
      {isStartModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsStartModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsStartModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-2xl font-black text-slate-900">Boshlash / Ariza</h3>
              {registeredCourseTitle && (
                <span className="mt-2 inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100">
                  Tanlangan kurs: {registeredCourseTitle}
                </span>
              )}
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
          </div>
        </div>
      )}

      {/* MUVAFFAQIYAT MODALI (SAKRAYDIGAN IKONKA BILAN) */}
      {isSuccessModalOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsSuccessModalOpen(false)}
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
            className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl border border-slate-100 p-8 sm:p-10 text-center space-y-6 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Yopish tugmasi */}
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Yashil ramkali sakraydigan ikonka */}
            <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center justify-center mx-auto shadow-sm animate-bounce-subtle">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            {/* Matnlar */}
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Arizangiz qabul qilindi!</h3>
              <p className="text-sm text-slate-500 font-medium">
                Tez orada siz bilan bog'lanamiz.
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}