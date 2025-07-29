# ✅ Checklist: Blog

## 🎯 **MVP - Essencial para Lançamento**

### 📝 Funcionalidade Base

- [x] Criar post (formulário completo)
- [x] Listagem de posts no painel admin
- [x] Interface de gerenciamento com filtros
- [x] Stats cards para métricas
- [ ] Editar post existente
- [x] Deletar post
- [x] Visualização pública de posts
- [x] Página pública de listagem do blog
- [x] Página individual de post por slug
- [ ] Sistema de rascunhos

### 🧩 Estrutura e Conteúdo

- [x] Campo: Título
- [x] Campo: Conteúdo (rich text com Tiptap)
- [x] Campo: Status (rascunho, publicado, arquivado)
- [x] Campo: Tags (notícia, evento, artigo, outro)
- [x] Campo: Capa do post (via galeria ou URL)
- [ ] Campo: Agendamento de publicação (removido temporariamente)
- [x] Campo: Slug automático
- [x] Campo: Meta descrição

### 🧠 Validação e UX

- [x] Validação com Zod no formulário
- [x] Upload de imagem com preview
- [x] Feedback visual de sucesso e erro
- [x] Preview em tempo real do post
- [x] Loading e desabilitar botão durante envio
- [x] Interface moderna com shadcn/ui
- [ ] Validação de slug único

### 📣 Exibição Pública

- [x] Página de listagem dos posts em ordem cronológica (`/blog`)
- [x] Página de visualização individual do post (`/blog/[slug]`)
- [x] Slug automático e único baseado no título
- [x] Layout em grid/cards
- [x] Posts em destaque na landing page
- [x] Integração com dados reais do banco

### 🔐 Permissões e Segurança

- [x] Apenas usuários autenticados podem criar
- [x] Apenas usuários autenticados podem editar/deletar
- [x] Proteção de rotas admin
- [ ] Proteção contra acesso direto a rascunhos
- [ ] Sanitização de conteúdo (para evitar XSS)

### 🎨 Design e UX

- [x] Interface de criação intuitiva
- [x] Preview responsivo
- [x] Estados de loading
- [x] Interface de gerenciamento com filtros
- [x] Cards modernos para posts

### 📱 Responsividade

- [x] Formulários responsivos
- [x] Preview mobile-friendly
- [x] Layout público responsivo

### 🔍 SEO Básico

- [ ] SEO dinâmico por post (Next SEO)
- [ ] Meta tags automáticas
- [ ] Open Graph tags

### 🗄️ Banco de Dados

- [x] Tabela de posts implementada
- [x] Relacionamentos básicos
- [x] Actions para CRUD completo

## 🚀 **Pós-MVP - Melhorias e Funcionalidades Avançadas**

### 📝 Funcionalidades Avançadas

- [ ] Editor rich text (Markdown/WYSIWYG)
- [ ] Upload de imagens inline
- [ ] Formatação de texto
- [ ] Listas e tabelas
- [ ] Embeds (vídeos, tweets)
- [ ] Auto-save de rascunhos

### 🧩 Campos Avançados

- [ ] Campo: Palavras-chave
- [ ] Sistema de tags
- [ ] Sistema de categorias
- [ ] Histórico de versões
- [ ] Soft delete

### 📣 Exibição Avançada

- [ ] Paginação
- [ ] Filtro por tag
- [ ] Busca por título/conteúdo
- [ ] Ordenação (mais recentes, mais populares)
- [ ] Navegação entre posts (anterior/próximo)
- [ ] Posts relacionados
- [ ] Compartilhamento social
- [ ] Comentários (opcional)

### 🔐 Segurança Avançada

- [ ] Sistema de roles (editor, admin)
- [ ] Auditoria de mudanças
- [ ] Versionamento de posts

### 🎨 UX Avançada

- [ ] Templates de post
- [ ] Editor em tela cheia
- [ ] Atalhos de teclado
- [ ] Validação de tamanho de imagem

### 📱 Responsividade Avançada

- [ ] Editor adaptativo
- [ ] Teste em diferentes dispositivos

### 🔍 SEO Avançado

- [ ] Schema markup para artigos
- [ ] Sitemap de posts
- [ ] URLs amigáveis

### 🗄️ Performance

- [ ] Índices otimizados
- [ ] Cache de posts
- [ ] Lazy loading de conteúdo
- [ ] Otimização de imagens

### 📊 Analytics e Métricas

- [ ] Contador de visualizações
- [ ] Tempo de leitura
- [ ] Posts mais populares
- [ ] Métricas de engajamento
- [ ] Dashboard de analytics

### 🚀 Funcionalidades Especiais

- [ ] Sistema de newsletter
- [ ] RSS feed
- [ ] Importação de posts
- [ ] Exportação de conteúdo
- [ ] Backup automático
- [ ] Colaboração em tempo real
- [ ] Sistema de revisão

### 📈 Integração

- [ ] Integração com redes sociais
- [ ] Compartilhamento automático
- [ ] Integração com CMS externo
- [ ] API para posts
- [ ] Webhooks para mudanças
