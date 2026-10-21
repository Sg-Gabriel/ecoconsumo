
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
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
        className="my-auto w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              GERENCIAR CONSUMO
            </p>

            <h2
              id="edit-modal-title"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-900"
            >
              Editar registro
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Altere os dados do mês selecionado.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Mês de referência
            </label>

            <MonthPicker
              value={month}
              onChange={setMonth}
            />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-waterM3"
                className="mb-2 block text-sm font-medium text-slate-700"
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
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <label
                htmlFor="edit-energyKwh"
                className="mb-2 block text-sm font-medium text-slate-700"
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
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
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
