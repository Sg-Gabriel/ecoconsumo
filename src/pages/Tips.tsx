
function Tips() {
  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-medium text-emerald-700">
          PEQUENAS ATITUDES, GRANDES MUDANÇAS
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Dicas sustentáveis
        </h1>

        <p className="mt-2 text-slate-500">
          Descubra hábitos que ajudam a consumir água e energia de forma consciente.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-2xl">
            💧
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Economize água
          </h2>

          <p className="mt-2 leading-relaxed text-slate-600">
            Reduza o tempo do banho, feche a torneira ao escovar os dentes
            e verifique possíveis vazamentos.
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
            ⚡
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Economize energia
          </h2>

          <p className="mt-2 leading-relaxed text-slate-600">
            Apague as luzes em ambientes vazios e prefira lâmpadas LED
            e equipamentos eficientes.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-2xl bg-emerald-50 p-6">
        <p className="text-sm font-semibold text-emerald-800">
          Consumo responsável
        </p>

        <h2 className="mt-2 text-xl font-bold text-emerald-950">
          Cada escolha faz diferença
        </h2>

        <p className="mt-2 leading-relaxed text-emerald-900">
          O EcoConsumo incentiva hábitos mais conscientes, alinhados ao
          Objetivo de Desenvolvimento Sustentável 12 (ODS 12), que promove
          padrões de consumo e produção responsáveis.
        </p>
      </section>
    </div>
  )
}

export default Tips
