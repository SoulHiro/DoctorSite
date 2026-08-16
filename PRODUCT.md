# Product

## Register

brand

## Users

- **Doadores em potencial** — pessoas ou empresas (ex: Sicredi Ibirubá, Supermercado Casa do Chimarrão) avaliando se a ONG é confiável e se o dinheiro/apoio será bem usado. Chegam com ceticismo saudável, precisam de prova de impacto real, não de promessas vagas.
- **Voluntários em potencial** — pessoas de Ibirubá, Tapera e região interessadas em virar "doutor(a) palhaço(a)". Querem entender o que o trabalho realmente é antes de se comprometer.
- **Comunidade e famílias atendidas** — pacientes, acompanhantes e equipes de hospitais/postos de saúde que já conhecem o trabalho presencialmente e usam o site para reencontrar fotos, agenda de visitas ou contato.
- **Parceiros institucionais** — hospitais, prefeitura, imprensa local — avaliando a ONG para parcerias ou cobertura.

Contexto de uso: majoritariamente mobile, muitas vezes em conexão fraca de cidade do interior do RS; picos de tráfego ligados a campanhas de doação sazonais ou matérias na imprensa local.

## Product Purpose

Migrar o site institucional da SOS Bom Humor Doutores Palhaços de WordPress para uma aplicação moderna (Next.js) que comunique o impacto real da ONG, gere confiança para conversão de doações e voluntariado, e seja fácil de manter pela própria equipe (sem depender de agência ou dev externo no dia a dia).

Sucesso = um visitante entende em segundos o que a ONG faz e por que importa, e sai com uma ação clara tomada (doar, se candidatar a voluntário, ou pelo menos guardar o contato) — sem que o site pareça institucional-frio nem "carnavalesco".

## Brand Personality

**3 palavras:** acolhedor, sério (sem ser solene), lúdico com moderação.

Tom de voz: humano e direto, nunca corporativo. A seriedade médica (jaleco, hospital) e o espírito de palhaço convivem — nenhum dos dois domina o outro. Codinome interno do design system: **Jaleco**.

Emoções-alvo confirmadas pelo usuário: **confiança** (transparência institucional, o apoio é bem usado) e **acolhimento** (calor humano genuíno, sem parecer institucional demais).

Princípios de design já travados no Notion (Design System):
1. Humanização acima de estetização
2. Clareza acima de criatividade gratuita
3. Calor sem infantilização
4. Acessibilidade como base, não adorno
5. Consistência sobre ornamento

## Anti-references

- **Infantil ou carnavalesco** — a ludicidade do "palhaço" nunca deve dominar a seriedade do trabalho hospitalar. Sem cores em excesso, sem ilustrações cartunescas genéricas.
- **Fotografia stock genérica** — só fotos reais da equipe em ação; nunca banco de imagens.
- **Ambientes clinicamente frios ou invasivos** — nem o oposto: nada que pareça hospital corporativo distante.
- **Vermelho puro de alerta/emergência** (`#DC2626` da base antiga) — deliberadamente trocado por coral/terracota, para não comunicar "urgência médica" onde o tom certo é "calor humano".
- Poses forçadas, imagens que exponham pacientes sem consentimento, filtros que distorçam a realidade.
- Nenhuma referência externa adicional foi pedida — seguir estritamente os princípios e a paleta já documentados no Design System do Notion.

## Design Principles

1. **A seriedade médica e o espírito de palhaço dividem o palco igualmente** — nenhuma decisão visual deve fazer o site parecer só uma ONG séria ou só um evento infantil.
2. **Prova antes de pedido** — mostrar impacto real (19 hospitais, +8.000 pacientes, fotos genuínas) antes de qualquer CTA de doação, nunca depois.
3. **Fácil de manter vence sofisticação técnica** — Fase 1 é conteúdo estático de propósito; decisões de arquitetura devem privilegiar simplicidade de manutenção pela equipe da ONG, não elegância técnica per se.
4. **Acessibilidade não é feature, é requisito de lançamento** — WCAG 2.1 AA em todo componente novo, desde o primeiro commit.
5. **Consistência de marca acima de efeito pontual** — um sistema coeso (Jaleco) vale mais que uma seção visualmente ousada e desalinhada do resto.

## Accessibility & Inclusion

- **Meta:** WCAG 2.1 nível AA em toda a aplicação, sem exceções — já documentado em detalhe no Design System do Notion (semântica HTML, contraste mínimo 4.5:1 texto normal / 3:1 texto grande, navegação por teclado completa, ARIA mínimo necessário, formulários com labels e erros acessíveis, `prefers-reduced-motion` respeitado).
- Páginas com atenção redobrada: **Doação** (deve ser 100% navegável por teclado) e **formulário de Contato** (validação e mensagens de erro claras).
- **Galeria** precisa de alt text real e descritivo em cada foto — nunca genérico.
- Cor nunca é o único portador de significado (ex: erro de formulário sempre com ícone + texto, não só vermelho).
