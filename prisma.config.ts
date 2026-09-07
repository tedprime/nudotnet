import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Migrate needs a direct (non-pooled) connection — PgBouncer/Neon's
    // pooled endpoint doesn't support the advisory locks and prepared
    // statements Migrate relies on. The app runtime (src/lib/prisma.ts)
    // uses the pooled DATABASE_URL instead, via the pg driver adapter.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
