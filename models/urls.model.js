import { integer, pgTable, varchar, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './user.model.js';

export const urlsTable = pgTable('urls', {
  id: uuid().primaryKey().defaultRandom(),

  shortCode: varchar('code').notNull().unique(),
  targetUrl: text('target_url').notNull(),

  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull(),

  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').$onUpdate(() => new Date()),
});
