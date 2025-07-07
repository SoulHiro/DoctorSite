#!/usr/bin/env node

/**
 * Script para testar manualmente o scheduler de posts agendados
 *
 * Uso:
 * node scripts/test-scheduler.js
 */

// Importa o scheduler diretamente via fetch da API
async function testScheduler() {
  console.log('🧪 Testando scheduler de posts agendados...')
  console.log('⏰ Timestamp atual:', new Date().toLocaleString('pt-BR'))

  try {
    // Chama a API do scheduler
    const response = await fetch(
      'http://localhost:3000/api/scheduler/publish',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer your-secret-key',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    console.log('\n📊 Resultado:')
    console.log('✅ Sucesso:', result.success)
    console.log('📝 Posts publicados:', result.postsPublished)
    console.log('📧 Emails enviados:', result.emailsSent)

    if (result.errors && result.errors.length > 0) {
      console.log('❌ Erros:')
      result.errors.forEach((error) => console.log('  -', error))
    }

    if (result.postsPublished > 0) {
      console.log('\n🎉 Posts foram publicados com sucesso!')
    } else {
      console.log(
        '\nℹ️  Nenhum post foi publicado (pode ser normal se não há posts agendados)'
      )
    }
  } catch (error) {
    console.error('💥 Erro ao executar scheduler:', error.message)
    console.log(
      '\n💡 Certifique-se de que o servidor está rodando em http://localhost:3000'
    )
    process.exit(1)
  }
}

testScheduler()
