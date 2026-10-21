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

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-bold text-slate-900">
        Novo registro mensal
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Informe os valores de consumo da sua residência.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        
        <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">
            Mês de referência
        </label>

        <MonthPicker
            value={month}
            onChange={setMonth}
        />
        </div>


        <div>
          <label
            htmlFor="waterM3"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
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
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label
            htmlFor="energyKwh"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
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
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
