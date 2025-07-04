# ✅ Checklist: Blog

## 📝 Funcionalidade Base

- [ ] Criar post (formulário)
- [ ] Editar post existente
- [ ] Deletar post
- [ ] Listagem de posts no painel
- [ ] Visualização pública de posts

## 🧩 Estrutura e Conteúdo

- [ ] Campo: Título
- [ ] Campo: Conteúdo (rich text ou textarea)
- [ ] Campo: Status (rascunho, publicado, arquivado)
- [ ] Campo: Tags (notícia, evento, artigo, outro)
- [ ] Campo: Capa do post (via galeria ou URL)

## 🧠 Validação e UX

- [ ] Validação com Zod no formulário
- [ ] Upload de imagem com preview
- [ ] Feedback visual de sucesso e erro
- [ ] Slug automático e único baseado no título
- [ ] Loading e desabilitar botão durante envio

## 📣 Exibição Pública

- [ ] Página de listagem dos posts em ordem cronológica
- [ ] Página de visualização individual do post
- [ ] SEO dinâmico por post (Next SEO)
- [ ] Filtro por tag (opcional)

## 🔐 Permissões e Segurança

- [ ] Apenas usuários autenticados podem criar/editar/deletar
- [ ] Proteção contra acesso direto a rascunhos
- [ ] Sanitização de conteúdo (para evitar XSS)
