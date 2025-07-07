# Configuração do Scheduler de Posts

## Visão Geral

O sistema de agendamento de posts funciona através de um scheduler que verifica periodicamente se há posts agendados para publicação. Atualmente, o scheduler precisa ser executado manualmente ou através de um serviço externo.

## Como Funciona

1. **Posts Agendados**: Posts com status `agendado` e `scheduledAt` definido
2. **Verificação**: O scheduler verifica se `scheduledAt <= now`
3. **Publicação**: Posts prontos são marcados como `publicado` e emails são enviados

## Endpoints Disponíveis

### `/api/scheduler/publish`

- **Método**: POST
- **Autenticação**: Bearer token via header `Authorization`
- **Chave**: `SCHEDULER_API_KEY` (env) ou `your-secret-key` (padrão)

### `/api/cron/publish-posts`

- **Método**: POST
- **Autenticação**: Bearer token via header `Authorization`
- **Chave**: `CRON_SECRET_KEY` (env) ou `your-cron-secret-key` (padrão)

## Teste Manual

### Via Script

```bash
npm run test-scheduler
```

### Via cURL

```bash
curl -X POST http://localhost:3000/api/scheduler/publish \
  -H "Authorization: Bearer your-secret-key" \
  -H "Content-Type: application/json"
```

## Configuração de Execução Automática

### Opção 1: Vercel Cron Jobs (Recomendado)

1. **Crie um arquivo `vercel.json` na raiz do projeto**:

```json
{
  "crons": [
    {
      "path": "/api/cron/publish-posts",
      "schedule": "* * * * *"
    }
  ]
}
```

2. **Configure a variável de ambiente**:

```bash
CRON_SECRET_KEY=sua-chave-secreta-aqui
```

### Opção 2: Serviços Externos

#### GitHub Actions

```yaml
name: Publish Scheduled Posts
on:
  schedule:
    - cron: '* * * * *' # A cada minuto

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger publish
        run: |
          curl -X POST ${{ secrets.APP_URL }}/api/cron/publish-posts \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET_KEY }}"
```

#### Uptime Robot

- URL: `https://seu-dominio.com/api/cron/publish-posts`
- Método: POST
- Headers: `Authorization: Bearer sua-chave-secreta`
- Intervalo: 1 minuto

### Opção 3: Servidor Próprio

#### Cron Job (Linux/Mac)

```bash
# Adicione ao crontab
* * * * * curl -X POST http://localhost:3000/api/cron/publish-posts \
  -H "Authorization: Bearer sua-chave-secreta"
```

#### Task Scheduler (Windows)

- Crie uma tarefa que executa a cada minuto
- Comando: `curl -X POST http://localhost:3000/api/cron/publish-posts -H "Authorization: Bearer sua-chave-secreta"`

## Variáveis de Ambiente

```env
# Chave para autenticação do scheduler
SCHEDULER_API_KEY=sua-chave-secreta-aqui

# Chave para autenticação do cron job
CRON_SECRET_KEY=sua-chave-secreta-aqui
```

## Monitoramento

### Logs

O scheduler gera logs detalhados:

- Posts encontrados para publicação
- Quantidade de posts publicados
- Quantidade de emails enviados
- Erros encontrados

### Verificação Manual

```bash
# Verificar posts agendados
curl http://localhost:3000/api/scheduler/publish -X GET
```

## Troubleshooting

### Post não foi publicado

1. Verifique se o status é `agendado`
2. Confirme se `scheduledAt` está no passado
3. Execute o scheduler manualmente para debug

### Erro de autenticação

1. Verifique se a chave está correta
2. Confirme se o header `Authorization` está presente
3. Teste com a chave padrão: `your-secret-key`

### Scheduler não executa automaticamente

1. Verifique se o cron job está configurado
2. Confirme se o endpoint está acessível
3. Teste manualmente primeiro
