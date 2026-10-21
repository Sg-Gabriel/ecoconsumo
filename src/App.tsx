
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Records from './pages/Records'
import Tips from './pages/Tips'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Sidebar />

        <main className="p-5 sm:p-8 md:ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/registros" element={<Records />} />
            <Route path="/dicas" element={<Tips />} />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>

          <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
            EcoConsumo · Consumo consciente · futuro sustentável.
          </footer>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
