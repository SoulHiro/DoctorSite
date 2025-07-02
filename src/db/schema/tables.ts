import {
  boolean,
  foreignKey,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

// Enums
export const mediaTypeEnum = pgEnum('mediaType', ['image', 'video'])
export const methodPaymentEnum = pgEnum('methodPayment', [
  'pix',
  'cartao',
  'boleto',
])
export const notificationTypeEnum = pgEnum('notificationType', [
  'informação',
  'aviso',
  'erro',
])
export const rolesEnum = pgEnum('roles', ['admin', 'user'])
export const statusBlogEnum = pgEnum('statusBlog', [
  'rascunho',
  'publicado',
  'arquivado',
])
export const statusPaymentEnum = pgEnum('statusPayment', [
  'pendente',
  'pago',
  'cancelado',
])
export const tagsEnum = pgEnum('tags', ['noticia', 'evento', 'artigo', 'outro'])

// Tabelas
export const settingsTable = pgTable('settings', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  language: varchar({ length: 50 }).default('pt-BR').notNull(),
  currency: varchar({ length: 50 }).default('BRL').notNull(),
  timezone: varchar({ length: 50 }).default('America/Sao_Paulo').notNull(),
  dateFormat: varchar('date_format', { length: 50 })
    .default('DD/MM/YYYY')
    .notNull(),
  timeFormat: varchar('time_format', { length: 50 }).default('HH:mm').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

export const usersTable = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    role: rolesEnum('role').notNull().default('user'),
    avatarImage: text('avatar_image'),
    phone: varchar('phone', { length: 20 }),
    bio: text('bio'),
    position: varchar('position', { length: 100 }),
    isActive: boolean('is_active').default(true),
    emailVerified: boolean('email_verified').default(false),
    lastLoginAt: timestamp('last_login_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique('users_email_unique').on(table.email)]
)

export const blogPostsTable = pgTable(
  'blog_post',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title').notNull(),
    slug: varchar('slug').notNull(),
    content: text('content').notNull(),
    excerpt: text('excerpt'),
    userId: uuid('user_id').notNull(),
    status: statusBlogEnum('status').notNull().default('rascunho'),
    tags: tagsEnum('tags').array().notNull().default(['noticia']),
    featured: boolean('featured').default(false),
    viewCount: integer('view_count').default(0),
    coverId: uuid('cover_id'),
    coverUrl: varchar('cover_url', { length: 500 }),
    publishedAt: timestamp('published_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersTable.id],
      name: 'blog_post_user_id_users_id_fk',
    }),
    foreignKey({
      columns: [table.coverId],
      foreignColumns: [mediaTable.id],
      name: 'blog_post_cover_id_media_id_fk',
    }),
    unique('blog_post_slug_unique').on(table.slug),
  ]
)

export const mediaTable = pgTable(
  'media',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    url: varchar('url', { length: 500 }).notNull(),
    filename: varchar('filename').notNull(),
    type: mediaTypeEnum('type').notNull(),
    size: integer('size').notNull(),
    width: integer('width'),
    height: integer('height'),
    duration: integer('duration').default(0),
    location: varchar('location', { length: 500 }).default('').notNull(),
    alt: varchar('alt', { length: 500 }).default(''),
    caption: text('caption'),
    isPublic: boolean('is_public').default(true),
    userId: uuid('user_id').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersTable.id],
      name: 'media_user_id_users_id_fk',
    }),
  ]
)

export const paymentsTable = pgTable(
  'payment',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    status: statusPaymentEnum('status').notNull().default('pendente'),
    method: methodPaymentEnum('method').notNull(),
    donorName: varchar('donor_name', { length: 255 }),
    donorEmail: varchar('donor_email', { length: 255 }),
    isRecurring: boolean('is_recurring').default(false),
    transactionId: varchar('transaction_id', { length: 255 }),
    description: text('description'),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersTable.id],
      name: 'payment_user_id_users_id_fk',
    }),
  ]
)

export const notificationsTable = pgTable(
  'notification',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    title: varchar('title', { length: 500 }).notNull(),
    message: text('message').notNull(),
    read: boolean('read').notNull().default(false),
    type: notificationTypeEnum('type').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersTable.id],
      name: 'notification_user_id_users_id_fk',
    }),
  ]
)
