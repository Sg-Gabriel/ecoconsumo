
interface ConsumptionCardProps {
  title: string
  value: string
  unit: string
  icon: string
  color: 'blue' | 'green'
  description: string
}

function ConsumptionCard({
  title,
  value,
  unit,
  icon,
  color,
  description,
}: ConsumptionCardProps) {
  const styles = {
    blue: {
      border: 'border-sky-100',
      iconBackground: 'bg-sky-100',
      iconText: 'text-sky-700',
      progressBackground: 'bg-sky-100',
      progressBar: 'bg-sky-500',
    },
    green: {
      border: 'border-emerald-100',
      iconBackground: 'bg-emerald-100',
      iconText: 'text-emerald-700',
      progressBackground: 'bg-emerald-100',
      progressBar: 'bg-emerald-500',
    },
  }

  const currentStyle = styles[color]

  return (
    <article
      className={`rounded-2xl border ${currentStyle.border} bg-white p-6 shadow-sm`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-slate-500">{title}</p>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {value}{' '}
            <span className="text-base font-medium text-slate-500">
              {unit}
            </span>
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${currentStyle.iconBackground} ${currentStyle.iconText} text-2xl`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{description}</p>

      <div
        className={`mt-5 h-1.5 rounded-full ${currentStyle.progressBackground}`}
        aria-hidden="true"
      >
        <div className={`h-1.5 w-1/3 rounded-full ${currentStyle.progressBar}`} />
      </div>
    </article>
  )
}

export default ConsumptionCard
