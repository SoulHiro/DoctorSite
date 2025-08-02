# Configuração de Variáveis de Ambiente

## ✅ **Estrutura Organizada dos .env**

### 📁 **Arquivos de Ambiente**

#### **`.env`** - Configurações Base

```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
RESEND_API_KEY="..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
NEXT_PUBLIC_CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# SEO & Analytics - Para produção
NEXT_PUBLIC_BASE_URL=https://doutorespalhacos.com
NEXT_PUBLIC_GA_ID=G-NLM82JL1WZ
```

#### **`.env.local`** - Desenvolvimento Local

```env
# Para desenvolvimento local - sobrescreve o .env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

#### **`.env.production`** - Produção (Vercel)

```env
# Configurações para produção (Vercel)
NEXT_PUBLIC_BASE_URL=https://doctor-site-9pmaeiv8n-soulhiros-projects.vercel.app
NEXT_PUBLIC_GA_ID=G-NLM82JL1WZ
```

## 🔄 **Como Funciona**

### **Hierarquia de Prioridade:**

1. **`.env.local`** (mais alta prioridade - desenvolvimento)
2. **`.env.production`** (produção)
3. **`.env`** (configurações base)

### **Ambientes:**

- **Desenvolvimento**: Usa `.env` + `.env.local`
- **Produção**: Usa `.env` + configurações do Vercel

## ✅ **Otimizações Realizadas**

### **✂️ Removido:**

- ❌ `GOOGLE_SITE_VERIFICATION` (não usado)
- ❌ `YANDEX_VERIFICATION` (não usado)
- ❌ `YAHOO_VERIFICATION` (não usado)
- ❌ Duplicação de variáveis entre arquivos

### **🛠️ Ajustado:**

- ✅ **Google Analytics ID**: `G-NLM82JL1WZ` (fixo no .env)
- ✅ **Base URL**: Dinâmica conforme ambiente
  - Dev: `http://localhost:3001`
  - Produção: URL do Vercel ou domínio final
- ✅ **Verificações de SEO**: Removidas do layout.tsx

## 🌐 **URLs por Ambiente**

| Ambiente            | URL                                | Uso                 |
| ------------------- | ---------------------------------- | ------------------- |
| **Desenvolvimento** | `http://localhost:3001`            | Local dev server    |
| **Vercel Preview**  | `https://doctor-site-9pmaeiv8n...` | Deploy preview      |
| **Produção Final**  | `https://doutorespalhacos.com`     | Domínio customizado |

## 🔒 **Segurança**

### **Arquivos no .gitignore:**

```gitignore
# local env files
.env*.local
.env.production
```

### **Variáveis Públicas vs Privadas:**

- **`NEXT_PUBLIC_*`**: Expostas no frontend
- **Sem prefixo**: Apenas no servidor (seguras)

## 📝 **Para Deploy na Vercel**

1. **Configure no Dashboard da Vercel:**

   ```
   NEXT_PUBLIC_BASE_URL = https://doctor-site-9pmaeiv8n-soulhiros-projects.vercel.app
   NEXT_PUBLIC_GA_ID = G-NLM82JL1WZ
   ```

2. **Ou use o `.env.production`** (automático)

## 🚀 **Resultado Final**

✅ **SEO otimizado** com metadata dinâmica  
✅ **Google Analytics funcionando** (`G-NLM82JL1WZ`)  
✅ **URLs corretas** por ambiente  
✅ **Sem configurações desnecessárias**  
✅ **Estrutura limpa e organizizada**

---

**🎯 Agora você tem apenas o essencial: SEO robusto + Google Analytics!**
