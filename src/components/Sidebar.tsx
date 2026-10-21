
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `shrink-0 rounded-xl px-4 py-3 transition ${
      isActive
        ? 'bg-emerald-50 font-semibold text-emerald-700'
        : 'text-slate-600 hover:bg-slate-50'
    }`

  return (
    <aside className="border-b border-slate-200 bg-white px-6 py-5 md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-b-0 md:border-r">
      <NavLink to="/" className="flex items-center gap-3">
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
      </NavLink>

      <nav className="mt-8 flex gap-2 overflow-x-auto md:flex-col">
        <NavLink to="/" end className={linkClass}>
          Visão geral
        </NavLink>

        <NavLink to="/registros" className={linkClass}>
          Registros
        </NavLink>

        <NavLink to="/dicas" className={linkClass}>
          Dicas sustentáveis
        </NavLink>
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
