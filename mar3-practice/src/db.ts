// postgresql://postgres:572IM7WXEPBS4Tdy@db.elbaksxbhjjshmyienqs.supabase.co:5432/postgres
//
import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import postgres from 'postgres';

export const notes = pgTable('note', {
  id: serial('id').primaryKey(),
  note: text('note').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Note = InferSelectModel<typeof notes>;
export type NewNote = InferInsertModel<typeof notes>;
const client = postgres('postgresql://postgres:572IM7WXEPBS4Tdy@db.elbaksxbhjjshmyienqs.supabase.co:5432/postgres');
export const db = drizzle(client);
