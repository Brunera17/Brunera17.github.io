import type { Award, Certification, Education } from '../types'

export const education: Education[] = [
  { course: 'Análise e Desenvolvimento de Sistemas', institution: 'Uneduvale', period: '2023 – 2025' },
  { course: 'Técnico em Manutenção e Suporte', institution: 'ETEC', period: '2021 – 2022' },
]

const alura = (id: string, degree = false) =>
  `https://cursos.alura.com.br/${degree ? 'degree/' : ''}certificate/${id}?lang=pt_BR`

export const certifications: Certification[] = [
  { group: 'Python & Back-end', title: 'Trilha: Começando com Flask', hours: 21, url: alura('b79ed3d1-9d15-4130-831d-07e6e30f6c04', true) },
  { group: 'Python & Back-end', title: 'Trilha: Python com Orientação a Objetos', hours: 25, url: alura('6839dedc-2089-453a-817f-e0ead46fd07d', true) },
  { group: 'Python & Back-end', title: 'Flask: avançando no desenvolvimento web', hours: 10, url: alura('3263773e-c7af-4600-9526-3798c2bdac68') },
  { group: 'Python & Back-end', title: 'Python: Orientação a Objetos e consumo de API', hours: 8, url: alura('022d6162-d92c-4b09-902f-e404b881e08e') },
  { group: 'Front-end', title: 'React: desenvolvendo com JavaScript', hours: 14, url: alura('8d647853-e78f-4515-8e5f-13639c50e168') },
  { group: 'Front-end', title: 'JavaScript para Web', hours: 10, url: alura('6171b861-6332-4f26-8fed-49a06c8e9645') },
  { group: 'Front-end', title: 'HTML e CSS: ambientes e estrutura de arquivos', hours: 8, url: alura('95d6d24c-3f2c-434f-b5de-5732e321ac77') },
  { group: 'Front-end', title: 'HTML e CSS: Classes, posicionamento e Flexbox', hours: 8, url: alura('6e683321-2d5b-4e52-992b-0f04ea6a3d56') },
  { group: 'DevOps & IA', title: 'Visão Computacional: OCR e OpenCV', hours: 10, url: alura('f6bfa730-5e41-45d6-b6bb-d0f2f6e1d78e') },
  { group: 'DevOps & IA', title: 'DevOps: Linux CLI', hours: 8, url: alura('b1671601-51c6-4491-b5aa-c7e8435f0450') },
  { group: 'DevOps & IA', title: 'DevOps: tráfego seguro em comunicações web', hours: 6, url: alura('6fb8bcb8-6fb9-416d-bdd6-5c62ae7440d7') },
  { group: 'DevOps & IA', title: 'Git e GitHub: colaborando em projetos', hours: 8, url: alura('4e9c9474-2499-497f-b1af-f18541ca7338') },
]

export const awards: Award[] = [
  { title: '2º lugar — Hackathon 2024', detail: 'Solução web full stack completa sob tempo real' },
  { title: '3º lugar — II Edutech 2025', detail: 'Inovação tecnológica em educação' },
  { title: '4 artigos aprovados — XVIII CONINCE', detail: 'Automação e integração de sistemas' },
]
