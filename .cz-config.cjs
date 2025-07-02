module.exports = {
  types: [
    { value: 'feat', name: 'feat:     Adicionar nova funcionalidade' },
    { value: 'fix', name: 'fix:      Correção de bug' },
    { value: 'docs', name: 'docs:     Alterações na documentação' },
    { value: 'style', name: 'style:    Estilização (formatação, ponto e vírgula, etc)' },
    { value: 'refactor', name: 'refactor: Refatoração de código' },
    { value: 'perf', name: 'perf:     Melhoria de performance' },
    { value: 'test', name: 'test:     Adição/correção de testes' },
    { value: 'chore', name: 'chore:    Mudanças em tarefas de build ou ferramentas' },
  ],
  messages: {
    type: "Selecione o tipo de alteração:",
    scope: "Escopo desta alteração (opcional):",
    customScope: "Defina o escopo personalizado:",
    subject: "Escreva uma descrição breve e imperativa da alteração:\n",
    body: 'Descrição mais longa da alteração (opcional). Use "|" para quebra de linha:\n',
    breaking: 'Alguma alteração quebrando o código? (opcional):\n',
    footer: 'Issues relacionadas (ex: #123, #456) (opcional):\n',
    confirmCommit: 'Você deseja prosseguir com o commit acima?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
};