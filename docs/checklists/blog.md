# ✅ Checklist: Blog

## 📝 Funcionalidade Base

- [x] Criar post (formulário)
- [ ] Editar post existente
- [ ] Deletar post
- [x] Listagem de posts no painel
- [ ] Visualização pública de posts

## 🧩 Estrutura e Conteúdo

- [x] Campo: Título
- [x] Campo: Conteúdo (rich text ou textarea)
- [x] Campo: Status (rascunho, publicado, arquivado)
- [x] Campo: Tags (notícia, evento, artigo, outro)
- [x] Campo: Capa do post (via galeria ou URL)
- [x] Campo: Agendamento de publicação

## 🧠 Validação e UX

- [x] Validação com Zod no formulário
- [x] Upload de imagem com preview
- [x] Feedback visual de sucesso e erro
- [x] Preview em tempo real do post
- [x] Loading e desabilitar botão durante envio

## 📣 Exibição Pública

- [ ] Página de listagem dos posts em ordem cronológica
- [ ] Slug automático e único baseado no título
- [ ] Página de visualização individual do post
- [ ] SEO dinâmico por post (Next SEO)
- [ ] Filtro por tag (opcional)

## 🔐 Permissões e Segurança

- [ ] Apenas usuários autenticados podem criar/editar/deletar
- [ ] Proteção contra acesso direto a rascunhos
- [ ] Sanitização de conteúdo (para evitar XSS)
