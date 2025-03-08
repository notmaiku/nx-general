
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: './src/db.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://postgres:572IM7WXEPBS4Tdy@db.elbaksxbhjjshmyienqs.supabase.co:5432/postgres',
  },
});

