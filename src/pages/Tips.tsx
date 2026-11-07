
function Tips() {
  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          PEQUENAS ATITUDES, GRANDES MUDANÇAS
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Dicas sustentáveis
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Descubra hábitos que ajudam a consumir água e energia de forma consciente.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {/* Card de economia de água */}
        <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-sky-900/50 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-2xl dark:bg-sky-900/40">
            💧
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            Economize água
          </h2>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
            Reduza o tempo do banho, feche a torneira ao escovar os dentes
            e verifique possíveis vazamentos.
          </p>
        </article>

        {/* Card de economia de energia */}
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-emerald-900/50 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-900/40">
            ⚡
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            Economize energia
          </h2>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
            Apague as luzes em ambientes vazios e prefira lâmpadas LED
            e equipamentos eficientes.
          </p>
        </article>
      </section>

      {/* Destaque sobre consumo responsável */}
      <section className="mt-8 rounded-2xl bg-emerald-50 p-6 transition-colors duration-300 dark:bg-emerald-950/30">
        <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">
          Consumo responsável
        </p>

        <h2 className="mt-2 text-xl font-bold text-emerald-950 dark:text-emerald-200">
          Cada escolha faz diferença
        </h2>

        <p className="mt-2 leading-relaxed text-emerald-900 dark:text-emerald-100/80">
          O EcoConsumo incentiva hábitos mais conscientes, alinhados ao
          Objetivo de Desenvolvimento Sustentável 12 (ODS 12), que promove
          padrões de consumo e produção responsáveis.
        </p>
      </section>
    </div>
  )
}

export default Tips
