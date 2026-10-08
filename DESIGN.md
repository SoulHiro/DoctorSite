---
name: SOS Bom Humor Doutores Palhaços
description: Site institucional de ONG de palhaçaria hospitalar — coral e azul-água sobre neutros quebrados, Fraunces + Figtree, com uma palavra em Fraunces itálica
colors:
  primary: "#c1502b"
  primary-hover: "#d9663d"
  primary-active: "#973d1f"
  primary-subtle: "#f5e1d8"
  secondary: "#2f8f82"
  secondary-hover: "#3fa69a"
  secondary-active: "#226059"
  secondary-subtle: "#dceeec"
  neutral-bg: "#f0ece2"
  neutral-surface: "#faf8f3"
  neutral-border: "#dad6c9"
  neutral-ink: "#2b2a28"
  neutral-ink-muted: "#6b6a63"
  success: "#3f8f52"
  warning: "#d9a02b"
  info: "#2f8f82"
  error: "#b23a2e"
typography:
  display:
    fontFamily: "Fraunces, serif"
    fontSize: "3.815rem"
    fontWeight: 700
    lineHeight: 1.1
  h1:
    fontFamily: "Fraunces, serif"
    fontSize: "3.052rem"
    fontWeight: 700
    lineHeight: 1.15
  h2:
    fontFamily: "Fraunces, serif"
    fontSize: "2.441rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  stat:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "3.052rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  accent:
    fontFamily: "Fraunces, serif"
    fontStyle: "italic"
    fontVariationSettings: "'WONK' 1, 'SOFT' 100"
    fontSize: "inherit"
    fontWeight: 600
    lineHeight: "inherit"
rounded:
  sm: "0.225rem"
  md: "0.3rem"
  lg: "0.375rem"
  xl: "0.525rem"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  3xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-active}"
  button-secondary:
    backgroundColor: "{colors.secondary-active}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
  button-outline:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
---

# Design System: SOS Bom Humor Doutores Palhaços

Referência visual navegável (tokens, tipografia, componentes com preview e manual de marca): artifact **Jaleco**, https://claude.ai/artifact/PHzueh1uYWdMEguGrYNTA9. Este arquivo e o artifact devem dizer a mesma coisa; em caso de divergência, atualize os dois.

## 1. Overview

**Creative North Star: "O Jaleco"**

O jaleco colorido que a equipe veste em cada visita hospitalar é a metáfora central do sistema: uma peça séria (o símbolo médico) usada de um jeito lúdico (as cores, os remendos, o bordado torto). Nenhuma das duas metades vence a outra. Uma seção que parece só um folheto hospitalar sério falhou tanto quanto uma que parece confete de aniversário infantil.

O sistema é construído sobre neutros quebrados (nunca branco ou creme puro — isso lê como "template genérico de ONG"), com coral/terracota e azul-água carregando o peso emocional. A tipografia mistura uma serifada institucional (Fraunces) com uma sans geométrica-humanista (Figtree) e, só em uma palavra de destaque por página, a Fraunces itálica com as letras "tortas" do eixo WONK — o único lugar onde o "espírito de palhaço" aparece na tipografia, nunca em título inteiro, nunca em corpo de texto.

O sistema rejeita explicitamente: infantilização (paletas de parque de diversões, ilustrações cartunescas genéricas), fotografia stock, ambientes hospitalares clinicamente frios, e o vermelho puro de alerta médico (`#DC2626`) da identidade anterior — trocado deliberadamente por um coral mais quente que mantém o vínculo com o nariz de palhaço sem comunicar emergência.

**Key Characteristics:**
- Neutros quebrados como base, nunca branco/creme puro
- Um par de cores de marca (coral + azul-água), nunca mais de dois protagonistas
- Serifada + sans, e um itálico brincalhão da própria serifada usado com extrema moderação
- Flat by default; sombra só existe para dizer "isto flutua sobre o conteúdo" (overlay real)
- Raio de canto pequeno e consistente — nunca "card flutuante" arredondado demais

## 2. Colors

A paleta tem exatamente dois protagonistas cromáticos sobre uma base neutra quebrada; qualquer cor além dessas é semântica (erro, sucesso, aviso), nunca decorativa.

