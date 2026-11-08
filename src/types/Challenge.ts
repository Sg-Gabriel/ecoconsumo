export interface ChallengeTask {
  id: string
  title: string
  completed: boolean
}

export interface Challenge {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  tasks: ChallengeTask[]
}

// Modelo de desafio disponível para seleção
export interface ChallengeTemplate {
  id: string
  title: string
  description: string
  tasks: Omit<ChallengeTask, 'completed'>[]
}