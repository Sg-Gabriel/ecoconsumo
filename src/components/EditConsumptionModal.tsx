
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Consumption } from '../types/Consumption'
import MonthPicker from './MonthPicker'

interface EditConsumptionModalProps {
  consumption: Consumption
  onSave: (consumption: Consumption) => void
  onClose: () => void
}

function EditConsumptionModal({
  consumption,
  onSave,
  onClose,
}: EditConsumptionModalProps) {
  const [month, setMonth] = useState(consumption.month)
  const [waterM3, setWaterM3] = useState(String(consumption.waterM3))
  const [energyKwh, setEnergyKwh] = useState(String(consumption.energyKwh))
  const [error, setError] = useState('')

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const water = Number(waterM3)
    const energy = Number(energyKwh)

    if (
      !month ||
      waterM3.trim() === '' ||
      energyKwh.trim() === ''
    ) {
      setError('Preencha todos os campos.')
      return
    }

    if (
      !Number.isFinite(water) ||
      !Number.isFinite(energy) ||
      water < 0 ||
      energy < 0
    ) {
      setError('Informe valores válidos e não negativos.')
      return
    }

    onSave({
      ...consumption,
      month,
      waterM3: water,
      energyKwh: energy,
    })
  }

  const labelClass =
    'mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200'

  const inputClass =
    'w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500'

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
        className="my-auto w-full min-w-0 max-w-lg rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 sm:text-sm">
              GERENCIAR CONSUMO
            </p>

            <h2
              id="edit-modal-title"
              className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl"
            >
              Editar registro
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Altere os dados do mês selecionado.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 sm:mt-6">
          <div className="min-w-0">
            <label className={labelClass}>
              Mês de referência
            </label>

            <MonthPicker
              value={month}
              onChange={setMonth}
            />
          </div>

          <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="edit-waterM3"
                className={labelClass}
              >
                Água (m³)
              </label>

              <input
                id="edit-waterM3"
                type="number"
                min="0"
                step="any"
                required
                value={waterM3}
                onChange={(event) => setWaterM3(event.target.value)}
                className={`${inputClass} focus:border-sky-500 focus:ring-sky-100 dark:focus:ring-sky-900/40`}
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="edit-energyKwh"
                className={labelClass}
              >
                Energia (kWh)
              </label>

              <input
                id="edit-energyKwh"
                type="number"
                min="0"
                step="any"
                required
                value={energyKwh}
                onChange={(event) => setEnergyKwh(event.target.value)}
                className={`${inputClass} focus:border-emerald-500 focus:ring-emerald-100 dark:focus:ring-emerald-900/40`}
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 sm:w-auto"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default EditConsumptionModal