### Primary
- **Coral / Terracota** (`#c1502b`): CTAs, links ativos, assinatura visual da marca. É a cor que aparece quando o site pede uma ação (doar, se voluntariar).
  - Active (`#973d1f`): hover e pressionado dos CTAs, contorno de foco e texto coral sobre fundo claro. Subtle (`#f5e1d8` — backgrounds de destaque suave, badges).
  - Hover (`#d9663d`): só em elementos sem texto. Com texto branco dá 3,5:1 e falha no AA.
  - Texto coral sobre `background` usa Active; o coral base dá só 4,0:1.

### Secondary
- **Azul-água** (`#2f8f82`): superfície dominante em seções informativas (Quem Somos, Impacto), o contraponto sério que ancora o coral. Nunca compete com o coral pelo mesmo elemento — um ou outro, não os dois lado a lado com peso igual.
  - Active (`#226059`): todo azul-água que carrega texto — botão secundário, links, seções de marca, eyebrows (7,3:1 com branco). Hover (`#3fa69a`): costura das ilustrações, nunca fundo de texto. Subtle (`#dceeec`).
  - O azul-água base com texto branco dá 3,9:1: só para texto de 24px+ ou bold 19px+.

### Neutral
- **Background** (`#f0ece2`): fundo padrão de página — deliberadamente quebrado, não creme puro.
- **Surface** (`#faf8f3`): cards e blocos elevados sobre o background.
- **Border** (`#dad6c9`): bordas e divisores.
- **Ink** (`#2b2a28`): texto principal.
- **Ink Muted** (`#6b6a63`): texto secundário, metadados.

### Semantic
- **Success** (`#3f8f52`), **Warning** (`#d9a02b`), **Info** (`#2f8f82`, reaproveita o secondary), **Error** (`#b23a2e`).

### Named Rules
**The Two-Protagonist Rule.** Só coral e azul-água carregam peso de marca. Qualquer outra cor em tela é neutra ou semântica — nunca decorativa.

**The No-Alarm Rule.** Vermelho puro de emergência (`#DC2626` e vizinhos) está banido. O erro semântico (`#b23a2e`) fica deliberadamente afastado do coral de marca para nunca ser confundido com "cor de doação" ou "cor de CTA".

## 3. Typography

**Display Font:** Fraunces (serif), variável com os eixos `opsz`, `SOFT` e `WONK`; títulos com `SOFT` 50
**Body Font:** Figtree (system-ui, sans-serif)
**Accent:** Fraunces itálica, peso 600, `WONK` 1 e `SOFT` 100, cor `primary-active` — uma palavra por página

**Character:** Institucional-com-calor. Fraunces carrega peso e seriedade sem ser fria; Figtree, geométrica-humanista, garante legibilidade com mais calor que uma sans neutra; o itálico "torto" da Fraunces é o único lugar onde a "letra de palhaço" aparece, e só ali. Não existe terceira família.

### Hierarchy
- **Display** (700, 3.815rem/61px, line-height 1.1): Hero principal.
- **H1** (700, 3.052rem/49px, line-height 1.15): Título de página.
- **H2** (600, 2.441rem/39px, line-height 1.2): Seções principais.
- **H3** (600, 1.953rem/31px, line-height 1.25): Subseções.
- **H4** (600, 1.563rem/25px, line-height 1.3): Títulos de card.
- **H5** (600, 1.25rem/20px, line-height 1.35): Títulos menores.
- **Body Large** (400, 1.125rem/18px, line-height 1.6): página "Quem Somos".
- **Body** (400, 1rem/16px, line-height 1.6): padrão, máximo 60–75 caracteres por linha.
- **Body Small** (400, 0.875rem/14px, line-height 1.5): metadados, legendas.
- **Caption** (500, 0.75rem/12px, line-height 1.4, letter-spacing 0.08em, uppercase): labels, overline.
- **Stat** (Figtree 700, 3.052rem, line-height 1.1, letter-spacing -0.02em, `tabular-nums`): números de impacto. Nunca em Fraunces: os algarismos dela são de estilo antigo e o "+" fica fino.

No celular, títulos descem um ou dois degraus (`display` → `h2`; `h1`/`h2` → `h3`).

### Named Rules
**The One-Word Accent Rule.** O itálico de acento (`AccentWord`) nunca aplica a um título inteiro nem a um parágrafo — só a uma palavra-chave isolada dentro de um título (ex: no hero), uma vez por página. É o que carrega o "palhaço" sem infantilizar o resto da página.

## 4. Elevation

Flat by default. Cards e seções estáticas não recebem sombra — o sistema separa hierarquia por cor de superfície (`background` vs `surface`) e borda, não por profundidade simulada. Sombra é reservada exclusivamente para overlays reais que fisicamente flutuam sobre o conteúdo: dropdown, modal, popover.

