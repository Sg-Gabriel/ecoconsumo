
function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Menu lateral */}
      <aside className="border-b border-slate-200 bg-white px-6 py-5 md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-b-0 md:border-r">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
            🌱
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">
              EcoConsumo
            </h1>
            <p className="text-xs text-slate-500">
              Consumo consciente
            </p>
          </div>
        </a>

        <nav className="mt-8 flex gap-2 overflow-x-auto md:flex-col">
          <a
            href="#dashboard"
            className="shrink-0 rounded-xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-700"
          >
            Visão geral
          </a>

          <a
            href="#registros"
            className="shrink-0 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50"
          >
            Registros
          </a>

          <a
            href="#dicas"
            className="shrink-0 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-50"
          >
            Dicas sustentáveis
          </a>
        </nav>

        <div className="mt-8 hidden rounded-2xl bg-sky-50 p-4 md:block">
          <p className="font-semibold text-sky-900">
            Pequenas atitudes importam
          </p>
          <p className="mt-2 text-sm leading-relaxed text-sky-800">
            Acompanhe seu consumo e descubra oportunidades de economizar.
          </p>
        </div>
      </aside>

      {/* Conteúdo principal */}
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

        {/* Indicadores de consumo */}
        <section
          aria-label="Resumo do consumo"
          className="grid gap-5 sm:grid-cols-2"
        >
          <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-slate-500">
                  Consumo de água
                </p>
                <p className="mt-4 text-3xl font-bold text-slate-900">
                  -- <span className="text-base font-medium text-slate-500">m³</span>
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-2xl">
                💧
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Nenhum registro neste mês
            </p>

            <div className="mt-5 h-1.5 rounded-full bg-sky-100">
              <div className="h-1.5 w-1/3 rounded-full bg-sky-500" />
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-slate-500">
                  Consumo de energia
                </p>
                <p className="mt-4 text-3xl font-bold text-slate-900">
                  -- <span className="text-base font-medium text-slate-500">kWh</span>
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                ⚡
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Nenhum registro neste mês
            </p>

            <div className="mt-5 h-1.5 rounded-full bg-emerald-100">
              <div className="h-1.5 w-1/3 rounded-full bg-emerald-500" />
            </div>
          </article>
        </section>

        {/* Área de gráficos */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Evolução do consumo
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Compare seus registros ao longo dos meses.
            </p>
          </div>

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

        {/* Dicas sustentáveis */}
        <section id="dicas" className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 p-6 text-white sm:p-8">
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
