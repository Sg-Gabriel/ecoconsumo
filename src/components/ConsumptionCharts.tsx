
import { useEffect, useState } from 'react'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { Consumption } from '../types/Consumption'

interface ConsumptionChartsProps {
  consumptions: Consumption[]
}

type Period = '6' | '12' | 'all'

function ConsumptionCharts({ consumptions }: ConsumptionChartsProps) {
  const availableYears = Array.from(
    new Set(consumptions.map((item) => item.month.split('-')[0])),
  ).sort((a, b) => b.localeCompare(a))

  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('12')

  useEffect(() => {
    if (
      selectedYear !== 'all' &&
      !availableYears.includes(selectedYear)
    ) {
      setSelectedYear('all')
    }
  }, [selectedYear, availableYears.join(',')])

  // Primeiro, filtra pelo ano.
  const yearConsumptions = consumptions
    .filter((item) =>
      selectedYear === 'all'
        ? true
        : item.month.startsWith(`${selectedYear}-`),
    )
    .sort((a, b) => a.month.localeCompare(b.month))

  // Depois, aplica o período selecionado.
  const filteredConsumptions =
    selectedPeriod === 'all'
      ? yearConsumptions
      : yearConsumptions.slice(-Number(selectedPeriod))

  const chartData = filteredConsumptions.map((item) => {
    const [year, month] = item.month.split('-')

    const monthLabel = new Date(
      Number(year),
      Number(month) - 1,
      1,
    ).toLocaleDateString('pt-BR', {
      month: 'short',
      year: '2-digit',
    })

    return {
      month: monthLabel,
      waterM3: item.waterM3,
      energyKwh: item.energyKwh,
    }
  })

  function formatValue(value: number) {
    return value.toLocaleString('pt-BR', {
      maximumFractionDigits: 2,
    })
  }

  const periods: { label: string; value: Period }[] = [
    { label: '6 meses', value: '6' },
    { label: '12 meses', value: '12' },
    { label: 'Todos', value: 'all' },
  ]

  // Estilos compartilhados dos gráficos.
  const chartAxisStyle = {
    fontSize: 11,
    fill: '#94a3b8',
  }

  const tooltipStyle = {
    borderRadius: '12px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    padding: '10px 14px',
  }

  return (
    <div className="min-w-0 space-y-6">

      {/* Filtros */}
      <div className="flex min-w-0 flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-end sm:justify-between sm:p-5">

        <div className="w-full sm:max-w-48">
          <label
            htmlFor="chart-year"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Ano de referência
          </label>

          <select
            id="chart-year"
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-emerald-500 dark:focus:ring-emerald-900/40"
          >
            <option value="all">Todos os anos</option>

            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Período
          </span>

          <div className="grid grid-cols-3 gap-2 sm:flex">
            {periods.map((period) => (
              <button
                key={period.value}
                type="button"
                onClick={() => setSelectedPeriod(period.value)}
                aria-pressed={selectedPeriod === period.value}
                className={`rounded-xl px-2 py-3 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                  selectedPeriod === period.value
                    ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                    : 'border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      {filteredConsumptions.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center transition-colors dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <span className="text-3xl" aria-hidden="true">
            📊
          </span>

          <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">
            Nenhum registro encontrado
          </p>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Não existem registros para os filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid min-w-0 gap-5 lg:grid-cols-2 lg:gap-6">

          {/* Gráfico de água */}
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:p-5">
            <div className="mb-4 sm:mb-5">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">💧</span>

                <h3 className="font-bold text-slate-900 dark:text-white">
                  Consumo de água
                </h3>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Evolução mensal em metros cúbicos (m³).
              </p>
            </div>

            <div className="h-56 w-full min-w-0 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 8, left: -15, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="month"
                    tick={chartAxisStyle}
                    stroke="#64748b"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    minTickGap={20}
                    interval="preserveStartEnd"
                  />

                  <YAxis
                    tick={chartAxisStyle}
                    stroke="#64748b"
                    width={42}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${formatValue(Number(value))} m³`,
                      'Consumo',
                    ]}
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: '#f8fafc', marginBottom: 4 }}
                    itemStyle={{ color: '#38bdf8' }}
                    cursor={{ stroke: '#64748b', strokeDasharray: '4 4' }}
                  />

                  <Line
                    type="monotone"
                    dataKey="waterM3"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#38bdf8' }}
                    activeDot={{ r: 6 }}
                    name="Água"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de energia */}
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:p-5">
            <div className="mb-4 sm:mb-5">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">⚡</span>

                <h3 className="font-bold text-slate-900 dark:text-white">
                  Consumo de energia
                </h3>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Evolução mensal em quilowatt-hora (kWh).
              </p>
            </div>

            <div className="h-56 w-full min-w-0 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 8, left: -15, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="month"
                    tick={chartAxisStyle}
                    stroke="#64748b"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    minTickGap={20}
                    interval="preserveStartEnd"
                  />

                  <YAxis
                    tick={chartAxisStyle}
                    stroke="#64748b"
                    width={42}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${formatValue(Number(value))} kWh`,
                      'Consumo',
                    ]}
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: '#f8fafc', marginBottom: 4 }}
                    itemStyle={{ color: '#34d399' }}
                    cursor={{ stroke: '#64748b', strokeDasharray: '4 4' }}
                  />

                  <Line
                    type="monotone"
                    dataKey="energyKwh"
                    stroke="#34d399"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#34d399' }}
                    activeDot={{ r: 6 }}
                    name="Energia"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Exibindo {filteredConsumptions.length}{' '}
        {filteredConsumptions.length === 1 ? 'registro' : 'registros'}
        {' de '}
        {selectedYear === 'all' ? 'todos os anos' : selectedYear}.
      </p>
    </div>
  )
}

export default ConsumptionCharts
