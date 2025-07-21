import { relations } from 'drizzle-orm'

import {
  blogPostsTable,
  DeppoimnetsTable,
  mediaTable,
  notificationsTable,
  paymentsTable,
  usersTable,
} from './tables'

// Relações
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  blogPosts: many(blogPostsTable),
  media: many(mediaTable),
  payments: many(paymentsTable),
  notifications: many(notificationsTable),
  deppoiments: many(DeppoimnetsTable),
}))

export const deppoimentsTableRelations = relations(
  DeppoimnetsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [DeppoimnetsTable.userId],
      references: [usersTable.id],
    }),
  })
)

export const blogPostsTableRelations = relations(blogPostsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [blogPostsTable.userId],
    references: [usersTable.id],
  }),
  // cover removido pois não existe mais coverId nem relação direta com mediaTable
}))

export const mediaTableRelations = relations(mediaTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [mediaTable.userId],
    references: [usersTable.id],
  }),
}))

export const paymentsTableRelations = relations(paymentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [paymentsTable.userId],
    references: [usersTable.id],
  }),
}))

export const notificationsTableRelations = relations(
  notificationsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [notificationsTable.userId],
      references: [usersTable.id],
    }),
  })
)
