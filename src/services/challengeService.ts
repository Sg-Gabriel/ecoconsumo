import type {
  Challenge,
  ChallengeTemplate,
} from '../types/Challenge'

const STORAGE_KEY = 'ecoconsumo-active-challenge'

// Catálogo de desafios disponíveis
const challengeTemplates: ChallengeTemplate[] = [
  {
    id: 'consumo-consciente-1',
    title: 'Semana do consumo consciente',
    description:
      'Durante sete dias, adote pequenas atitudes para reduzir o desperdício de água, energia e recursos.',
    tasks: [
      {
        id: 'task-1',
        title: 'Reduzir o tempo do banho',
      },
      {
        id: 'task-2',
        title: 'Apagar luzes em ambientes vazios',
      },
      {
        id: 'task-3',
        title: 'Evitar desperdício de alimentos',
      },
      {
        id: 'task-4',
        title: 'Separar materiais recicláveis',
      },
      {
        id: 'task-5',
        title: 'Evitar compras desnecessárias',
      },
    ],
  },
  {
    id: 'energia-inteligente-1',
    title: 'Energia inteligente',
    description:
      'Durante sete dias, pratique atitudes que ajudam a economizar energia elétrica e evitar desperdícios.',
    tasks: [
      {
        id: 'task-1',
        title: 'Desligar aparelhos que não estão sendo utilizados',
      },
      {
        id: 'task-2',
        title: 'Aproveitar a iluminação natural',
      },
      {
        id: 'task-3',
        title: 'Retirar carregadores da tomada quando não estiverem em uso',
      },
      {
        id: 'task-4',
        title: 'Utilizar o ar-condicionado de forma consciente',
      },
      {
        id: 'task-5',
        title: 'Reduzir o tempo de uso de aparelhos elétricos',
      },
    ],
  },
  {
    id: 'guardioes-da-agua-1',
    title: 'Guardiões da água',
    description:
      'Durante sete dias, adote hábitos para economizar água e evitar desperdícios nas atividades diárias.',
    tasks: [
      {
        id: 'task-1',
        title: 'Fechar a torneira ao escovar os dentes',
      },
      {
        id: 'task-2',
        title: 'Reduzir o tempo do banho',
      },
      {
        id: 'task-3',
        title: 'Reutilizar água sempre que possível',
      },
      {
        id: 'task-4',
        title: 'Verificar possíveis vazamentos',
      },
      {
        id: 'task-5',
        title: 'Utilizar a máquina de lavar com carga adequada',
      },
    ],
  },
]

// Retorna os desafios disponíveis
export function getAvailableChallenges(): ChallengeTemplate[] {
  return challengeTemplates
}

// Calcula a data final do desafio
function calculateEndDate(startDate: string): string {
  const date = new Date(`${startDate}T12:00:00`)
  date.setDate(date.getDate() + 6)

  return formatDate(date)
}

// Formata uma data como YYYY-MM-DD
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// Inicia um desafio selecionado
export function startChallenge(
  challengeId: string = challengeTemplates[0].id
): Challenge {
  const selectedTemplate = challengeTemplates.find(
    (template) => template.id === challengeId
  )

  if (!selectedTemplate) {
    throw new Error('Desafio não encontrado.')
  }

  const today = formatDate(new Date())

  const challenge: Challenge = {
    id: selectedTemplate.id,
    title: selectedTemplate.title,
    description: selectedTemplate.description,
    startDate: today,
    endDate: calculateEndDate(today),
    tasks: selectedTemplate.tasks.map((task) => ({
      ...task,
      completed: false,
    })),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(challenge))

  return challenge
}

// Recupera o desafio salvo
export function getChallenge(): Challenge | null {
  const storedChallenge = localStorage.getItem(STORAGE_KEY)

  if (!storedChallenge) {
    return null
  }

  try {
    const challenge: unknown = JSON.parse(storedChallenge)

    if (
      typeof challenge !== 'object' ||
      challenge === null ||
      !('id' in challenge) ||
      typeof challenge.id !== 'string' ||
      !('title' in challenge) ||
      typeof challenge.title !== 'string' ||
      !('description' in challenge) ||
      typeof challenge.description !== 'string' ||
      !('startDate' in challenge) ||
      typeof challenge.startDate !== 'string' ||
      !('endDate' in challenge) ||
      typeof challenge.endDate !== 'string' ||
      !('tasks' in challenge) ||
      !Array.isArray(challenge.tasks)
    ) {
      return null
    }

    const validTasks = challenge.tasks.every(
      (task) =>
        typeof task === 'object' &&
        task !== null &&
        'id' in task &&
        typeof task.id === 'string' &&
        'title' in task &&
        typeof task.title === 'string' &&
        'completed' in task &&
        typeof task.completed === 'boolean'
    )

    if (!validTasks) {
      return null
    }

    return challenge as Challenge
  } catch {
    return null
  }
}

// Atualiza o estado de uma tarefa
export function toggleChallengeTask(
  taskId: string
): Challenge | null {
  const challenge = getChallenge()

  if (!challenge) {
    return null
  }

  // Não permite alterar tarefas de desafios encerrados
  if (
    isChallengeExpired(challenge) ||
    challenge.tasks.every((task) => task.completed)
  ) {
    return challenge
  }

  const updatedChallenge: Challenge = {
    ...challenge,
    tasks: challenge.tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ),
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedChallenge)
  )

  return updatedChallenge
}

// Calcula a porcentagem de conclusão
export function getChallengeProgress(
  challenge: Challenge
): number {
  const completedTasks = challenge.tasks.filter(
    (task) => task.completed
  ).length

  if (challenge.tasks.length === 0) {
    return 0
  }

  return Math.round(
    (completedTasks / challenge.tasks.length) * 100
  )
}

// Verifica se o prazo do desafio terminou
export function isChallengeExpired(
  challenge: Challenge
): boolean {
  const today = formatDate(new Date())

  return today > challenge.endDate
}