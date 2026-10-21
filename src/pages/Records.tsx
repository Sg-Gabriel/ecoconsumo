import { updateConsumption } from '../services/consumptionService'
import EditConsumptionModal from '../components/EditConsumptionModal'
import { useState } from 'react'
import type { Consumption } from '../types/Consumption'
import {
  addConsumption,
  deleteConsumption,
  getConsumptions,
} from '../services/consumptionService'
import ConsumptionForm from '../components/ConsumptionForm'

function Records() {
  const [consumptions, setConsumptions] = useState<Consumption[]>(
    () => getConsumptions(),
  )
    
  const [editingConsumption, setEditingConsumption] = 
  useState<Consumption | null>(null)

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

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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
        <p className="text-sm font-medium text-sky-700">
          ACOMPANHAMENTO MENSAL
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Registros de consumo
        </h1>

        <p className="mt-2 text-slate-500">
          Cadastre e acompanhe o consumo mensal de água e energia.
        </p>
      </header>

      <ConsumptionForm onSubmit={handleAddConsumption} />

      {message && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
        >
          {message}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Histórico de consumo
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {consumptions.length} registro(s) cadastrado(s)
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="rounded-xl border border-emerald-200 px-4 py-2.5 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Exportar CSV
          </button>
        </div>

        {sortedConsumptions.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center text-center">
            <span className="text-3xl" aria-hidden="true">
              📝
            </span>

            <p className="mt-3 font-semibold text-slate-800">
              Nenhum registro encontrado
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Preencha o formulário acima para adicionar seu primeiro registro.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
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
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-3 py-4 font-medium capitalize text-slate-800">
                      {formatMonth(item.month)}
                    </td>

                    <td className="px-3 py-4 text-slate-600">
                      {item.waterM3.toLocaleString('pt-BR')}
                    </td>

                    <td className="px-3 py-4 text-slate-600">
                      {item.energyKwh.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-3 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        <button
                        type="button"
                        onClick={() => setEditingConsumption(item)}
                        className="rounded-lg px-3 py-2 font-medium text-emerald-700 transition hover:bg-emerald-50"
                        aria-label={`Editar registro de ${formatMonth(item.month)}`}
                        >
                        Editar
                        </button>

                        <button
                        type="button"
                        onClick={() => handleDeleteConsumption(item.id)}
                        className="rounded-lg px-3 py-2 font-medium text-red-600 transition hover:bg-red-50"
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
