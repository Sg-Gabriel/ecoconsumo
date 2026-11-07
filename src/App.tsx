
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Records from './pages/Records'
import Tips from './pages/Tips'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('ecoconsumo-theme')

    return savedTheme === 'dark' ? 'dark' : 'light'
  })

  // Controla a abertura e o fechamento da sidebar
  useEffect(() => {
    if (!isSidebarOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSidebarOpen])

  // Aplica e salva o tema escolhido
  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark',
    )

    document.documentElement.style.colorScheme = theme

    localStorage.setItem('ecoconsumo-theme', theme)
  }, [theme])

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  // Alterna entre modo claro e escuro
  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light',
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Fundo escurecido no celular */}
        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
          />
        )}

        <main className="min-h-screen p-5 transition-colors duration-300 sm:p-8 md:ml-64">

          {/* Cabeçalho mobile */}
          <header className="mb-6 flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={isSidebarOpen}
              aria-controls="main-sidebar"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                EcoConsumo
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Consumo consciente
              </p>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/registros" element={<Records />} />
            <Route path="/dicas" element={<Tips />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            EcoConsumo · Consumo consciente, futuro sustentável.
          </footer>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
