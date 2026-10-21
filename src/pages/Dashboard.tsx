
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
      <header className="mb-8">
        <p className="text-sm font-medium text-emerald-700">
          PAINEL DE CONSUMO
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Visão geral
        </h1>

        <p className="mt-2 text-slate-500">
          Acompanhe seu consumo de água e energia.
        </p>

        {latestConsumption && (
          <p className="mt-3 text-sm text-slate-500">
            Mês mais recente: {' '}
            <span className="font-semibold capitalize text-slate-700">
              {formatMonth(latestConsumption.month)}
            </span>
          </p>
        )}
      </header>

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

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Evolução do consumo
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare seus registros ao longo dos meses.
        </p>

        {consumptions.length === 0 ? (
          <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <span className="text-3xl" aria-hidden="true">
              📊
            </span>

            <p className="mt-3 font-medium text-slate-700">
              Nenhum consumo cadastrado
            </p>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Cadastre seu consumo mensal na página Registros para começar
              a acompanhar sua evolução.
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold text-slate-800">
              {consumptions.length} {consumptions.length === 1
                ? 'mês registrado'
                : 'meses registrados'}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {consumptions.length < 2
                ? 'Cadastre mais um mês para começar a comparar seu consumo.'
                : `Comparação atual entre ${formatMonth(latestConsumption.month)} e ${formatMonth(previousConsumption.month)}.`}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard
