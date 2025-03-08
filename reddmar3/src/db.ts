
import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import postgres from 'postgres';

export const notes = pgTable('note', {
  id: serial('id').primaryKey(),
  note: text('note').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const threads = pgTable('thread', {
  id: serial('id').primaryKey(),
  content: text('thread').notNull(),
  username: text('username').notNull(),
  title: text('title').notNull(),

});


export type Note = InferSelectModel<typeof notes>;
export type NewNote = InferInsertModel<typeof notes>;
export type Thread = InferSelectModel<typeof threads>;
export type NewThread = InferInsertModel<typeof threads>;

const client = postgres(process.env['VITE_DATABASE_URL'] ?? '');
export const db = drizzle(client);
