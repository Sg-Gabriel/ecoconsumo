
import MonthPicker from './MonthPicker'
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Consumption } from '../types/Consumption'

interface ConsumptionFormProps {
  onSubmit: (consumption: Consumption) => void
}

function ConsumptionForm({ onSubmit }: ConsumptionFormProps) {
  const [month, setMonth] = useState('')
  const [waterM3, setWaterM3] = useState('')
  const [energyKwh, setEnergyKwh] = useState('')
  const [error, setError] = useState('')

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

    onSubmit({
      id: crypto.randomUUID(),
      month,
      waterM3: water,
      energyKwh: energy,
    })

    setMonth('')
    setWaterM3('')
    setEnergyKwh('')
  }

  const inputClass =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-900/40'

  const labelClass =
    'mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200'

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
        Novo registro mensal
      </h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Informe os valores de consumo da sua residência.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Mês de referência
          </label>

          <MonthPicker
            value={month}
            onChange={setMonth}
          />
        </div>

        <div>
          <label htmlFor="waterM3" className={labelClass}>
            Consumo de água (m³)
          </label>

          <input
            id="waterM3"
            type="number"
            min="0"
            step="any"
            value={waterM3}
            onChange={(event) => setWaterM3(event.target.value)}
            required
            placeholder="Ex.: 12.5"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="energyKwh" className={labelClass}>
            Consumo de energia (kWh)
          </label>

          <input
            id="energyKwh"
            type="number"
            min="0"
            step="any"
            value={energyKwh}
            onChange={(event) => setEnergyKwh(event.target.value)}
            required
            placeholder="Ex.: 185"
            className={inputClass}
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

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
      >
        Salvar registro
      </button>
    </form>
  )
}

export default ConsumptionForm
