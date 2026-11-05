import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Bruno David Martins',
  role: 'Desenvolvedor full stack',
  currentJob: 'Líder de Automação na Domingos Contabilidade',
  // Frase principal do topo do site.
  headline: 'Transformo planilhas e processos manuais em sistemas que a equipe usa todo dia.',
  intro:
    'Sou desenvolvedor full stack e cuido da automação de um escritório de contabilidade. Escrevo em Python, React e TypeScript, e também dou aula de programação.',
  about: [
    'Comecei como técnico de suporte, me formei em Análise e Desenvolvimento de Sistemas na Uneduvale e trabalho com desenvolvimento há mais de 4 anos.',
    'Na Domingos Contabilidade eu lidero a automação. As rotinas que escrevi já tiram mais de 50 horas de trabalho manual por mês da equipe. Também dou aula de Programação e IA em duas escolas.',
    'Gosto de pegar o projeto inteiro: modelar o banco, escrever a API em Python, fazer a tela em React e colocar no ar.',
  ],
  avatarUrl: 'https://github.com/Brunera17.png',
  email: 'dbrunobruno369@gmail.com',
  githubUser: 'Brunera17',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Brunera17' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bruno-david-martins-906781222' },
  ],
  highlights: [
    { value: '4+', label: 'anos de experiência' },
    { value: '50h+', label: 'de trabalho manual eliminadas por mês' },
    { value: '14', label: 'usuários no ERP em produção' },
  ],
}
