import { BookOpen, Clock, BarChart, ArrowRight, CheckCircle } from 'lucide-react'

export default function Courses() {
  const courses = [
    {
      id: 'frontend',
      title: 'Frontend Dasturlash',
      description: 'Zamonaviy veb-saytlar va interaktiv ilovalar yaratishni mukammal o\'rganing.',
      duration: '6 oy',
      level: 'Boshlang\'ich',
      badge: 'Eng ommabop',
      tags: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind'],
    },
    {
      id: 'backend',
      title: 'Backend Dasturlash',
      description: 'Mukammal ma\'lumotlar bazasi, serverlar va xavfsiz RESTful API larni qurishni o\'rganing.',
      duration: '6 oy',
      level: 'Boshlang\'ich',
      badge: null,
      tags: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'PostgreSQL'],
    },
    {
      id: 'fullstack',
      title: 'Full-Stack JavaScript',
      description: 'Ham Frontend, ham Backend qismini noldan loyihalashtirib, tayyor mahsulot darajasiga yetkazing.',
      duration: '8 oy',
      level: 'O\'rta',
      badge: 'Tavsiya etiladi',
      tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB'],
    },
  ]

  return (
    <section id="courses" className="py-20 lg:py-28 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            O'quv Yo'nalishlari
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Zamonaviy IT kasblarini <span className="text-blue-600">amaliyotda</span> egallang
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Har bir kurs real loyihalar, shaxsiy kod-review va sertifikatlashni o'z ichiga oladi.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Badge */}
              {course.badge && (
                <div className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-blue-600/20">
                  {course.badge}
                </div>
              )}

              <div>
                {/* Meta info */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-4">
                  <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <BarChart className="w-3.5 h-3.5 text-blue-600" />
                    <span>{course.level}</span>
                  </div>
                </div>

                {/* Course Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                  {course.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-md border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Sertifikatli</span>
                </div>
                <button className="text-sm font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                  <span>Batafsil</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}