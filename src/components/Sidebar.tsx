
function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-white px-6 py-5 md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-b-0 md:border-r">
      <a href="#dashboard" className="flex items-center gap-3">
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
  )
}

export default Sidebar
