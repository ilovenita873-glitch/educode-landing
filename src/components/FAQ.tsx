import { useState } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'

export default function FAQ() {
  // Ochilgan savol indeksini saqlash uchun State
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Dasturlashni o'rganish uchun mendan boshlang'ich bilim talab qilinadimi?",
      answer: "Yo'q, mutlaqo shart emas! Bizning kurslarimiz noldan boshlanadi va barcha tushunchalar eng sodda tilda amaliy topsiriqlar bilan tushuntiriladi."
    },
    {
      question: "Darslar qanday formatda bo'lib o'tadi?",
      answer: "Darslar video-qo'llanmalar, amaliy kodlash topsiriqlari va jonli mentorlik sessiyalari shaklida o'tkaziladi. O'zingizga qulay vaqtda o'rganishingiz mumkin."
    },
    {
      question: "O'qish jarayonida savollarim bo'lsa kimdan yordam olaman?",
      answer: "Har bir o'quvchiga shaxsiy mentor biriktiriladi. Yopiq Telegram/Discord guruhimizda xatolaringiz bo'yicha 24/7 yordam va kod-review olasiz."
    },
    {
      question: "Kursni tugatgach sertifikat beriladimi?",
      answer: "Ha, barcha amaliy loyiha va topsiriqlarni muvaffaqiyatli topshirgan o'quvchilarga QR-kodli rasmiy sertifikat taqdim etiladi."
    },
    {
      question: "O'rganish uchun qanday kompyuter kerak bo'ladi?",
      answer: "Web dasturlashni boshlash uchun o'rtacha ko'rsatkichli (kamida 4GB RAM va zamonaviy brauzer ishlaydigan) istalgan noutbuk yetarli bo'ladi."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            Ko'p Beriladigan Savollar
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Savollaringizga <span className="text-blue-600">javoblar</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Akkreditatsiya, ta'lim jarayoni va boshqa savollar bo'yicha batafsil ma'lumot.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-blue-300 shadow-md shadow-blue-500/5' 
                    : 'bg-white/80 border-slate-200 hover:border-blue-200'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-5 h-5 shrink-0" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}