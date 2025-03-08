
import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, bigint, text, timestamp, pgSequence } from "drizzle-orm/pg-core"
import postgres from 'postgres';
import { sql } from "drizzle-orm"
export const noteIdSeq = pgSequence("note_id_seq", { startWith: "1", increment: "1", minValue: "1", maxValue: "9223372036854775807", cache: "1", cycle: false })

export const thread = pgTable("thread", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "thread_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
  content: text(),
  username: text(),
  title: text(),
});

export const notes = pgTable("note", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" }).default(sql`nextval('note_id_seq'::regclass)`).primaryKey().notNull(),
  note: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

const client = postgres(process.env['VITE_DATABASE_URL'] ?? '');
export const db = drizzle(client);
