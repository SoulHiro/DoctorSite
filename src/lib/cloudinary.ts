// Função para fazer upload de imagem via API
export async function uploadImage(file: File, folder: string = 'blog-posts') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await fetch('/api/upload-image', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Erro ao fazer upload da imagem')
  }

  return response.json()
}
