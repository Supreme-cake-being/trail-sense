import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { timestamps } from './common';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  email: text('email').notNull().unique(),

  passwordHash: text('password_hash').notNull(),

  firstName: text('first_name'),
  lastName: text('last_name'),

  isEmailVerified: boolean('is_email_verified').default(false).notNull(),

  refreshTokenHash: text('refresh_token_hash'),

  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
