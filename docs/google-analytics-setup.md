# Configuração do Google Analytics

## ✅ Google Analytics Configurado!

O Google Analytics já está implementado e funcionando no seu projeto com o ID: **G-NLM82JL1WZ**

### 🔧 Como Funciona

O código do Google Analytics que você recebeu:

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-NLM82JL1WZ"
></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'G-NLM82JL1WZ')
</script>
```

Foi integrado perfeitamente na nossa implementação usando Next.js!

### 📁 Arquivos Configurados

1. **`.env.local`** - Criado com seu ID do GA:

   ```env
   NEXT_PUBLIC_GA_ID=G-NLM82JL1WZ
   NEXT_PUBLIC_BASE_URL=https://doctor-site-9pmaeiv8n-soulhiros-projects.vercel.app
   ```

2. **`src/components/seo/google-analytics.tsx`** - Componente atualizado:
   - ✅ Script async do Google carregado corretamente
   - ✅ Configuração do gtag simplificada (igual ao código do Google)
   - ✅ Tracking automático de páginas
   - ✅ Removi dependência de produção para funcionar em dev também

3. **`src/lib/analytics.ts`** - Utilitários melhorados:
   - ✅ Fallback para o seu ID caso não tenha .env
   - ✅ Verificações de segurança para window
   - ✅ Funções para tracking de eventos personalizados

4. **`src/app/layout.tsx`** - Google Analytics já incluído automaticamente

### 🚀 Funcionalidades Disponíveis

#### Tracking Automático

- ✅ **Page Views**: Todas as páginas são rastreadas automaticamente
- ✅ **SPA Navigation**: Mudanças de rota são detectadas
- ✅ **Real-time**: Dados aparecem em tempo real no GA

#### Eventos Personalizados

Você pode usar estas funções para rastrear eventos específicos:

```typescript
import {
  trackFormSubmission,
  trackButtonClick,
  logEvent,
} from '@/lib/analytics'

// Rastrear envio de formulário
trackFormSubmission('contato')

// Rastrear clique em botão
trackButtonClick('download-relatorio', 'hero-section')

// Evento personalizado
logEvent({
  action: 'volunteer_signup',
  category: 'engagement',
  label: 'header-button',
  value: 1,
})
```

### 📊 Verificação

Para verificar se está funcionando:

1. **Abra o site** em modo desenvolvimento
2. **Abra DevTools** (F12) → Console
3. **Digite**: `gtag` - deve aparecer uma função
4. **Acesse**: [Google Analytics](https://analytics.google.com) → Relatórios em tempo real
5. **Navegue** pelo seu site e veja os dados aparecerem

### 🔍 Debug

Se algo não estiver funcionando:

1. **Verifique o console** do navegador por erros
2. **Confirme o .env.local** existe na raiz do projeto
3. **Teste em produção** também (Vercel)
4. **Use a extensão** [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

### 🌐 Produção

Quando fizer deploy, o analytics funcionará automaticamente porque:

- ✅ O ID está configurado no código
- ✅ As variáveis de ambiente são transportadas para produção
- ✅ A implementação é otimizada para performance

### 📈 Próximas Melhorias

Considere implementar:

- **Goal Tracking**: Para conversões específicas
- **Enhanced Ecommerce**: Para doações/campanhas
- **Custom Dimensions**: Para segmentação avançada
- **Cross-domain Tracking**: Se tiver subdomínios

---

**🎉 Seu Google Analytics está pronto e funcionando!**

Os dados começarão a aparecer no painel do Google Analytics assim que as pessoas começarem a visitar o site.
