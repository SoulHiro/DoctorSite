import {
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
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
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => new Date()),
})

// Tabela de usuários - compatível com Better Auth
export const usersTable = pgTable('users', {
  // Campos obrigatórios do Better Auth
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),

  // Campos customizados adicionais
  role: rolesEnum('role').default('user'),
  avatarImage: text('avatar_image'),
  phone: varchar('phone', { length: 20 }),
  bio: text('bio'),
  lastLoginAt: timestamp('last_login_at', { mode: 'string' }),
})

export const sessionsTable = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
})

export const accountsTable = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

export const verificationsTable = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const blogPostsTable = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull(),
  slug: varchar('slug').notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  status: statusBlogEnum('status').notNull().default('rascunho'),
  tags: tagsEnum('tags').array().notNull().default(['noticia']),
  featured: boolean('featured').default(false),
  viewCount: integer('view_count').default(0),
  coverId: uuid('cover_id'),
  coverUrl: varchar('cover_url', { length: 500 }),
  publishedAt: timestamp('published_at', { mode: 'string' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

export const mediaTable = pgTable('medias', {
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
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

export const paymentsTable = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  status: statusPaymentEnum('status').notNull().default('pendente'),
  method: methodPaymentEnum('method').notNull(),
  donorName: varchar('donor_name', { length: 255 }),
  donorEmail: varchar('donor_email', { length: 255 }),
  isRecurring: boolean('is_recurring').default(false),
  transactionId: varchar('transaction_id', { length: 255 }),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

export const notificationsTable = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 500 }).notNull(),
  message: text('message').notNull(),
  read: boolean('read').notNull().default(false),
  type: notificationTypeEnum('type').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})
