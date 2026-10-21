import Sidebar from './components/sidebar'
import ConsumptionCard from './components/ConsumptionCard'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Sidebar />

      <main id="dashboard" className="p-5 sm:p-8 md:ml-64">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">
              PAINEL DE CONSUMO
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Visão geral
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Acompanhe seu consumo de água e energia.
            </p>
          </div>

          <div className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            📅 Acompanhe seus registros
          </div>
        </header>

        <section
          aria-label="Resumo do consumo"
          className="grid gap-5 sm:grid-cols-2"
        >
          
          <ConsumptionCard
            title="Consumo de água"
            value="--"
            unit="m³"
            icon="💧"
            color="blue"
            description="Nenhum registro neste mês"
          />

          <ConsumptionCard
            title="Consumo de energia"
            value="--"
            unit="kWh"
            icon="⚡"
            color="green"
            description="Nenhum registro neste mês"
          />

        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">
            Evolução do consumo
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Compare seus registros ao longo dos meses.
          </p>

          <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <span className="text-3xl">📊</span>

            <p className="mt-3 font-medium text-slate-700">
              Seus gráficos aparecerão aqui
            </p>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Cadastre seu consumo mensal para começar a visualizar sua evolução.
            </p>
          </div>
        </section>

        <section
          id="dicas"
          className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 p-6 text-white sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
            Dica sustentável
          </p>

          <h3 className="mt-3 text-xl font-bold">
            Cada gota conta. Cada watt também.
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-50">
            Reduzir o tempo do banho e apagar as luzes em ambientes vazios
            são atitudes simples que ajudam a promover o consumo responsável.
          </p>
        </section>

        <footer className="py-8 text-center text-sm text-slate-400">
          EcoConsumo · Consumo consciente, futuro sustentável.
        </footer>
      </main>
    </div>
  )
}

export default App
