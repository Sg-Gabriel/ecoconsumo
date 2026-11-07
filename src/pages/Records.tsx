
import { useState } from 'react'
import type { Consumption } from '../types/Consumption'

import {
  addConsumption,
  deleteConsumption,
  getConsumptions,
  updateConsumption,
} from '../services/consumptionService'

import ConsumptionForm from '../components/ConsumptionForm'
import EditConsumptionModal from '../components/EditConsumptionModal'

function Records() {
  const [consumptions, setConsumptions] = useState<Consumption[]>(
    () => getConsumptions(),
  )

  const [editingConsumption, setEditingConsumption] =
    useState<Consumption | null>(null)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleUpdateConsumption(updated: Consumption) {
    setMessage('')
    setError('')

    const duplicateMonth = consumptions.some(
      (item) =>
        item.month === updated.month &&
        item.id !== updated.id,
    )

    if (duplicateMonth) {
      setError('Já existe outro registro para esse mês.')
      setEditingConsumption(null)
      return
    }

    try {
      updateConsumption(updated)
      setConsumptions(getConsumptions())
      setEditingConsumption(null)
      setMessage('Registro atualizado com sucesso!')
    } catch {
      setError('Não foi possível atualizar o registro.')
      setEditingConsumption(null)
    }
  }

  function handleAddConsumption(consumption: Consumption) {
    setMessage('')
    setError('')

    try {
      addConsumption(consumption)

      setConsumptions(getConsumptions())
      setMessage('Registro cadastrado com sucesso!')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível salvar o registro.',
      )
    }
  }

  function handleDeleteConsumption(id: string) {
    const confirmed = window.confirm(
      'Tem certeza de que deseja excluir este registro?',
    )

    if (!confirmed) {
      return
    }

    deleteConsumption(id)
    setConsumptions(getConsumptions())
    setMessage('Registro excluído com sucesso!')
    setError('')
  }

  function formatMonth(month: string) {
    const [year, monthNumber] = month.split('-')

    return new Date(
      Number(year),
      Number(monthNumber) - 1,
      1,
    ).toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
  }

  function handleExportCsv() {
    if (consumptions.length === 0) {
      setError('Cadastre pelo menos um registro para exportar.')
      setMessage('')
      return
    }

    const header = [
      'Mes',
      'Consumo de agua (m3)',
      'Consumo de energia (kWh)',
    ]

    const rows = consumptions.map((item) => [
      item.month,
      String(item.waterM3),
      String(item.energyKwh),
    ])

    const csvContent = [header, ...rows]
      .map((row) =>
        row
          .map((value) => `"${value.replaceAll('"', '""')}"`)
          .join(';'),
      )
      .join('\r\n')

    const blob = new Blob(
      ['\uFEFF', csvContent],
      { type: 'text/csv;charset=utf-8;' },
    )

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'ecoconsumo-registros.csv'
    link.click()

    URL.revokeObjectURL(url)
    setError('')
    setMessage('Arquivo CSV exportado com sucesso!')
  }

  const sortedConsumptions = [...consumptions].sort(
    (a, b) => b.month.localeCompare(a.month),
  )

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-medium text-sky-700 dark:text-sky-400">
          ACOMPANHAMENTO MENSAL
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Registros de consumo
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Cadastre e acompanhe o consumo mensal de água e energia.
        </p>
      </header>

      <ConsumptionForm onSubmit={handleAddConsumption} />

      {message && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
        >
          {message}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Histórico de consumo
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {consumptions.length} registro(s) cadastrado(s)
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="rounded-xl border border-emerald-200 px-4 py-2.5 font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
          >
            Exportar CSV
          </button>
        </div>

        
{sortedConsumptions.length === 0 ? (
  <div className="flex min-h-40 flex-col items-center justify-center text-center">
    <span className="text-3xl" aria-hidden="true">
      📝
    </span>

    <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">
      Nenhum registro encontrado
    </p>

    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
      Preencha o formulário acima para adicionar seu primeiro registro.
    </p>
  </div>
) : (
  <>
    {/* Layout para celulares */}
    <div className="mt-6 grid gap-3 sm:hidden">
      {sortedConsumptions.map((item) => (
        <article
          key={item.id}
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60"
        >
          <div className="mb-4">
            <h3 className="font-semibold capitalize text-slate-800 dark:text-white">
              {formatMonth(item.month)}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white p-3 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Água
              </p>

              <p className="mt-1 font-bold text-sky-700 dark:text-sky-400">
                {item.waterM3.toLocaleString('pt-BR')} m³
              </p>
            </div>

            <div className="rounded-lg bg-white p-3 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Energia
              </p>

              <p className="mt-1 font-bold text-emerald-700 dark:text-emerald-400">
                {item.energyKwh.toLocaleString('pt-BR')} kWh
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2 border-t border-slate-200 pt-3 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setEditingConsumption(item)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
              aria-label={`Editar registro de ${formatMonth(item.month)}`}
            >
              Editar
            </button>

            <button
              type="button"
              onClick={() => handleDeleteConsumption(item.id)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              aria-label={`Excluir registro de ${formatMonth(item.month)}`}
            >
              Excluir
            </button>
          </div>
        </article>
      ))}
    </div>

    {/* Layout para tablets e computadores */}
    <div className="mt-6 hidden sm:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <th className="px-3 py-3 font-medium">Mês</th>
            <th className="px-3 py-3 font-medium">Água (m³)</th>
            <th className="px-3 py-3 font-medium">Energia (kWh)</th>
            <th className="px-3 py-3 text-right font-medium">Ações</th>
          </tr>
        </thead>

        <tbody>
          {sortedConsumptions.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
            >
              <td className="px-3 py-4 font-medium capitalize text-slate-800 dark:text-slate-200">
                {formatMonth(item.month)}
              </td>

              <td className="px-3 py-4 text-slate-600 dark:text-slate-300">
                {item.waterM3.toLocaleString('pt-BR')}
              </td>

              <td className="px-3 py-4 text-slate-600 dark:text-slate-300">
                {item.energyKwh.toLocaleString('pt-BR')}
              </td>

              <td className="px-3 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingConsumption(item)}
                    className="rounded-lg px-3 py-2 font-medium text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                    aria-label={`Editar registro de ${formatMonth(item.month)}`}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteConsumption(item.id)}
                    className="rounded-lg px-3 py-2 font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                    aria-label={`Excluir registro de ${formatMonth(item.month)}`}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}

      </section>

      {editingConsumption && (
        <EditConsumptionModal
          consumption={editingConsumption}
          onSave={handleUpdateConsumption}
          onClose={() => setEditingConsumption(null)}
        />
      )}
    </div>
  )
}

export default Records
