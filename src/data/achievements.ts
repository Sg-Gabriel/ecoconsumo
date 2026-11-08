
import type { Achievement } from '../types/Achievement'

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: 'Primeiros passos',
    description: 'Conclua sua primeira dica sustentável.',
    icon: '🌱',
    condition: 'tips',
    target: 1,
  },
  {
    id: 'green-awareness',
    title: 'Consciência verde',
    description: 'Conclua 5 dicas sustentáveis.',
    icon: '🌿',
    condition: 'tips',
    target: 5,
  },
  {
    id: 'sustainable-agent',
    title: 'Agente sustentável',
    description: 'Conclua 10 dicas sustentáveis.',
    icon: '🌳',
    condition: 'tips',
    target: 10,
  },
  {
    id: 'planet-guardian',
    title: 'Guardião do planeta',
    description: 'Conclua todas as 15 dicas sustentáveis.',
    icon: '🏆',
    condition: 'tips',
    target: 15,
  },
  {
    id: 'challenge-started',
    title: 'Primeiro desafio',
    description: 'Inicie seu primeiro desafio sustentável.',
    icon: '⭐',
    condition: 'challenge-started',
  },
  {
    id: 'challenge-completed',
    title: 'Desafio concluído',
    description: 'Complete todas as tarefas de um desafio semanal.',
    icon: '🥇',
    condition: 'challenge-completed',
  },
]
