  import { X, Clock, BarChart, CheckCircle2, ArrowRight } from 'lucide-react'

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

  interface CourseDetailsModalProps {
    course: CourseType | null
    isOpen: boolean
    onClose: () => void
    onRegisterClick: (courseTitle: string) => void
  }

  export default function CourseDetailsModal({
    course,
    isOpen,
    onClose,
    onRegisterClick
  }: CourseDetailsModalProps) {
    if (!isOpen || !course) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div 
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {course.duration}
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1.5">
                  <BarChart className="w-3.5 h-3.5" />
                  {course.level}
                </span>
                {course.badge && (
                  <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold">
                    {course.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-slate-900">{course.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {course.fullDetails?.overview || course.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">O'rganiladigan texnologiyalar</h4>
              <div className="flex flex-wrap gap-1.5">
                {course.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {course.fullDetails?.topics && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Kurs dasturida</h4>
                <div className="space-y-2">
                  {course.fullDetails.topics.map((topic, i) => (
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
                  {course.fullDetails?.price || 'Kelishilgan holda'}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose()
                  onRegisterClick(course.title)
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <span>A'zo bo'lish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }