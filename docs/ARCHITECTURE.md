# Arquitetura

Regras de organização do código do site SOS Bom Humor. Vale para qualquer
pessoa ou agente que escreva código aqui. Design (cores, tipografia, tom)
fica em `DESIGN.md` e `PRODUCT.md`; este arquivo trata de estrutura, dados,
cache, auth e fluxo de trabalho.

Princípio geral: projeto de médio porte, uma pessoa desenvolvendo. Preferir a
solução mais simples que mantenha a regra; nada de abstração antes do segundo
uso.

## Decisões tomadas

| Tema | Decisão | Quando entra |
|---|---|---|
| Framework | Next.js 16 (App Router), React 19, Tailwind v4 | Já em uso |
| Conteúdo do MVP | Arquivos estáticos / JSON no repositório (`content/`) | MVP |
| Banco | PostgreSQL hospedado no Neon | Branch `feat/db` |
| Auth | Better Auth, cadastro público desativado | Depois das páginas públicas |
| Autorização | RBAC simples (papéis → permissões) | Junto com auth |
| CMS | Sanity, só quando houver blog/posts | Fase do Diário |
| Hospedagem | Vercel | — |

ORM ainda não escolhido. Recomendação: Drizzle (o Better Auth gera o schema
com `npx auth@latest generate --adapter drizzle --dialect postgresql`). Decidir
na branch `feat/db`.

## Estrutura de pastas

```
app/
  layout.tsx              # <html>, fontes, metadata global. Nada de UI de página.
  (site)/                 # páginas públicas
    layout.tsx            # skip link, TopBar, SiteHeader, SiteFooter, <main>
    _components/          # moldura do site (usada só pelo layout do grupo)
    (home)/
      page.tsx            # "/"
      _components/        # seções usadas só na Home
    <rota>/
      page.tsx
      _components/        # seções usadas só nessa rota
  (auth)/                 # login (futuro), layout mínimo
  (admin)/admin/          # painel (futuro), layout próprio
  api/                    # só webhooks e integrações externas

components/               # UI sem conhecimento de domínio
  ui/                     # primitivos shadcn (átomos)
  layout/                 # Container, Section
  shared/                 # moléculas: Eyebrow, SectionHeading, AccentWord, Stat,
                          #   Wordmark, DonateButton, SocialIcons, SplashScreen…
  motion/                 # Reveal e futuras primitivas de animação (client)
  media/                  # (futuro) SmartImage, VideoPlayer, LottiePlayer
  illustrations/          # mascotes SVG: 404, manutenção, loading

features/<domínio>/       # lógica de um domínio, compartilhada entre rotas
  schemas.ts              # Zod, usado no cliente e no servidor
  actions.ts              # "use server": fino, ver "Server Actions"
  data.ts                 # (com banco) import "server-only": leitura e escrita
  components/             # UI do domínio usada em 2+ lugares

server/                   # (futuro) infraestrutura só de servidor
  db/                     # cliente e schema
  auth/                   # config do Better Auth, session.ts, permissions.ts

lib/                      # utilitários puros (cn, env, action-result…)
content/                  # (futuro) JSON do MVP
docs/                     # documentação técnica
```

### Atomic design, sem pastas atômicas

| Nível | Onde mora |
|---|---|
| Átomos | `components/ui` |
| Moléculas | `components/shared`, `components/motion`, `components/media` |
| Organismos / seções | `_components/` da rota ou `features/<domínio>/components` |
| Templates | `layout.tsx` de cada grupo de rotas |
| Páginas | `page.tsx` |

### Onde colocar um componente novo

1. Usado por uma rota só → `_components/` dessa rota.
2. Passou a ser usado por uma segunda rota → promover:
   - carrega conceito de domínio (médico, doação, contato) → `features/<domínio>/components`;
   - não carrega → `components/shared` (ou `layout`, `motion`, `media`).
3. Usado só por um `layout.tsx` de grupo → `_components/` daquele grupo.

### Direção das dependências

`app → features → components → lib`. Uma camada nunca importa de uma camada
acima. O ESLint garante isso (`no-restricted-imports` em `eslint.config.mjs`):

- `components/` não importa de `app/`, `features/` nem `server/`; recebe dados por props.
- `features/` não importa de `app/`.
- `lib/` não importa de nenhuma outra pasta do projeto.

Imports dentro da mesma rota usam caminho relativo (`./_components/hero`);
todo o resto usa o alias `@/`.

### page.tsx é composição

Uma página busca dados, define metadata e empilha seções. Markup longo vai
para `_components/`.

## Layout, seções e sobreposições

- `Container` (`components/layout/container.tsx`): largura máxima e gutter.
- `Section` (`components/layout/section.tsx`): `<section>` com `tone`
  (fundo), `spacing` (ritmo vertical) e `Container` embutido. Usa `isolate`,
  então camadas decorativas passadas em `decoration` ficam atrás do conteúdo
  sem vazar z-index para outras seções.
- Toda seção nova usa `Section`, a menos que seja full-bleed (como o hero).
- Elementos decorativos (vetores, confetes, mascotes) são `aria-hidden` e
  `pointer-events-none`.

## Dados

- **Componente com `"use client"` nunca busca dados.** Recebe por props de um
  Server Component e altera dados chamando uma Server Action.
- Todo acesso a banco fica em `features/<domínio>/data.ts` ou `server/`, com
  `import "server-only"` (o build falha se for importado no cliente).
- `data.ts` devolve DTOs: só os campos que a UI precisa, nunca a linha inteira.
- Route handlers (`app/api`) só para webhooks e integrações externas.

### Server Actions

Uma Server Action é um endpoint público, mesmo sem botão apontando para ela.
Ordem fixa:

1. Autorizar (`requirePermission(...)`), quando a ação não for pública.
2. Validar a entrada com o schema Zod de `schemas.ts`.
3. Em caso de erro, devolver o resultado padronizado com `fieldErrors`.
4. Chamar `data.ts` para ler ou escrever.
5. Invalidar o cache (`updateTag`).
6. Devolver o mínimo que a UI precisa.

Todas as actions devolvem o mesmo formato
`{ status: "idle" | "success" | "error", message?, fieldErrors? }`. O tipo
compartilhado vai para `lib/action-result.ts` (hoje existe como
`ContactState` em `features/contact/actions.ts`).

## Renderização e cache

A meta é ativar `cacheComponents: true` (modelo de cache do Next 16): tudo é
estático por padrão, `"use cache"` marca o que é cacheado e `<Suspense>`
marca o que é dinâmico.

| Tipo de rota | Estratégia |
|---|---|
| Institucionais (Home, Quem Somos, Impacto, Lei Rouanet, legais) | Estático (SSG) |
| Conteúdo editável (médicos, galeria, depois diário e agenda) | `"use cache"` + `cacheTag`, invalidado por `updateTag` (admin) ou `revalidateTag(tag, "max")` (webhook) |
| `/admin/*` | Dinâmico (lê cookies), partes lentas em `<Suspense>` |
| Interatividade (formulários, carrossel, Lottie, menu) | Ilhas `"use client"` pequenas dentro de páginas estáticas |

- Não ler `searchParams` no servidor em páginas que devem ser estáticas (ex.:
  `/?src=cartao`). Ler numa ilha client com `useSearchParams` dentro de `<Suspense>`.

## Auth e RBAC

- Better Auth com Postgres (Neon). Cadastro público desativado; contas
  criadas pela CLI (`npx auth@latest create-admin`, requer o plugin Admin) ou
  por convite. Visitantes do site não têm conta.
- A config fica em `server/auth/auth.ts`. Como a CLI procura `auth.ts` só em
  `./`, `./lib` e `./utils`, passar `--config server/auth/auth.ts` nos comandos.
- Papéis: começa com um único papel `admin`. Previstos: responsável por blog e
  imagens, responsável pelo financeiro. Cada papel novo entra quando a página
  administrativa correspondente for construída.
- O mapa papel → permissões fica em um lugar só (`server/auth/permissions.ts`,
  ou o access control do plugin Admin do Better Auth). Código checa
  **permissões** (`"gallery:write"`), nunca nomes de papel.

Onde checar:

| Camada | Função | Protege dados? |
|---|---|---|
| `proxy.ts` | Sem cookie de sessão em `/admin/*` → redireciona para `/login`. Só lê cookie. | Não (UX) |
| `admin/layout.tsx` | `requireUser()`. Layouts não re-renderizam ao navegar. | Não sozinho |
| `page.tsx` do admin | `requirePermission("x:read")` | Sim |
| Toda Server Action | `requirePermission("x:write")` | **Sim, obrigatório** |

Esconder botões com `can()` na UI é conveniência, nunca substitui a checagem
na action. `getSession`/`requireUser` usam `cache()` do React para não repetir
a consulta no mesmo request.

## Estilos

- Tokens só em `app/globals.css` (`@theme`). Nenhum hex em componentes.
- Variantes com `cva`, composição de classes com `cn`.
- Espaçamento só pela escala do Tailwind; nada de valores arbitrários.
- Ilustrações SVG (`components/illustrations/`) usam CSS próprio com prefixo
  por ilustração (`.nf404`, `.ld`…), referenciando as variáveis de `:root`
  (`--primary`, `--secondary-active`, `--mascot-*`…). Nunca hex solto.

## Animação e mídia

Usar o nível mais baixo que resolve:

1. CSS (transitions, keyframes, `tw-animate-css`) com os tokens de movimento do Jaleco.
2. `Reveal` (IntersectionObserver) e primitivas em `components/motion/`.
3. Uma única lib para parallax, scroll vinculado e gestos: `motion`, em ilhas
   client, com `LazyMotion`. Não misturar com outra lib de animação.
4. Lottie (`@lottiefiles/dotlottie-react`, arquivos `.lottie`) só quando SVG +
   CSS não resolver. Carregar com `next/dynamic` e só ao entrar na viewport.

Todo componente de `motion/` e `media/` respeita `prefers-reduced-motion`
internamente; quem usa não precisa lembrar.

Mídia: `next/image` sempre com `sizes`; no Next 16 usar `preload` (não
`priority`) só na imagem principal acima da dobra. Vídeo institucional pelo
YouTube com facade (carrega o iframe no clique). Vídeo de fundo curto,
comprimido, `muted playsInline preload="none"` com `poster`.

## Páginas de estado

| Página | Arquivo | Observação |
|---|---|---|
| 404 | `app/not-found.tsx` | Fora do grupo `(site)`; atende também URLs inexistentes |
| Tela de abertura | `components/shared/splash-screen.tsx` | No layout `(site)`; mínimo de `MIN_VISIBLE_MS` |
| Loading de navegação | `app/(site)/loading.tsx` | Tela cheia, mesmo visual da abertura |
| Manutenção | `app/manutencao/page.tsx` | Sempre acessível em `/manutencao`, com `noindex` |

**Modo manutenção:** com `MAINTENANCE_MODE=true`, o `proxy.ts` reescreve
todas as páginas para `/manutencao`, mantendo a URL. Assets e arquivos com
extensão não passam pelo proxy. Na Vercel, mudar a variável exige um novo deploy.

## Fluxo de trabalho

- Uma branch, um escopo: `feat/<escopo>-<assunto>`, `fix/…`, `refactor/…`, `chore/…`, `docs/…`.
- Escopos: `home`, `doar`, `doctors`, `contact`, `auth`, `admin`, `ui`, `motion`, `media`, `infra`.
- Commits convencionais com escopo: `feat(doctors): …`.
- Se uma branch precisar de algo de outro escopo, abrir outra branch ou fazer
  um commit separado com o escopo certo.
- Conferir o preview da Vercel antes do merge.

### Roteiro

1. `refactor/structure`: pastas, route groups, Container/Section, regras de import. ✓
2. `feat/status-pages`, `feat/maintenance`. ✓
3. `feat/ui-foundation`: tokens, fontes, Button/inputs, primitivos e container do design system Jaleco.
4. `feat/site-chrome`: header sticky com menu mobile, TopBar, footer em 4 colunas.
5. `chore/cache-components`: `cacheComponents`, `lib/env.ts`, `lib/action-result.ts`.
6. `feat/motion-primitives`, `feat/media-primitives`.
7. `feat/home` (lorem ipsum e mocks; copy depois), `feat/doar`, `feat/doctors`.
8. Copywriting das páginas, demais páginas do MVP e lançamento.
9. `feat/db` → `feat/auth` → `feat/admin-<domínio>` (um por domínio).

## Pendências conhecidas

- Header (`feat/site-chrome`): no celular o menu não abre; o header fica
  `absolute` sobre o hero e precisa virar sticky; TopBar tem botões sem
  função (Login, PT) e um e-mail diferente do oficial; falta o Wordmark.
- Sombras proibidas pelo DESIGN.md ainda em `team.tsx`, nos chips e na caixa
  do formulário de contato e no card "Quer doar direto?" do footer.
- Card amarelo "Próximas visitas" (`trust-cards.tsx`) usa `warning` como cor
  decorativa e datas inventadas: sai em `feat/home`.
- `SiteFooter` inclui o formulário de contato. Quando existir `/contato`,
  separar footer institucional (4 colunas, conforme o sitemap) da seção de contato.
- `app/(site)/(home)/_components/impact.tsx` não é usado pela Home e repete os
  números do `TrustCards`. Decidir em `feat/home`.
- `hero.tsx` usa `priority`, descontinuado no Next 16; trocar por `preload`.
- Seções da Home ainda escrevem título, eyebrow e CTA com classes à mão: migrar
  para `SectionHeading`, `Eyebrow`, `Stat` e `Button` em `feat/home`.
