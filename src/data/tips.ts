
export type TipCategory =
  | 'agua'
  | 'energia'
  | 'consumo'
  | 'habitos'

export interface Tip {
  id: string
  category: TipCategory
  title: string
  description: string
  action: string
}

export const categories = [
  {
    id: 'agua',
    name: 'Economia de água',
    description: 'Aprenda a evitar o desperdício de água.',
    icon: '💧',
    color: 'sky',
  },
  {
    id: 'energia',
    name: 'Economia de energia',
    description: 'Descubra como utilizar energia com consciência.',
    icon: '⚡',
    color: 'emerald',
  },
  {
    id: 'consumo',
    name: 'Consumo consciente',
    description: 'Faça escolhas que reduzam o desperdício.',
    icon: '♻️',
    color: 'amber',
  },
  {
    id: 'habitos',
    name: 'Hábitos sustentáveis',
    description: 'Adote pequenas atitudes no cotidiano.',
    icon: '🌱',
    color: 'purple',
  },
] as const

export const tips: Tip[] = [
  // Economia de água
  {
    id: 'agua-1',
    category: 'agua',
    title: 'Reduza o tempo do banho',
    description:
      'Banhos mais curtos ajudam a diminuir o consumo de água e energia elétrica.',
    action: 'Tente reduzir alguns minutos do seu próximo banho.',
  },
  {
    id: 'agua-2',
    category: 'agua',
    title: 'Feche a torneira',
    description:
      'Evite deixar a torneira aberta enquanto escova os dentes ou ensaboa a louça.',
    action: 'Feche a torneira sempre que não estiver utilizando a água.',
  },
  {
    id: 'agua-3',
    category: 'agua',
    title: 'Verifique vazamentos',
    description:
      'Pequenos vazamentos podem causar desperdício significativo ao longo do tempo.',
    action: 'Verifique torneiras, descargas e encanamentos da sua residência.',
  },
  {
    id: 'agua-4',
    category: 'agua',
    title: 'Reaproveite a água',
    description:
      'Quando possível, reaproveite água de atividades domésticas para limpeza ou rega de plantas.',
    action: 'Identifique uma oportunidade segura de reaproveitamento.',
  },

  // Economia de energia
  {
    id: 'energia-1',
    category: 'energia',
    title: 'Apague as luzes',
    description:
      'Evite manter lâmpadas acesas em ambientes que não estão sendo utilizados.',
    action: 'Apague as luzes ao sair de um cômodo.',
  },
  {
    id: 'energia-2',
    category: 'energia',
    title: 'Utilize lâmpadas LED',
    description:
      'Lâmpadas LED geralmente consomem menos energia e possuem maior vida útil.',
    action: 'Verifique se é possível substituir alguma lâmpada da sua residência.',
  },
  {
    id: 'energia-3',
    category: 'energia',
    title: 'Evite o modo stand-by',
    description:
      'Alguns aparelhos continuam consumindo energia mesmo quando estão em modo de espera.',
    action: 'Desligue da tomada aparelhos que não precisam permanecer conectados.',
  },
  {
    id: 'energia-4',
    category: 'energia',
    title: 'Use o chuveiro conscientemente',
    description:
      'O chuveiro elétrico pode representar uma parcela importante do consumo de energia.',
    action: 'Reduza o tempo de banho e utilize a temperatura adequada.',
  },

  // Consumo consciente
  {
    id: 'consumo-1',
    category: 'consumo',
    title: 'Evite compras desnecessárias',
    description:
      'Antes de comprar algo, avalie se você realmente precisa daquele produto.',
    action: 'Reflita antes da próxima compra.',
  },
  {
    id: 'consumo-2',
    category: 'consumo',
    title: 'Separe os resíduos',
    description:
      'A separação correta dos resíduos facilita a reciclagem e o descarte adequado.',
    action: 'Separe os materiais recicláveis do lixo comum.',
  },
  {
    id: 'consumo-3',
    category: 'consumo',
    title: 'Reduza o desperdício de alimentos',
    description:
      'Planejar refeições e armazenar corretamente os alimentos ajuda a evitar desperdícios.',
    action: 'Planeje suas refeições antes de fazer compras.',
  },
  {
  id: 'consumo-4',
  category: 'consumo',
  title: 'Prefira produtos reutilizáveis',
  description:
    'Escolher produtos reutilizáveis ajuda a reduzir o descarte de materiais e a quantidade de resíduos gerados no dia a dia.',
  action:
    'Substitua itens descartáveis, como copos e sacolas plásticas, por alternativas reutilizáveis.'
},

  // Hábitos sustentáveis
  {
    id: 'habitos-1',
    category: 'habitos',
    title: 'Utilize sacolas reutilizáveis',
    description:
      'Sacolas reutilizáveis ajudam a diminuir o consumo de sacolas descartáveis.',
    action: 'Leve sua própria sacola nas próximas compras.',
  },
  {
    id: 'habitos-2',
    category: 'habitos',
    title: 'Prefira produtos duráveis',
    description:
      'Produtos reutilizáveis e duráveis podem reduzir a geração de resíduos.',
    action: 'Considere alternativas reutilizáveis no seu cotidiano.',
  },
  {
    id: 'habitos-3',
    category: 'habitos',
    title: 'Incentive outras pessoas',
    description:
      'Compartilhar práticas sustentáveis ajuda a conscientizar familiares e amigos.',
    action: 'Compartilhe uma dica sustentável com alguém.',
  },
  
]
