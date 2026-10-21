
import { useState } from 'react'

interface MonthPickerProps {
  value: string
  onChange: (value: string) => void
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

function MonthPicker({ value, onChange }: MonthPickerProps) {
  const currentDate = new Date()
  const selectedYear = value ? Number(value.split('-')[0]) : currentDate.getFullYear()
  const selectedMonth = value ? Number(value.split('-')[1]) - 1 : -1

  const [isOpen, setIsOpen] = useState(false)
  const [year, setYear] = useState(selectedYear)

  const displayValue = value
    ? `${months[selectedMonth]} de ${selectedYear}`
    : 'Selecione o mês de referência'

  function selectMonth(monthIndex: number) {
    const formattedMonth = String(monthIndex + 1).padStart(2, '0')

    onChange(`${year}-${formattedMonth}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setYear(selectedYear)
          setIsOpen(!isOpen)
        }}
        aria-label="Selecionar mês de referência"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
      >
        <span className={value ? 'text-slate-800' : 'text-slate-400'}>
          {displayValue}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-emerald-700"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-2 w-full min-w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:w-80">
          <div className="mb-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setYear((previous) => previous - 1)}
              aria-label="Ano anterior"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <span className="text-lg font-bold text-slate-900">
              {year}
            </span>

            <button
              type="button"
              onClick={() => setYear((previous) => previous + 1)}
              aria-label="Próximo ano"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => {
              const isSelected =
                year === selectedYear && index === selectedMonth

              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => selectMonth(index)}
                  className={`rounded-xl px-2 py-3 text-sm transition ${
                    isSelected
                      ? 'bg-emerald-600 font-semibold text-white'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  {month.slice(0, 3)}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Fechar calendário
          </button>
        </div>
      )}
    </div>
  )
}

export default MonthPicker
