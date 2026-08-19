import { Zap, Code, Users, Award, Laptop, MessageSquare } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Code,
      title: "Real amaliy loyihalar",
      description: "Quruq nazariya emas, noldan tayyor to'liq veb-saytlar va ilovalarni o'z portfoliongiz uchun yaratasiz."
    },
    {
      icon: Users,
      title: "Shaxsiy Mentor ko'magi",
      description: "Har bir topshirig'ingiz tajribali dasturchi tomonidan tekshiriladi va xatolar ustida ishlanadi."
    },
    {
      icon: Zap,
      title: "Interaktiv platforma",
      description: "Kod mashqlarini to'g'ridan-to'g'ri brauzerda bajaring va natijani bir zumda real vaqt rejimida ko'ring."
    },
    {
      icon: Laptop,
      title: "Istalgan vaqtda o'rganish",
      description: "Darslar va materiallar 24/7 ochiq. O'zingizga qulay vaqtda va sur'atda bilim oling."
    },
    {
      icon: MessageSquare,
      title: "Yopiq Community",
      description: "Safdoshlaringiz va mentorlar bilan tajriba almashish va savollarga tezkor javob olish imkoniyati."
    },
    {
      icon: Award,
      title: "Xalqaro Sertifikat",
      description: "Kursni muvaffaqiyatli tamomlaganingizdan so'ng, rezyumengiz uchun tasdiqlangan sertifikatga ega bo'lasiz."
    }
  ]

  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
            <Zap className="w-4 h-4 text-blue-600" />
            Bizning Afzalliklarimiz
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nega aynan <span className="text-blue-600">EduCode</span> platformasi?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            IT sohasida tez va samarali natijaga erishishingiz uchun barcha sharoitlarni bir joyga jamladik.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon
            return (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}