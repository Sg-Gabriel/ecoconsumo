
import ConsumptionCharts from '../components/ConsumptionCharts'
import ConsumptionCard from '../components/ConsumptionCard'
import { getConsumptions } from '../services/consumptionService'

function Dashboard() {
  const consumptions = getConsumptions().sort(
    (a, b) => b.month.localeCompare(a.month),
  )

  const latestConsumption = consumptions[0]
  const previousConsumption = consumptions[1]

  function formatValue(value: number): string {
    return value.toLocaleString('pt-BR', {
      maximumFractionDigits: 2,
    })
  }

  function formatMonth(month: string): string {
    const [year, monthNumber] = month.split('-')

    return new Date(Number(year), Number(monthNumber) - 1, 1)
      .toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      })
  }

  function getComparison(
    currentValue: number,
    previousValue: number | undefined,
  ): string {
    if (previousValue === undefined) {
      return 'Cadastre outro mês para comparar'
    }

    if (previousValue === 0) {
      if (currentValue === 0) {
        return 'Sem alteração em relação ao mês anterior disponível'
      }

      return 'Consumo anterior igual a zero; variação percentual indisponível'
    }

    const variation =
      ((currentValue - previousValue) / previousValue) * 100

    if (variation > 0) {
      return `Aumento de ${formatValue(variation)}% em relação ao mês anterior disponível`
    }

    if (variation < 0) {
      return `Redução de ${formatValue(Math.abs(variation))}% em relação ao mês anterior disponível`
    }

    return 'Sem alteração em relação ao mês anterior disponível'
  }

  const waterDescription = latestConsumption
    ? getComparison(
        latestConsumption.waterM3,
        previousConsumption?.waterM3,
      )
    : 'Cadastre seu primeiro registro mensal'

  const energyDescription = latestConsumption
    ? getComparison(
        latestConsumption.energyKwh,
        previousConsumption?.energyKwh,
      )
    : 'Cadastre seu primeiro registro mensal'

  return (
    <div>
      {/* Cabeçalho */}
      <header className="mb-8">
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          PAINEL DE CONSUMO
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Visão geral
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Acompanhe seu consumo de água e energia.
        </p>

        {latestConsumption && (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Mês mais recente:{' '}
            <span className="font-semibold capitalize text-slate-700 dark:text-slate-200">
              {formatMonth(latestConsumption.month)}
            </span>
          </p>
        )}
      </header>

      {/* Resumo do consumo */}
      <section
        aria-label="Resumo do consumo"
        className="grid gap-5 sm:grid-cols-2"
      >
        <ConsumptionCard
          title="Consumo de água"
          value={
            latestConsumption
              ? formatValue(latestConsumption.waterM3)
              : '--'
          }
          unit="m³"
          icon="💧"
          color="blue"
          description={waterDescription}
        />

        <ConsumptionCard
          title="Consumo de energia"
          value={
            latestConsumption
              ? formatValue(latestConsumption.energyKwh)
              : '--'
          }
          unit="kWh"
          icon="⚡"
          color="green"
          description={energyDescription}
        />
      </section>

      {/* Evolução do consumo */}
      <section className="mt-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Evolução do consumo
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Compare seus registros de água e energia ao longo dos meses.
          </p>
        </div>

        {consumptions.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center transition-colors dark:border-slate-700 dark:bg-slate-900">
            <span className="text-3xl" aria-hidden="true">
              📊
            </span>

            <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">
              Nenhum consumo cadastrado
            </p>

            <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              Cadastre seu consumo mensal na página Registros para começar
              a acompanhar sua evolução.
            </p>
          </div>
        ) : (
          <ConsumptionCharts consumptions={consumptions} />
        )}
      </section>
    </div>
  )
}

export default Dashboard
