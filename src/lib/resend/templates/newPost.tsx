import * as React from 'react'

export interface NewPostEmailProps {
  post: {
    title: string
    slug: string
    excerpt?: string | null
    url: string
    tags: string[]
  }
  subscriber: {
    name: string
    email: string
  }
}

export function NewPostEmail({ post, subscriber }: NewPostEmailProps) {
  return (
    <div
      style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}
    >
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h1 style={{ color: '#333', marginBottom: '10px' }}>
          🎉 Novo post publicado!
        </h1>

        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Olá {subscriber.name}, temos um novo conteúdo para você!
        </p>

        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
          }}
        >
          <h2 style={{ color: '#333', marginBottom: '10px', fontSize: '20px' }}>
            {post.title}
          </h2>

          {post.excerpt && (
            <p
              style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}
            >
              {post.excerpt}
            </p>
          )}

          <div style={{ marginBottom: '15px' }}>
            {post.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  marginRight: '8px',
                  marginBottom: '4px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={post.url}
            style={{
              display: 'inline-block',
              backgroundColor: '#1976d2',
              color: '#fff',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Ler agora →
          </a>
        </div>

        <div
          style={{
            marginTop: '20px',
            fontSize: '12px',
            color: '#999',
            textAlign: 'center',
          }}
        >
          <p>
            Você está recebendo este email porque está inscrito em nossa
            newsletter.
          </p>
          <p>
            <a
              href={`https://doutorespalhacos.com/newsletter/unsubscribe?email=${subscriber.email}`}
              style={{ color: '#999' }}
            >
              Cancelar inscrição
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
