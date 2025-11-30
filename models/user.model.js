import { integer, pgTable, varchar, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),

  first_name: varchar('first_name', { length: 50 }).notNull(),
  last_name: varchar('last_name', { length: 50 }),

  email: varchar({ length: 250 }).notNull().unique(),

  password: text().notNull(),

  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').$onUpdate(() => new Date()),
});
