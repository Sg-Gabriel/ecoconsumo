
import { useEffect, useState } from 'react'

import {
  categories,
  tips,
} from '../data/tips'

import type { TipCategory } from '../data/tips'
import type { Challenge } from '../types/Challenge'
import type { Achievement } from '../types/Achievement'

import { achievements } from '../data/achievements'

import {
  completeTip,
  getCompletedTips,
  uncompleteTip,
} from '../services/tipService'

import {
  getAvailableChallenges,
  getChallenge,
  startChallenge,
  toggleChallengeTask,
  getChallengeProgress,
  isChallengeExpired,
} from '../services/challengeService'

import {
  checkAchievements,
  getUnlockedAchievements,
} from '../services/achievementService'

function Tips() {
  const [selectedCategory, setSelectedCategory] = useState<
    TipCategory | 'todos'
  >('todos')

  const [completedIds, setCompletedIds] = useState<string[]>(
    () => getCompletedTips().map((progress) => progress.tipId),
  )

  const [challenge, setChallenge] = useState<Challenge | null>(
    () => getChallenge(),
  )

  const [unlockedIds, setUnlockedIds] = useState<string[]>(
    () => getUnlockedAchievements(),
  )

  const [achievementNotifications, setAchievementNotifications] =
    useState<Achievement[]>([])

  // Controla a exibição das tarefas e da seleção de desafios.
  const [showChallengeTasks, setShowChallengeTasks] = useState(() => {
    if (!challenge) return false

    const completed =
      challenge.tasks.length > 0 &&
      challenge.tasks.every((task) => task.completed)

    return !completed && !isChallengeExpired(challenge)
  })

  const [showChallengeSelector, setShowChallengeSelector] = useState(
    () => challenge === null,
  )

  const availableChallenges = getAvailableChallenges()

  // Exibe as notificações uma por vez.
  useEffect(() => {
    if (achievementNotifications.length === 0) return

    const timer = setTimeout(() => {
      setAchievementNotifications((previous) =>
        previous.slice(1),
      )
    }, 4000)

    return () => clearTimeout(timer)
  }, [achievementNotifications])

  // Verifica se o desafio foi concluído.
  const challengeCompleted =
    challenge !== null &&
    challenge.tasks.length > 0 &&
    challenge.tasks.every((task) => task.completed)

  // Verifica se o prazo do desafio terminou.
  const challengeExpired =
    challenge !== null && isChallengeExpired(challenge)

  // Identifica e adiciona novas conquistas à fila de notificações.
  function notifyNewAchievements(unlocked: string[]) {
    const newAchievements = unlocked
      .filter((id) => !unlockedIds.includes(id))
      .map((id) =>
        achievements.find((item) => item.id === id),
      )
      .filter(
        (item): item is Achievement => item !== undefined,
      )

    if (newAchievements.length > 0) {
      setAchievementNotifications((previous) => [
        ...previous,
        ...newAchievements,
      ])
    }

    setUnlockedIds(unlocked)
  }

  // Fecha a notificação atual.
  function handleCloseNotification() {
    setAchievementNotifications((previous) =>
      previous.slice(1),
    )
  }

  // Marca ou desmarca uma dica.
  function handleToggleTip(tipId: string) {
    const isCompleted = completedIds.includes(tipId)

    let updatedIds: string[]

    if (isCompleted) {
      uncompleteTip(tipId)

      updatedIds = completedIds.filter(
        (id) => id !== tipId,
      )
    } else {
      completeTip(tipId)

      updatedIds = [...completedIds, tipId]
    }

    setCompletedIds(updatedIds)

    const unlocked = checkAchievements(
      updatedIds.length,
      challenge !== null,
      challengeCompleted,
    )

    notifyNewAchievements(unlocked)
  }

  // Inicia o desafio escolhido.
  function handleStartChallenge(challengeId: string) {
    const newChallenge = startChallenge(challengeId)

    setChallenge(newChallenge)

    setShowChallengeSelector(false)
    setShowChallengeTasks(true)

    const unlocked = checkAchievements(
      completedIds.length,
      true,
      false,
    )

    notifyNewAchievements(unlocked)
  }

  // Atualiza uma tarefa do desafio.
  function handleToggleChallengeTask(taskId: string) {
    const updatedChallenge = toggleChallengeTask(taskId)

    if (!updatedChallenge) return

    setChallenge(updatedChallenge)

    const completed =
      updatedChallenge.tasks.length > 0 &&
      updatedChallenge.tasks.every((task) => task.completed)

    if (completed) {
      setShowChallengeTasks(false)
    }

    const unlocked = checkAchievements(
      completedIds.length,
      true,
      completed,
    )

    notifyNewAchievements(unlocked)
  }

  // Filtra as dicas pela categoria selecionada.
  const filteredTips =
    selectedCategory === 'todos'
      ? tips
      : tips.filter(
          (tip) => tip.category === selectedCategory,
        )

  // Progresso geral das dicas.
  const totalTips = tips.length
  const completedCount = completedIds.length

  const progressPercentage =
    totalTips > 0
      ? Math.round((completedCount / totalTips) * 100)
      : 0

  // Progresso do desafio.
  const challengeProgress = challenge
    ? getChallengeProgress(challenge)
    : 0

  // Formata datas para exibição.
  function formatDisplayDate(dateString: string) {
    const [year, month, day] = dateString.split('-')

    return `${day}/${month}/${year}`
  }

  return (
    <div className="w-full min-w-0">
      {/* Notificação de conquista */}
      {achievementNotifications.length > 0 && (
        <div
          className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm"
          role="status"
          aria-live="polite"
        >
          <div
            key={achievementNotifications[0].id}
            className="animate-[achievement-enter_400ms_ease-out] rounded-2xl border border-emerald-200 bg-white p-5 shadow-2xl dark:border-emerald-800 dark:bg-slate-900"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-3xl dark:bg-emerald-900/40">
                {achievementNotifications[0].icon}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  Conquista desbloqueada!
                </p>

                <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
                  {achievementNotifications[0].title}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {achievementNotifications[0].description}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseNotification}
                aria-label="Fechar notificação"
                className="shrink-0 text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950">
              <div className="h-full w-full origin-left animate-[notification-progress_4s_linear_forwards] rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      )}

      {/* Cabeçalho */}
      <header className="mb-6 sm:mb-8">
        <p className="text-xs font-medium tracking-wide text-emerald-700 dark:text-emerald-400 sm:text-sm">
          PEQUENAS ATITUDES, GRANDES MUDANÇAS
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Dicas sustentáveis
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
          Descubra novos hábitos, coloque as dicas em prática e
          acompanhe sua evolução em direção a um consumo mais consciente.
        </p>
      </header>

      {/* Desafio sustentável */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm transition-colors duration-300 dark:border-emerald-900/50 dark:bg-slate-900">
        {/* Cabeçalho do desafio */}
        <div className="bg-emerald-50 p-5 dark:bg-emerald-950/30 sm:p-6">
          <p className="text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-400">
            DESAFIO SUSTENTÁVEL
          </p>

          <h2 className="mt-2 text-xl font-bold text-emerald-950 dark:text-emerald-200 sm:text-2xl">
            {challenge?.title ?? 'Escolha seu próximo desafio'}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-emerald-900 dark:text-emerald-100/80">
            {challenge?.description ??
              'Escolha um desafio de sete dias e adote pequenas atitudes para cuidar do meio ambiente.'}
          </p>
        </div>

        <div className="p-5 sm:p-6">
          {/* Seleção dos desafios */}
          {(!challenge || showChallengeSelector) && (
            <div>
              <div className="mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {challenge
                    ? 'Escolha outro desafio'
                    : 'Qual desafio você deseja realizar?'}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Todos os desafios possuem duração de sete dias e cinco atividades.
                </p>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableChallenges.map((item) => {
                  const challengeIcons: Record<string, string> = {
                    'consumo-consciente-1': '🌱',
                    'energia-inteligente-1': '💡',
                    'guardioes-da-agua-1': '💧',
                  }

                  return (
                    <article
                      key={item.id}
                      className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-800"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl dark:bg-emerald-950/40">
                        {challengeIcons[item.id] ?? '🌿'}
                      </div>

                      <h4 className="mt-4 font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>

                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>

                      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span>📅 7 dias</span>
                        <span>✓ {item.tasks.length} atividades</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleStartChallenge(item.id)}
                        className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Começar desafio
                      </button>
                    </article>
                  )
                })}
              </div>

              {challenge && (
                <button
                  type="button"
                  onClick={() => setShowChallengeSelector(false)}
                  className="mt-4 text-sm font-semibold text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                >
                  Voltar ao desafio atual
                </button>
              )}
            </div>
          )}

          {/* Desafio ativo */}
          {challenge && !showChallengeSelector && (
            <>
              {/* Período e status */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Período do desafio
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {formatDisplayDate(challenge.startDate)}
                    {' até '}
                    {formatDisplayDate(challenge.endDate)}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    challengeCompleted
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : challengeExpired
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                        : 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                  }`}
                >
                  {challengeCompleted
                    ? 'Concluído'
                    : challengeExpired
                      ? 'Prazo encerrado'
                      : 'Em andamento'}
                </span>
              </div>

              {/* Progresso */}
              <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Seu progresso
                  </p>

                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    {challenge.tasks.filter(
                      (task) => task.completed,
                    ).length}
                    {' de '}
                    {challenge.tasks.length} tarefas
                  </p>
                </div>

                <div
                  className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                  role="progressbar"
                  aria-label="Progresso do desafio semanal"
                  aria-valuenow={challengeProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${challengeProgress}%` }}
                  />
                </div>

                <p className="mt-2 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                  {challengeProgress}% concluído
                </p>
              </div>

              {/* Mensagens de status */}
              {challengeCompleted && (
                <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
                  🎉 Parabéns! Você concluiu todas as tarefas deste desafio.
                </p>
              )}

              {challengeExpired && !challengeCompleted && (
                <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                  O prazo deste desafio terminou. Você pode escolher outro desafio para continuar sua jornada sustentável.
                </p>
              )}

              {/* Botão para expandir ou recolher tarefas */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() =>
                    setShowChallengeTasks((previous) => !previous)
                  }
                  aria-expanded={showChallengeTasks}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <span>
                    <span className="block font-semibold text-slate-800 dark:text-slate-200">
                      {challengeCompleted || challengeExpired
                        ? 'Tarefas do desafio'
                        : 'Suas atividades'}
                    </span>

                    <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                      {showChallengeTasks
                        ? 'Clique para recolher as atividades'
                        : 'Clique para visualizar as atividades'}
                    </span>
                  </span>

                  <span
                    className={`text-lg text-slate-500 transition-transform duration-300 dark:text-slate-400 ${
                      showChallengeTasks ? 'rotate-180' : ''
                    }`}
                  >
                    ⌄
                  </span>
                </button>

                {/* Lista de tarefas */}
                {showChallengeTasks && (
                  <div className="mt-4 space-y-3">
                    {challenge.tasks.map((task) => (
                      <label
                        key={task.id}
                        className={`flex items-start gap-3 rounded-xl border p-4 transition ${
                          task.completed
                            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20'
                            : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
                        } ${
                          challengeExpired || challengeCompleted
                            ? 'cursor-default'
                            : 'cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          disabled={
                            challengeExpired || challengeCompleted
                          }
                          onChange={() =>
                            handleToggleChallengeTask(task.id)
                          }
                          className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                        />

                        <span
                          className={`text-sm leading-relaxed ${
                            task.completed
                              ? 'text-emerald-800 line-through dark:text-emerald-300'
                              : 'text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          {task.title}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Escolher outro desafio */}
              {(challengeCompleted || challengeExpired) && (
                <button
                  type="button"
                  onClick={() => setShowChallengeSelector(true)}
                  className="mt-5 w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
                >
                  Escolher outro desafio
                </button>
              )}
            </>
          )}
        </div>
      </section>

      {/* Categorias */}
      <section className="mb-6">
        <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
          Explore as categorias
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-3">
          <button
            type="button"
            onClick={() => setSelectedCategory('todos')}
            aria-pressed={selectedCategory === 'todos'}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              selectedCategory === 'todos'
                ? 'bg-emerald-600 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            Todas
          </button>

          {categories.map((category) => {
            const isSelected =
              selectedCategory === category.id

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setSelectedCategory(category.id)
                }
                aria-pressed={isSelected}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  isSelected
                    ? 'bg-emerald-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            )
          })}
        </div>
      </section>

      {/* Lista de dicas */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Dicas para colocar em prática
          </h2>

          <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
            {filteredTips.length} dicas
          </span>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
          {filteredTips.map((tip) => {
            const isCompleted = completedIds.includes(tip.id)

            const category = categories.find(
              (item) => item.id === tip.category,
            )

            return (
              <article
                key={tip.id}
                className={`flex min-w-0 flex-col rounded-2xl border bg-white p-5 shadow-sm transition-colors duration-300 dark:bg-slate-900 sm:p-6 ${
                  isCompleted
                    ? 'border-emerald-300 dark:border-emerald-800'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-xl">
                      {category?.icon}
                    </span>

                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {category?.name}
                    </span>
                  </div>

                  {isCompleted && (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      Concluída
                    </span>
                  )}
                </div>

                <h3 className="mt-4 break-words text-lg font-bold text-slate-900 dark:text-white">
                  {tip.title}
                </h3>

                <p className="mt-2 break-words text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {tip.description}
                </p>

                <div className="mt-4 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Coloque em prática
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {tip.action}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleTip(tip.id)}
                  className={`mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isCompleted
                      ? 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {isCompleted
                    ? 'Desmarcar como concluída'
                    : 'Marcar como concluída'}
                </button>
              </article>
            )
          })}
        </div>
      </section>

      {/* Progresso geral */}
      <section className="mb-6 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-emerald-900/50 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Seu progresso sustentável
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Continue praticando pequenas atitudes no seu dia a dia.
            </p>
          </div>

          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            {completedCount} de {totalTips} dicas
          </p>
        </div>

        <div
          className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
          role="progressbar"
          aria-label="Progresso das dicas sustentáveis"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="mt-2 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
          {progressPercentage}% concluído
        </p>
      </section>

      {/* Conquistas */}
      <section className="mt-8 mb-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
              SUAS CONQUISTAS
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              Continue evoluindo! 🏆
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Cada atitude sustentável é uma conquista.
            </p>
          </div>

          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            {unlockedIds.length} de {achievements.length} desbloqueadas
          </span>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const isUnlocked = unlockedIds.includes(
              achievement.id,
            )

            let currentProgress = 0

            if (achievement.condition === 'tips') {
              currentProgress = Math.min(
                completedCount,
                achievement.target ?? 0,
              )
            } else if (
              achievement.condition === 'challenge-started'
            ) {
              currentProgress = challenge ? 1 : 0
            } else if (
              achievement.condition === 'challenge-completed'
            ) {
              currentProgress = challengeCompleted ? 1 : 0
            }

            const target = achievement.target ?? 1

            return (
              <article
                key={achievement.id}
                className={`flex min-w-0 flex-col rounded-2xl border p-5 transition-colors duration-300 ${
                  isUnlocked
                    ? 'border-emerald-200 bg-white shadow-sm dark:border-emerald-900/50 dark:bg-slate-900'
                    : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
                      isUnlocked
                        ? 'bg-emerald-100 dark:bg-emerald-900/40'
                        : 'bg-slate-200 grayscale dark:bg-slate-800'
                    }`}
                  >
                    {achievement.icon}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isUnlocked
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {isUnlocked ? 'Desbloqueada' : 'Bloqueada'}
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                  {achievement.title}
                </h3>

                <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {achievement.description}
                </p>

                {!isUnlocked && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Progresso</span>

                      <span>
                        {currentProgress} / {target}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{
                          width: `${Math.round(
                            (currentProgress / target) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* Destaque ODS 12 */}
      <section className="mt-8 rounded-2xl bg-emerald-50 p-5 transition-colors duration-300 dark:bg-emerald-950/30 sm:p-6">
        <p className="text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-400 sm:text-sm">
          CONSUMO RESPONSÁVEL
        </p>

        <h2 className="mt-2 text-lg font-bold text-emerald-950 dark:text-emerald-200 sm:text-xl">
          Cada escolha faz diferença
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-emerald-900 dark:text-emerald-100/80 sm:text-base">
          O EcoConsumo incentiva hábitos mais conscientes, alinhados ao
          Objetivo de Desenvolvimento Sustentável 12 (ODS 12), que promove
          padrões de consumo e produção responsáveis.
        </p>
      </section>
    </div>
  )
}

export default Tips
