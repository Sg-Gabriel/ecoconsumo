
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

function Sidebar({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
}: SidebarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
      isActive
        ? 'bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
        : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400'
    }`

  return (
    <aside
      id="main-sidebar"
      aria-label="Menu principal"
      className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white px-6 py-6 shadow-xl transition-transform duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-900 md:z-30 md:w-64 md:translate-x-0 md:shadow-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Identidade do projeto */}
      <div className="flex items-center justify-between">
        <NavLink
          to="/"
          onClick={onClose}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-900/40">
            🌱
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              EcoConsumo
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consumo consciente
            </p>
          </div>
        </NavLink>

        {/* Botão fechar: somente celular */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
        >
          ×
        </button>
      </div>

      {/* Navegação */}
      <nav
        aria-label="Navegação principal"
        className="mt-10 flex flex-col gap-2"
      >
        <NavLink to="/" end onClick={onClose} className={linkClass}>
          <span aria-hidden="true">📊</span>
          <span>Visão geral</span>
        </NavLink>

        <NavLink to="/registros" onClick={onClose} className={linkClass}>
          <span aria-hidden="true">📝</span>
          <span>Registros</span>
        </NavLink>

        <NavLink to="/dicas" onClick={onClose} className={linkClass}>
          <span aria-hidden="true">🌿</span>
          <span>Dicas sustentáveis</span>
        </NavLink>
      </nav>

      {/* Mensagem sustentável */}
      <div className="mt-10 rounded-2xl bg-sky-50 p-4 dark:bg-sky-950/40">
        <p className="font-semibold text-sky-900 dark:text-sky-300">
          Pequenas atitudes importam
        </p>

        <p className="mt-2 text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Acompanhe seu consumo e descubra oportunidades de economizar.
        </p>
      </div>

      {/* Rodapé e alternância de tema */}
      <div className="mt-auto space-y-4 border-t border-slate-100 pt-6 dark:border-slate-700">
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label={
            theme === 'light'
              ? 'Ativar modo escuro'
              : 'Ativar modo claro'
          }
        >
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className="text-lg">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>

            {theme === 'light' ? 'Modo escuro' : 'Modo claro'}
          </span>

          <span className="text-xs text-slate-400">
            {theme === 'light' ? 'OFF' : 'ON'}
          </span>
        </button>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          EcoConsumo · ODS 12
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