### Shadow Vocabulary
- **sm** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.06), 0 1px 3px rgb(0 0 0 / 0.08)`): único nível de sombra do sistema, usado em overlays.

### Named Rules
**The Overlay-Only Rule.** Se o elemento não flutua fisicamente sobre outro conteúdo (não é dropdown, modal ou popover), ele não leva sombra. Um card com sombra decorativa é sempre um erro neste sistema.

## 5. Components

Botões, inputs e navegação seguem `border-radius: 0.375rem` (raio pequeno e consistente) e transições de 150–250ms com `cubic-bezier(0.16, 1, 0.3, 1)` — nunca bounce, nunca elastic.

### Buttons
- **Shape:** raio pequeno consistente (`rounded-lg`, 0.375rem).
- **Sizes:** padrão 44px (`h-11`, `px-6`, 14px peso 600, ícone 20px); `sm` 36px.
- **Primary:** fundo coral (`#c1502b`), texto branco, hover e pressionado `#973d1f`.
- **Secondary:** fundo azul-água escuro (`#226059`), texto branco, hover `foreground`.
- **Link:** texto `#226059` sublinhado.
- **Outline:** fundo neutro (`background`), borda `border`, hover para `muted`.
- **Ghost:** transparente, hover para `muted`.
- **Destructive:** fundo `destructive/10`, texto `destructive`, hover `destructive/20` — nunca sólido, para não competir visualmente com o coral de marca.
- **Focus:** contorno sólido de 2px em `primary-active` (`#973d1f`) com 2px de afastamento, definido globalmente em `:focus-visible` (globals.css). Nunca `outline: none` sem substituto.
- **Active:** desloca 1px pra baixo (`translate-y-px`), não escala.
- **Doação:** o CTA "Doe agora" é o Primary padrão com ícone `HandCoins` — sem pílula.

### Cards / Containers
- **Corner Style:** mesmo raio pequeno consistente dos botões.
- **Background:** `surface` (`#faf8f3`) sobre `background` (`#f0ece2`).
- **Shadow Strategy:** nenhuma — ver regra Overlay-Only na seção 4.
- **Border:** `1px solid border` (`#dad6c9`) quando precisar separar do fundo.

### Inputs / Fields
- **Style:** 40px de altura, borda `input`/`border`, fundo `background`, raio pequeno.
- **Focus:** o mesmo contorno sólido dos botões, nunca só troca de borda sutil.
- **Error:** borda + anel em `destructive`, sempre acompanhado de texto/ícone — cor nunca é o único portador de significado.

### Navigation
- Tipografia body (Figtree), estado ativo em `primary-active`, foco visível por teclado, ordem de tabulação lógica. Mobile: menu colapsado com toda a navegação acessível por teclado e leitor de tela.

## 6. Do's and Don'ts

### Do:
- **Do** usar coral (`#c1502b`) e azul-água (`#2f8f82`) como os únicos dois protagonistas cromáticos da marca.
- **Do** manter o background quebrado (`#f0ece2`), nunca branco ou creme puro.
- **Do** restringir o itálico de acento a uma palavra de destaque por página, nunca títulos inteiros ou parágrafos.
- **Do** usar texto branco só sobre `primary`, `primary-active` e `secondary-active`.
- **Do** usar o mesmo container (1280px, gutter 16px/32px) em header, seções e footer.
- **Do** reservar sombra exclusivamente para overlays reais (dropdown, modal, popover).
- **Do** atingir WCAG 2.1 AA em todo componente — contraste mínimo 4.5:1 texto normal, 3:1 texto grande — sem exceções.
- **Do** usar fotografia real da equipe em ação, nunca banco de imagens.

### Don't:
- **Don't** usar vermelho puro de alerta/emergência (`#DC2626` e vizinhos) — banido desde a decisão de trocar pela paleta coral/azul-água.
- **Don't** aplicar sombra decorativa em card ou seção estática — "card flutuante" é sempre um erro aqui.
- **Don't** infantilizar com paletas de parque de diversões ou ilustrações cartunescas genéricas — o "espírito de palhaço" vive só no acento tipográfico e no tom de voz, não na saturação de cor.
- **Don't** usar fotografia stock genérica, poses forçadas, ou imagens que exponham pacientes sem consentimento.
- **Don't** transmitir status só por cor — erro semântico sempre acompanhado de ícone + texto.
- **Don't** usar `outline: none` sem um substituto de foco visível.
