# Estrutura do Portfólio

Site de página única (SPA) em **React 19 + Vite + TypeScript + Tailwind CSS 4**, publicado no **GitHub Pages** via GitHub Actions.

## Princípio: conteúdo separado da apresentação

Todo texto do portfólio fica em `src/data/`. Para adicionar um projeto, mudar uma experiência ou atualizar uma certificação, você edita **só um arquivo de dados**, sem mexer em componente.

```
portifolio/
├── .github/workflows/deploy.yml   # Build + deploy automático no GitHub Pages a cada push na main
├── public/
│   └── favicon.svg
├── index.html                     # Título e meta description (SEO)
├── vite.config.ts                 # `base` do GitHub Pages
├── package.json
└── src/
    ├── main.tsx                   # Ponto de entrada
    ├── App.tsx                    # Ordem das seções na página
    ├── index.css                  # Tailwind + tokens de tema (cor de destaque etc.)
    │
    ├── types/index.ts             # Contratos: Profile, Project, Experience, SkillGroup...
    │
    ├── data/                      # ← TODO O CONTEÚDO
    │   ├── profile.ts             # Nome, cargo, headline, sobre, números de destaque, redes
    │   ├── projects.ts            # Projetos (featured = destaque; status = produção/público/privado)
    │   ├── experience.ts          # Linha do tempo profissional
    │   ├── skills.ts              # Stack agrupada por categoria
    │   ├── education.ts           # Formação, certificações Alura e reconhecimentos
    │   └── navigation.ts          # Itens do menu (id = âncora da seção)
    │
    ├── hooks/
    │   └── useGithubRepos.ts      # Busca repositórios recentes na API pública do GitHub
    │
    ├── components/
    │   ├── layout/                # Estrutura da página
    │   │   ├── Header.tsx         # Menu fixo com âncoras
    │   │   ├── Footer.tsx
    │   │   └── Section.tsx        # Casca padrão de seção (id, título, subtítulo)
    │   └── ui/                    # Peças reutilizáveis
    │       ├── ButtonLink.tsx
    │       ├── Tag.tsx
    │       └── ProjectCard.tsx
    │
    └── sections/                  # Uma seção = um arquivo
        ├── Hero.tsx               # Foto, nome, headline, CTAs, 3 números de impacto
        ├── About.tsx
        ├── Projects.tsx           # Destaques + outros projetos + mais recentes do GitHub (automático)
        ├── Experience.tsx
        ├── Skills.tsx
        ├── Education.tsx          # Formação, reconhecimentos, certificações (com total de horas)
        └── Contact.tsx
```

## Mapa da página

| # | Seção | Fonte dos dados | Objetivo |
|---|---|---|---|
| 1 | **Hero** | `profile.ts` | Quem é você em 5 segundos + números de impacto (4+ anos, 50h+/mês, 14 usuários) |
| 2 | **Sobre** | `profile.ts` | Contexto: liderança em automação, ensino, entrega ponta a ponta |
| 3 | **Projetos** | `projects.ts` + API do GitHub | 6 destaques com problema → solução → stack; privados aparecem sem link; repositórios novos entram sozinhos |
| 4 | **Experiência** | `experience.ts` | Linha do tempo |
| 5 | **Habilidades** | `skills.ts` | Stack por categoria |
| 6 | **Formação** | `education.ts` | ADS, ETEC, 136h Alura, prêmios e artigos |
| 7 | **Contato** | `profile.ts` | E-mail, GitHub, LinkedIn |

### Projetos em destaque
1. **ContGest** — ERP em produção (14 usuários), nasceu do TCC
2. **Gerador de Memorando** — PDFs fiscais → memorando .docx, com Streamlit
3. **Portal de Solicitações** — Node/Express/Prisma/PostgreSQL, Docker e CI
4. **Baixar Vídeos** — app desktop Windows com instalador
5. **Site Domingos Assessoria** — site institucional em produção
6. **Busca de Optância** — consulta em lote no Simples/MEI

Outros: Programa de Indicação, MedControl, Extrator Domínio, OfficePro.

## Comandos

```bash
npm install      # instala dependências
npm run dev      # servidor local em http://localhost:5173
npm run build    # gera dist/ (o CI faz isso no deploy)
```

## Publicação no GitHub Pages

1. Crie o repositório **`Brunera17.github.io`** (fica em `https://brunera17.github.io`).
   - Se usar outro nome (ex.: `portfolio`), troque `base` em `vite.config.ts` para `'/portfolio/'`.
2. Faça push deste projeto na branch `main`.
3. No repositório: **Settings → Pages → Source: GitHub Actions**.
4. Adicione o link do site no seu README de perfil (`Brunera17/Brunera17`) e no campo *Website* do perfil.

## Próximas etapas

- [x] Design visual (paleta, tipografia, animações, menu mobile)
- [x] Tema claro/escuro (segue o sistema; botão no menu; lembra a escolha)
- [x] Meta tags Open Graph (prévia ao compartilhar no LinkedIn)
- [ ] Imagens/capturas dos projetos (`public/projects/<slug>.png`)
- [ ] Botão de download do currículo em PDF

## Design

- **Fontes:** Space Grotesk (títulos), Inter (texto), JetBrains Mono (detalhes técnicos)
- **Cor de destaque:** verde-esmeralda (`--accent` em `src/index.css`), ideia de "processo concluído ✓"
- **Tokens de tema:** `--bg`, `--surface`, `--border`, `--fg`, `--muted`, `--accent` em `src/index.css`, com versão clara e escura.
  Nos componentes use `bg-surface`, `text-muted`, `border-line`, `text-accent` etc., nunca cores fixas.
- **Animação:** qualquer elemento com a classe `reveal` aparece suavemente ao rolar (`hooks/useReveal.ts`); respeita "reduzir movimento".
